import { OrderProps } from '@/types/Order.type';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { ColumnDef, Row } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useAuth } from '@/context/AuthContext';
import { setStatus } from '@/utils/Getter';
import { useToast } from '@/components/ui/use-toast';

export default function OrderColumns() {
  const { companyToken } = useAuth();
  const { toast } = useToast();

  async function changeStatusAndToast(
    row: Row<OrderProps>,
    token: string,
    statusCode: number,
  ) {
    const status = await setStatus(token, row.getValue('id'), statusCode);
    if (!status) {
      toast({
        title: 'Erro ao atualizar o status do pedido',
      });
      return;
    } else {
      toast({
        title: 'Erro ao atualizar o status do pedido',
      });
    }
  }

  const columns: ColumnDef<OrderProps>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Cliente',
      accessorKey: 'clientId',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Total',
      accessorKey: 'total',
      cell: ({ row }) => {
        const items = row.original.items;
        const total = items.reduce(
          (acc, item) => acc + item.productTotalPrice * item.quantity,
          0,
        );
        return <p className="text-green-600 font-bold">${total.toFixed(2)}</p>;
      },
    },
    {
      header: 'Itens',
      accessorKey: 'itens',
      cell: ({ row }) => {
        return (
          <div className="h-24 overflow-hidden grid grid-cols-3 gap-2">
            {row.original.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-2 bg-transparent shadow-df border rounded mt-0"
                >
                  <span className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{item.productName}</p>
                    <p className="text-sm text-green-600 font-bold">
                      R${item.productTotalPrice}
                    </p>
                  </span>

                  {Object.keys(item.extras).map((extraKey, index) => {
                    const extra = item.extras[extraKey];

                    return (
                      <span className="flex items-center gap-2">
                        {extra.map(extraOption => {
                          return (
                            <p>
                              {extraKey} - {extraOption.extraName} -{' '}
                              {extraOption.price}R$
                            </p>
                          );
                        })}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      header: 'Observação',
      accessorKey: 'observation',
    },
    {
      header: 'Criado em',
      accessorKey: 'createdAt',
      cell: ({ row }) => dayjs().to(row.original.createdAt),
    },
    {
      header: 'Atualizado em',
      accessorKey: 'updatedAt',
      cell: ({ row }) => dayjs().to(row.original.updatedAt),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HamburgerMenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DropdownMenuItem>Alterar Status</DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="flex items-center py-2 bg-transparent"
                    onClick={async () => {
                      await changeStatusAndToast(row, companyToken!, 1);
                    }}
                  >
                    Pendente
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center py-2 bg-transparent"
                    onClick={async () => {
                      await changeStatusAndToast(row, companyToken!, 2);
                    }}
                  >
                    Em preparo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center py-2 bg-transparent"
                    onClick={async () => {
                      await changeStatusAndToast(row, companyToken!, 3);
                    }}
                  >
                    Finalizado
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenuItem
                className="flex items-center py-2 bg-transparent"
                onClick={async () => {
                  await changeStatusAndToast(row, companyToken!, 5);
                }}
              >
                Cancelar
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center py-2 bg-transparent">
                Ver mais
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}
