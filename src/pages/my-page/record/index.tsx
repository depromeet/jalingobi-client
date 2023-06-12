import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';
import { IconArrowLeft } from '@/public/svgs';
import { Chip, ChipGroup } from '@/shared/components/chip';

type RecordCategories = '참가중' | '성공' | '완료';

const recordCategories: RecordCategories[] = ['참가중', '성공', '완료'];
const RecordPage = () => {
  const [selected, setSelected] = React.useState<RecordCategories>('참가중');

  const select = (category: RecordCategories) => {
    setSelected(category);
  };

  return (
    <section>
      <header className="relative flex h-12 items-center justify-center">
        <Link href="/my-page" className="absolute left-0">
          <IconArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="font-title-medium-sm">거지방 기록</h1>
      </header>

      <ul className="flex h-[3.25rem] overflow-x-scroll">
        {recordCategories.map((category, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            key={index}
            onClick={() => select(category)}
            className={cn(
              `font-body-regular-lg flex flex-1 items-center justify-center font-semibold text-gray-50 transition-colors duration-500`,
              {
                'border-b-2 border-primary text-primary': selected === category,
              },
            )}
          >
            {category}
          </li>
        ))}
      </ul>
      <ChipGroup initialChips="전체" className="py-5">
        <Chip value="전체">전체</Chip>
        <Chip value="식비">식비</Chip>
        <Chip value="문화생활">문화생활</Chip>
        <Chip value="취미">취미</Chip>
      </ChipGroup>

      <ul className="">
        <li className="grid min-h-[130px] w-full grid-cols-4 rounded-md bg-gray-5">
          <div className="">
            <Image
              src="/images/avatar.png"
              width={54}
              height={54}
              alt="item"
              className="relative top-5 mx-auto"
            />
          </div>
          <div className="col-span-3">
            <div>
              <span className="font-caption-medium-md font-semibold text-gray-5">
                3/10명
              </span>
              <span className="text-red-400">마감임박</span>
            </div>
            <h3 className="font-title-medium-sm">커피 5만원 이하로 쓰기</h3>

            <span>#카페인 줄이기</span>
            <div>
              <span>5일 후 시작/ 30일 동안</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default RecordPage;
