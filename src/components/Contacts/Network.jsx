import React, { useState, useEffect, cleanup } from 'react';
import './Network.css';
import { getNetwork } from '../../services/UserClient';
import { requestCreateMatch } from '../../services/UserClient';
import Contact from './Contact';

const Network = () => {
    const [ showContacts, setShowContacts] = useState(false)
    const [ data, setData ] = useState([]);
    const [ search, setSearch ] = useState("");
    const [ network, setNetwork ] = useState([]);
    const [ match, setMatch ] = useState({});
    const [ error, setError ] = useState(null);


    useEffect(() => {
        getNetwork()
            .then( users => {
                console.log(users);
                setData(users.orderedUsers) 
                setNetwork(users.orderedUsers)
                setShowContacts(true)
            })
            .catch(err => setError(err.response?.data?.message) )

        return () =>  cleanup 
    }, [match])

    useEffect(() => {
        const result = data.filter( e => {
            const toSearch = new RegExp(search, "i")
            return toSearch.test(e.name)
        })
        setNetwork(result)
        return () => cleanup
    }, [search, data])


    const requestMatch = ( e, id ) => {
        e.preventDefault();

        requestCreateMatch(id)
            .then( res =>  setMatch(res) )
            .catch(err => setError(err.response?.data?.message))
        
        return () =>  cleanup
    }

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
        <div className="network-container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    
                    <div className="headind_srch">
                        <div className="recent_heading">
                            <h4>Network</h4>
                        </div>
                        <div className="srch_bar">
                            <div className="stylish-input-group">
                                <input onChange={handleSearch} value={search} type="text" className="search-bar"  placeholder="Search..."></input>
                                <span className="input-group-addon">
                                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span> 
                            </div>
                        </div>
                    </div>

                    <div className="all-contacts ">

                        { network.map( c => {
                            return (
                                <Contact key={ c.id }
                                    id = { c.id }
                                    avatar = { c.avatar }
                                    name = { c.name }
                                    city = { c.city }
                                    country = { c.country }
                                    bio = { c.bio }
                                    style = { c.style }
                                    btnText = 'Add'
                                    btnAction = { (e) => requestMatch(e, c.id) }
                                />
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Network;