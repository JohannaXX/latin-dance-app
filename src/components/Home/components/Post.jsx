import React from 'react';
import Comment from './Comment';

const Post = ({id, user, body, image, likes, comments, createdAt, updatedAt}) => {
    
    return (
        <div className="media-block">

            <a className="media-left avatar mr-2" href={"/user/" + id}>
                <img className="w-48 img-circle img-sm" alt="..." src={ user.avatar } />
            </a>

            <div className="media-body">
                <div className="mar-btm">
                    <a href={"/user/" + id} className="btn-link text-semibold media-heading box-inline">{ user.name }</a>
                    <p className="text-muted text-sm">{ createdAt }</p>
                </div>

                <div>{ body }</div>
                {/* <div>{ !image ? null : <img src={image} alt="..."/> }</div> */}

                <div className="mt-1">
                    <a href="http://google.com" className="btn btn-sm btn-default btn-hover-primary p-0"><i className="fa fa-heart-o text-secondary"></i> { likes.length }</a>
                    <a className="btn btn-sm btn-default btn-hover-primary ml-2" href="https://google.com"><u>{comments.length} Comments</u></a>
                </div>
                
                <hr />

                { comments.map( c => {
                    return (
                        <Comment 
                            id = { c.id }
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