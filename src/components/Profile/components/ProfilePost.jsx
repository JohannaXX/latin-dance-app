import React, { useState }  from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';
import { updatePost } from '../../../services/PostClient';
import { handleLikes } from '../../../services/PostClient';
import ProfilePostComments from './ProfilePostComments';

const ProfilePost = ({ id, user, body, image, createdAt, comments, likes }) => {
    const [ text, setText ] = useState( body )
    const [ showComments, setShowComments ] = useState(false);
    const [ allLikes, setAllLikes ] = useState(likes);
    const [ showEditPost, setShowEditPost ] = useState(false);
    const [ editPost, setEditPost ] = useState(body);
    const [ error, setError ] = useState(null);
    const myId = JSON.parse(localStorage.getItem('user')).id;
    
    const toggleShowComments = () => {
        setShowComments(!showComments);
    }

    const handleLike = () => {
        handleLikes(id)
            .then( res => setAllLikes( prev => prev + res.likes) )
            .catch(err => setError(err.response?.data?.message))
    }

    const clickedEditPost = () => {
        setShowEditPost(true)
    }

    const handleEditPost = (e) => {
        setEditPost(e.target.value)
    }

    const submitPostUpdate = () => {
        updatePost(id, {body: editPost})
            .then( post => {
                setText(post.body)
                setShowEditPost(false)
            })
            .catch(err => setError(err.response?.data?.message))
    }

    if ( error ) {
        return <div>{ error }</div>
    }

    return (
        <div className="py-2 px-4 mb-3 bg-light rounded shadow-sm">
            <p className="small text-muted text-right">{ timeUntilNow(createdAt) }</p>
            { showEditPost ? 
                <div>     
                    <textarea className="d-block w-100" value={ editPost } onChange={ handleEditPost } rows="8"></textarea>
                    <button className="d-block m-auto" onClick={ submitPostUpdate }>save changes</button>
                </div>
                :
                <p className="font-italic mb-0">{ text }</p>
            }

            <ul className="list-inline small text-muted mt-3 mb-0">
                <li className="list-inline-item" onClick={ handleLike } >
                    <i className="fa fa-heart-o mr-2"></i>{ allLikes } Likes &nbsp;| 
                </li>
                <li onClick={toggleShowComments} className="list-inline-item">
                    <i className="fa fa-comment-o mr-2"></i>{ comments.length} Comments
                </li>
                {user.id !== myId ? null : (
                    <li className="list-inline-item" onClick={ clickedEditPost }><u>Edit post</u></li>
                )} 
            </ul>

            { !showComments ? null : (
                comments.map( c => {
                    return (
                        <ProfilePostComments key = {c.id} 
                            comment = { c }
                            user = { user }
                        />
                    )
                })
            )}
            
        </div>
    )
}

export default ProfilePost;