import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { OAuthRequestToKakao, authKakao } from '@/service/auth';
import { PageLoading } from '@/shared/components/loading';

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
          router.push('/search');
        }
      } else {
        router.push('/auth/login');
      }
    }

    getToken();
  }, []);

  return <PageLoading />;
}
