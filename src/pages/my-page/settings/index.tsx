import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IconArrowLeft, IconArrowRight } from '@/public/svgs';
import { drop, logout } from '@/service/auth';
import { Spacing } from '@/shared/components';
import { Button } from '@/shared/components/button';
import { Modal } from '@/shared/components/modal';
import { useToast } from '@/shared/hooks/useToast';

const ManagePage = () => {
  const router = useRouter();
  const { setToastMessage } = useToast();

  const dropAndToast = () => {
    router.push('/search');
    setToastMessage('회원탈퇴가 완료되었습니다');
    drop();
  };

  const logoutAndToast = () => {
    router.push('/search');
    setToastMessage('로그아웃 되었습니다');
    logout();
  };

  return (
    <div className="px-5">
      <header className="relative flex h-12 w-full items-center justify-center">
        <Link href="/my-page" className="absolute left-0">
          <IconArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="font-title-medium-sm font-semibold">관리</h1>
      </header>
      <ul className="flex flex-col font-semibold text-gray-60">
        <li className="flex items-center justify-between py-4">
          <span>이용약관</span>
          <Link href="/my-page/rules">
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </li>
        <li className="flex items-center justify-between py-4">
          <span>개인정보보호정책</span>
          <Link href="/my-page/privacy">
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </li>
        <button type="button" onClick={logoutAndToast}>
          <li className="flex items-center justify-between py-4">
            <span>로그아웃</span>
          </li>
        </button>
        <Modal
          trigger={
            <button type="button">
              <li className="flex items-center justify-between py-4">
                <span className="text-system-danger">회원탈퇴</span>
              </li>
            </button>
          }
        >
          <div className="flex flex-col items-center justify-center px-[5px]">
            <div className="flex items-center justify-center text-black">
              <p className="font-title-medium-sm font-semibold">회원탈퇴</p>
            </div>
            <Spacing height={20} />
            <Image
              src="/images/fish-with-tear.png"
              alt="avatar"
              width="260"
              height="120"
            />
            <div className="flex flex-col items-center">
              <Spacing height={20} />
              <p className="font-body-regular-sm">
                정말로 자린고비를 떠나시나요?
              </p>
              <p className="font-body-regular-sm">자린고비 탈퇴시 지출내역과</p>
              <p className="font-body-regular-sm">캐릭터 레벨이 삭제됩니다.</p>
              <Spacing height={20} />
              <div className="font-body-regular-sm flex items-center justify-center">
                <p className="font-semibold text-primary">
                  언제든 자린고비로 돌아와주세요
                </p>
              </div>
            </div>
            <Spacing height={32} />
            <Button size="md">
              <span className="font-button-medium-sm">취소</span>
            </Button>
            <Spacing height={6} />
            <Button size="md" variant="label" onClick={dropAndToast}>
              <span className="font-button-medium-sm text-gray-60">
                탈퇴하기
              </span>
            </Button>
          </div>
        </Modal>
      </ul>
    </div>
  );
};

export default ManagePage;
