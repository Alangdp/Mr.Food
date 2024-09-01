import NavBar from '@/components/navigators/navbar.company';
import SideBar from '@/components/navigators/sidebar.company';
import MotionWrapper from '@/components/router/MotionWrapper';
import PrivateCompany from '@/components/router/PrivateCompany';
import { OrderProps } from '@/types/Order.type';
import { DataTable } from './data-table';
import { faker } from '@faker-js/faker';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import OrderColumns from './columns';
import { makeGet } from '@/utils/Getter';
import { useDefaultImports } from '@/components/utilities/DefaultImports';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export default function OrderPage() {
  const { toast } = useDefaultImports();
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const { companyToken } = useAuth();

  const fetchOrders = async () => {
    const ordersGET = await makeGet<OrderProps[]>('orders', {
      toast,
      autoToast: true,
      authToken: companyToken,
    });

    if (!ordersGET) return;
    setOrders(ordersGET);
  };

  useEffect(() => {
    if (orders.length === 0) fetchOrders();
  }, []);

  return (
    <div className="w-4/5 h-[94vh] border-x drop-shadow mx-auto">
      <div className="p-4 flex flex-col gap-4">
        <DataTable columns={OrderColumns()} data={orders} />
      </div>
    </div>
  );
}

export function OrderPageRoute() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <MotionWrapper>
        <OrderPage />
      </MotionWrapper>
    </div>
  );
}
