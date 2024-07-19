import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useState, ReactNode, ReactElement } from 'react';
import React from 'react';

interface BgBlackOpacity80Props {
  modalElement?: ReactElement;
  className?: string;
  onCloseModal?: () => void;
}

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function ModalTogle({ children }: { children: ReactNode }) {
    return <span onClick={toggleModal}>{children}</span>;
  }

  function ModalLink({ modalElement, className }: BgBlackOpacity80Props) {
    return (
      <span className="overflow-hidden z-50 top-0">
        {isModalOpen && (
          <div
            className={cn(
              'h-screen w-screen absolute z-50 bg-black bg-opacity-60 fade-in-100 transition-all top-0 left-0',
              className,
            )}
          >
            {React.cloneElement(modalElement as ReactElement, { toggleModal })}
          </div>
        )}
      </span>
    );
  }

  return { ModalLink, ModalTogle, isModalOpen, toggleModal };
}

export { Modal };
