import { validateTokenClient } from '@/utils/Getter';
import { useEffect } from 'react';
import { useDefaultImports } from '../utilities/DefaultImports';

interface ChildrenProps {
  children: JSX.Element;
}

export default function PrivateClient({ children }: ChildrenProps) {
  const { navigate, toast, auth } = useDefaultImports();

  useEffect(() => {
    async function validate(token: string) {
      const status = await validateTokenClient(token);
      console.log(status);
      if (!status) {
        auth.logoutClient();
        toast({
          title: 'Token inválido ou expirado',
          variant: 'destructive',
          duration: 2500,
        });
        navigate('/client/login');
        return;
      }
    }

    validate(auth.clientToken || '');
  }, [auth.clientToken]);

  return <>{children}</>;
}
