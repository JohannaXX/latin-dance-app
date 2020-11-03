import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../services/UserClient';


const SetUserFromSocialLogin = (props) => {
    const [ userSet, setUserSet ] = useState(false);
    const id = props.match.params.id;
    const authContext = useAuthContext();

    getUser(id)
        .then(u => {
            authContext.login(u);
            setUserSet(true);
    })

    if ( userSet ) {
        return <Redirect to="/" />
    }
    return <div>One moment, you will be forwarded soon...</div>
}

export default SetUserFromSocialLogin;