import Link from 'next/link';
import React from 'react';

import { ChallengeStatus } from '@/shared/types/user';

type Props = {
  board?: Partial<ChallengeStatus>;
};
const Board = ({ board }: Props) => {
  return (
    <Link href="/my-page/record">
      <section className="h-24 rounded-lg bg-gray-5 p-5 text-gray-60">
        <ul className="flex justify-center gap-x-5">
          <li className="flex h-14 w-20 flex-col items-center gap-y-2.5">
            <span className="font-title-medium-md font-semibold">
              {board?.PROCEEDING}
            </span>
            <span className="font-body-regular-sm font-semibold">참가중</span>
          </li>
          <li className="flex h-14 w-20 flex-col items-center gap-y-2.5">
            <span className="font-title-medium-md font-semibold">
              {board?.SUCCESS}
            </span>
            <span className="font-body-regular-sm font-semibold">성공</span>
          </li>
          <li className="flex h-14 w-20 flex-col items-center gap-y-2.5">
            <span className="font-title-medium-md font-semibold">
              {board?.COMPLETED}
            </span>
            <span className="font-body-regular-sm font-semibold">완료</span>
          </li>
        </ul>
      </section>
    </Link>
  );
};

export default Board;
