import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';

import { IconArrowRight, IconSettings } from '@/public/svgs';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';
import { Toggle } from '@/shared/components/toggle';

export default function MyPage() {
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  return (
    <section>
      <header className="mb-4 flex h-12 items-center justify-between">
        <span className="font-title-medium-md">마이페이지</span>
        <Link href="/settings">
          <IconSettings />
        </Link>
      </header>
      <div className="flex items-center justify-start pb-4">
        <Image
          src="/images/avatar.png"
          alt="profile"
          width={60}
          height={60}
          className="mr-6"
        />
        <Link
          href="/my-page/profile"
          className="flex items-center gap-x-2 text-right"
        >
          <span className="font-title-medium-sm font-semibold">
            유저 닉네임 16자일 때 길이
          </span>
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Link href="/my-page/record">
        <section className="h-24 rounded-lg bg-gray-5 p-5 text-gray-60">
          <ul className="flex justify-center gap-x-5">
            <li className="flex h-14 w-20 flex-col items-center gap-y-2.5">
              <span className="font-title-medium-md font-semibold">5</span>
              <span className="font-body-regular-sm font-semibold">참가중</span>
            </li>
            <li className="flex h-14 w-20 flex-col items-center gap-y-2.5">
              <span className="font-title-medium-md font-semibold">1</span>
              <span className="font-body-regular-sm font-semibold">성공</span>
            </li>
            <li className="flex h-14 w-20 flex-col items-center gap-y-2.5">
              <span className="font-title-medium-md font-semibold">5</span>
              <span className="font-body-regular-sm font-semibold">완료</span>
            </li>
          </ul>
        </section>
      </Link>
      <ul className="mt-4 flex flex-col gap-y-8 text-gray-60">
        <li className="flex items-center justify-between">
          <span className="font-body-regular-lg font-semibold">알림</span>
          <Toggle
            size="lg"
            checked={isNotificationOn}
            // onClick={() => console.log('hi')}
            onClick={() => setIsNotificationOn((prev) => !prev)}
          />
        </li>
        <li className="flex items-center justify-between">
          <div className="flex-1">
            <span className="font-body-regular-sm font-semibold">
              기기의 알림이 꺼져있어요
            </span>
            <p className="font-caption-medium-md text-gray-50">
              거지방 반응, 자린고비 성장 등 서비스 관련 소식을 전달드릴게요
            </p>
          </div>
          <div className="flex-1  items-center justify-end">
            <Link href="alarm">
              <div className="flex items-center justify-end gap-x-2 text-primary">
                <span className="font-body-regular-sm font-semibold">
                  알림 설정
                </span>
                <IconArrowRight className="h-4 w-4 self-end stroke-black text-primary" />
              </div>
            </Link>
          </div>
        </li>
        <li className="flex items-center justify-between">
          <span className="font-body-regular-lg font-semibold">
            서비스 문의/피드백
          </span>
          <Link href="feedback">
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </li>
        <li className="flex items-center justify-between">
          <span className="font-body-regular-lg font-semibold">버전정보</span>
          <span>1.0.0</span>
        </li>
      </ul>
    </section>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
