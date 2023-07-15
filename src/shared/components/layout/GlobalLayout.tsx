import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';

import { httpClient } from '@/service';

import ApplyingFont from '../font/ApplyingFont';

type GlobalLayoutProps = {
  children: ReactNode;
};

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  const router = useRouter();
  useEffect(() => {
    const validateToken = async () => {
      try {
        await httpClient.post('/auth/refresh');
      } catch (error) {
        router.push('/auth/login');
      }
    };
    validateToken();
  }, []);

  return (
    <ApplyingFont>
      <div className="mx-auto my-0 w-full max-w-[600px]">{children}</div>
    </ApplyingFont>
  );
}
