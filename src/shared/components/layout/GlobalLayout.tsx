import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';

import { useUserInfo } from '@/features/profile/queries';
import { httpClient } from '@/service';
import { useUserStore } from '@/shared/store/user';

import ApplyingFont from '../font/ApplyingFont';

type GlobalLayoutProps = {
  children: ReactNode;
};

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const { data: user } = useUserInfo();
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

  useEffect(() => {
    if (!user) return;
    setUser(user?.result);
  }, [user]);

  return (
    <ApplyingFont>
      <div className="mx-auto my-0 w-full max-w-[600px]">{children}</div>
    </ApplyingFont>
  );
}
