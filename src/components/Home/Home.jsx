import React, { useState, useEffect, cleanup } from 'react';
import Post from './components/Post';
import { getPosts } from '../../services/PostClient';
import './Home.css';

const Home = () => {
    const [ posts, setPosts ] = useState([])
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const postList = await getPosts()
                /* console.log(postList[0]) */
                setPosts(postList);
            } catch(err) {
                setError(err.response?.data?.message);
            }
        }
        getAllPosts();

        return () =>  cleanup 
    }, [])

    if (posts.length === 0) {
        return <div className="text-center">Loading...</div>
    } 

    if (error) {
        return error
    } 

    return (
        <div className="home-container bootdey">


            <div className="row ">
                <div className="col-sm-8 shadow mx-auto bootstrap snippets post-feed mt-5">
                    <div className="panel">
                        <div className="panel-body">
                            <textarea className="form-control" rows="2" placeholder="What are you thinking?"></textarea>
                            <div className="mar-top clearfix">
                                <button className="btn btn-sm btn-primary pull-right" type="submit">
                                    <i className="fa fa-pencil fa-fw"></i> Share
                            </button>
                                <a className="btn btn-trans btn-icon fa fa-video-camera add-tooltip" href="https://google.com"> </a>
                                <a className="btn btn-trans btn-icon fa fa-camera add-tooltip" href="https://google.com"> </a>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-body">
                            { posts.map(p => {
                                return (
                                    <Post 
                                        user = { p.user }
                                        body = { p.body }
                                        image = { p.image }
                                        likes = { p.likes }
                                        comments = { p.comments }
                                        createdAt = { p.createdAt }
                                        updatedAt = { p.updatedAt }
                                    />    
                                ) 
                            })}
                        
                            {/* <div className="media-block">

                                <a className="media-left avatar mr-2" href="https://google.com">
                                    <img className="w-48 img-circle img-sm" alt="..." src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                                </a>

                                <div className="media-body">
                                    <div className="mar-btm">
                                        <a href="https://google.com" className="btn-link text-semibold media-heading box-inline">Lisa D.</a>
                                        <p className="text-muted text-sm">11:07 - Today </p>
                                    </div>
                                    <div>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</div>
                                    <div className="mt-1">
                                        <a href="http://google.com" className="btn btn-sm btn-default btn-hover-primary p-0"><i className="fa fa-heart-o text-secondary"></i> 250 Likes</a>
                                        <a className="btn btn-sm btn-default btn-hover-primary ml-2" href="https://google.com"><u>Comments</u></a>
                                    </div>
                                    <hr />


                                    <div>
                                        <div className="media-block">
                                            <a className="media-left avatar mr-2" href="https://google.com"><img className="w-48 img-circle img-sm" alt="..." src="https://bootdey.com/img/Content/avatar/avatar2.png" /></a>
                                            <div className="media-body">
                                                <div className="mar-btm">
                                                    <a href="https://google.com" className="btn-link text-semibold media-heading box-inline">Bobby Marz</a>
                                                    <p className="text-muted text-sm">7 min ago</p>
                                                </div>
                                                <div>Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</div>

                                                <hr />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div> */}


                            <div className="media-block pad-all">
                                <a className="media-left" href="https://google.com"><img className="img-circle img-sm" alt="...e" src="https://bootdey.com/img/Content/avatar/avatar1.png" /></a>
                                <div className="media-body">
                                    <div className="mar-btm">
                                        <a href="https://google.com" className="btn-link text-semibold media-heading box-inline">John Doe</a>
                                        <p className="text-muted text-sm"><i className="fa fa-mobile fa-lg"></i> - From Mobile - 11 min ago</p>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                    <img className="img-responsive thumbnail" src="https://via.placeholder.com/400x300" alt="..." />
                                    <div className="pad-ver">
                                        <span className="tag tag-sm"><i className="fa fa-heart text-danger"></i> 250 Likes</span>
                                        <div className="btn-group">
                                            <a className="btn btn-sm btn-default btn-hover-success" href="https://google.com"><i className="fa fa-thumbs-up"></i></a>
                                            <a className="btn btn-sm btn-default btn-hover-danger" href="https://google.com"><i className="fa fa-thumbs-down"></i></a>
                                        </div>
                                        <a className="btn btn-sm btn-default btn-hover-primary" href="https://google.com">Comment</a>
                                    </div>
                                    <hr />


                                    <div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;