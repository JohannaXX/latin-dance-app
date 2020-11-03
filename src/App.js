import React from 'react';
import { /* Route, */ Switch } from 'react-router-dom';
import AuthenticatedRoute, { NotAuthenticatedRoute } from './components/AuthenticatedRoute/AuthenticatedRoute';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Activation from './components/Signup/Activation';
import SetUserFromSocialLogin from './components/Login/SetUserFromSocialLogin';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import Profile from './components/Profile/Profile';
import Contacts from './components/Contacts/Contacts';
import Network from './components/Contacts/Network';
import ChatList from './components/Chats/ChatList';
import Chat from './components/Chats/Chat';

import './App.css';

function App() {
    return (
        <div className="app-container">
            <Navbar />

            <Switch>
                <AuthenticatedRoute exact path="/chat/:id" component={ Chat } />
                <AuthenticatedRoute exact path="/chats" component={ ChatList } />
                <AuthenticatedRoute exact path="/logout" component={ Logout } />
                <AuthenticatedRoute exact path="/network" component={ Network } />
                <AuthenticatedRoute exact path="/contacts" component={ Contacts } />
                <AuthenticatedRoute exact path="/user/:id" component={ Profile } />
                
                <NotAuthenticatedRoute exact path="/setuser/:id" 
                    render={(props) => <SetUserFromSocialLogin {...props} /> }
                />
                <NotAuthenticatedRoute exact path="/login" 
                    render={(props) => <Login {...props} message={''} /> }
                />
                <NotAuthenticatedRoute exact path="/activation/:token" component={ Activation } />
                <NotAuthenticatedRoute exact path="/signup" component={ Signup } />
                <AuthenticatedRoute exact path="/" component={Home} />
            </Switch>

        </div>
    );
}

export default App;
