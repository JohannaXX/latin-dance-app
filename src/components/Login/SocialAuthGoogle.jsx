import { useEffect } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { queryParamsGoogle } from '../../helpers/helper'
import { loginWithGoogle } from '../../services/UserClient'

const SocialAuthGoogle = () => {
  const { login } = useAuthContext()

  useEffect(() => {
    const { code } = queryParamsGoogle()

    loginWithGoogle(code)
      .then(user => {
        login(user)
      })
  }, [login])

  return null
}

export default SocialAuthGoogle;