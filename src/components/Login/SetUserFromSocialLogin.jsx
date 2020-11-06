import React, { useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { queryParams } from '../helpers/helpers';
import { loginWithSlack } from '../../services/UserClient';


const SetUserFromSocialLogin = (props) => {
    const { login } = useAuthContext()

    useEffect(() => {
        const { code } = queryParams

        loginWithSlack(code)
            .then(user => {
                login(user)
            })
    }, [login])

    return null
}

export default SetUserFromSocialLogin;