import React, {useState} from 'react';
import './Comment.css';
import { updateComment } from '../../../services/PostClient';
import { deleteComment } from '../../../services/PostClient';
import { timeUntilNow } from '../../../helpers/dates.helper';

const Comment = ({ id, user, text, createdAt }) => {
    const [ showCommentToEdit, setShowCommentToEdit ] = useState(false);
    const [ commentText, setCommentText] = useState(text);
    const [ error, setError ] = useState(null);
    const myId = JSON.parse(localStorage.getItem('user')).id;
    
    const myPost = (JSON.parse(localStorage.getItem('user')).id === user.id);
    
    const clickedEditComment = () => {
        setShowCommentToEdit(true);
    }

    const handleEditComment = (e) => {
        setCommentText(e.target.value)
    }

    const submitCommentUpdate = () => {
        updateComment(id, commentText)
            .then( comment => {
                setCommentText(comment.text)
                setShowCommentToEdit(false)
            })
    }

    const clickedCancelComment = () => {
        deleteComment(id)
            .then(c => setCommentText(c.text))
            .catch(err => setError(err.response?.data?.message))
    }

    if ( error ) {
        return <div>{ error }</div>
    }
    
    return (
        <div className="media-block">
            <a className="media-left avatar mr-2" href={"/user/" + user.id}>
                <img className="w-48 img-circle img-sm" alt="..." src={user.avatar} />
            </a>
            <div className="media-body">
                <div className="mar-btm">
                    <a href={"/user/" + user.id} className="btn-link text-semibold media-heading box-inline">{ user.name }</a>
                    <p className="text-muted text-sm">{ timeUntilNow(createdAt) }</p>
                </div>
                { showCommentToEdit ? 
                    <div>
                        <textarea className="d-block w-100" value={ commentText } onChange={ handleEditComment } rows="6"></textarea>
                        <button className="d-block m-auto" onClick={ submitCommentUpdate }>save changes</button>
                    </div> 
                    :
                    <div className={commentText === '...comment cancelled'? "text-muted" : null }>{ commentText }</div>
                }
                
                { myId === user.id ?
                    <div>
                        <button className="btn btn-sm border border-primary px-2 py-1 mr-2 mt-1" onClick={ clickedCancelComment }>cancel</button>
                        <button className="btn btn-sm border border-primary px-2 py-1 mr-2 mt-1" onClick={ clickedEditComment }>edit</button>
                    </div>
                    : 
                    null
                }
                <hr />
            </div>
        </div>
    )
}

export default Comment;