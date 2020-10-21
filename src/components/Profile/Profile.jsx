import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div classNameNameName="profile-container">

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
                                        <h4 className="mt-1 mr-3 d-inline">Manuella Tarly Schmitter</h4>
                                        <p className="small"> <i className="fa fa-map-marker mr-2"></i>Madrid | ES</p>
                                    </div>
                                   
                                    <a href="#" className="btn btn-dark btn-sm btn-block text-right">Edit profile</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light p-3 d-flex justify-content-end text-center w-100">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">241</h5><small className="text-muted"> <i className="fa fa-picture-o mr-1"></i>Photos</small>
                                </li>
                                <li className="list-inline-item">
                                    <h5 className="font-weight-bold mb-0 d-block">84</h5><small className="text-muted"> <i className="fa fa-pencil mr-1"></i>Posts</small>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 px-4">
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                            <div>
                                <span className="tag bg-secondary rounded text-white mr-1">#salsacubana</span>
                                <span className="tag bg-secondary rounded text-white mr-1">#bachata</span>
                            </div>
                        </div>

                        <div className="py-4 px-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="mb-0">Recent photos</h5><a href="#" className="btn btn-link text-muted">Show all</a>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-2 pr-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294928/nicole-honeywill-546848-unsplash_ymprvp.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
                                <div className="col-lg-6 mb-2 pl-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294927/dose-juice-1184444-unsplash_bmbutn.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
                                <div className="col-lg-6 pr-lg-1 mb-2"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294926/cody-davis-253925-unsplash_hsetv7.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
                                <div className="col-lg-6 pl-lg-1"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556294928/tim-foster-734470-unsplash_xqde00.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
                            </div>
                            <div className="py-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h5 className="mb-0">Recent photos</h5><a href="#" className="btn btn-link text-muted">Show all</a>
                                </div>
                                <div className="p-4 bg-light rounded shadow-sm">
                                    <p className="font-italic mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                    <ul className="list-inline small text-muted mt-3 mb-0">
                                        <li className="list-inline-item"><i className="fa fa-comment-o mr-2"></i>12 Comments</li>
                                        <li className="list-inline-item"><i className="fa fa-heart-o mr-2"></i>200 Likes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Profile;