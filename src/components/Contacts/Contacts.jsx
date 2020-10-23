import React, { useState, useEffect, cleanup } from 'react';
import './Contact.css';
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
                    <div className="all-contacts ">

                        { contactRequests.map( c => {
                            return (
                                <Contact 
                                    id = { c.id }
                                    avatar = { c.avatar }
                                    name = { c.name }
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