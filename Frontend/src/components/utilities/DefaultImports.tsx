import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';

export const useDefaultImports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = useAuth();

  return {
    navigate,
    toast,
    auth,
  };
};
