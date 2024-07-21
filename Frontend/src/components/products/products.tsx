import {
  BellIcon,
  CameraIcon,
  CaretDownIcon,
  GearIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import NavBar from '../navigators/navbar';
import SideBar from '../navigators/sidebar';
import MotionWrapper from '../router/MotionWrapper';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Modal } from '../utils/BgBlackOpacity80';
import ItemAdminModal from './itemModal';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductResponse } from '@/types/Product.type';
import { useAuth } from '@/context/AuthContext';
import { makeGet } from '@/utils/Getter';
import { useToast } from '../ui/use-toast';
import CategoryAdminModal from './Category/CategoryAdminModal';

interface ProductsAdminProps {
  AddItemModalToggle: () => ReactNode;
  CategoryModalToggleAdd: () => ReactNode;
}

function ProductsAdmin({
  AddItemModalToggle,
  CategoryModalToggleAdd,
}: ProductsAdminProps) {
  const { companyToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const fetchProducts = async () => {
    const products = await makeGet<ProductResponse[]>('products', {
      authToken: companyToken,
      toast,
      autoToast: true,
    });

    if (products) setProducts(products);
  };

  useEffect(() => {
    console.log(products);
    if (products.length === 0) fetchProducts();
    navigate('/company/dashboard/products');
  }, []);

  return (
    <div className="w-4/5 h-[94vh] border-x drop-shadow mx-auto divide-y">
      <div className="p-4 flex flex-col gap-4">
        <h3 className="font-medium text-xl">Cardápios</h3>
        <p className="text-secondary text-lg">
          Seu cardápio é sua vitrine de produtos. Agora você pode atender seus
          clientes de diferentes formas e disponibilizar um cardápio para cada
          situação.
        </p>
      </div>

      <div className="flex flex-col gap-4 p-4 overflow-y-scroll h-[80vh]">
        <div className="flex items-center gap-4">
          <CategoryModalToggleAdd />
          <AddItemModalToggle />
        </div>

        <div className="flex items-centerw-full gap-4">
          <Input
            className="shadow-df py-4 flex items-center flex-[0.3]"
            placeholder="Todas as Categorias"
            Icon={CaretDownIcon}
            iconAction={() => console.log('TEste')}
          />

          <Input
            iconClassName="ml-2 text-red-600"
            reverse={true}
            placeholder="Buscar nas Categorias"
            className="shadow-df py-4 flex items-center flex-[0.7]"
            Icon={MagnifyingGlassIcon}
            iconAction={() => console.log('TEste')}
          />
        </div>

        <div className="w-full">
          <div className="category">
            <div className="flex flex-col p-4 shadow-df">
              <div className="">
                <div className="flex items-center justify-between p-2 shadow-df rounded-t">
                  <h3 className="text-lg font-medium">Sem Categoria</h3>
                  <Switch
                    className="data-[state=checked]:bg-red-500 mr-4"
                    onCheckedChange={status => console.log(status)}
                  />
                </div>
                <table className="w-full border rounded-t-none rounded-lg shadow-lg">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="text-black p-4">Item</th>
                      <th className="text-black p-4">Preço</th>
                      <th className="text-black p-4">Status de Venda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter(product => !product.categoryId)
                      .map(product => (
                        <tr className="border-b hover:bg-gray-100 transition duration-200">
                          <td className="p-4">
                            <div className="flex items-center gap-4">
                              <HamburgerMenuIcon className="w-6 h-auto" />
                              <div className="w-16 h-16 border-dashed border rounded border-secondary flex items-center justify-center text-secondary opacity-80 cursor-pointer">
                                <CameraIcon className="w-6 h-auto" />
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold">
                                    {product.name}
                                  </h4>
                                  <div className="flex items-center gap-2 p-1 bg-gray-300 rounded-lg hover:bg-gray-400 duration-300 cursor-pointer">
                                    <BellIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex items-center gap-2 p-1 bg-gray-300 rounded-lg hover:bg-gray-400 duration-300 cursor-pointer">
                                    <GearIcon className="w-4 h-4" />
                                  </div>
                                </div>
                                <p className="text-secondary">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap">
                              <div className="text-secondary line-through w-14">
                                R${' '}
                                {Number(product.price) -
                                  (product.discountPercent / 100) *
                                    Number(product.price)}
                              </div>
                              <Input
                                type="text"
                                className="w-24 border-gray-200 border p-1"
                                placeholder={`R$ ${product.price}`}
                                disabled
                              />
                            </div>
                          </td>
                          <td className="p-4 flex justify-center items-center">
                            <Switch
                              checked={product.active}
                              className="data-[state=checked]:bg-red-500"
                              onCheckedChange={status => console.log(status)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Button
                  size={'lg'}
                  className="gap-2 text-red-600 bg-white hover:bg-gray-100 w-full"
                >
                  <PlusIcon className="font-bold w-6 h-auto" /> Adicionar Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductsAdminPageRoute() {
  const navigate = useNavigate();
  // Repeat this for each modal you want to use i n the page
  const {
    ModalLink: ModalLinkAdd,
    ModalTogle: ModalTogleAdd,
    isModalOpen: ModalState,
  } = Modal();

  const { ModalLink: ModalLinkAddCategory, ModalTogle: ModalTogleAddCategory } =
    Modal();

  useEffect(() => {
    if (!ModalState) navigate('/company/dashboard/products');
  }, [ModalState]);

  // Button to toggle the modal Add Item
  const itemModalToggleAdd = () => {
    return (
      <ModalTogleAdd>
        <Button
          size={'lg'}
          className="gap-2 text-red-600 bg-white hover:bg-gray-100"
        >
          <PlusIcon className="font-bold w-6 h-auto" /> Adicionar Item
        </Button>
      </ModalTogleAdd>
    );
  };

  // Button to toggle the modal Add Category
  const CategoryModalToggleAdd = () => {
    return (
      <ModalTogleAddCategory>
        <Button size={'lg'} className="gap-2 bg-red-600 hover:bg-red-500">
          <PlusIcon className="font-bold w-6 h-auto" /> Adicionar Categoria
        </Button>
      </ModalTogleAddCategory>
    );
  };

  // ModalLink is used to specify the modal layer to ensure it overlays other elements.
  return (
    <div className="z-50 relative overflow-hidden">
      <MotionWrapper classname="bg-white z-50 relative">
        <>
          <ModalLinkAdd
            modalElement={<ItemAdminModal toggleModal={itemModalToggleAdd} />}
          />
          <ModalLinkAddCategory
            modalElement={
              <CategoryAdminModal toggleModal={CategoryModalToggleAdd} />
            }
          />
          <NavBar />
          <SideBar />
          <ProductsAdmin
            AddItemModalToggle={itemModalToggleAdd}
            CategoryModalToggleAdd={CategoryModalToggleAdd}
          />
        </>
      </MotionWrapper>
    </div>
  );
}
