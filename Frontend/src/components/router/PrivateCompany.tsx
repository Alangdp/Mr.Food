import { useAuth } from '@/context/AuthContext';
import { validateToken } from '@/utils/Getter';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';

interface ChildrenProps {
  children: JSX.Element;
}

export default function PrivateCompany({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const { companyToken, logoutCompany } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    async function validate(token: string) {
      const status = await validateToken(token);
      if (!status) {
        logoutCompany();
        toast({
          title: 'Token inválido ou expirado',
          variant: 'destructive',
          duration: 2500,
        });
        navigate('/company/login');
        return;
      }
    }

    validate(companyToken || '');
  }, [companyToken]);

  return <>{children}</>;
}
