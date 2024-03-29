import Image from 'next/image';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { useUpdateUserProfile } from '@/features/profile/queries';
import { fetchUserDefaultImage } from '@/service/user';
import { Input } from '@/shared/components/input';
import { Label } from '@/shared/components/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/components/sheet';
import { Profile } from '@/shared/types/user';

type Props = {
  user?: Profile;
  profileImage: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpen?: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileBottomSheet = ({
  user,
  profileImage,
  handleImageUpload,
  isOpen,
  setIsBottomSheetOpen,
}: Props) => {
  const { data } = useQuery({
    queryKey: ['user', 'defaultImage'],
    queryFn: fetchUserDefaultImage,
  });
  const { mutate } = useUpdateUserProfile();

  const updateUserImage = async () => {
    mutate({
      nickName: user?.nickname,
      imageUrl: data?.result.imgUrl,
    });
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="relative mb-[60px]">
      <Sheet open={isOpen} onOpenChange={setIsBottomSheetOpen}>
        <SheetTrigger asChild>
          <div className="relative h-[90px] w-[90px]">
            <div className="absolute -bottom-4 -right-4 h-8 w-8 rounded-full bg-gray-20 p-1">
              <Image
                src="/images/camera.png"
                width={24}
                height={24}
                alt="profile-change"
              />
            </div>
            {profileImage && (
              <Image
                src={profileImage}
                alt="avatar"
                fill
                className="-z-10 rounded-lg object-cover"
              />
            )}
          </div>
        </SheetTrigger>
        <SheetContent
          position="bottom"
          size="content"
          className="rounded-t-2xl bg-white"
        >
          <SheetHeader className="h-2.5">
            <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-xl bg-gray-30" />
          </SheetHeader>
          <ul className="font-body-regular-lg flex flex-col gap-y-2.5 px-5 text-gray-70">
            <li className="py-2.5">
              <Label htmlFor="picture">앨범에서 선택</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </li>
            <li className="py-2.5">
              <button type="button" onClick={updateUserImage}>
                내 자린고비 이미지로 변경
              </button>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfileBottomSheet;
