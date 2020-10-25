import React, { useState, useEffect, cleanup } from 'react';
import './Contacts.css';
import { getContacts } from '../../services/UserClient';
import Contact from './Contact';

const Contacts = () => {
    const [ contactRequests, setContactRequests ] = useState([])
    const [ contactMatches, setContactMatches ] = useState([])
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const allContacts = await getContacts();
                const userRequests = allContacts.users.sort( (a,b) => ( a.name > b.name ) ? 1 : -1 );;
                const userMatches = allContacts.matches.sort( (a,b) => ( a.users[0].name > b.users[0].name ) ? 1 : -1 );

                setContactRequests(userRequests);
                setContactMatches(userMatches);
            } catch(err) {
                setError(err.response?.data?.message);
            }
        }
        getAllPosts();

        return () =>  cleanup 
    }, [])

    if (contactRequests.length === 0 && contactMatches.length === 0) {
        return <div className="text-center">Loading...</div>
    } 

    if (error) {
        return error
    } 

    return (
        <div className="contacts-container">
            <div className="row">
                <div className="col-md-8 m-auto">

                    <div className="headind_srch">
                        <div className="recent_heading">
                            <h4>Contacts</h4>
                        </div>
                        <div className="srch_bar">
                            <div className="stylish-input-group">
                                <input type="text" className="search-bar"  placeholder="Search..."></input>
                                <span className="input-group-addon mr-0">
                                    <button className="" type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span> 
                            </div>
                        </div>
                    </div>

                    <div className="all-contacts ">

                        { contactRequests.map( c => {
                            return (
                                <Contact 
                                    id = { c.id }
                                    avatar = { c.avatar }
                                    name = { c.name }
                                    city = { c.city }
                                    country = { c.country }
                                    bio = { c.bio }
                                    style = { c.style }
                                    btnAction = 'Accept'
                                />
                            )
                        })}

                        <hr/>

                        { contactMatches.map( c => {
                            return (
                                <Contact 
                                    id = { c.users[0].id }
                                    avatar = { c.users[0].avatar }
                                    name = { c.users[0].name }
                                    city = { c.users[0].city }
                                    country = { c.users[0].country }
                                    bio = { c.users[0].bio }
                                    style = { c.users[0].style }
                                />
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;