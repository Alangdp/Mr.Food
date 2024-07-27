import { makeGet } from '@/utils/Getter';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { MdOutlineAttachMoney } from 'react-icons/md';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { CaretDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { FaMotorcycle } from 'react-icons/fa6';
import Footer from '../footer/footer';

export default function Product() {
  // const { productId, companyId } = useParams();

  const fetchProductCompany = async () => {
    // const data = await makeGet(`/produc`)
  };

  return (
    <div className="overflow-x-hidden">
      <motion.div
        key={location.pathname}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-3/4 h-[94vh] drop-shadow mx-auto p-4 flex flex-col gap-4"
      >
        <div className="w-full h-44 bg-gray-400 rounded-lg"></div>
        <div className="flex flex-col p-2">
          <div className="flex p-2 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-700"></div>
              <h3 className="text-2xl font-medium text-secondary">
                Nome Da Empresa
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-[#fcbb00] text-base">4.9/5</p>
                <img
                  src="/StarYellow.svg"
                  alt="Evaluation Star"
                  className="w-4 h-auto"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-red-600 cursor-pointer ">Ver mais</div>

              <Separator
                orientation="vertical"
                className="h-5 w-[0.5px] bg-black opacity-20"
              />
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gray-500 rounded-full">
                  <MdOutlineAttachMoney
                    size={20}
                    color="#fff"
                    className="text-white"
                  />
                </div>
                <h3 className="text-sm text-secondary opacity-60">
                  Pedido mínimo R$ 30,00
                </h3>
              </div>
            </div>
          </div>

          <div className="flex p-2 items-center justify-between gap-4">
            <Input
              placeholder="Buscar no Cardápio"
              className="shadow-df flex-[0.8] h-[54px]"
              Icon={MagnifyingGlassIcon}
              iconClassName="text-red-600"
            />

            <DropdownMenu>
              <DropdownMenuTrigger className="flex-[0.1]">
                <Button className="bg-slate-700 text-white flex gap-2 bg-transparent shadow-df h-[54px] hover:bg-transparent">
                  <FaMotorcycle
                    size={20}
                    className="text-gray-500 opacity-60"
                  />
                  <p className="text-secondary">Entrega</p>
                  <CaretDownIcon className="w-6 h-6 text-red-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-col flex-[0.1] shadow-df rounded-lg justify-center p-1">
              <p className="text-secondary">Hoje</p>
              <div className="flex items-center gap-2">
                <p className="text-secondary font-medium text-sm opacity-60">
                  34-44 min
                </p>
                <Separator
                  orientation="vertical"
                  className="h-5 w-[0.5px] bg-black opacity-20"
                />
                <p className="text-green-500 text-sm opacity-80">R$ 5,00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full p-4">
            <div className="Category flex flex-col gap-4">
              <h3 className="text-2xl font-medium ">Destaques</h3>
              <div className="flex gap-2">
                <div className="w-1/4 h-full rounded-lg shadow-df cursor-pointer border hover:border-gray-400 duration-300 ">
                  <div className="rounded-t-lg image w-auto h-44 bg-cover bg-center bg-no-repeat bg-[url('https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg')]"></div>
                  <div className="flex flex-col p-2">
                    <h4 className="text-lg font-medium">Nome do produto</h4>
                    <p className="text-secondary text-ellipsis h-12 text-sm line-clamp-2 overflow-hidden pt-2 break-all">
                      Descrição do produto Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. Praesentium delectus labore
                      error culpa odit enim consectetur, provident ea debitis
                      vero.
                    </p>
                    <span className="flex items-center gap-2 pt-10">
                      <p className="text-green-600 font-medium">R$ 29,99</p>
                      <p className="text-secondary opacity-70 line-through">
                        R$ 39,99
                      </p>
                    </span>
                  </div>
                </div>

                <div className="w-1/4 h-full rounded-lg shadow-df cursor-pointer border hover:border-gray-400 duration-300 ">
                  <div className="rounded-t-lg image w-auto h-44 bg-cover bg-center bg-no-repeat bg-[url('https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg')]"></div>
                  <div className="flex flex-col p-2">
                    <h4 className="text-lg font-medium">Nome do produto</h4>
                    <p className="text-secondary text-ellipsis h-12 text-sm line-clamp-2 overflow-hidden pt-2 break-all">
                      Descrição do produto Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. Praesentium delectus labore
                      error culpa odit enim consectetur, provident ea debitis
                      vero.
                    </p>
                    <span className="flex items-center gap-2 pt-10">
                      <p className="text-green-600 font-medium">R$ 29,99</p>
                      <p className="text-secondary opacity-70 line-through">
                        R$ 39,99
                      </p>
                    </span>
                  </div>
                </div>

                <div className="w-1/4 h-full rounded-lg shadow-df cursor-pointer border hover:border-gray-400 duration-300 ">
                  <div className="rounded-t-lg image w-auto h-44 bg-cover bg-center bg-no-repeat bg-[url('https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg')]"></div>
                  <div className="flex flex-col p-2">
                    <h4 className="text-lg font-medium">Nome do produto</h4>
                    <p className="text-secondary text-ellipsis h-12 text-sm line-clamp-2 overflow-hidden pt-2 break-all">
                      Descrição do produto Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. Praesentium delectus labore
                      error culpa odit enim consectetur, provident ea debitis
                      vero.
                    </p>
                    <span className="flex items-center gap-2 pt-10">
                      <p className="text-green-600 font-medium">R$ 29,99</p>
                      <p className="text-secondary opacity-70 line-through">
                        R$ 39,99
                      </p>
                    </span>
                  </div>
                </div>

                <div className="w-1/4 h-full rounded-lg shadow-df cursor-pointer border hover:border-gray-400 duration-300 ">
                  <div className="rounded-t-lg image w-auto h-44 bg-cover bg-center bg-no-repeat bg-[url('https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg')]"></div>
                  <div className="flex flex-col p-2">
                    <h4 className="text-lg font-medium">Nome do produto</h4>
                    <p className="text-secondary text-ellipsis h-12 text-sm line-clamp-2 overflow-hidden pt-2 break-all">
                      Descrição do produto Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. Praesentium delectus labore
                      error culpa odit enim consectetur, provident ea debitis
                      vero.
                    </p>
                    <span className="flex items-center gap-2 pt-10">
                      <p className="text-green-600 font-medium">R$ 29,99</p>
                      <p className="text-secondary opacity-70 line-through">
                        R$ 39,99
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="py-8 w-screen h-18 bg-[#d4d4d4] shadow"></div>
      <motion.div
        key={location.pathname}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-3/4 drop-shadow mx-auto p-4 flex flex-col gap-4"
      >
        <div className="flex flex-col w-full p-4 mt-10">
          <div className="Category flex flex-col gap-4">
            <h3 className="text-2xl font-medium ">Nome Categoria</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex border hover:border-gray-400 duration-300 rounded-md cursor-pointer shadow-df">
                <div className="flex-[0.7] h-40 border-gray-200 p-4">
                  <h3 className="text-lg Pp">Frango no Pote Pp</h3>
                  <p className="text-ellipsis h-12 text-sm line-clamp-2 overflow-hidden pt-2 break-all">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore ea perferendis, voluptatibus esse nisi deleniti
                    temporibus magnam tenetur asperiores maxime!
                  </p>
                  <div className="flex items-center gap-2 pt-10">
                    <p className="text-green-600 font-li">R$ 29,99</p>
                    <p className="text-secondary opacity-70 line-through">
                      R$ 39,99
                    </p>
                  </div>
                </div>
                <div className="flex-[0.3] h-full bg-transparent rounded-r-md"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
