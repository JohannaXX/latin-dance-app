import React, { useState, useEffect, cleanup } from 'react';
import { getChatList } from '../../services/ChatClient';
import { timeUntilNow } from '../../helpers/dates.helper';
import './ChatList.css';

const ChatList = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
        const getAllChats = async () => {
            try {
                const chatList = await getChatList();
                /* console.log(chatList) */
                setContacts(chatList.chats);
            } catch(err) {
                setError(err.response?.data?.message);
            }
        }
        getAllChats()

        return () =>  cleanup 
    }, [])


    if (contacts.length === 0) {
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
                                <input type="text" className="search-bar"  placeholder="Search"></input>
                                <span className="input-group-addon">
                                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span> 
                            </div>
                        </div>
                    </div>

                    <div className="list list-row block">
                        { contacts.map( c => {
                            const contact = c.members[0];
                            const msg = c.messages[0];

                            return (
                                <div className="list-item">
                                    <div>
                                        <a href={"/chat/" + c.id}>
                                            <span className="w-48 avatar gd-info">
                                                <img src={contact.avatar} alt="."/>
                                            </span>
                                        </a>
                                    </div>
                                    <div className="flex w-100"> 
                                        <a href={"/chat/" + c.id} className="item-author text-color">
                                            {contact.name}
                                        </a>
                                        
                                        { !msg ? null : (
                                            <div className="row item-except text-muted text-sm">
                                                <div className="col-8 item-except text-muted text-sm ">
                                                    {msg.message.length <= 20 ? msg.message : `${msg.message.substring(0,30)}...`}
                                                </div>
                                                <div className="col-4 text-right flex item-except text-muted text-sm text-nowrap">{msg.createdAt.split("T")[0]}</div>
                                            </div>
                                        ) }
                                        
                                    </div>
                                </div> 
                            )
                        })}
                        
                    </div>
                </div>
            </div>  

        </div>
    );
}

export default ChatList;