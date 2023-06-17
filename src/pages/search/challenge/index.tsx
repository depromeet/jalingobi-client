import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { IconArrowLeft, IconX } from '@/public/svgs';

const ChallengeDetailPage = () => {
  return (
    <div className="px-5">
      <header className="relative flex h-[300px] items-center justify-center bg-[#9ADEE3] p-0">
        <Link href="/search" className="absolute left-[22px] top-[16px]">
          <IconArrowLeft className="h-4 w-4" />
        </Link>
        <Image
          src="/images/baemin.png"
          width={227}
          height={224}
          alt="item"
          className="relative top-5 mx-auto"
        />
      </header>
      <ul className="mt-4 flex flex-col gap-y-1 text-gray-60">
        <li className="flex items-center justify-between">
          <span className="font-caption-medium-md text-gray-50">30일 동안</span>
        </li>
        <li className="flex items-center justify-between">
          <h3 className="font-title-medium-sm text-black">
            커피 5만원 이하로 쓰기
          </h3>
        </li>
        <li className="flex items-center justify-between">
          <span className="font-caption-medium-md text-gray-50">34명/50명</span>
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
        </li>
        <li className="flex items-center justify-between">
          <div className="flex-1  items-center justify-end">
            <section className="flex h-[123px] rounded-lg bg-gray-5 p-5 text-sm text-gray-60">
              <div className="font-caption-medium-md text-sm text-gray-50">
                규칙
              </div>
              <div className="flex items-center justify-end gap-x-2 pl-3">
                <ul className="text-gray-60">
                  <li className="flex items-center">
                    <div className="font-caption-medium-md text-sm text-gray-50">
                      <IconX />
                      지출내역을 1회 이상 추가하기
                    </div>
                  </li>
                  <li className="flex items-center">
                    <span className="font-caption-medium-md text-sm text-gray-50">
                      <IconX /> 지출내역을 1회 이상 추가하기
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-caption-medium-md text-sm text-gray-50">
                      <IconX /> 지출내역을 1회 이상 추가하기
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </li>
        <li className="flex items-center justify-between">
          <span className="font-caption-medium-md text-gray-50">
            #배달값 줄이기 #배달 #요기요 #배달의 민족
          </span>
        </li>
      </ul>
      <ul className="mt-4 flex flex-col gap-y-2 text-gray-60">
        <hr className="solid" />
        <li className="flex items-center justify-between">
          <div className="flex-1">
            <span className="font-body-regular-sm font-semibold">
              참여 인원
            </span>
          </div>
          <div className="flex items-center justify-end gap-x-2">
            <span className="font-body-regular-sm">34명</span>
          </div>
        </li>
        <hr className="solid" />
        <li className="flex items-center justify-between">
          <div className="flex h-10 w-10 bg-[#9EA3AD]">img</div>
          <span className="font-body-regular-sm flex-1 font-semibold">
            마라탕만 줄여도 부자
          </span>
          <div className="flex items-center justify-end gap-x-2">
            <span className="font-body-regular-sm">34명</span>
          </div>
        </li>
        <hr className="solid" />

        <li className="flex items-center justify-between">
          <div className="flex h-10 w-10 bg-[#9EA3AD]">img</div>
          <span className="font-body-regular-sm flex-1 font-semibold">
            마라탕만 줄여도 부자
          </span>
          <div className="flex items-center justify-end gap-x-2">
            <span className="font-body-regular-sm">34명</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default ChallengeDetailPage;
