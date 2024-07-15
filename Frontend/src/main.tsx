import ReactDOM from 'react-dom/client'

import 'typeface-roboto'
import './index.css'

import router from './router'

import { RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import AuthProvider from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Toaster />
    <RouterProvider router={router} />
  </AuthProvider>,
)
