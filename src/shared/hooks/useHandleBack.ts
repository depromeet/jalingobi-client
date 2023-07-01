// useHandleBack.ts

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { URL } from '@/shared/constants/urls';

export function useHandleBack() {
  const router = useRouter();

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      router.push(URL.SEARCH);
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
}
