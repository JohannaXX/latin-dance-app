import React from 'react';
import './Contact.css';

const Contact = ({ id, avatar, name, city, country, bio, style, btnAction }) => {


    return (
        <div className="user-card align-center">
            <div className="row">
                <div className="col-md-3 col-sm-3 text-center">
                    <a className="align-center" href={"/user/" + id} >
                        <span className="w-80 avatar gd-primary m-auto">
                            <img src={ avatar } alt="."/>
                        </span>
                    </a>
                    <div className="mt-2">
                        <p className="text-muted">{ city }  |  { country }</p>
                    </div>
                </div>
                <div className="col-md-7 col-sm-7">
                    <a href={"/user/" + id} className="profile-link">
                        <h5>{ name }</h5>
                    </a>
                    <p className="text-muted">{ style }</p>
                    <p>{ bio }</p>
                </div>
                { !btnAction ? null : (
                    <div className="col-md-2 col-sm-2 text-center">
                        <button className="btn btn-primary m-auto"> { btnAction }</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Contact;