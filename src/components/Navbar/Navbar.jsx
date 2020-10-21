import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Latin Dance App</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signup">Signup</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/user/:id">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contacts">Contacts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/network">Network</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/post/:id">PostDetail</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/chats">ChatList</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/chat/:id">Chat</a>
                    </li>
                    
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;