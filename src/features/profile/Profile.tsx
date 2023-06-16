import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { IconArrowRight } from '@/public/svgs';
import { Profile } from '@/types/user';

type Props = {
  profile?: Profile;
};

const Profile = ({ profile }: Props) => {
  return (
    <section className="flex items-center justify-start pb-4">
      <Image
        src={profile?.imgUrl || ''}
        alt="profile"
        width={60}
        height={60}
        className="mr-6"
      />
      <Link
        href="/my-page/profile"
        className="flex items-center gap-x-2 text-right"
      >
        <span className="font-title-medium-sm font-semibold">
          {profile?.name}
        </span>
        <IconArrowRight className="h-4 w-4 " />
      </Link>
    </section>
  );
};

export default Profile;
