import { useSearchParams } from 'react-router-dom';
import { BasicModalProps } from '@/types/BasicModal.type';
import ModalBody from './ModalBody';
import GeneralModalAdd from './GeneralModalAdd';
import AddItemModal from './Add/AddItemModal';
import { SuplementCategory } from '@/types/SuplementCategory.type';

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
