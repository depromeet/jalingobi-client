import Link from 'next/link';
import React from 'react';

import { IconArrowLeft } from '@/public/svgs';
import { Button } from '@/shared/components/button';

type Props = {
  hasChanged: boolean;
};

const ProfileHeader = ({ hasChanged }: Props) => {
  return (
    <header className="mb-10 flex h-12 w-full items-center justify-between">
      <Link href="/my-page">
        <IconArrowLeft className="h-4 w-4" />
      </Link>
      <h1 className="font-title-medium-md font-semibold">프로필 수정</h1>
      <Button
        variant="label"
        size="xxs"
        type="submit"
        form="profile-form"
        disabled={!hasChanged}
      >
        완료
      </Button>
    </header>
  );
};

export default ProfileHeader;
