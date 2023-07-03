import { useState } from 'react';

type ToastProps = {
  message: string;
};

export const TOAST_DURATION = 3000;

export const Toast = ({ message }: ToastProps) => {
  const [animation] = useState('animate-slide-up');

  return (
    <div
      className={`fixed ${animation} font-caption-medium-md left-[50%] top-[90%] z-50 box-border max-w-[335px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-black bg-opacity-80 px-2.5 py-3 text-white`}
    >
      {message}
    </div>
  );
};
