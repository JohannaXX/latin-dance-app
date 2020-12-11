import { useEffect } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { queryParamsGoogle } from '../../helpers/helper'
import { loginWithGoogle } from '../../services/UserClient'

const SocialAuthGoogle = (user) => {
    const { login } = useAuthContext()

    login(user)
    /* useEffect(() => {
        const { code } = queryParamsGoogle()
        console.log(code)
        loginWithGoogle(code)
            .then(user => {
                login(user)
            })
    }, [login]) */

    return null
}

export default SocialAuthGoogle;