import React from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';

const ProfilePostComments = ({ comment }) => {
    return (
        <div className="media-block">
            <a className="media-left avatar mr-2" href={"/user/" + comment.user.id}>
                <img className="w-48 img-circle img-sm" alt="..." src={comment.user.avatar} />
            </a>
            <div className="media-body">
                <div className="mar-btm">
                    <a href={"/user/" + comment.user.id} className="btn-link text-semibold media-heading box-inline">{ comment.user.name }</a>
                    <p className="text-muted text-sm">{ timeUntilNow(comment.createdAt) }</p>
                </div>
                <div>{ comment.text }</div>

                <hr />
            </div>
        </div>
    )
}

export default ProfilePostComments;


