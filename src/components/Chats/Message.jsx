import React from 'react';
import { timeUntilNow } from '../../helpers/dates.helper';
import './Message.css';


const Message = ({type, avatar, text, date}) => {

    if (type === 'outgoing') {
        return (
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{ text }</p>
                    <span className="time_date text-muted">{ timeUntilNow(date) }</span> 
                </div>
            </div> 
        )
    }

    return (
        <div className="incoming_msg">

            <div className="incoming_msg_img w-48"> 
                <img className="avatar" src={ avatar } alt="..."/> 
            </div>

            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ text }</p>
                    <span className="time_date text-muted no-wrap">{ timeUntilNow(date) }</span>
                </div>
            </div>
        </div>
    )
}

export default Message;