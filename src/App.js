import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute, { NotAuthenticatedRoute } from './components/AuthenticatedRoute/AuthenticatedRoute';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Contacts from './components/Contacts/Contacts';
import Network from './components/Contacts/Network';
import PostDetail from './components/PostDetail/PostDetail';
import ChatList from './components/Chats/ChatList';
import Chat from './components/Chats/Chat';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />

        <Switch>
          
          <NotAuthenticatedRoute  exact path="/chat/:id" component={Chat}/>
          <NotAuthenticatedRoute  exact path="/chats" component={ChatList}/>
          <NotAuthenticatedRoute  exact path="/post/:id" component={PostDetail}/>
          <NotAuthenticatedRoute  exact path="/network" component={Network}/>
          <NotAuthenticatedRoute  exact path="/contacts" component={Contacts}/>
          <NotAuthenticatedRoute  exact path="/user/:id" component={Profile}/>
          <NotAuthenticatedRoute  exact path="/login" component={Login}/>
          <NotAuthenticatedRoute  exact path="/signup" component={Signup}/>
          <NotAuthenticatedRoute exact path="/" component={Home}/>
        </Switch>

    </div>
  );
}

export default App;
