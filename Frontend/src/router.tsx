import { createBrowserRouter } from 'react-router-dom';
import Home from './components/home/home';
import CompanyRegister from './components/company/register/register';
import CompanyLogin from './components/company/login/login';
import PrivateCompany from './components/router/PrivateCompany';
import MotionWrapper from './components/router/MotionWrapper';
import { DashboardHomeRouter } from './components/companyDashboard/home';
import { OrderPageRoute } from './components/companyDashboard/orders/orderPage';
import { ProductsAdminPageRoute } from './components/products/products';
import Product from './components/product/companyProductPage';
import NotFound from './components/utilities/Error404';
import NavBarCompany from './components/navigators/navbar.company';
import NavBarClient from './components/navigators/navbar.client';

const router = createBrowserRouter([
  {
    path: '/company/',
    children: [
      {
        path: '',
        element: (
          <>
            <NavBarCompany />
            <MotionWrapper>
              <div className="w-full flex items-center justify-center h-20">
                <h2 className="text-2xl font-medium text-secondary">
                  EM DESENVOLVIMENTO
                </h2>
              </div>
            </MotionWrapper>
          </>
        ),
      },
      {
        path: 'dashboard',
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
      {
        path: 'products',
        element: (
          <PrivateCompany>
            <ProductsAdminPageRoute />
          </PrivateCompany>
        ),
      },
      {
        path: 'register',
        element: (
          <>
            <NavBarCompany />
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
            <NavBarCompany />
            <MotionWrapper>
              <CompanyLogin />
            </MotionWrapper>
          </>
        ),
      },
    ],
  },

  // Divisão de rotas

  {
    path: '/',
    element: (
      <>
        <NavBarClient />
        <MotionWrapper>
          <Home />
        </MotionWrapper>
      </>
    ),
  },
  {
    path: '/products/:companyId',
    element: (
      <>
        <MotionWrapper classname="overflow-hidden">
          <Product />
        </MotionWrapper>
      </>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
