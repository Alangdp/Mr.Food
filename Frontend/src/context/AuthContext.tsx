import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext<{
  companyToken: string | null
  setCompanyToken: (token: string) => void
  updateCompanyToken: (token: string) => void
  logoutCompany: () => void

  clientToken: string | null
  setClientToken: (token: string) => void
  logoutClient: () => void
}>({
  companyToken: null,
  setCompanyToken: () => {},
  logoutCompany: () => {},
  updateCompanyToken: () => {},

  clientToken: null,
  setClientToken: () => {},
  logoutClient: () => {},
})

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [companyToken, setCompanyToken] = useState<string | null>(
    localStorage.getItem('companyToken'),
  )
  const [clientToken, setClientToken] = useState<string | null>(
    localStorage.getItem('clientToken'),
  )

  const updateCompanyToken = (token: string) => {
    localStorage.setItem('companyToken', token)
    setCompanyToken(token)
  }

  const logoutCompany = () => {
    updateCompanyToken('')
  }

  const updateClientToken = (token: string) => {
    localStorage.setItem('clientToken', token)
  }

  const logoutClient = () => {
    setClientToken(null)
    localStorage.setItem('clientToken', '')
  }

  return (
    <AuthContext.Provider
      value={{
        clientToken,
        companyToken,
        logoutClient,
        logoutCompany,
        setClientToken,
        setCompanyToken,
        updateCompanyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
