import ReactDOM from 'react-dom/client';

import 'typeface-roboto';
import './index.css';

import router from './router';

import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <AuthProvider>
      <CartProvider>
        <Toaster />
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
    ,
  </>,
);
