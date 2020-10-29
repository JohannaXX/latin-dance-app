import React, { useState } from 'react';
import { timeUntilNow } from '../../helpers/dates.helper';
import { updateMessage } from '../../services/ChatClient';
import { cancelMessage } from '../../services/ChatClient';
import './Message.css';


const Message = ({id, type, avatar, text, date, reload}) => {
    const [ showEditCancelBtns, setShowEditCancelBtns ] = useState(false);
    const [ showMessageToEdit, setShowMessageToEdit ] = useState(false);
    const [ messageText, setMessageText ] = useState(text);
    const [ error, setError ] = useState(null);

    const toggleShowEditCancelBtns = () => {
        setShowEditCancelBtns(!showEditCancelBtns)
    }
    
    const clickedCancelMessage = () => {
        cancelMessage(id)
            .then( res => {
                setMessageText(res)
                reload() 
            })
            .catch(err => setError(err.response?.data?.message))
    }


    const clickedEditMessage = () => {
        setShowMessageToEdit(true)
    }

    const handleNoEditMessage = () => {
        setShowMessageToEdit(false)
        setShowEditCancelBtns(false)
    }

    const handleEditMessage = (e) => {
        setMessageText(e.target.value)
    }

    const submitMessageUpdate = () => {
        updateMessage(id, messageText)
            .then( res => {
                setMessageText(res.message)
                setShowMessageToEdit(false)
                reload()
            })
            .catch(err => setError(err.response?.data?.message))
    }

    if (error) {
        return error
    }

    if (type === 'outgoing') {
        return (
            <div className="outgoing_msg" onClick={ toggleShowEditCancelBtns }>
                <div className="sent_msg">
                    { showMessageToEdit ? 
                        <div>
                            <textarea className="d-block w-100" value={ messageText } onChange={ handleEditMessage } rows="6"></textarea>
                            <div className="d-flex justify-content-between border border-light p-2">
                                <button className="m-auto" onClick={ handleNoEditMessage }>cancel edit</button>
                                <button className="m-auto" onClick={ submitMessageUpdate }>save changes</button>
                            </div>
                        </div> 
                        :
                        <p className={text === '...(message cancelled)'? 'bg-light text-secondary': null}>{ text }</p>
                    }
                    
                    { !showEditCancelBtns ? null : 
                        <div className="d-flex justify-content-between border border-light p-2">
                            <button className="m-auto" onClick={ clickedCancelMessage }>Cancel message</button>
                            <button className="m-auto" onClick={ clickedEditMessage }>Edit</button>
                        </div>
                    }
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