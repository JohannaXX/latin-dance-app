import React from 'react';
import { timeUntilNow } from '../../../helpers/dates.helper';
import Comment from './Comment';
import './Post.css';

const Post = ({ user, body, image, likes, comments, createdAt, updatedAt}) => {
    
    return (
        <div className="media-block">

            <a className="media-left avatar mr-2" href={"/user/" + user.id}>
                <img className="w-48 img-circle img-sm" alt="..." src={ user.avatar } />
            </a>

            <div className="media-body">
                <div>
                    <a href={"/user/" + user.id} className="btn-link text-semibold media-heading box-inline">{ user.name }</a>
                    <p className="text-muted text-sm">{ timeUntilNow(createdAt) }</p>
                </div>

                <div>{ body }</div>
                
                { !image ? null : (
                   <div className="py-2 m-auto w-photo-home">
                       <img className="w-photo-home" src={ image } alt=".."/>
                   </div>
                ) }

                <div className="mt-1">
                    <a href="http://google.com" className="btn btn-sm btn-default btn-hover-primary p-0">
                        <i className="fa fa-heart-o"></i> &nbsp;{ likes.length } Likes &nbsp;| 
                    </a>
                    <a className="btn btn-sm btn-default btn-hover-primary ml-2" href="https://google.com">
                        <i className="fa fa-comment-o mr-1"></i>{ comments.length} Comments
                    </a>
                </div>
                
                <hr />

                { comments.map( c => {
                    return (
                        <Comment key = { c.id }
                            user = { c.user }
                            text = { c.text }
                            createdAt = { c.createdAt }
                        />
                    )
                })}
               
            </div>
        </div>

    )
}

export default Post;