import React, { useState, useEffect, cleanup } from 'react';
import './Network.css';
import { getNetwork } from '../../services/UserClient';
import Contact from './Contact';

const Network = () => {
    const [ network, setNetwork ] = useState([])
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const getEntireNetwork = async () => {
            try {
                const allNetwork = await getNetwork()
                setNetwork(allNetwork);
            } catch(err) {
                setError(err.response?.data?.message);
            }
        }
        getEntireNetwork();

        return () =>  cleanup 
    }, [])

    if (network.length === 0) {
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
                                <input type="text" className="search-bar"  placeholder="Search..."></input>
                                <span className="input-group-addon">
                                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span> 
                            </div>
                        </div>
                    </div>

                    <div className="all-contacts ">

                        { network.map( c => {
                            return (
                                <Contact 
                                    id = { c.id }
                                    avatar = { c.user.avatar }
                                    name = { c.user.name }
                                    city = { c.user.city }
                                    country = { c.user.country }
                                    bio = { c.user.bio }
                                    style = { c.user.style }
                                    btnAction = 'Add'
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