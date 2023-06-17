import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';

import { IconCircle, IconSearch, IconTimer } from '@/public/svgs';
import { ChipGroup } from '@/shared/components/chip';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';
import { Toggle } from '@/shared/components/toggle';

export default function Search() {
  const [isCheckedOnlyOnGoingRoom, setIsCheckedOnlyOnGoingRoom] =
    useState(false);
  return (
    <div className="px-5">
      <header className="mb-4 flex h-12 items-center justify-between">
        <span className="font-title-medium-md">거지방 탐색</span>
      </header>
      <ul className="mt-4 flex flex-col gap-y-8 text-gray-60">
        <li className="flex items-center justify-between">
          <span className="font-body-regular-lg font-semibold">
            <ChipGroup initialChips="chip1">
              <ChipGroup.Chip value="chip1">전체</ChipGroup.Chip>
              <ChipGroup.Chip value="chip2">
                <IconSearch className="mr-1 h-6 w-6" />
                식비
              </ChipGroup.Chip>
              <ChipGroup.Chip value="chip3">
                <IconSearch className="mr-1 h-6 w-6" />
                문화생활
              </ChipGroup.Chip>
              <ChipGroup.Chip value="chip4">
                <IconSearch className="mr-1 h-6 w-6" />
                취미
              </ChipGroup.Chip>
            </ChipGroup>
          </span>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex-1">
            <span className="font-body-regular-sm font-semibold">
              모집 중인 방만 보기
              <Toggle
                checked={isCheckedOnlyOnGoingRoom}
                onClick={() => setIsCheckedOnlyOnGoingRoom((prev) => !prev)}
              />
            </span>
          </div>
          <div className="flex items-center justify-end gap-x-2">
            <span className="font-body-regular-sm">인원순 드랍다운</span>
          </div>
        </li>
        <li className="flex">
          <span className="font-body-regular-lg w-full font-semibold">
            {/* // Link current not working */}
            <Link href="/search/challenge">
              <section className="flex h-[123px] rounded-lg bg-gray-5 p-5 text-gray-60">
                <Image
                  src=""
                  alt="profile"
                  width={54}
                  height={54}
                  className="mr-6"
                />
                <div className="flex items-center justify-end gap-x-2">
                  <ul className="text-gray-60">
                    <li className="flex items-center">
                      <IconCircle className="h-4 w-4" />
                      <span className="font-caption-medium-sm col-span-3 text-gray-50">
                        3/10명
                        <span className="text-red-400">마감임박</span>
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-body-regular-lg text-black">
                        커피 5만원 이하로 쓰기
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-caption-medium-sm text-gray-50">
                        #카페인줄이기 #커피값 #커피
                      </span>
                    </li>
                    <li className="flex items-center">
                      <IconTimer className="h-4 w-4 self-end stroke-black text-primary" />
                      <span className="font-caption-medium-sm text-gray-50">
                        내일 시작 / 30일 동안
                      </span>
                    </li>
                  </ul>
                </div>
              </section>
            </Link>
          </span>
        </li>
        <li className="flex items-center justify-between">
          {/* <span className="font-body-regular-lg font-semibold">버전정보</span> */}
          {/* <span>1.0.0</span> */}
        </li>
      </ul>
    </div>
  );
}
Search.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
