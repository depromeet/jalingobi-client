import Image from 'next/image';

import { Spacing } from '@/shared/components';
import KakaoLogin from '@/shared/components/kakao-login';

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center bg-system-basic pb-2 pt-12">
      <h1 className="font-title-medium-lg ">자린고비</h1>
      <Spacing height={8} />
      <h1 className="font-title-medium-md">
        거지들의 이야기로 쌓이는 소비습관
      </h1>
      <Image src="/images/fish.png" alt="avatar" width="335" height="335" />
      <span className="font-body-regular-sm items-center justify-center rounded-full bg-white px-4 py-2">
        5초안에 시작하고 소비 습관 챙기기🚀
      </span>
      <Spacing height={18} />
      <KakaoLogin />
      <Spacing height={32} />
    </div>
  );
}
