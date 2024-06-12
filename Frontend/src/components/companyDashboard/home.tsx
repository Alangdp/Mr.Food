import { useState } from 'react'
import OrderItem from './itens/orderItem'

export default function DashboardHome() {
  const [selected, setSelected] = useState()

  return (
    <div className="w-4/5 h-[94vh] border-x drop-shadow mx-auto">
      <div className="p-4 flex flex-col gap-4">
        <h4 className="text-lg font-medium text-black">Dashboard</h4>

        <div className="flex flex-col gap-4">
          <h3>Últimos Pedidos</h3>
          <div className="flex items-center overflow-x-scroll no-scrollbar gap-2">
            <OrderItem customer='João' date='12/12/2021' id='1' items={[{ name: 'Coca', price: 5, quantity: 2 }, { name: 'Pepsi', price: 5, quantity: 2 },{ name: 'Coca', price: 5, quantity: 2 }, { name: 'Pepsi', price: 5, quantity: 2 },{ name: 'Coca', price: 5, quantity: 2 }, { name: 'Pepsi', price: 5, quantity: 2 },{ name: 'Coca', price: 5, quantity: 2 }, { name: 'Pepsi', price: 5, quantity: 2 }]} price={10} />
          </div>
        </div>

        {/* <h3>Pedidos Pendentes</h3>
        <div className="flex items-center overflow-x-scroll gap-2">

        </div> */}

      </div>
    </div>
  )
}
