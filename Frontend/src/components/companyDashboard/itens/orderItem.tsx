interface OrderItemProps {
  id: string;
  price: number;
  date: string;
  customer: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

export default function OrderItem(props: OrderItemProps) {
  return (
    <div className="card w-64 min-w-64 rounded bg-white/95 shadow drop-shadow flex flex-col p-2 gap-2 divide-y">
      <div className="flex flex-col gap-4">
        <div className="flex w-full itesm-center gap-2 justify-around">
          <div className="flex flex-col">
            <a className=" text-secondary font-medium cursor-pointer">
              Pedido #{props.id}
            </a>
            <span className="text-sm text-gray-500">{props.date}</span>
          </div>
          <div className="flex flex-col px-4">
            <span className="">{props.customer}</span>
            <span className="text-sm text-green-500 font-medium">
              R$ {props.price}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full px-5 max-h-[50px] overflow-y-scroll no-scrollbar">
          {props.items.map((item, index) => (
            <span key={index} className="text-sm">
              {item.quantity}x {item.name} - R$ {item.price}
            </span>
          ))}
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2">
        <div className="flex items-center justify-around">
          <p>Qtd. de itens {props.items.length}</p>
          <button className="btn bg-red-500 opacity-80 text-white border-red-600 border w-10 h-10 rounded">
            X
          </button>
          <button className="btn bg-green-500 text-white opacity-80 w-10 h-10 p-1 rounded border border-green-600">
            V
          </button>
        </div>
      </div>
    </div>
  );
}
