import { motion } from 'framer-motion'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { GiCookingPot } from 'react-icons/gi'
import { CiBeerMugFull } from 'react-icons/ci'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { BasicModalProps } from '@/types/BasicModal.type'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ItemAdminModal({ toggleModal }: BasicModalProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  console.log(searchParams.get('type'))

  const location = useLocation()

  return (
    <>
      <Tabs defaultValue="0" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="0">Account</TabsTrigger>
          <TabsTrigger value="1">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="0"></TabsContent>
        <TabsContent value="1">Change your password here.</TabsContent>
      </Tabs>

      <motion.div
        key={location.pathname}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-[40vw] h-screen absolute right-0 top-0 bg-white z-50 p-4"
      >
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-2xl">Registar Item</h3>
            <Cross1Icon
              onClick={toggleModal}
              className="w-5 h-auto text-red-600 cursor-pointer"
            />
          </div>
          <p className="text-secondary text-lg">
            Selecione o tipo de item que você deseja adicionar ao seu cardápio.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div
            className="w-[90%] border rounded-lg border-gray-200 p-4 flex items-center gap-4 cursor-pointer hover:opacity-70 duration-300"
            onClick={() =>
              navigate('/company/dashboard/products?type=prepared')
            }
          >
            <GiCookingPot className="text-red-600 w-9 h-auto" />
            <div className="flex flex-col justify-center">
              <h4 className="text-xl font-bold">Preparado</h4>
              <p className="text-secondary text-lg">
                Itens Produzidos pela sua loja, como pizzas e bolos.
              </p>
            </div>
          </div>

          <div
            className="w-[90%] border rounded-lg border-gray-200 p-4 flex items-center gap-4 relative cursor-pointer hover:opacity-70 duration-300"
            onClick={() => navigate('/company/dashboard/products?type=')}
          >
            <CiBeerMugFull className="text-red-600 w-9 h-auto" />
            <div className="flex flex-col justify-center">
              <h4 className="text-xl font-bold">Bebida Industrializada</h4>
              <p className="text-secondary text-lg">
                Bebidas como: Refrigerantes, Cervejas, energéticos entre outros.
              </p>
              <p className="text-sm text-secondary brightness-125">
                Adicione bebidas industrializadas e participe de campanhas de
                marketing.
              </p>
            </div>
            <div className="absolute top-2 right-2 text-yellow-400 px-3 border border-yellow-300 rounded-xl">
              Em Teste
            </div>
          </div>

          <div className="w-[90%] border rounded-lg border-gray-200 p-4 flex items-center gap-4 relative ">
            <div className="absolute top-0 w-full bg-blue-500/90 h-2 rounded-full left-1/2 -translate-x-1/2"></div>
            <div className="absolute top-1 w-full bg-white h-2 rounded-full left-1/2 -translate-x-1/2"></div>

            <IoAlertCircleOutline className="text-blue-300 w-12 h-auto" />
            <div className="flex flex-col justify-center">
              <p className="text-blue-400 text-lg">
                Lembre-se que itens como cigarro, drogas, armas e contéudo de
                propaganda política são proibidos. Para ler as regras completas,
                <p className="font-medium cursor-pointer">clique aqui.</p>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
