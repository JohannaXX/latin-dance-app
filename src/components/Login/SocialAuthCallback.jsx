import { useEffect } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { queryParams } from '../../helpers/helper'
import { socialLogin } from '../../services/UserClient'

const SocialAuthCallback = () => {
  const { login } = useAuthContext()

  useEffect(() => {
    const { code } = queryParams()

    socialLogin(code)
      .then(user => {
        login(user)
      })
  }, [login])

  return null
}

export default SocialAuthCallback;