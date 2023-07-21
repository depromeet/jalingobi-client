import Image from 'next/image';

import { IconJalingobi } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import KakaoLogin from '@/shared/components/kakao-login';

export default function Login() {
  return (
    <div className="relative flex h-screen flex-col items-center pb-2 pt-12">
      <div className="absolute top-[6%] flex flex-col gap-y-4">
        <IconJalingobi />
        <h1 className="font-title-medium-md font-medium text-white">
          거지들의 이야기로 쌓이는 소비습관
        </h1>
      </div>

      <Image
        className="absolute -z-10 object-cover"
        fill
        src="/images/login.webp"
        alt="avatar"
      />
      <article className="absolute bottom-[10%] flex flex-col items-center">
        <span className="font-body-regular-sm items-center rounded-full bg-gray-70 px-5 py-2.5 text-white">
          5초안에 시작하고 소비 습관 챙기기🚀
        </span>
        <Spacing height={18} />
        <KakaoLogin />
        <Spacing height={32} />
      </article>
    </div>
  );
}
