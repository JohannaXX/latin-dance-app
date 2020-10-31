import React, { useState, useEffect, cleanup } from 'react';
import ProfileToEdit from './ProfileToEdit';
import { getUser } from '../../services/UserClient';
import { createPosts } from '../../services/PostClient';
import ProfilePost from './components/ProfilePost';
import PhotoGallery from './components/PhotoGallery';

const Profile = (props) => {
    const [ user, setUser ] = useState({});
    const [ showEditProfile, setShowEditProfile ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ postToPublish, setPostToPublish ] = useState("");
    const [ imageToPublish, setImageToPublish ] = useState(null);
    const [ reload, setReload ] = useState(false);
    const myId = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        getUser(props.match.params.id)
            .then( res => setUser(res))
            .catch(err => setError(err.response?.data?.message))

        return () =>  cleanup 
    }, [props.match.params.id, reload])

    const clickedEditProfile = () => {
        setShowEditProfile(true)
    }

    const handleUpdatedPerfil = (u) => {
        setUser( prev => {
            return {
                ...prev,
                avatar: u.avatar,
                bio: u.bio,
                city: u.city,
                country: u.country,
                name: u.name
            }
        })
        setShowEditProfile(false)
    }

    const clickedCancelEditProfile = () => {
        setShowEditProfile(false)
    }

    const handleWritePost = (e) => {
        e.preventDefault();
        setPostToPublish(e.target.value);
    }

    const handlePublishPost = (e) => {
        e.preventDefault();
        const formData = new FormData()
        const image = document.querySelector("#file");
        formData.append('image', image.files[0])
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

    if (!user.name) {
        return <div className="text-center">Loading...</div>
    } 

    if (error) {
        return error
    } 

    return (
        <div className="profile-container">

            <div className="row py-2 px-4">
                <div className="col-sm-8 mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden">

                        {
                            showEditProfile ? 

                                <ProfileToEdit 
                                    user ={ user } 
                                    deactivateView = { clickedCancelEditProfile }
                                    updatePerfil = { handleUpdatedPerfil }
                                />

                                :
                                <div>
                                    <div className="p-3 bg-dark">
                                        <div className="media  profile-header">
                                            
                                            <span className="profile-image avatar w-120 mr-2">
                                                <img 
                                                    className="" 
                                                    src={ user.avatar } 
                                                    alt="..."
                                                />
                                            </span>

                                            <div className="media-body mb-2 text-white profile-card-header ">
                                                <div>
                                                    <h4 
                                                        className="mt-1 mr-3 d-inline">
                                                        { user.name }
                                                    </h4>
                                                    <p className="small"> <i className="fa fa-map-marker mr-2"></i>{ user.city } | { user.country }</p>
                                                </div>

                                                { user.id === myId ? 
                                                    <button 
                                                        className="btn btn-sm text-white" 
                                                        onClick={ clickedEditProfile }>
                                                        <u>Edit profile</u>
                                                    </button>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-light p-3 d-flex justify-content-end text-center w-100">
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                <h5 className="font-weight-bold mb-0 d-block">{ user.gallery.length }</h5><small className="text-muted"> <i className="fa fa-picture-o mr-1"></i>Photos</small>
                                            </li>
                                            <li className="list-inline-item">
                                                <h5 className="font-weight-bold mb-0 d-block">{ user.posts.length }</h5><small className="text-muted"> <i className="fa fa-pencil mr-1"></i>Posts</small>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="pt-4 px-4">
                                    
                                        <p>{ user.bio }</p>
                                
                                        <div className="m-2">
                                        { user.style.map( dance => {
                                            return  (
                                                <span 
                                                    className="tag bg-secondary rounded text-white mr-1 p-2" 
                                                    key={dance}>
                                                    { dance }
                                                </span>
                                            )
                                        })}
                                        </div>
                                    </div>  
                                </div>

                        }

                        <div className="py-4 px-4" style={showEditProfile? {opacity: '0.3'} : null}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 
                                    className="mb-0">
                                    Recent photos
                                </h5>
                                <a 
                                    href="https://google.com" 
                                    className="btn btn-link text-muted">
                                    Show all
                                </a>
                            </div>

                            { !user.gallery ? null : <PhotoGallery images = { user.gallery } /> }
                            
                            <div className="py-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h5 className="mb-0">
                                        Recent posts
                                    </h5>
                                    <a 
                                        href="https://google.com" 
                                        className="btn btn-link text-muted">
                                        Show all
                                    </a>
                                </div>

                                { user.id === myId ? 
                                    <div className="py-2 px-4 mb-3 bg-light rounded shadow-sm">

                                        <textarea 
                                            className="form-control" 
                                            onChange={ handleWritePost } 
                                            value={ postToPublish } 
                                            rows="2" 
                                            placeholder="What are you thinking?"
                                        ></textarea>
                                        <div className=" clearfix">
                                            <input 
                                                name="file" 
                                                id="file" 
                                                type="file"
                                            ></input>
                                            <button 
                                                className="btn btn-sm btn-secondary pull-right" 
                                                onClick={ handlePublishPost } 
                                                type="button">
                                                Share
                                            </button>
                                        </div>
                                        
                                    </div>
                                    :
                                    null
                                }

                                { user.posts.map( p => {
                                    return (
                                        <ProfilePost 
                                            key = { p.id }
                                            id = { p.id }
                                            user = { p.user }
                                            body = { p.body }
                                            image = { p.image }
                                            createdAt = { p.createdAt }
                                            comments = { p.comments }
                                            likes = { p.likes.length }
                                            requestReload = { handleReload }
                                        />
                                    )
                                })}

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Profile;