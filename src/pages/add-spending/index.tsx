import { useRouter } from 'next/router';
import React from 'react';

import { IconChevronLeft } from '@/public/svgs';
import SpendingForm from '@/shared/components/form/SpendingForm';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';

export default function CostPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col overflow-y-auto">
      <header className="border-b-gray20 relative flex h-12 items-center justify-center border-b-[1px] px-5">
        <button
          type="button"
          className="absolute left-4"
          onClick={() => router.back()}
        >
          <IconChevronLeft className="h-6 w-6" />
        </button>
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
