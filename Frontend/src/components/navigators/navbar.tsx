import { IconJarLogoIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useDefaultImports } from '../utilities/DefaultImports';
import { IoCartOutline } from 'react-icons/io5';

export default function NavBar() {
  const { navigate, auth, cart } = useDefaultImports();

  return (
    <nav className="top-0 h-[6vh] bg-white shadow-sm border-b drop-shadow dark:bg-gray-950/90 z-10">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <a href="/" className="flex items-center gap-2">
            <IconJarLogoIcon className="h-8 w-8 text-red-600" />
            <p className="hidden md:block">Mr. Food</p>
          </a>
          <nav className="hidden sm:flex gap-4">
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
              Restaurantes
            </a>
            <a
              href="#"
              className="font-light flex items-center transition-colors hover:underline"
            >
              Categorias
            </a>
          </nav>
          <Input
            Icon={MagnifyingGlassIcon}
            className="w-1/3 hidden md:flex shadow drop-shadow-lg"
            placeholder="Busque por item ou loja"
          />

          <div className="flex items-center gap-4">
            {auth.companyToken || auth.clientToken ? null : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/company/register')}
                >
                  Criar Conta
                </Button>
                <Button
                  variant={'destructive'}
                  className="bg-red-600"
                  size="sm"
                  onClick={() => navigate('/company/login')}
                >
                  Entrar
                </Button>
              </>
            )}
            {auth.companyToken && (
              <Button
                variant={'destructive'}
                className="bg-red-600"
                size="sm"
                onClick={() => navigate('/company/dashboard')}
              >
                Dashboard
              </Button>
            )}
            {auth.clientToken && (
              <Button
                variant={'destructive'}
                className="bg-red-600"
                size="sm"
                onClick={() => navigate('/client/dashboard')}
              >
                Conta
              </Button>
            )}

            {auth.clientToken && (
              <Button
                variant={'destructive'}
                className="hover:bg-red-500 bg-red-600 relative"
                size="sm"
                onClick={() => navigate('/client/cart')}
              >
                <span className="w-full">
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center text-secondary font-light">
                    {cart.cart.products.length}
                  </div>
                  <IoCartOutline className="h-5 w-5" />
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
