import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { setAuthHeader } from '@/service';
import { OAuthRequestToKakao, authKakao } from '@/service/auth';

export interface State {
  code: string;
}

export default function RedirectedKakao() {
  const router = useRouter();

  useEffect(() => {
    async function getToken() {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const kakao = await OAuthRequestToKakao(code);
        const login = await authKakao({
          idToken: kakao.id_token,
          accessToken: kakao.access_token,
        });

        if (login) {
          setAuthHeader(login.result?.accessToken as string);
          router.push('/search');
        }
      } else {
        router.push('/auth/login');
      }
    }

    getToken();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4" />
    </div>
  );
}
