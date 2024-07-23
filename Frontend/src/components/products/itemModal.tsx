import { useSearchParams } from 'react-router-dom';
import { BasicModalProps } from '@/types/BasicModal.type';
import ModalBody from '../utilities/ModalBody';
import GeneralModalAdd from './ModalsControllers/GeneralModalAddProduct';
import AddItemModal from './ModalsControllers/AddItemModal';

export default function ItemAdminModal({ toggleModal }: BasicModalProps) {
  const [searchParams] = useSearchParams();

  const type = searchParams.get('type');

  return (
    <>
      <ModalBody toggleModal={toggleModal} title="Registar Item">
        {['industrial', 'prepared'].includes(type || '') ? null : (
          <GeneralModalAdd />
        )}

        {type === 'prepared' && <AddItemModal toggleModal={toggleModal} />}
      </ModalBody>
    </>
  );
}
