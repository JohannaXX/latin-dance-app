import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { activateUser } from '../../services/UserClient';
import { useAuthContext } from '../../contexts/AuthContext';

const Activation = (props) => {
    const [ forwardToLogin, setForwardToLogin ] = useState(false);
    const token = props.match.params.token;
    const authContext = useAuthContext()

    activateUser(token)
        .then( () => {  
            setForwardToLogin(true)
        })
        .catch(err => console.log(err))

    if (forwardToLogin) {
        return <Redirect to="/login"/>
    }
    return (
        <div className="Login-container">

            <div className="row py-2 px-4">
                <div className="col-sm-8 mx-auto">
                    <div className="bg-light shadow rounded overflow-hidden">

                        <div className="media p-3 bg-dark">
                            <div className="media-body mb-1 text-white text-center">
                                <h4>
                                    Activation
                                </h4>
                            </div>
                        </div>
                        <div className="row media">
                            <div className="col-12 media-body">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-9 col-sm-10 py-2 mb-3 rounded">
                                    
                                        
                                        <div id="social-login-area" className="text-center mt-3">
                                            <div id="social-login-btns">
                                                <a className="btn btn-secondary m-2" href="/auth/google"><i class="fa fa-google"></i> Log in with Google</a>
                                            </div>
                                        </div>
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

export default Activation;