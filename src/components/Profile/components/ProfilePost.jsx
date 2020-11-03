import React, { useState }  from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';
import { updatePost } from '../../../services/PostClient';
import { deletePost } from '../../../services/PostClient';
import { createComment } from '../../../services/PostClient';
import { handleLikes } from '../../../services/PostClient';
import ProfilePostComments from './ProfilePostComments';

const ProfilePost = ({ id, user, body, photo, createdAt, comments, likes, requestReload }) => {
    const [ text, setText ] = useState( body )
    const [ showComments, setShowComments ] = useState(false);
    const [ allComments, setAllComments ] = useState(comments)
    const [ allLikes, setAllLikes ] = useState(likes);
    const [ showEditPost, setShowEditPost ] = useState(false);
    const [ editPost, setEditPost ] = useState(body);
    const [ commentToPublish, setCommentToPublish] = useState('');
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

    const handleWriteComment = (e) => {
        setCommentToPublish(e.target.value)
    }

    const handlePublishComment = () => {
        createComment(id, commentToPublish)
            .then( c => {
                setAllComments( prev => {
                    return [...prev, c]
                })
            })
    }

    const handelCancelPost = () => {
        deletePost(id, {body: photo})
            .then( () => requestReload())
            .catch(err => setError(err.response?.data?.message))

    }

    if ( error ) {
        return <div>{ error }</div>
    }

    return (
        <div className="py-2 px-4 mb-3 bg-light rounded shadow-sm">
            <p 
                className="small text-muted text-right">
                { timeUntilNow(createdAt) }
            </p>
            { showEditPost ? 
                <div>     
                    <textarea 
                        className="d-block w-100" 
                        value={ editPost } 
                        onChange={ handleEditPost } 
                        rows="8">
                    </textarea>
                    <button 
                        className="d-block m-auto" 
                        onClick={ submitPostUpdate }>
                        save changes
                    </button>
                </div>
                :
                <p 
                    className="mb-0">
                    { text }
                </p>
            }

            { photo ? 
                <div className="d-flex justify-content-center">
                    <img 
                        className="boder border-white shadow rounded m-2"
                        style={{maxWidth: '350px', maxHeight: '350px'}}
                        src={photo}
                        alt=".."
                    />
                </div>
                :
                null
            }

            <ul className="list-inline small text-muted mt-3 mb-0">

                <li 
                    className="list-inline-item" 
                    onClick={ handleLike } 
                    >
                    <i className="fa fa-heart-o mr-2"></i>{ allLikes } <u>Likes</u> &nbsp;| 
                </li>
                <li 
                    className="list-inline-item"
                    onClick={toggleShowComments}>
                    <i className="fa fa-comment-o mr-2"></i>{ comments.length} <u>Comments</u>
                </li>

                { user.id === myId ? 
                    <div className="d-inline mx-1">
                        <li 
                            className="list-inline-item mx-2" 
                            onClick={ handelCancelPost }
                            >
                            <u>Cancel post</u>
                        </li>
                        <li 
                            className="list-inline-item mx-2" 
                            onClick={ clickedEditPost }
                            >
                            <u>Edit post</u>
                        </li>
                    </div>
                    :
                    null
                } 
            </ul>

            { showComments ? 
                <div>
                    <textarea 
                        className="form-control" 
                        onChange={ handleWriteComment } 
                        value={ commentToPublish } 
                        rows="4" 
                        placeholder="Comment post"
                    ></textarea>
                    <div className=" clearfix">
                        <button 
                            className="btn btn-sm btn-secondary pull-right" 
                            onClick={ handlePublishComment } 
                            type="button">
                            Post comment
                        </button>
                    </div>
                    { allComments.map( c => {
                        return (
                            <ProfilePostComments key = {c.id} 
                                id = { c.id }
                                comment = { c }
                                text = { c.text }
                                user = { c.user }
                                createdAt = { c.createdAt }
                            />
                        )
                    })}
                </div>
                :
                null
            }
            
        </div>
    )
}

export default ProfilePost;