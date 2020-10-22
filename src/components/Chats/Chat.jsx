import React, { useState, useEffect, cleanup } from 'react';
import { getChat } from '../../services/ChatClient';
import Message from './Message';
import './Chat.css';

const Chat = (props) => {
    const [ chat, setChat ] = useState([]);
    const [ contact, setContact ] = useState({});
    const [ error, setError ] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        const getThisChat = async () => {
            try {
                const thisChat = await getChat(props.match.params.id);
                //console.log(thisChat.members[0])
                setChat(thisChat);
                setContact(thisChat.members[0]);
                
            } catch(err) {
                setError(err.response?.data?.message);
            }
        }
        getThisChat()


        return () =>  cleanup 
    }, [])

    if (chat.length <= 0) {
        return <div className="text-center">Loading...</div>
    }

    if (error) {
        return error
    }

    return (
        <div className="chat-container">
            <div className="row">
                <div className="col-sm-8 shadow mt-5 rounded chat-main">
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="mesgs">
                                <div className="msg_history">
                                    
                                    { chat.messages.map(m => {
                                        if (m.sender === contact.id) {
                                            return (
                                                <Message 
                                                    type = 'incoming'
                                                    avatar = {contact.avatar}
                                                    text = {m.message}
                                                    date = {m.createdAt}
                                                />)
                                        } else {
                                            return (
                                                <Message 
                                                    type = 'outgoing'
                                                    text = {m.message}
                                                    date = {m.createdAt}
                                                />)
                                        }
                                    })}

                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input type="text" className="write_msg" placeholder="Type a message" />
                                        <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                    </div>
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