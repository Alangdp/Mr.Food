import AddItemModal from './AddItemModal';
import ModalBody from '../../utilities/ModalBody';
import { ProductResponse } from '@/types/Product.type';

interface EditItemModalProps {
  product: ProductResponse & { type?: string };
  toggleModal: (product: ProductResponse) => void;
}

export default function EditItemModal({
  toggleModal,
  product,
}: EditItemModalProps) {
  const type = product.type || '';

  return (
    <>
      <ModalBody toggleModal={toggleModal} title="Registar Item">
        <AddItemModal
          toggleModal={toggleModal}
          product={product}
          type={type === '' || type === 'edit' ? 'edit' : 'register'}
        />
      </ModalBody>
    </>
  );
}
