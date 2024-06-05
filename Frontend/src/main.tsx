import React from 'react'
import ReactDOM from 'react-dom/client'

import 'typeface-roboto'
import './index.css'
import { Button } from './components/ui/button'
import { IconJarLogoIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Input } from './components/ui/input'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm drop-shadow dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <a href="#" className="flex items-center">
            <IconJarLogoIcon className="h-8 w-8 text-red-600" />
            <p className="sr-only">My Food</p>
          </a>
          <nav className="hidden md:flex gap-4">
            <a
              href="#"
              className="font-light flex items-center transition-colors hover:underline"
            >
              Home
            </a>
            <a
              href="#"
              className="font-light flex items-center transition-colors hover:underline"
            >
              About
            </a>
            <a
              href="#"
              className="font-light flex items-center transition-colors hover:underline"
            >
              Services
            </a>
            <a
              href="#"
              className="font-light flex items-center transition-colors hover:underline"
            >
              Contact
            </a>
          </nav>
          <Input Icon={MagnifyingGlassIcon} className='w-1/3' placeholder='Busque por item ou loja'/>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Criar Conta
            </Button>
            <Button variant={'destructive'} className='bg-red-600' size="sm">Entrar</Button>
          </div>
        </div>
      </div>
    </nav>
  </React.StrictMode>,
)
