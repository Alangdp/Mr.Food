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
  return (
    <>
      <ModalBody toggleModal={toggleModal} title="Registar Item">
        <AddItemModal toggleModal={toggleModal} product={product} type="edit" />
      </ModalBody>
    </>
  );
}
