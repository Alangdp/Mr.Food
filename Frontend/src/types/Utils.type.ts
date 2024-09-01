import { Toast, ToasterToast } from '@/components/ui/use-toast';

export type GetterOptions = {
  toast?: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
  autoToast?: boolean;
  authToken?: string | null;
  returnTypes?: 'data' | 'status';
};
