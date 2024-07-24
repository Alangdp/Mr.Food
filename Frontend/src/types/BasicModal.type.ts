export interface BasicModalProps {
  toggleModal: () => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}
