import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useUserChallengeList } from '@/features/record/queries';
import { IconChevronLeft } from '@/public/svgs';
import SpendingForm from '@/shared/components/form/SpendingForm';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';
import { useToast } from '@/shared/hooks/useToast';

export default function CostPage() {
  const { data } = useUserChallengeList();
  const router = useRouter();
  const { setToastMessage } = useToast();

  useEffect(() => {
    if (!data) return;
    if (data.result.participatedChallenges.length === 0) {
      setToastMessage('거지방에 참여한 뒤 지출을 추가할 수 있어요');
      router.push('/search');
    }
  }, [data]);

  return (
    <div className="flex flex-col overflow-y-auto">
      <header className="border-b-gray20 relative flex h-12 items-center justify-center border-b-[1px] px-5">
        <Link href="/search" className="absolute left-4">
          <IconChevronLeft className="h-6 w-6" />
        </Link>
        <h1>지출 추가</h1>
      </header>
      <main className="px-5 pt-6">
        <div className="pb-4">
          <div className="mb-2 flex gap-x-1">
            <h4>거지방</h4>
            <p className="text-primary-dark">*</p>
          </div>
          <SpendingForm />
        </div>
      </main>
    </div>
  );
}

CostPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
