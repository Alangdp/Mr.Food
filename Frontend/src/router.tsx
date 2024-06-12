import { createBrowserRouter } from 'react-router-dom'
import Home from './components/home/home'
import CompanyRegister from './components/company/register/register'
import CompanyLogin from './components/company/login/login'
import NavBar from './components/navigators/navbar'
import PrivateCompany from './components/router/PrivateCompany'
import MotionWrapper from './components/router/MotionWrapper'
import SideBar from './components/navigators/sidebar'
import DashboardHome from './components/companyDashboard/home'

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
    path: '/company/dashboard',
    element: (
      <PrivateCompany>
        <div>
          <NavBar />
          <SideBar />
          <MotionWrapper>
            <DashboardHome />
          </MotionWrapper>
        </div>
      </PrivateCompany>
    )
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])

export default router
