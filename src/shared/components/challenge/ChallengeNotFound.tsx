import Link from 'next/link';

import { Button } from '../button';

export default function ChallengeNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-5">
      <h2 className="font-body-regular-lg text-gray-60">
        아직 아무기록이 없어요
      </h2>
      <Link href="/search">
        <Button size="md">거지방 둘러보러 가기</Button>
      </Link>
    </div>
  );
}
