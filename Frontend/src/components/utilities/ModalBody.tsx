import { cn } from '@/lib/utils';
import { Cross1Icon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

interface ModalBodyProps {
  title?: string;
  closeButton?: ReactNode;
  toggleModal: (() => void) | ((...args: any[]) => any);
  children: ReactNode;
  className?: string;
}

export default function ModalBody({
  toggleModal,
  closeButton,
  title,
  children,
  className,
}: ModalBodyProps) {
  return (
    <motion.div
      key={location.pathname}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'w-[50vw] h-screen absolute right-0 top-0 bg-white z-50 p-4',
        className,
      )}
    >
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          {title && <h3 className="font-medium text-2xl">{title}</h3>}
          {closeButton ? (
            closeButton
          ) : (
            <Cross1Icon
              onClick={toggleModal}
              className="w-5 h-auto text-red-600 cursor-pointer"
            />
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
}
