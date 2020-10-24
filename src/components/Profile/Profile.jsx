import React, { useState, useEffect, cleanup } from 'react';
import { getUser } from '../../services/UserClient';
import './Profile.css';
import ProfilePost from './components/ProfilePost';

const Profile = (props) => {
    const [ user, setUser ] = useState({})
    const [ error, setError ] = useState(null)
    const me = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        
        const getThisUser = async () => {
            try {
                const profile = await getUser(props.match.params.id)
                console.log(profile)
                setUser(profile);
            } catch(err) {
                setError(err.response?.data?.message);
            }
        }
        getThisUser();

        return () =>  cleanup 
    }, [])

    if (!user.name) {
        return <div className="text-center">Loading...</div>
    } 

    if (error) {
        return error
    } 

    return (
        <div className="profile-container">

            <div className="row py-5 px-4">
                <div className="col-sm-8 mx-auto">


                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="p-3 bg-dark">
                            <div className="media  profile-header">
                                
                                <span className="profile-image avatar w-120 mr-2">
                                    <img className="" src="https://d19m59y37dris4.cloudfront.net/university/1-1-1/img/teacher-4.jpg" alt="..."/>
                                </span>
                                <div className="media-body mb-2 text-white profile-card-header ">
                                    <div>
                                        <h4 className="mt-1 mr-3 d-inline">{ user.name }</h4>
                                        <p className="small"> <i className="fa fa-map-marker mr-2"></i>Madrid | ES</p>
                                    </div>
                                    { user.id !== me.id ? null : (
                                        <a href="https://google.com" className="btn btn-dark btn-sm btn-block text-right">Edit profile</a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-light p-3 d-flex justify-content-end text-center w-100">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">241</h5><small className="text-muted"> <i className="fa fa-picture-o mr-1"></i>Photos</small>
                                </li>
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">{ user.posts.length }</h5><small className="text-muted"> <i className="fa fa-pencil mr-1"></i>Posts</small>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 px-4">
                            <p>{ user.bio }</p>
                            <div>
                                <span className="tag bg-secondary rounded text-white mr-1">{ user.style }</span>
                            </div>
                        </div>

                        <div className="py-4 px-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="mb-0">Recent photos</h5><a href="https://google.com" className="btn btn-link text-muted">Show all</a>
                            </div>
                            {/* <div className="row">
                                <div className="col-lg-6 mb-2 pr-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294928/nicole-honeywill-546848-unsplash_ymprvp.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
                                <div className="col-lg-6 mb-2 pl-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294927/dose-juice-1184444-unsplash_bmbutn.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
                                <div className="col-lg-6 pr-lg-1 mb-2"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294926/cody-davis-253925-unsplash_hsetv7.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
                                <div className="col-lg-6 pl-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294928/tim-foster-734470-unsplash_xqde00.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
                            </div> */}
                            <div className="py-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h5 className="mb-0">Recent posts</h5><a href="https://google.com" className="btn btn-link text-muted">Show all</a>
                                </div>
                                
                                { user.posts.map( p => {
                                return (
                                    <ProfilePost 
                                        id = { p.id }
                                        user = { p.user }
                                        body = { p.body }
                                        image = { p.image }
                                        createdAt = { p.createdAt }
                                        comments = { p.comments }
                                        likes = { p.likes }
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