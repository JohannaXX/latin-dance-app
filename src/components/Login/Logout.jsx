import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/UserClient';

const Logout = () => {
    const [ userLoggedOut, setUserLoggedOut ] = useState(false)

    const handleLogout = () => {

        logout()
            .then(() => {
                localStorage.setItem('user', null)
                setUserLoggedOut(true)
            })
            .catch(error => console.log(error))
    }

    const handelBack = () => {
        return window.history.back()
    }

    if ( userLoggedOut ) {
        return <Redirect to="/login" />
    }

    return (
        <div className="logout-container text-center">
            <h3 className="m-3">Are you sure you want to log out?</h3>
            <div className="d-flex justify-content-center">
                <button 
                    className="btn btn-sm btn-secondary m-2 px-4" 
                    onClick={ handleLogout }
                    >
                    Yes
                </button>
                <button 
                    className="btn btn-sm btn-secondary m-2 px-4"
                    onClick={ handelBack }
                    >
                    No
                </button>
            </div>
        </div>
    )
}

export default Logout;