import React from 'react';
import './Contact.css';

const Contact = ({ id, avatar, name, city, country, bio, style, btnText, btnAction, denyRequest }) => {

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
                    <p className="text-muted">
                        { style.map( s => {
                            return <span className="mr-2">{ s }</span>
                        })}
                    </p>
                    <p>{ bio }</p>
                </div>
                
                { btnAction &&
                    <div className="col-md-2 col-sm-2 text-center">
                        <form onSubmit={ btnAction }>
                            <button type="submit" className="btn btn-sm btn-secondary m-auto">{ btnText }</button>
                        </form>
                        {( btnText === 'Accept' ) &&
                            <form onSubmit={ denyRequest }>
                                <button type="submit" className="btn btn-sm btn-secondary mx-auto mt-3 ">Deny</button>
                            </form>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Contact;