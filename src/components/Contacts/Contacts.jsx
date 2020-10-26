import React, { useState, useEffect, cleanup } from 'react';
import './Contacts.css';
import { getContacts } from '../../services/UserClient';
import { updateMatch } from '../../services/UserClient';
import Contact from './Contact';

const Contacts = () => {
    const [ showContacts, setShowContacts] = useState(false)
    const [ data, setData ] = useState([]);
    const [ search, setSearch ] = useState("");
    const [ contacts, setContacts ] = useState([]);
    const [ updatedContact, setUpdatedContact ] = useState({});
    const [ error, setError ] = useState(null);

    useEffect(() => {
        getContacts()
            .then( res => {
                setData(res)
                setContacts(res)
                setShowContacts(true)
            })
            .catch(err => setError(err.response?.data?.message))

        return () =>  cleanup 
    }, [updatedContact])

    const updateMatchStatus = (e, id, newStatus) => {
        e.preventDefault();

        updateMatch(id, newStatus)
            .then( res => setUpdatedContact(res))
            .catch(err => setError(err.response?.data?.message))
    }

    useEffect(() => {
        const result = data.filter( e => {
            const toSearch = new RegExp(search, "i")
            return toSearch.test(e.user.name)
        })
        setContacts(result)
        return () => cleanup
    }, [search, data])

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    if (!showContacts) {
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
                                <input onChange={handleSearch} value={search} type="text" className="search-bar"  placeholder="Search..."></input>
                                <span className="input-group-addon mr-0">
                                    <button className="" type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span> 
                            </div>
                        </div>
                    </div>

                    <div className="all-contacts ">

                        { contacts.map( c => {
                            return (
                                <Contact key={ c.user.id }
                                    id = { c.user.id }
                                    avatar = { c.user.avatar }
                                    name = { c.user.name }
                                    city = { c.user.city }
                                    country = { c.user.country }
                                    bio = { c.user.bio }
                                    style = { c.user.style }
                                    btnText = 'Accept'
                                    btnAction = { c.showAcceptBtn ? (e) => updateMatchStatus(e, c.match, 'accepted' ) : null }
                                    denyRequest = { (e) => updateMatchStatus(e, c.match, 'denied' ) }
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