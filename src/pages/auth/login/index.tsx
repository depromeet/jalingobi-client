import Image from 'next/image';
import Link from 'next/link';

import { IconArrowRight } from '@/public/svgs';
import KakaoLogin from '@/shared/components/kakao-login';

export default function Login() {
  return (
    <div className="flex h-screen flex-row flex-col items-center justify-center bg-[#E8EBF0]">
      <h1 className="font-title-medium-lg absolute top-24">자린고비</h1>

      <h1 className="absolute top-36 text-xl">
        거지들의 이야기로 쌓이는 소비습관
      </h1>
      <span className="absolute top-60">
        <Image
          src="/images/profile.png"
          alt="avatar"
          width="335"
          height="335"
          className="rounded-xl"
        />
      </span>
      <span className="absolute bottom-72 inline-flex items-center justify-center rounded-full bg-[#FFFFFF] px-4 py-2 font-medium">
        5초안에 시작하고 소비 습관 챙기기🚀
      </span>
      <span className="absolute bottom-48">
        <KakaoLogin />
      </span>
      <div className="absolute bottom-24">
        <Link href="/search">
          <div className="flex items-center justify-end gap-x-2 text-gray-50">
            <span className="font-body-regular-lg font-semibold">
              회원가입 없이 둘러보기
            </span>
            <IconArrowRight className="h-4 w-4 self-end stroke-black text-gray-50" />
          </div>
        </Link>
      </div>
    </div>
  );
}
