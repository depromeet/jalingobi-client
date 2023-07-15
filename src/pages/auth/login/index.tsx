import Link from 'next/link';

import { IconArrowRight } from '@/public/svgs';
import { Spacing } from '@/shared/components';
import { ImageLoader } from '@/shared/components/image';
import KakaoLogin from '@/shared/components/kakao-login';

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center bg-system-basic pb-2 pt-12">
      <h1 className="font-title-medium-lg ">자린고비</h1>
      <Spacing height={8} />
      <h1 className="font-title-medium-md">
        거지들의 이야기로 쌓이는 소비습관
      </h1>
      <ImageLoader
        src="/images/fish.png"
        alt="avatar"
        width="335"
        height="335"
      />
      <span className="font-body-regular-sm items-center justify-center rounded-full bg-white px-4 py-2">
        5초안에 시작하고 소비 습관 챙기기🚀
      </span>
      <Spacing height={18} />
      <KakaoLogin />
      <Spacing height={32} />
      <Link href="/search">
        <div className="flex items-center gap-x-2 text-gray-50">
          <span className="font-body-regular-lg">회원가입 없이 둘러보기</span>
          <IconArrowRight className="h-4 w-4 self-end stroke-black text-gray-50" />
        </div>
      </Link>
    </div>
  );
}
