import Link from 'next/link';

import { IconArrowRight } from '@/public/svgs';
import { ImageLoader } from '@/shared/components/image';
import { Profile } from '@/shared/types/user';

type Props = {
  profile?: Profile;
};

const Profile = ({ profile }: Props) => {
  return (
    <section className="flex items-center justify-start pb-4">
      <div className="relative mr-6 h-[60px] w-[60px]">
        <ImageLoader
          src={profile?.imgUrl || ''}
          alt="profile"
          fill
          className="rounded-[10px] object-cover"
        />
      </div>
      <Link
        href="/my-page/profile"
        className="flex items-center gap-x-2 text-right"
      >
        <span className="font-title-medium-sm font-semibold">
          {profile?.nickname}
        </span>
        <IconArrowRight />
      </Link>
    </section>
  );
};

export default Profile;
