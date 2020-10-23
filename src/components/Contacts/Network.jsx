import React, { useState, useEffect, cleanup } from 'react';
import './Contact.css';
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
                    <div className="all-contacts ">

                        { network.map( c => {
                            return (
                                <Contact 
                                    id = { c.id }
                                    avatar = { c.user.avatar }
                                    name = { c.user.name }
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