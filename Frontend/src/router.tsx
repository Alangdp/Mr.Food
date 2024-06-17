import { createBrowserRouter } from 'react-router-dom'
import Home from './components/home/home'
import CompanyRegister from './components/company/register/register'
import CompanyLogin from './components/company/login/login'
import NavBar from './components/navigators/navbar'
import PrivateCompany from './components/router/PrivateCompany'
import MotionWrapper from './components/router/MotionWrapper'
import SideBar from './components/navigators/sidebar'
import { DashboardHomeRouter } from './components/companyDashboard/home'
import { OrderPageRoute } from './components/companyDashboard/orders/orderPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <NavBar />
        <MotionWrapper>
          <Home />
        </MotionWrapper>
      </>
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
    children: [
      {
        path: '',
        element: (
          <PrivateCompany>
            <DashboardHomeRouter />
          </PrivateCompany>
        ),
      },
      {
        path: 'home',
        element: (
          <PrivateCompany>
            <DashboardHomeRouter />
          </PrivateCompany>
        ),
      },
      {
        path: 'orders',
        element: (
          <PrivateCompany>
            <OrderPageRoute />
          </PrivateCompany>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])

export default router
