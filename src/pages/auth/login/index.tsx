import Image from 'next/image';
import Link from 'next/link';

import { IconArrowRight } from '@/public/svgs';
import KakaoLogin from '@/shared/components/kakao-login';

export default function Login() {
  return (
    <div className="bg-[#E8EBF0]">
      <div className="flex h-screen flex-row flex-col items-center justify-center">
        <h1 className="font-title-medium-lg absolute top-[92px]">자린고비</h1>

        <h1 className="absolute top-[142px] text-xl">
          거지들의 이야기로 쌓이는 소비습관
        </h1>
        <span className="absolute top-[202px]">
          <Image
            src="/images/profile.png"
            alt="avatar"
            width="335"
            height="335"
            className=""
          />
        </span>
        <span className="absolute top-[608px] inline-flex items-center justify-center rounded-full bg-[#FFFFFF] px-4 py-2 font-medium">
          5초안에 시작하고 소비 습관 챙기기🚀
        </span>
        <span className="absolute top-[666px]">
          <KakaoLogin />
        </span>
        <div className="absolute top-[746px]">
          <Link href="/search">
            <div className="flex items-center justify-end gap-x-2 text-gray-50">
              <span className="font-body-regular-lg">
                회원가입 없이 둘러보기
              </span>
              <IconArrowRight className="h-4 w-4 self-end stroke-black text-gray-50" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
