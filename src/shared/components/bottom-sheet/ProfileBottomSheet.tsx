import React from 'react';

import { Input } from '@/shared/components/input';
import { Label } from '@/shared/components/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/components/sheet';

import { ImageLoader } from '../image';

type Props = {
  profileImage: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const ProfileBottomSheet = ({
  profileImage,
  handleImageUpload,
  isOpen,
  onOpenChange,
}: Props) => {
  return (
    <div className="relative mb-[60px]">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <div>
            <div className="absolute -bottom-4 -right-4 h-11 w-11 rounded-full bg-gray-20" />
            {profileImage && (
              <ImageLoader
                src={profileImage}
                alt="avatar"
                width="90"
                height="90"
                className="rounded-xl"
              />
            )}
          </div>
        </SheetTrigger>
        <SheetContent
          position="bottom"
          size="content"
          className="rounded-t-2xl bg-white"
        >
          <SheetHeader>
            <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-xl bg-gray-30" />
          </SheetHeader>
          <ul className="flex flex-col gap-y-2.5 text-gray-70">
            <li className="py-2.5">
              <Label htmlFor="picture" className="font-body-regular-lg">
                앨범에서 선택
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </li>
            <li className="font-body-regular-lg py-2.5">
              내 자린고비 이미지로 변경
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfileBottomSheet;
