import NavBarClient from '@/components/navigators/navbar.client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useDefaultImports } from '@/components/utilities/DefaultImports';
import { makePost } from '@/utils/Getter';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { ToastAction } from '@radix-ui/react-toast';

export default function CartClient() {
  const { cart, toast } = useDefaultImports();

  return (
    <span className="overflow-hidden">
      <NavBarClient />
      <div className="w-4/5 h-[94vh] border-x drop-shadow mx-auto overflow-hidden relative p-4 flex gap-4 flex-col">
        <div className="flex-col ">
          <h2 className="text-2xl font-medium">Carinho de Compras</h2>
        </div>

        <div className="flex w-full  h-full">
          <div className="w-3/4 shadow-df border border-gray-200 p-2 h-full rounded overflow-y-scroll flex flex-col gap-4">
            {cart.cart.products.map((item, index) => {
              console.log(item);
              return (
                <div
                  className="card flex items-center p-2 border border-gray-200 rounded gap-4"
                  key={`${item.id}-${index}`}
                >
                  {item.selectedProduct.images.length > 0 && (
                    <img
                      src={`http://localhost:3000/${item.selectedProduct.images[0]}`}
                      alt=""
                      className="w-32 h-28 rounded"
                    />
                  )}
                  <div className="flex flex-col justify-center items-start gap-2 w-60">
                    <p className="text-secondary text-ellipsis h-7 line-clamp-2 overflow-hidden pt-2 break-all">
                      {item.name}
                    </p>
                    <p className="text-secondary text-ellipsis h-7 line-clamp-2 overflow-hidden pt-2 break-all flex items-center gap-1">
                      <p>
                        <p>R$</p>
                      </p>
                      {Number(item.selectedProduct.price).toLocaleString(
                        'pt-br',
                        {
                          minimumFractionDigits: 2,
                        },
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x  max-w-sm border rounded-md w-1/5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-l-md text-red-600 hover:text-red-500 hover:bg-transparent"
                      onClick={() => {
                        if (item.quantity === 1) {
                          toast({
                            title: 'Deseja remover o item do carrinho?',
                            action: (
                              <ToastAction
                                title="Ok"
                                altText="Teste"
                                className="bg-red-600 shadow-df border border-gray-200 text-white hover:bg-red-500 duration-300 rounded "
                                onClick={() => {
                                  cart.removeProduct(item.id);
                                  toast({
                                    title: `Item ${item.name} removido do carrinho`,
                                  });
                                }}
                              >
                                Limpar Carrinho
                              </ToastAction>
                            ),
                          });
                          return;
                        }

                        cart.setCart({
                          ...cart.cart,
                          products: cart.cart.products.map(product => {
                            if (product.id === item.id) {
                              return {
                                ...product,
                                quantity: product.quantity - 1,
                              };
                            }
                            return product;
                          }),
                        });
                      }}
                    >
                      <MinusIcon className="h-5 w-5" />
                    </Button>
                    <Input
                      type="number"
                      className="flex-1 rounded-none border-x border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      readOnly
                      style={{ textAlign: 'center' }}
                      value={item.quantity}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-r-md text-red-600 hover:text-red-500 hover:bg-transparent"
                      onClick={() => {
                        cart.setCart({
                          ...cart.cart,
                          products: cart.cart.products.map(product => {
                            if (product.id === item.id) {
                              return {
                                ...product,
                                quantity: product.quantity + 1,
                              };
                            }
                            return product;
                          }),
                        });
                      }}
                    >
                      <PlusIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex gap-2 p-4 w-60">
                    <div>
                      {item.selectedProduct.discountPercent > 0 && (
                        <p className="line-through">
                          R${' '}
                          {Number(item.selectedProduct.price).toLocaleString(
                            'pt-br',
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </p>
                      )}
                      {item.selectedProduct &&
                      item.selectedProduct.discountPercent > 0 ? (
                        <p className="text-green-600 font-medium">
                          R${' '}
                          {Number(
                            item.selectedProduct.price -
                              item.selectedProduct.price *
                                (item.selectedProduct.discountPercent / 100),
                          ).toLocaleString('pt-br', {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      ) : (
                        <p>
                          R${' '}
                          {Number(item.selectedProduct.price).toLocaleString(
                            'pt-br',
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </p>
                      )}
                    </div>
                    {item.selectedProduct.discountPercent > 0 && (
                      <div className="flex text-lg font-medium items-center gap-1">
                        {item.selectedProduct.discountPercent}%
                        <p className="text-light font-normal">de desconto</p>
                      </div>
                    )}
                  </div>
                  <div className="options flex flex-col">
                    <Button
                      variant="destructive"
                      className="w-full h-10"
                      onClick={() => {
                        cart.removeProduct(item.id);
                        toast({
                          title: 'Item removido do carrinho',
                        });
                      }}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-1/4 shadow-df border border-gray-200 p-4 h-full rounded">
            <h2 className="text-2xl font-medium">Resumo</h2>

            <div className="">
              <div className="flex justify-between items-center gap-2 ">
                <p className="text-lg font-medium">Subtotal</p>
                <span className="text-lg flex gap-1">
                  <p>R$</p>
                  <p>
                    {cart.cart.products
                      .reduce((ac, item) => {
                        ac += item.selectedProduct.price * item.quantity;
                        return ac;
                      }, 0)
                      .toLocaleString('pt-br', {
                        minimumFractionDigits: 2,
                      })}
                  </p>
                </span>
              </div>

              <div className="flex justify-between items-center gap-2 ">
                <p className="text-lg font-medium">Total</p>
                <span className="text-lg flex gap-1">
                  <p>R$</p>
                  <p>
                    {cart.cart.products
                      .reduce((ac, item) => {
                        ac +=
                          (item.selectedProduct.price -
                            item.selectedProduct.price *
                              (item.selectedProduct.discountPercent / 100)) *
                          item.quantity;
                        return ac;
                      }, 0)
                      .toLocaleString('pt-br', {
                        minimumFractionDigits: 2,
                      })}
                  </p>
                </span>
              </div>

              <div className="flex flex-col items-start gap-2 ">
                <p className="text-lg font-medium text-nowrap text-ellipsis overflow-hidden">
                  Calculo de desconto por item:
                </p>
                <span className="text-lg flex gap-1">
                  <p>
                    {cart.cart.products.map(item => {
                      const discountInPrice =
                        item.selectedProduct.price *
                        (item.selectedProduct.discountPercent / 100);

                      return (
                        <div
                          className=""
                          key={'SUMARY' + item.id + '-' + item.name}
                        >
                          {item.selectedProduct.name} - R${' '}
                          {discountInPrice.toFixed(2)} x {item.quantity}
                        </div>
                      );
                    })}
                  </p>
                </span>
              </div>

              <Button
                variant="destructive"
                className="w-full h-10 mt-4"
                onClick={async () => {
                  // const data = await makePost<>('/orders', )
                  cart.clearCart();
                  toast({
                    title: 'Carrinho limpo',
                  });
                }}
              >
                Fazer Pedido
              </Button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
