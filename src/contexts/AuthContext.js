import React, { useState, createContext, useCallback, useContext } from 'react';

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = useCallback(user => {
    console.log('login called')
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.setItem('user', null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}