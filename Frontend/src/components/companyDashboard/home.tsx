import { useState } from 'react'
import OrderItem from './itens/orderItem'
import NavBar from '../navigators/navbar';
import SideBar from '../navigators/sidebar';
import MotionWrapper from '../router/MotionWrapper';
import PrivateCompany from '../router/PrivateCompany';

export default function DashboardHome() {
  const [selected, setSelected] = useState()

  return (
    <div className="w-4/5 h-[94vh] border-x drop-shadow mx-auto">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {/* <h3>Últimos Pedidos</h3>
          <div className="flex items-center overflow-x-scroll no-scrollbar gap-2">
            <OrderItem
              customer="João"
              date="12/12/2021"
              id="1"
              items={[
                { name: 'Coca', price: 5, quantity: 2 },
                { name: 'Pepsi', price: 5, quantity: 2 },
                { name: 'Coca', price: 5, quantity: 2 },
                { name: 'Pepsi', price: 5, quantity: 2 },
              ]}
              price={10}
            />
          </div> */}

          <div className="flex flex-col gap-2 shadow-df p-4">
            <span className="flex items-center gap-1">
              <h3 className="font-medium text-xl">Acompanhamento</h3>
              <p className="text-sm">tempo real</p>
            </span>
            <div className="cards flex items-center relative gap-4 h-[92px]">
              <div className="item shadow-df drop-shadow w-80 flex flex-col gap-2 p-2 py-4 relative">
                <div className="grid grid-cols-2 gap-2 gap-x-6s">
                  <h4 className="text-center">Pedidos de hoje</h4>
                  <h4 className="text-center">Ticket médio hoje</h4>
                  <div className="flex items-end gap-2">
                    <p className="text-xl font-bold">12</p>
                    <h4 className="text-sm font-light">Pedidos</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xl font-semibold">
                    R$ 40,00
                  </div>
                </div>
                <div className="absolute w-[100%] h-2 rounded-b bg-red-600 -bottom-1 right-0"></div>
              </div>

              <div className="divide h-[92px] w-[0.5px] bg-gray-200 ">
                <a href=""></a>
              </div>

              <div className="p-2 px-5 shadow-df h-[92px]">
                <p className="text-secondary/80">Pedidos do mês passado </p>
                <div className="flex items-center gap-2 text-secondary/80">
                  <p className="text-lg">120</p>
                  <h4 className="text-sm font-light">Pedidos</h4>
                </div>
                <p className="text-secondary/80">R$ 6000,00</p>
              </div>

              <div className="divide h-[92px] w-[0.5px] bg-gray-200 ">
                <a href=""></a>
              </div>

              <div className="p-2 px-5 shadow-df h-[92px]">
                <p className="text-secondary/80 text-center">
                  Ticket médio do mês passado{' '}
                </p>
                <p className="text-secondary/80">R$ 6000,00</p>
              </div>

              <div className="divide h-[92px] w-[0.5px] bg-gray-200 ">
                <a href=""></a>
              </div>

              <div className="p-2 px-5 w-52 shadow-df h-[92px]">
                <p className="text-secondary/80">Avaliações</p>
                <p className="text-secondary/80">12</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 shadow-df p-4 divide-y">
            <span className="flex items-center gap-4">
              <h3 className="font-medium text-xl">Performance</h3>
              <div className="flex flex-col gap-2 divide-y">
                <div className="flex items-center gap-2 p-2 border rounded-3xl text-secondary/90">
                  <div className="w-6 h-6 rounded-full bg-orange-500"></div>
                  <p>Ultima atualização em 13/06/2024</p>
                </div>
              </div>
            </span>

            <div className="pt-4">
              <span className="flex items-end gap-1">
                <h3 className="font-bold text-xl">Desempenho</h3>
                <p className="text-sm">2 dia(s) atrás</p>
              </span>

              <div className="flex items-center justify gap-16 h-28 pt-4">
                <div className="flex flex-col gap-2 h-full">
                  <h4 className="text-sm text-secondary">Vendas</h4>
                  <span>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-medium">R$ 10</p>
                      <p className="text-sm text-green-700">+ 20%</p>
                    </div>
                    <p>R$ 12000</p>
                  </span>
                </div>

                <div className="flex flex-col gap-2 h-full">
                  <h4 className="text-sm text-secondary">Clientes novos</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-medium">12</p>
                    <p className="text-sm text-green-700">+ 20%</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 h-full">
                  <h4 className="text-sm text-secondary">Item mais vendido</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-medium">Coca Cola</p>
                    <p className="text-sm text-green-700">+ 20%</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 w-full pt-4 bord p-2 divide-x">
                <div className="col-span-1">
                  <span className="flex items-end gap-1">
                    <h3 className="font-bold text-xl">Vendas</h3>
                    <p className="text-sm">Últimos 14 dias</p>
                  </span>
                  <div className="flex items-center gap-16 h-28 pt-4">
                    <div className="flex flex-col gap-2 h-full">
                      <h4 className="text-sm text-secondary">
                        Total de Pedidos
                      </h4>
                      <div className="flex items-center gap-2 py-6">
                        <p className="text-2xl font-bold">10</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 h-full">
                      <h4 className="text-sm text-secondary">
                        Média das avaliações
                      </h4>
                      <div className="flex items-center gap-2  py-6">
                        <p className="text-2xl font-medium">12</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-2 col-span-2">
                  <span className="flex items-end gap-1">
                    <h3 className="font-bold text-xl">Operação</h3>
                    <p className="text-sm">Últimos 7 dias</p>
                  </span>
                  <div className="flex items-center gap-16 pt-4">
                    {/* TEMPO ONLINE / CANCELAMENTOS / ATRASOS - TUDO EM PORCENTAGEM */}
                    <div className="flex flex-col gap-2 h-full">
                      <h4 className="text-sm text-secondary">Tempo Online</h4>
                      <div className="flex items-center gap-2 py-6">
                        <p className="text-2xl font-bold">10%</p>
                      </div>
                      <div className="text-sm font-light">
                        As melhores lojas ficam <strong className='font-medium text-black'>acima de 75%</strong>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 h-full">
                      <h4 className="text-sm text-secondary">Cancelamentos</h4>
                      <div className="flex items-center gap-2 py-6">
                        <p className="text-2xl font-medium">12%</p>
                      </div>
                      <div className="text-sm font-light">
                        As melhores lojas ficam <strong className='font-medium text-black'>abaixo de 1.8%</strong>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 h-full">
                      <h4 className="text-sm text-secondary">Atrasos</h4>
                      <div className="flex items-center gap-2 py-6">
                        <p className="text-2xl font-medium">12%</p>
                      </div>
                      <div className="text-sm font-light">
                        As melhores lojas ficam <strong className='font-medium text-black'>abaixo de 10%</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <h3>Pedidos Pendentes</h3>
        <div className="flex items-center overflow-x-scroll gap-2">

        </div> */}
      </div>
    </div>
  )
}

export function DashboardHomeRouter() {
  return (
    <PrivateCompany>
      <div>
        <NavBar />
        <SideBar />
        <MotionWrapper>
          <DashboardHome />
        </MotionWrapper>
      </div>
    </PrivateCompany>
  );
}
