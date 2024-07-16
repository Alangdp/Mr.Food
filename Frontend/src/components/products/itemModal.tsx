import { motion } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { GiCookingPot } from 'react-icons/gi';
import { CiBeerMugFull } from 'react-icons/ci';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { BasicModalProps } from '@/types/BasicModal.type';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModalBody from './ModalBody';
import GeneralModalAdd from './GeneralModalAdd';
import { get } from 'http';
import { title } from 'process';
import AddItemModal from './Add/AddItemModal';

export default function ItemAdminModal({ toggleModal }: BasicModalProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const type = searchParams.get('type');

  return (
    <>
      <ModalBody toggleModal={toggleModal} title="Registar Item">
        {['industrial', 'prepared'].includes(type || '') ? null : (
          <GeneralModalAdd />
        )}

        {type === 'prepared' && <AddItemModal />}
      </ModalBody>
    </>
  );
}
