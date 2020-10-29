import React, { useState } from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';
import { updatePost } from '../../../services/PostClient';
import { handleLikes } from '../../../services/PostClient';
import Comment from './Comment';
import './Post.css';

const Post = ({ id, user, body, image, likes, comments, createdAt, updatedAt }) => {
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


                { !image ? null : 
                    <div className="py-2 m-auto w-photo-home">
                        <img className="w-photo-home" src={image} alt=".." />
                    </div>
                }

                <div className="mt-1">

                    <button onClick={ handleLike } className="btn btn-sm btn-default btn-hover-primary p-0" >
                        <i className="fa fa-heart-o"></i> &nbsp;{allLikes} Likes &nbsp;|
                    </button>
                    <button onClick={ toggleShowComments } className="btn btn-sm btn-default btn-hover-primary ml-2" >
                        <i className="fa fa-comment-o mr-1"></i>{ comments.length } Comments
                    </button>

                    {user.id !== myId ? null : (
                        <button type="button" onClick={ clickedEditPost }>Edit post</button>
                    )}
                </div>

                <hr />

                { !showComments ? null : (
                    comments.map(c => {
                        return (
                            <Comment key={c.id}
                                user={c.user}
                                text={c.text}
                                createdAt={c.createdAt}
                            />
                        )
                    })
                )}

            </div>
        </div>

    )
}

export default Post;