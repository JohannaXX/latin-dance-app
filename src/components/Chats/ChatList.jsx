import React, { useState, useEffect, cleanup } from 'react';
import { getChatList } from '../../services/ChatClient';
import { getContacts } from '../../services/UserClient';
import ChatListComponent from './ChatListComponent';
import './ChatList.css';

const ChatList = () => {
    const [ showContacts, setShowContacts] = useState(false)
    const [ data, setData ] = useState([]);
    const [ search, setSearch ] = useState("");
    const [ contacts, setContacts ] = useState([]);
    const [ usersContacts, setUsersContacts ] = useState([]);
    const [ showUserContacts, setShowUserContacts ] = useState(false)
    const [ error, setError ] = useState(null);

    const [ contactIdsWithActiveChat, setContactIdsWithActiveChat] = useState({});

    useEffect( () => {
        getChatList()
            .then( res => {
                const filterContactIdsAndChats = res.chats.reduce( (acc, cur) => {
                    acc[cur.members[0].id] = cur.id
                    return acc
                }, {}) 
                setContactIdsWithActiveChat(filterContactIdsAndChats)
               /*  console.log(contactIdsWithActiveChat) */
                setContacts(res.chats);
                setShowContacts(true);
            })
            .catch(err => setError(err.response?.data?.message))

        getContacts()
            .then( res => {
                setData(res)
                setUsersContacts(res)
            })
            .catch(err => setError(err.response?.data?.message))

        return () =>  cleanup 
    }, [])

    useEffect(() => {
        const result = data.filter( e => {
            const toSearch = new RegExp(search, "i")
            return toSearch.test(e.user.name)
        })
        setUsersContacts(result)
        return () => cleanup
    }, [search, data])

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const clickedOutsideOfSearch = () => {
        setShowUserContacts(false)
    }

    const clickedInsideOfSearch = () => {
        setShowUserContacts(true)   
    }

    if (!showContacts) {
        return <div className="text-center">Loading...</div>
    } 

    if (error) {
        return error
    } 

    return (
        <div className="chatlist-container">
            <div className="row">
                <div className="col-sm-8 m-auto">

                    <div className="headind_srch">
                        <div className="recent_heading">
                            <h4>Chats</h4>
                        </div>
                        <div className="srch_bar">
                            <div className="stylish-input-group">
                                <input onChange={handleSearch} value={search} onClick={clickedInsideOfSearch} type="text" className="search-bar"  placeholder="Search"></input>
                                <span className="input-group-addon">
                                    { showUserContacts ? 
                                        <button type="button" onClick={clickedOutsideOfSearch}>
                                            <i className="fa fa-close" aria-hidden="true"></i> 
                                        </button>
                                        : 
                                        <i className="fa fa-search" aria-hidden="true"></i> 
                                    }
                                </span> 
                            </div>
                        </div>
                    </div>

                    <div className="list list-row block">
                        { showUserContacts ? 
                            (usersContacts.map( c => {
                                
                                if (Object.keys(contactIdsWithActiveChat).includes(c.user.id)) {
                                    return (
                                        <ChatListComponent key = { c.user.id }
                                            contact = { c.user }
                                            chatId = { contactIdsWithActiveChat[c.user.id] } 
                                        />
                                    )
                                } else {
                                    return (
                                        <ChatListComponent key = { c.user.id }
                                            contact = { c.user } 
                                        />
                                    )
                                }  
                            }))
                            :
                            contacts.map( c => {
                                return (
                                    <ChatListComponent key = { c.id }
                                        contact = { c.members[0] } 
                                        msg = { c.messages[0] } 
                                        chatId = { c.id }
                                    />
                            )})
                        }
                        
                    </div>
                </div>
            </div>  

        </div>
    );
}

export default ChatList;