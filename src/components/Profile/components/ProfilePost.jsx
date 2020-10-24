import React from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';

const ProfilePost = ({ id, user, body, image, createdAt, comments, likes }) => {

    return (
        <div className="py-2 px-4 mb-3 bg-light rounded shadow-sm">
            <p className="small text-muted text-right">{ timeUntilNow(createdAt) }</p>
            <p className="font-italic mb-0">{ body }</p>
            <ul className="list-inline small text-muted mt-3 mb-0">
                <li className="list-inline-item"><i className="fa fa-heart-o mr-2"></i>{ likes.length } Likes &nbsp;| </li>
                <li className="list-inline-item"><i className="fa fa-comment-o mr-2"></i>{ comments.length} Comments</li>
            </ul>
            
        </div>
    )
}

export default ProfilePost;