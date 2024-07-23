import { useSearchParams } from 'react-router-dom';
import { BasicModalProps } from '@/types/BasicModal.type';
import AddItemModal from './AddItemModal';
import ModalBody from '../../utilities/ModalBody';
import { ProductResponse } from '@/types/Product.type';

interface EditItemModalProps {
  product: ProductResponse;
  toggleModal: (product: ProductResponse) => void;
}

export default function EditItemModal({
  toggleModal,
  product,
}: EditItemModalProps) {
  console.log(product);

  return (
    <>
      <ModalBody toggleModal={toggleModal} title="Registar Item">
        <AddItemModal toggleModal={toggleModal} product={product} />
      </ModalBody>
    </>
  );
}
