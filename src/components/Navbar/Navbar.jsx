import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { windowDimensions } from '../../helpers/window.size.helper';
import './Navbar.css';


const Navbar = ( ) => {
    const authContext = useAuthContext();
    const { user } = authContext;
    const { windowWidth } = windowDimensions();

    return (
        <div className="navbar-container" id="static-navbar">
            <nav className="navbar navbar-light bg-light" >

                { !user && 
                    <ul className="navbar-nav">
                        <li className="nav-item m-1">
                            <a className="navbar-brand" href="/">Latin Dance App</a>
                        </li>
                    </ul>
                }

                { user && ( windowWidth <= 600 ) &&
                    <div className="w-100">
                        <ul className="navbar-nav d-flex flex-row w-100 m-0 p-0">
                            <li className="nav-item">
                                <a className="navbar-brand" href="/">Latin Dance App</a>
                            </li>
                            <div className="d-flex w-100 justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link" href="/logout"><i className="fa fa-sign-out"></i> Logout</a>
                                </li>
                            </div>
                        </ul>
                        
                        <ul className="navbar-nav d-flex flex-row w-100 justify-content-around m-0 p-0">

                            <li className="nav-item text-center">
                                <i className="fa fa-user"></i>
                                <a className="nav-link tiny-text p-0" href={"/user/" + user.id}>My&nbsp;profile</a>
                            </li>

                            <li className="nav-item text-center">
                                <i className="fa fa-users"></i>
                                <a className="nav-link tiny-text p-0" href="/contacts">Contacts</a>
                            </li>
                            <li className="nav-item text-center">
                                <i className="fa fa-user-plus"></i>
                                <a className="nav-link tiny-text p-0" href="/network">Network</a>
                            </li>
                            <li className="nav-item text-center">
                                <i className="fa fa-comment"></i>
                                <a className="nav-link tiny-text p-0" href="/chats">Chats</a>
                            </li>

                        </ul>
                    </div>
                }   
                
                { user && ( windowWidth > 600 ) &&
                    <ul className="navbar-nav d-flex flex-row w-100 m-0">
                        <li className="nav-item m-1">
                            <a className="navbar-brand" href="/">Latin Dance App</a>
                        </li>

                        <li className="nav-item m-2">
                            <a className="nav-link" href={"/user/" + user.id}>My&nbsp;profile</a>
                        </li>

                        <li className="nav-item m-2">
                            <a className="nav-link" href="/contacts">Contacts</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link" href="/network">Network</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link" href="/chats">Chats</a>
                        </li>


                        <div className="d-flex w-100 justify-content-end">
                            <li className="nav-item m-2">
                                <a className="nav-link" href="/logout">Logout</a>
                            </li>
                        </div>
                    </ul>
                }
           
            </nav>
        </div>
    );
}

export default Navbar;