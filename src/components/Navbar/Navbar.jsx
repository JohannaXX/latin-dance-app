import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const Navbar = ( ) => {
    const authContext = useAuthContext();
    const { user } = authContext;

    return (
        <div className="navbar-container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Latin Dance App</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        { user && 
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-row">
                                    <li className="nav-item">
                                        <a className="nav-link" href={"/user/" + user.id}>My profile</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href="/contacts">Contacts</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/network">Network</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/chats">Chats</a>
                                    </li>
                                </div>

                                <div>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/logout">Logout</a>
                                    </li>
                                </div>
                            </div>
                        }
                        
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;