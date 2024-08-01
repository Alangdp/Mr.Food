import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { useCart } from '@/context/CartContext';

export const useDefaultImports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = useAuth();
  const cart = useCart();

  return {
    navigate,
    toast,
    auth,
    cart,
  };
};
