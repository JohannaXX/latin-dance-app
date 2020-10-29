import React, { useState} from 'react';
import { Redirect } from 'react-router-dom';
import { createChat } from '../../services/ChatClient';

const ChatListComponent = ({ contact, msg, chatId}) => {
    const [ chat, setChat ] = useState(null);

    const handleForward = (e) => {
        e.preventDefault();

        const me = JSON.parse(localStorage.getItem('user'))

        createChat([contact.id, me.id])
            .then( chat =>  {
                setChat(chat.id);
            })
    }
    
    if (chat) {
        return <Redirect to={`/chat/${chat}`} />
    }

    return (
        <div className="list-item" key={ contact.id }>
            <div>
                <a href={"/user/" + contact.id}>
                    <span className="w-48 avatar gd-info">
                        <img src={contact.avatar} alt="."/>
                    </span>
                </a>
            </div>
            <div className="flex w-100"> 
                { chatId? 
                    <a href={"/chat/" + chatId} className="item-author text-color">
                        {contact.name}
                    </a>
                    : 
                    <form onSubmit={handleForward}>
                        <button onClick={handleForward} type="submit" className="item-author text-color">{contact.name}</button>
                    </form>
                }
       
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
}

export default ChatListComponent;