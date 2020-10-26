import React, { useState, useEffect, cleanup } from 'react';
import { getChat } from '../../services/ChatClient';
import { createMessage } from '../../services/ChatClient';
import Message from './Message';
import './Chat.css';

const Chat = (props) => {
    const [ showMessages, setShowMessages] = useState(false)
    const [ data, setData ] = useState([]);
    const [ search, setSearch ] = useState("");
    const [ chat, setChat ] = useState([]);
    const [ contact, setContact ] = useState({});
    const [ message, setMessage ] = useState("");
    const [ reload, setReload] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        getChat(props.match.params.id)
            .then( res => {
                setData(res.messages)
                setChat(res);
                setContact(res.members[0]);
                setReload(false);
                setShowMessages(true)
            })
            .catch(err => setError(err.response?.data?.message))

        return () =>  cleanup 
    }, [props.match.params.id, reload])

    useEffect(() => {
        const result = data.filter( e => {
            const toSearch = new RegExp(search, "i")
            return toSearch.test(e.message)
        })
        setChat(prev => {
            return {
                ...prev,
                "messages": result
            }
        })
        return () => cleanup
    }, [search, data])

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setMessage( e.target.value )
    }

    const handleSubmitMessage = (e) => {
        e.preventDefault();

        createMessage( chat.id, message)
            .then(() => {
                setMessage("")
                setReload(true)
            })
            .catch(err => setError(err.response?.data?.message))
    }

    if (!showMessages) {
        return <div className="text-center">Loading...</div>
    }

    if (error) {
        return error
    }

    return (
        <div className="chat-container">
            <div className="row">
                <div className="col-sm-8 shadow mt-2 rounded chat-main">

                    <div className="headind_srch" style={{backgroundColor: '#1a77ad'}}>
                        <div className="recent_heading">
                            <h4 className="text-white">{ contact.name }</h4>
                        </div>
                        <div className="srch_bar bg-white rounded">
                            <div className="stylish-input-group">
                                <input onChange={handleSearch} value={search} type="text" className="search-bar"  placeholder="Search"></input>
                                <span className="input-group-addon">
                                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span> 
                            </div>
                        </div>
                    </div>

                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="mesgs">

                                <div className="type_msg m-3">
                                    <div className="input_msg_write">
                                        <form onSubmit={handleSubmitMessage}>
                                            <textarea 
                                                onChange={ handleChange }
                                                className="write_msg" 
                                                value={ message } 
                                                name="message" 
                                                type="text" 
                                                placeholder="Type a message">
                                            </textarea>
                                            <button className="msg_send_btn" type="submit">
                                                <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div className="msg_history">
                                    { chat.messages.map(m => {
                                        if (m.sender === contact.id) {
                                            return (
                                                <Message key={ m._id }
                                                    type = 'incoming'
                                                    avatar = {contact.avatar}
                                                    text = {m.message}
                                                    date = {m.createdAt}
                                                />)
                                        } else {
                                            return ( 
                                                <Message key={ m._id }
                                                    type = 'outgoing'
                                                    text = {m.message}
                                                    date = {m.createdAt}
                                                />)
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;