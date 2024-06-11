import { createBrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import Home from './components/home/home'
import CompanyRegister from './components/company/register/register'
import { validateToken } from './utils/Getter'
import { useEffect } from 'react'
import { useToast } from './components/ui/use-toast'
import CompanyLogin from './components/company/login/login'
import { AnimatePresence, motion } from 'framer-motion'
import NavBar from './components/navigators/navbar'
import { useAuth } from './context/AuthContext'
import PrivateCompany from './components/router/PrivateCompany'
import MotionWrapper from './components/router/MotionWrapper'

interface ChildrenProps {
  children: JSX.Element
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateCompany>
        <>
          <NavBar />
          <MotionWrapper>
            <Home />
          </MotionWrapper>
        </>
      </PrivateCompany>
    ),
  },
  {
    path: '/company/register',
    element: (
      <>
        <NavBar />
        <MotionWrapper>
          <CompanyRegister />
        </MotionWrapper>
      </>
    ),
  },
  {
    path: '/company/login',
    element: (
      <>
        <NavBar />
        <MotionWrapper>
          <CompanyLogin />
        </MotionWrapper>
      </>
    ),
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])

export default router
