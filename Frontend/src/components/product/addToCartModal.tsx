import { BasicModalProps } from '@/types/BasicModal.type';
import { ProductResponse } from '@/types/Product.type';
import ModalBody from '../utilities/ModalBody';
import { Separator } from '@radix-ui/react-menubar';
import { Button } from '../ui/button';
import ValidateExtraOptions from './Validate';
import CheckboxWithValidation from './ValidateCheckbox';
import { useEffect, useState } from 'react';
import { Toast, ToasterToast } from '../ui/use-toast';
import { Cart, CartProduct, ExtraOptionsSelected } from './Cart.type';
import { ToastAction } from '../ui/toast';

interface AddCartModalProps {
  products?: ProductResponse[];
  productSelectedId?: string;
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
  cart: {
    cart: Cart;
    setCart: (cart: Cart) => void;
    clearCart: () => void;
    addProduct: (product: CartProduct) => void;
    removeProduct: (productId: string) => void;
  };
}

const API_URL = import.meta.env.VITE_BACKEND_URL as string;

export default function AddCartModal({
  toggleModal,
  onKeyPress,
  products,
  productSelectedId,
  toast,
  cart,
}: BasicModalProps & AddCartModalProps) {
  const [validators, setValidators] = useState<ValidateExtraOptions[]>([]);
  const product = products?.find(
    item => item.id.toString() === productSelectedId,
  );

  useEffect(() => {
    if (!product) {
      toggleModal();
      toast({
        title: 'Produto não encontrado',
      });
      return;
    }
  }, []);

  if (validators.length === 0 && (product?.extras?.length ?? 0) > 0) {
    if (product?.extras) {
      const initialValidators = product.extras.map(
        extra =>
          new ValidateExtraOptions(
            extra.itens,
            extra.max,
            extra.min,
            extra.obrigatory,
            extra.name,
          ),
      );
      setValidators(initialValidators);
    }
  }

  return (
    <span onKeyUp={onKeyPress}>
      <ModalBody
        toggleModal={toggleModal}
        title="Adicionar ao Carrinho"
        className="top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] rounded pt-0"
      >
        <div className="w-full grid grid-cols-2 gap-4">
          <div>
            <img
              src={`${API_URL}/${product?.images[0] || ''}`}
              alt={product?.name}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
                currentTarget.style.width = '80%';
                currentTarget.style.border = '1px dashed black';
              }}
              className="w-full rounded-lg max-h-96"
            />
          </div>
          <div className="h-[40vh] flex flex-col gap-2 overflow-y-scroll">
            <div className="">
              <div className="flex w-full justify-center">
                <h2 className="text font-medium">{product?.name}</h2>
              </div>
              <p className="w-full text-wrap text-secondary opacity-80 text-sm font-">
                {product?.description}
              </p>
              <div className="flex w-full justify-start items-end gap-1">
                <h2 className="text font-medium text-green-600">
                  {product && product?.discountPercent > 0 && (
                    <p>
                      R${' '}
                      {(
                        Number(product.price) -
                        Number(product.price) * (product.discountPercent / 100)
                      ).toLocaleString('pt-br', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  )}
                </h2>
                {product && product?.discountPercent > 0 && (
                  <h2 className="text-sm font-light text-secondary opacity-50 line-through">
                    R$ {product?.price}
                  </h2>
                )}
              </div>
            </div>
            <div className="h-18 w-full">
              {product?.extras && product.extras.length > 0
                ? product.extras.map((extra, generalIndex) => {
                    const validator = validators[generalIndex];

                    return (
                      <span className="" key={extra.name}>
                        <div className="flex justify-between items-center p-2 bg-gray-200">
                          <div className="flex flex-col">
                            <p className="text font-medium text-secondary">
                              {extra.name}
                            </p>
                            <p className="text-sm text-secondary">
                              {extra.obrigatory && extra.max > 1
                                ? `Escolha até ${extra.max} opções`
                                : extra.obrigatory
                                  ? 'Escolha uma opção'
                                  : `Escolha até ${extra.max} opções`}
                            </p>
                          </div>
                          {extra.obrigatory && (
                            <div className="flex justify-center items-center w-20 h-6 bg-[#717171] rounded">
                              <p className="text-sm text-white font-medium">
                                Obrigatório
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          {extra.itens.map((option, index) => {
                            return (
                              <div
                                className="flex justify-between items-center p-2 w-[90%] mx-auto"
                                key={option.name + '-' + index}
                              >
                                <div className="flex justify-between items-center">
                                  <p className="text font-light text-secondary flex items-center gap-2">
                                    {option.name}
                                    <span className="text-secondary opacity-70 text-sm">
                                      {option.price > 0
                                        ? `- R$ ${option.price.toFixed(2)}`
                                        : null}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex justify-center items-center h-6 rounded">
                                  <CheckboxWithValidation
                                    option={option}
                                    validator={validator}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <Separator className="bg-black opacity-10 h-[0.3px]" />
                      </span>
                    );
                  })
                : null}
            </div>
            <div className="flex justify-end mt-10 ">
              <Button
                className="bg-primary text-white bg-red-600 hover:bg-red-500"
                onClick={() => {
                  let valid = true;
                  const selectedOptions: ExtraOptionsSelected = {};

                  for (let i = 0; i < validators.length; i++) {
                    const status = validators[i].validateOptions();
                    if (!status.status) {
                      toast({
                        title: 'Você precisa selecionar todas as opções',
                      });
                      valid = false;
                      return;
                    }
                  }

                  if (valid) {
                    validators.forEach(validator => {
                      selectedOptions[validator.groupName] = {
                        selectedOptions: validator.selectedOptionsList,
                        extraValue: validator.extraValue,
                      };
                    });

                    const companyId = [
                      ...cart.cart.products.map(
                        item => item.selectedProduct.companyId,
                      ),
                      product!.companyId,
                    ];

                    console.log(new Set(companyId).size);
                    if (new Set(companyId).size > 1) {
                      toast({
                        title:
                          'Você só pode adicionar produtos de uma empresa por vez',
                        action: (
                          <ToastAction
                            title="Ok"
                            altText="Teste"
                            className="bg-red-600 shadow-df border border-gray-200 text-white hover:bg-red-500 duration-300"
                            onClick={() => {
                              cart.clearCart();
                              toast({
                                title: 'Carrinho limpo',
                              });
                            }}
                          >
                            Limpar Carrinho
                          </ToastAction>
                        ),
                      });
                      return;
                    }

                    toast({
                      title: 'Produto adicionado ao carrinho',
                    });

                    const addToCartData: CartProduct = {
                      id: new Date().getMilliseconds().toString(),
                      name: product!.name,
                      extras: selectedOptions,
                      priceWithoutExtras: Number(product!.price),
                      priceWithExtras:
                        Number(product!.price) +
                        Object.values(selectedOptions).reduce(
                          (acc, item) => acc + item.extraValue,
                          0,
                        ),
                      quantity: 1,
                      selectedProduct: product!,
                    };

                    cart.addProduct(addToCartData);
                  }
                }}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </span>
  );
}
