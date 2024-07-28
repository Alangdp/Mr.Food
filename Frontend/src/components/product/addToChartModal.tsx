import { BasicModalProps } from '@/types/BasicModal.type';
import { ProductResponse } from '@/types/Product.type';
import ModalBody from '../utilities/ModalBody';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '@radix-ui/react-menubar';
import { Button } from '../ui/button';

interface AddCartModalProps {
  products?: ProductResponse[];
  productSelectedId?: string;
}

export default function AddCartModal({
  toggleModal,
  onKeyPress,
  products,
  productSelectedId,
}: BasicModalProps & AddCartModalProps) {
  const product = products?.find(
    item => item.id.toString() === productSelectedId,
  );

  return (
    <span onKeyUp={onKeyPress}>
      <ModalBody
        toggleModal={toggleModal}
        title="Adicionar ao Carrinho"
        className="top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] rounded pt-0"
      >
        <div className="w-full grid grid-cols-2">
          <div>
            <img
              src={
                'https://nutrimassasesalgados.com/wp-content/uploads/2020/05/MG_6472-copiar-1.jpg'
              }
              alt={product?.name}
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
                  R$ {product?.price}
                </h2>
                <h2 className="text-sm font-light text-secondary opacity-50 line-through">
                  R$ {product?.price}
                </h2>
              </div>
            </div>
            <div className="h-18 w-full">
              {product?.extras && product.extras.length > 0
                ? product?.extras.map(extra => (
                    <span className="">
                      <div
                        className="flex justify-between items-center p-2 bg-gray-200"
                        key={extra.name}
                      >
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
                        {extra.itens.map(option => (
                          <>
                            <div
                              className="flex justify-between items-center p-2 w-[90%] mx-auto"
                              key={option.name}
                            >
                              <div className="flex justify-between items-center">
                                <p className="text font-light text-secondary flex items-center">
                                  {option.name}
                                  <p className="text-secondary opacity-70 text-sm">
                                    {option.price > 0
                                      ? `R$ ${option.price.toFixed(2)}`
                                      : null}
                                  </p>
                                </p>
                              </div>
                              <div className="flex justify-center items-center h-6 rounded">
                                <Checkbox
                                  id={option.name}
                                  className="h-5 w-5 rounded-full bg-[#d6d6d6] shadow duration-300 text-white"
                                />
                              </div>
                            </div>
                            <Separator className="bg-black opacity-10 h-[0.3px]" />
                          </>
                        ))}
                      </div>
                    </span>
                  ))
                : null}
            </div>
            <div className="flex justify-end mt-10 ">
              <Button className="bg-primary text-white bg-red-600 hover:bg-red-500">
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </span>
  );
}
