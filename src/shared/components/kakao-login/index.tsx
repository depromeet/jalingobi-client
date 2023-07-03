import React from 'react';

import { cn } from '@/lib/utils';
import { IconKakao } from '@/public/svgs';

export type Props = {
  label?: string;
};

export default function KakaoLogin({ label = '카카오톡으로 시작' }: Props) {
  const onClick = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;
  };

  return (
    <button
      type="button"
      className={cn(
        'font-button-medium-sm flex h-[49px] w-[335px] items-center justify-center gap-2.5 rounded-md bg-[#FAE54D]',
      )}
      onClick={onClick}
    >
      <IconKakao />
      <p>{label}</p>
    </button>
  );
}
