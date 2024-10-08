import {
  BellIcon,
  CameraIcon,
  CaretDownIcon,
  GearIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import NavBar from '../navigators/navbar.company';
import SideBar from '../navigators/sidebar.company';
import MotionWrapper from '../router/MotionWrapper';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Modal } from '../utilities/Modal';
import ItemAdminModal from './itemModal';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductResponse } from '@/types/Product.type';
import { useAuth } from '@/context/AuthContext';
import { makeGet, makePut } from '@/utils/Getter';
import { useToast } from '../ui/use-toast';
import CategoryAdminModal from './ModalsControllers/CategoryAdminModal';
import { SuplementCategory } from '@/types/SuplementCategory.type';
import EditItemModal from './ModalsControllers/EditItemModal';
import { Company } from '@/types/CompanyDataProducts';
import { cn } from '@/lib/utils';

interface ProductsAdminProps {
  AddItemModalToggle: () => ReactNode;
  CategoryModalToggleAdd: () => ReactNode;
  ItemModalToggleEdit: () => void;
  setToEdit: (product: ProductResponse & { type?: string }) => void;
}

function ProductsAdmin({
  AddItemModalToggle,
  CategoryModalToggleAdd,
  ItemModalToggleEdit,
  setToEdit,
}: ProductsAdminProps) {
  const { companyToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<SuplementCategory[]>([]);
  const [company, setCompany] = useState<Company>();

  const fetchCompany = async () => {
    const company = await makeGet<Company>('companies', {
      authToken: companyToken,
      toast,
      autoToast: true,
    });

    if (company) setCompany(company);
  };

  const fetchProducts = async () => {
    const products = await makeGet<ProductResponse[]>('products', {
      authToken: companyToken,
      toast,
      autoToast: true,
    });

    if (products) setProducts(products);
  };

  const fetchCategories = async () => {
    const categories = await makeGet<SuplementCategory[]>('categories', {
      authToken: companyToken,
      toast,
      autoToast: true,
    });

    if (categories) setCategories(categories);
  };

  useEffect(() => {
    if (products.length === 0) fetchProducts();
    if (categories.length === 0) fetchCategories();
    fetchCompany();
    navigate('/company/products');
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
          <div className="category flex flex-col gap-4">
            {categories
              .filter(item => item.type === 'CATEGORY')
              .map(category => {
                const productsFiltred = products.filter(
                  item => item.categoryId === category.id,
                );

                if (productsFiltred.length === 0) return null;
                return (
                  <div className="" key={`Table-Category-${category.id}`}>
                    <div className="flex items-center justify-between p-2 shadow-df rounded-t">
                      <h3 className="text-lg font-medium">{category.name}</h3>
                      <Switch
                        checked={category.active}
                        className="data-[state=checked]:bg-red-500 mr-4"
                        onCheckedChange={async status => {
                          await makePut<null, unknown>(
                            `categories/category/${category.id}`,
                            null,
                            {
                              authToken: companyToken,
                              toast,
                              autoToast: true,
                            },
                          );
                          setCategories(
                            categories.map(item =>
                              item.id === category.id
                                ? { ...item, active: status }
                                : item,
                            ),
                          );
                        }}
                      />
                    </div>
                    <table className="w-full border rounded-t-none rounded-lg shadow-lg rounded-b-none">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="text-black p-4">Item</th>
                          <th className="text-black p-4">Preço</th>
                          <th className="text-black p-4 w-fit text-nowrap">
                            Status de Venda
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsFiltred.map(product => (
                          <tr
                            className="border-b hover:bg-gray-100 transition duration-200"
                            key={`Table-Item-${product.id}`}
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-4">
                                <HamburgerMenuIcon
                                  className="w-[30px] flex-[0.02] h-auto cursor-pointer"
                                  onClick={() => {
                                    ItemModalToggleEdit();
                                    setToEdit(product);
                                  }}
                                />
                                <div
                                  className={cn(
                                    'flex-[0.1] min-w-16 max-w-16  h-16 border-dashed border rounded border-secondary flex items-center justify-center text-secondary opacity-80 cursor-pointer',
                                    product.images.length > 0
                                      ? 'opacity-100 border-none'
                                      : 'opacity-80',
                                  )}
                                  onClick={() => {
                                    ItemModalToggleEdit();
                                    setToEdit(product);
                                  }}
                                >
                                  {product.images.length > 0 ? (
                                    <img
                                      src={`http://localhost:3000/${product.images[0]}`}
                                      alt="Product Image"
                                      className="w-16 h-16 rounded-lg opacity-100 cursor-pointer"
                                    />
                                  ) : (
                                    <CameraIcon className="w-6 h-auto" />
                                  )}
                                </div>
                                <div className="flex flex-col gap-2 flex-[0.7]">
                                  <div className="flex items-center gap-2">
                                    <a
                                      href={`/products/${company?.id}`}
                                      className="font-semibold hover:underline cursor-pointer duration-200"
                                    >
                                      {product.name}
                                    </a>
                                    <div className="flex items-center gap-2 p-1 bg-gray-300 rounded-lg hover:bg-gray-400 duration-300 cursor-pointer">
                                      <BellIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex items-center gap-2 p-1 bg-gray-300 rounded-lg hover:bg-gray-400 duration-300 cursor-pointer">
                                      <GearIcon className="w-4 h-4" />
                                    </div>
                                  </div>
                                  <p className="text-secondary text-ellipsis h-12 text-sm line-clamp-1 overflow-hidden pt-2 break-all">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-4 w-full">
                                {product.discountPercent > 0 && (
                                  <div className="text-secondary line-through w-14">
                                    R${' '}
                                    {(
                                      Number(product.price) -
                                      (product.discountPercent / 100) *
                                        Number(product.price)
                                    ).toLocaleString('pt-BR', {
                                      minimumFractionDigits: 2,
                                    })}
                                  </div>
                                )}
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
                                onCheckedChange={async status => {
                                  await makePut<null, unknown>(
                                    `products/product/${product.id}`,
                                    null,
                                    {
                                      authToken: companyToken,
                                      toast,
                                      autoToast: true,
                                    },
                                  );
                                  setProducts(
                                    products.map(item =>
                                      item.id === product.id
                                        ? { ...item, active: status }
                                        : item,
                                    ),
                                  );
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Button
                      size={'lg'}
                      className="gap-2 text-red-600 bg-white hover:bg-gray-100 w-full rounded-t-none border-t-0"
                      onClick={() => {
                        setToEdit({
                          type: 'register',
                          id: 0,
                          companyId: 0,
                          categoryId: category.id,
                          name: '',
                          description: '',
                          price: 0,
                          discountPercent: 0,
                          active: false,
                          extras: [],
                          images: [],
                          createdAt: '',
                          updatedAt: '',
                        });

                        ItemModalToggleEdit();
                      }}
                    >
                      <PlusIcon className="font-bold w-6 h-auto" /> Adicionar
                      Item
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductsAdminPageRoute() {
  const navigate = useNavigate();
  // Repeat this for each modal you want to use in the page
  const {
    ModalLink: ModalLinkAdd,
    ModalTogle: ModalTogleAdd,
    isModalOpen: ModalState,
  } = Modal();

  const { ModalLink: ModalLinkAddCategory, ModalTogle: ModalTogleAddCategory } =
    Modal();

  const {
    ModalLink: ModalLinkEdit,
    ModalTogle: ModalTogleEdit,
    toggleModal,
  } = Modal();
  const [productToEdit, setProductToEdit] = useState<
    (ProductResponse & { type?: string }) | null
  >();

  useEffect(() => {
    if (!ModalState) navigate('/company/products');
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

  // Button to toggle the modal Edit Product
  const itemModalToggleEdit = () => {
    return (
      <ModalTogleEdit>
        <Button size={'lg'} className="gap-2 bg-red-600 hover:bg-red-500">
          <PlusIcon className="font-bold w-6 h-auto" /> Editar Item
        </Button>
      </ModalTogleEdit>
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
          <ModalLinkEdit
            modalElement={
              <EditItemModal
                toggleModal={itemModalToggleEdit}
                product={productToEdit!}
              />
            }
          />
          <NavBar />
          <SideBar />
          <ProductsAdmin
            AddItemModalToggle={itemModalToggleAdd}
            CategoryModalToggleAdd={CategoryModalToggleAdd}
            ItemModalToggleEdit={toggleModal}
            setToEdit={setProductToEdit}
          />
        </>
      </MotionWrapper>
    </div>
  );
}
