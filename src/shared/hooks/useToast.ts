import { useEffect } from 'react';

import { shallow } from 'zustand/shallow';

import { TOAST_DURATION } from '../components/toast/Toast';
import { useToastStore } from '../store/toast';

/**
 * @example
  const { setToastMessage } = useToast();

  const clickToastTrigger = () => {
    setToastMessage('최대 20자까지 작성 가능합니다');
  };
 */
export const useToast = (timeout = TOAST_DURATION) => {
  const [toastMessage, setToastMessage] = useToastStore(
    (state) => [state.toastMessage, state.setToastMessage],
    shallow,
  );

  useEffect(() => {
    let toastTimeout: NodeJS.Timeout;

    if (toastMessage) {
      toastTimeout = setTimeout(() => {
        setToastMessage(null);
      }, timeout);
    }

    return () => clearTimeout(toastTimeout);
  }, [toastMessage, timeout]);

  return { toastMessage, setToastMessage };
};
