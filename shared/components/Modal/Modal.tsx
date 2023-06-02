import React, { PropsWithChildren } from 'react';

import useModal from '@/shared/hooks/useModal/useModal';

interface ModalProps {
  className?: string;
}

export function Modal({ className, children }: PropsWithChildren<ModalProps>) {
  const { Modal } = useModal(true);

  return (
    <Modal>
      <div
        className={`flex w-[60%] flex-col items-center rounded-2xl bg-white ${className}`}
      >
        {children}
      </div>
    </Modal>
  );
}
