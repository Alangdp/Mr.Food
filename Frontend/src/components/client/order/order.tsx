import { useDefaultImports } from '@/components/utilities/DefaultImports';
import { OrderProps } from '@/types/Order.type';
import { Extra } from '@/types/OrderItem.type';
import { makeGet } from '@/utils/Getter';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Order() {
  const [order, setOrder] = useState<OrderProps | null>(null);

  const { auth } = useDefaultImports();
  const { orderId } = useParams();

  const fetchOrder = async () => {
    const orderByClient = await makeGet<OrderProps>(
      `orders/client/${orderId}`,
      {
        authToken: auth.clientToken,
      },
    );
    setOrder(orderByClient);
  };

  useEffect(() => {
    if (!order) {
      fetchOrder();
    }
  }, []);

  if (!order) return <p>Carregando pedido...</p>;

  return (
    <div className="w-[1000px] h-screen mx-auto p-4 border border-gray-200 shadow-md">
      <span className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-600 duration-200">
        <CaretLeftIcon width={24} height={24} />
        <p>Voltar</p>
      </span>

      <div className="mt-4 space-y-2 text-gray-800">
        <h2 className="text-lg font-semibold text-gray-700">
          Detalhes do Pedido
        </h2>
        <div className="text-sm">
          <p>
            <strong>Nº do Pedido:</strong> {order.orderSlug}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Data do Pedido:</strong>{' '}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> R$ {order.total}
          </p>
          <p>
            <strong>Observação:</strong> {order.observation || 'N/A'}
          </p>
        </div>

        <h3 className="text-md font-semibold text-gray-600 mt-4">Itens</h3>
        <div className="bg-gray-50 p-2 rounded-md border">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm border-b py-1 last:border-b-0 flex-col"
            >
              <div className="flex items-center">
                <span>
                  {item.productName} (x{item.quantity})
                </span>
                <span>R$ {item.productTotalPrice}</span>
              </div>
              <span key={index * Math.random()}>
                {Object.keys(item.extras).map((key: keyof Extra) => {
                  console.log(item.extras[key]);

                  return (
                    <p className="pl-10" key={key}>
                      {item.extras[key].map(itemInternal => {
                        return (
                          <ul>
                            {Object.keys(item.extras).map(key => (
                              <li key={key}>
                                {key} - {itemInternal.extraName} - R$
                                {Number(itemInternal.price).toLocaleString(
                                  'pt-BR',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                              </li>
                            ))}
                          </ul>
                        );
                      })}
                    </p>
                  );
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t pt-4 text-sm text-gray-600">
        <p>
          <strong>Endereço de Entrega:</strong>
        </p>
        <p>R. Guido Gehm, 12 - Canudos - Novo Hamburgo, RS</p>
      </div>
    </div>
  );
}

export function OrderPageClient() {
  return <Order />;
}
