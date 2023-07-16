type ToastProps = {
  message: string;
};

export const TOAST_DURATION = 3000;

export const Toast = ({ message }: ToastProps) => {
  return (
    <div className="font-caption-medium-md fixed left-[50%] top-[85%] z-50 box-border h-12 w-[340px] max-w-[335px] translate-x-[-50%] translate-y-[-50%] animate-slide-up rounded-lg bg-black bg-opacity-80 px-2.5 py-3 text-center font-medium text-white">
      {message}
    </div>
  );
};
