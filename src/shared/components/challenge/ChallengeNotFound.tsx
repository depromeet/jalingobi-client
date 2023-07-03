import React from 'react';

import { Button } from '../button';

export default function ChallengeNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-5">
      <p className="font-body-regular-lg text-gray-60">
        아직 아무기록이 없어요
      </p>
      <Button size="md">거지방 둘러보러 가기</Button>
    </div>
  );
}
