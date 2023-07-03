import { useToast } from '@/shared/hooks/useToast';

import { Toast } from './Toast';

export const ToastsContainer = () => {
  const { toastMessage } = useToast();

  return (
    <div className="toasts-container">
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};
