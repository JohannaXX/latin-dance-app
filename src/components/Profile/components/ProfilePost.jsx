import React, { useState }  from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';
import { handleLikes } from '../../../services/PostClient';
import ProfilePostComments from './ProfilePostComments';

const ProfilePost = ({ id, user, body, image, createdAt, comments, likes }) => {
    const [ showComments, setShowComments ] = useState(false);
    const [ allLikes, setAllLikes ] = useState(likes);
    
    const toggleShowComments = () => {
        setShowComments(!showComments);
    }

    const handleLike = () => {
        handleLikes(id)
            .then( res => setAllLikes( prev => prev + res.likes) )
    }

    return (
        <div className="py-2 px-4 mb-3 bg-light rounded shadow-sm">
            <p className="small text-muted text-right">{ timeUntilNow(createdAt) }</p>
            <p className="font-italic mb-0">{ body }</p>
            <ul className="list-inline small text-muted mt-3 mb-0">
                <li className="list-inline-item" onClick={ handleLike } ><i className="fa fa-heart-o mr-2"></i>{ allLikes } Likes &nbsp;| </li>
                <li onClick={toggleShowComments} className="list-inline-item"><i className="fa fa-comment-o mr-2"></i>{ comments.length} Comments</li>
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