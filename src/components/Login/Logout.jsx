import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/UserClient';
import Popup from '../Popup/Popup';

const Logout = () => {
    const [ userLoggedOut, setUserLoggedOut ] = useState(false);
    const [ openPopup, setOpenPopup ] = useState(true);
    /* const [ returnToHome, setReturnToHome ] = useState(false); */

    const handleLogout = () => {
        logout()
            .then(() => {
                localStorage.setItem('user', null)
                setUserLoggedOut(true)
            })
            .catch(error => console.log(error))
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
        /* setReturnToHome(true); */
        window.history.back();
    }

    if ( userLoggedOut || returnToHome ) {
        return <Redirect to="/login" />
    }

    return (
        <div className="logout-container text-center">
            <h4 className="m-3"></h4>
            <Popup 
                open = { openPopup } 
                closePop = { handleClosePopup }
                handleYesAnswer = { handleLogout }
                > 
                Are you sure you want to log out?
            </Popup>
        </div>
    )
}

export default Logout;