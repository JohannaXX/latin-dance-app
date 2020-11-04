import React, { useState } from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';
import { updatePost } from '../../../services/PostClient';
import { deletePost } from '../../../services/PostClient';
import { createComment } from '../../../services/PostClient';
import { handleLikes } from '../../../services/PostClient';
import Comment from './Comment';
import Popup from '../../Popup/Popup';
import './Post.css';

const Post = ({ id, user, body, photo, likes, comments, createdAt, updatedAt , requestReload}) => {
    const [ text, setText ] = useState( body );
    const [ allComments, setAllComments ] = useState(comments)
    const [ showComments, setShowComments ] = useState(false);
    const [ commentToPublish, setCommentToPublish] = useState('');
    const [ allLikes, setAllLikes ] = useState(likes);
    const [ showEditPost, setShowEditPost ] = useState(false);
    const [ editPost, setEditPost ] = useState(body);
    const [ reload, setReload ] = useState(false);
    const [ openPopup, setOpenPopup ] = useState(false);
    const [ error, setError ] = useState(null);
    const myId = JSON.parse(localStorage.getItem('user')).id;

    const toggleShowComments = () => {
        setShowComments(!showComments);
    }

    const handleLike = () => {
        handleLikes(id)
            .then(res => setAllLikes(prev => prev + res.likes))
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
                    return [...prev, {
                        ...c,
                        'user': user
                    }]
                })
                
                setCommentToPublish('');
            })
    }

    const handelCancelPost = () => {
        deletePost(id, {body: photo})
            .then( () => requestReload())
            .catch(err => setError(err.response?.data?.message))

    }

    const handleReload = () => {
        setReload(!reload)
    }

    const handleOpenPopup = () => {
        setOpenPopup(true);
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
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
                <div>
                    <a href={"/user/" + user.id} className="btn-link text-semibold media-heading box-inline">{user.name}</a>
                    <p className="text-muted text-sm">{timeUntilNow(createdAt)}</p>
                </div>

                { showEditPost ? 
                    <div>
                        <textarea className="d-block w-100" value={ editPost } onChange={ handleEditPost } rows="6"></textarea>
                        <button className="d-block m-auto" onClick={ submitPostUpdate }>save changes</button>
                    </div> 
                    :
                    <div>{ text }</div>
                }


                { photo &&
                    <div className="py-2 m-auto">
                        <img className="posted-image m-auto" src={photo} alt=".." />
                    </div>
                }

                <div className="mt-1">

                    <button onClick={ handleLike } className="btn btn-sm btn-default btn-hover-primary p-0" >
                        <i className="fa fa-heart-o"></i> &nbsp;{allLikes} Likes &nbsp;|
                    </button>
                    <button onClick={ toggleShowComments } className="btn btn-sm btn-default btn-hover-primary ml-2" >
                        <i className="fa fa-comment-o mr-1"></i>{ comments.length } Comments
                    </button>

                    {( user.id === myId ) &&
                        <div>
                            <button className="mx-2" onClick={ handleOpenPopup }>Cancel post</button>
                            <Popup 
                                open = { openPopup } 
                                closePop = { handleClosePopup }
                                handleYesAnswer = { handelCancelPost }
                                > 
                                Are you sure you want to cancel your post?
                            </Popup>
                            <button className="mx-2" onClick={ clickedEditPost }>Edit post</button>
                        </div>
                    }
                </div>

                <hr />

                { showComments &&
                    <div>
                        {allComments.map(c => {
                            return (
                                <Comment key={c.id}
                                    id = {c.id}
                                    user={c.user}
                                    text={c.text}
                                    createdAt={c.createdAt}
                                    reload = {handleReload}
                                />
                            )
                        })}

                        <textarea className="form-control" onChange={ handleWriteComment } value={ commentToPublish } rows="4" placeholder="Comment post"></textarea>
                        <div className=" clearfix">
                            <button className="btn btn-sm btn-primary pull-right" onClick={ handlePublishComment } type="button">
                                <i className="fa fa-pencil fa-fw"></i> Post comment
                            </button>
                        </div>
                        
                    </div>
                }

            </div>
        </div>

    )
}

export default Post;