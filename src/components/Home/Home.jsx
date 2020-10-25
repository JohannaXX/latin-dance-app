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
                <div className="col-sm-8 shadow mx-auto bootstrap snippets post-feed mt-2">
                    <div className="panel m-0">
                        <div className="panel-body p-3">
                            <textarea className="form-control" rows="2" placeholder="What are you thinking?"></textarea>
                            <div className=" clearfix">
                                <button className="btn btn-sm btn-primary pull-right" type="submit">
                                    <i className="fa fa-pencil fa-fw"></i> Share
                                </button>
                                <a className="btn btn-trans btn-icon fa fa-video-camera add-tooltip" href="https://google.com"> </a>
                                <a className="btn btn-trans btn-icon fa fa-camera add-tooltip" href="https://google.com"> </a>
                            </div>
                        </div>
                    </div>

                    <div className="panel bg-light">
                        <div className="panel-body pt-3 pb-5">
                            <div className="recent_heading">
                                <h4>Home</h4>
                            </div>
                            <div className="srch_bar">
                                <div className="stylish-input-group">
                                    <input type="text" className="search-bar"  placeholder="Search..."></input>
                                    <span className="input-group-addon">
                                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                    </span> 
                                </div>
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

                          

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;