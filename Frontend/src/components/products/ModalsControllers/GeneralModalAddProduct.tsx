import { CiBeerMugFull } from 'react-icons/ci';
import { GiCookingPot } from 'react-icons/gi';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function GeneralModalAdd() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="w-[90%] border rounded-lg border-gray-200 p-4 flex items-center gap-4 cursor-pointer hover:opacity-70 duration-300"
        onClick={() => navigate('/company/dashboard/products?type=prepared')}
      >
        <GiCookingPot className="text-red-600 w-9 h-auto" />
        <div className="flex flex-col justify-center">
          <h4 className="text-xl font-bold">Preparado</h4>
          <p className="text-secondary text-lg">
            Itens Produzidos pela sua loja, como pizzas e bolos.
          </p>
        </div>
      </div>

      <div
        className="w-[90%] border rounded-lg border-gray-200 p-4 flex items-center gap-4 relative cursor-pointer hover:opacity-70 duration-300"
        onClick={() => navigate('/company/dashboard/products?type=industrial')}
      >
        <CiBeerMugFull className="text-red-600 w-9 h-auto" />
        <div className="flex flex-col justify-center">
          <h4 className="text-xl font-bold">Bebida Industrializada</h4>
          <p className="text-secondary text-lg">
            Bebidas como: Refrigerantes, Cervejas, energéticos entre outros.
          </p>
          <p className="text-sm text-secondary brightness-125">
            Adicione bebidas industrializadas e participe de campanhas de
            marketing.
          </p>
        </div>
        <div className="absolute top-2 right-2 text-yellow-400 px-3 border border-yellow-300 rounded-xl">
          Em Teste
        </div>
      </div>

      <div className="w-[90%] border rounded-lg border-gray-200 p-4 flex items-center gap-4 relative ">
        <div className="absolute top-0 w-full bg-blue-500/90 h-2 rounded-full left-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1 w-full bg-white h-2 rounded-full left-1/2 -translate-x-1/2"></div>

        <IoAlertCircleOutline className="text-blue-300 w-12 h-auto" />
        <div className="flex flex-col justify-center">
          <p className="text-blue-400 text-lg">
            Lembre-se que itens como cigarro, drogas, armas e contéudo de
            propaganda política são proibidos. Para ler as regras completas,
            <p className="font-medium cursor-pointer">clique aqui.</p>
          </p>
        </div>
      </div>
    </div>
  );
}
