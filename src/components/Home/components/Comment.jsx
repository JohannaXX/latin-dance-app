import React from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';

const Comment = ({ id, user, text, createdAt }) => {
    return (

        <div className="media-block">
            <a className="media-left avatar mr-2" href={"/user/" + id}>
                <img className="w-48 img-circle img-sm" alt="..." src={user.avatar} />
            </a>
            <div className="media-body">
                <div className="mar-btm">
                    <a href={"/user/" + id} className="btn-link text-semibold media-heading box-inline">{ user.name }</a>
                    <p className="text-muted text-sm">{ timeUntilNow(createdAt) }</p>
                </div>
                <div>{ text }</div>

                <hr />
            </div>
        </div>
    )
}

export default Comment;