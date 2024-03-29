import Link from 'next/link';
import { ReactElement } from 'react';

import Board from '@/features/profile/Board';
import Profile from '@/features/profile/Profile';
import { useUserMyPage } from '@/features/profile/queries';
import { version } from '@/package.json';
import { IconArrowRight, IconSettings } from '@/public/svgs';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';

export default function MyPage() {
  const { data } = useUserMyPage();
  // const [isNotificationOn, setIsNotificationOn] = useState(false);

  return (
    <div className="px-5">
      <header className="mb-4 flex h-12 items-center justify-between">
        <span className="font-title-medium-md">마이페이지</span>
        <Link href="/my-page/settings">
          <IconSettings />
        </Link>
      </header>
      <Profile profile={data?.result.profile} />
      <Board board={data?.result.userChallengeResult} />
      <ul className="mt-4 flex flex-col gap-y-8 text-gray-60">
        {/* <li className="flex items-center justify-between"> */}
        {/*  <span className="font-body-regular-lg font-semibold">알림</span> */}
        {/*  <Toggle */}
        {/*    size="lg" */}
        {/*    checked={isNotificationOn} */}
        {/*    onClick={() => setIsNotificationOn((prev) => !prev)} */}
        {/*  /> */}
        {/* </li> */}
        {/* <li className="flex items-center justify-between"> */}
        {/*  <div className="flex-1"> */}
        {/*    <span className="font-body-regular-sm font-semibold"> */}
        {/*      기기의 알림이 꺼져있어요 */}
        {/*    </span> */}
        {/*    <p className="font-caption-medium-md text-gray-50"> */}
        {/*      거지방 반응, 자린고비 성장 등 서비스 관련 소식을 전달드릴게요 */}
        {/*    </p> */}
        {/*  </div> */}
        {/*  <div className="flex-1  items-center justify-end"> */}
        {/*    <Link href="/alarm"> */}
        {/*      <div className="flex items-center justify-end gap-x-2 text-primary"> */}
        {/*        <span className="font-body-regular-sm font-semibold"> */}
        {/*          알림 설정 */}
        {/*        </span> */}
        {/*        <IconArrowRight className="h-4 w-4 self-end stroke-black text-primary" /> */}
        {/*      </div> */}
        {/*    </Link> */}
        {/*  </div> */}
        {/* </li> */}
        <a href="https://forms.gle/mWu4VMtTR2rjgJPv8" target="_blank">
          <li className="flex items-center justify-between">
            <span className="font-body-regular-lg font-semibold">
              서비스 문의/피드백
            </span>
            <IconArrowRight />
          </li>
        </a>
        <li className="flex items-center justify-between">
          <span className="font-body-regular-lg font-semibold">버전정보</span>
          <span>{version}</span>
        </li>
      </ul>
    </div>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
