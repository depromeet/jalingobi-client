import Link from 'next/link';
import React from 'react';

import { IconArrowLeft, IconArrowRight } from '@/public/svgs';

const ManagePage = () => {
  return (
    <section>
      <header className="relative flex h-12 w-full items-center justify-center">
        <Link href="/my-page" className="absolute left-0">
          <IconArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="font-title-medium-sm font-semibold">관리</h1>
      </header>
      <ul className="flex flex-col font-semibold text-gray-60">
        <li className="flex items-center justify-between py-4">
          <span>이용약관</span>
          <Link href="/my-page/rules">
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </li>
        <li className="flex items-center justify-between py-4">
          <span>개인정보보호정책</span>
          <Link href="/my-page/privacy">
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </li>
        <li className="flex items-center justify-between py-4">
          <span>로그아웃</span>
        </li>
        <li className="flex items-center justify-between py-4">
          <span className="text-system-danger">회원탈퇴</span>
        </li>
      </ul>
    </section>
  );
};

export default ManagePage;
