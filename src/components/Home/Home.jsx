import React, { useState, useEffect, cleanup } from 'react';
import Post from './components/Post';
import { getPosts } from '../../services/PostClient';
import { createPosts } from '../../services/PostClient';
import './Home.css';

const Home = () => {
    const [ showPosts, setShowPosts] = useState(false);
    const [ data, setData ] = useState([]);
    const [ search, setSearch ] = useState("");
    const [ posts, setPosts ] = useState([]);
    const [ postToPublish, setPostToPublish ] = useState("");
    const [ reload, setReload ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        getPosts()
            .then( posts => {
                setData(posts);
                setPosts(posts);
                setShowPosts(true);
            })
            .catch(err => setError(err.response?.data?.message))

        return () =>  cleanup 
    }, [reload])

    useEffect(() => {
        const result = data.filter( e => {
            const toSearch = new RegExp(search, "i")
            return toSearch.test(e.body)
        })
        setPosts(result);
        return () => cleanup
    }, [search, data])

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleWritePost = (e) => {
        e.preventDefault();
        setPostToPublish(e.target.value);
    }

    const handlePublishPost = (e) => {
        e.preventDefault();
        const formData = new FormData()
        const image = document.querySelector("#file");

        if (image) {
            formData.append('image', image.files[0])
        }

        formData.append('body', postToPublish)

        if (!postToPublish) {
            setError('Text is missing')
        }
 
        createPosts( formData)
            .then( () => {
                setPostToPublish("")
                setReload(true)
            })
            .catch(err => setError(err.response?.data?.message))
    }

    const handleReload = () => {
        setReload(!reload)
    }

    if (!showPosts) {
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

                            <textarea 
                                className="form-control" 
                                onChange={ handleWritePost } 
                                value={ postToPublish } 
                                rows="2" 
                                placeholder="What are you thinking?">
                            </textarea>
                            <div className=" clearfix">
                                <input 
                                    name="file" 
                                    id="file" 
                                    type="file">
                                </input>
                                <button 
                                    className="btn btn-sm btn-primary pull-right" 
                                    onClick={ handlePublishPost } 
                                    type="button">
                                    <i className="fa fa-pencil fa-fw" ></i> Share
                                </button>
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
                                    <input 
                                        className="search-bar"  
                                        onChange={ handleSearch } 
                                        value={ search } 
                                        type="text" 
                                        placeholder="Search...">
                                    </input>
                                    <span className="input-group-addon">
                                    <button 
                                        type="button"> 
                                        <i className="fa fa-search" aria-hidden="true"></i> 
                                    </button>
                                    </span> 
                                </div>
                            </div>
                         
                        </div>
                    </div>


                    <div className="panel">
                        <div className="panel-body">
                            { posts.map(p => {
                                return (
                                    <Post key = { p.id }
                                        id = { p.id }
                                        user = { p.user }
                                        body = { p.body }
                                        photo = { p.image }
                                        likes = { p.likes.length }
                                        comments = { p.comments }
                                        createdAt = { p.createdAt }
                                        updatedAt = { p.updatedAt }
                                        requestReload = { handleReload }
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