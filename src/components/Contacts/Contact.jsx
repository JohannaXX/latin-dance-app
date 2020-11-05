import React from 'react';
import { windowDimensions } from '../../helpers/window.size.helper';
import './Contact.css';

const Contact = ({ id, avatar, name, city, country, bio, style, btnText, btnAction, denyRequest }) => {
    const { windowWidth } = windowDimensions();
    console.log( windowWidth )
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
                    <a href={"/user/" + id} className={`profile-link ${(windowWidth <= 600) ? "text-center" : ""}`}>
                        <h5 className="text-secondary">{ name }</h5>
                    </a>
                    <p className={`text-muted ${(windowWidth <= 600) ? "text-center" : ""}`}>
                        { style.map( s => {
                            return <span className="mr-2">{ s }</span>
                        })}
                    </p>
                    <p>{ bio }</p>
                </div>

                { btnAction &&
                    <div className="col-md-2 col-sm-2 text-center">
                        <button 
                            className="btn btn-sm btn-secondary mx-2 px-3 mb-2" 
                            onClick={ btnAction }
                            >
                            { btnText }
                        </button>
                        {( btnText === 'Accept' ) &&
                            <button 
                                className="btn btn-sm btn-secondary mx-2 px-3 mb-2"
                                onClick={ denyRequest } 
                                >
                                Deny
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Contact;