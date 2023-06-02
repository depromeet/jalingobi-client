import React, { PropsWithChildren } from 'react';

import useModal from '@/shared/hooks/useModal/useModal';

interface BottomSheetProps {
  className?: string;
}

export function BottomSheet({
  className,
  children,
}: PropsWithChildren<BottomSheetProps>) {
  const { Modal } = useModal(true);

  return (
    <Modal verticalAlign="flex-end">
      <div
        className={`flex w-[60%] flex-col items-center rounded-t-xl bg-white ${className}`}
      >
        <div>asdfasdf</div>
        <div>asdfasdf</div>
        <div>asdfasdf</div>
        <div>asdfasdf</div>
        <div>asdfasdf</div>
        <div>asdfasdf</div>
        <div>asdfasdf</div>
      </div>
    </Modal>
  );
}
