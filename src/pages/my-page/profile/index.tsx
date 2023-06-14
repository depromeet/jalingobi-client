import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { IconArrowLeft } from '@/public/svgs';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Label } from '@/shared/components/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/components/sheet';
import { TextInput } from '@/shared/components/text-input';

const formSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: '유저 이름은 1글자 이상이어야 합니다.',
    })
    .max(16, {
      message: '유저 이름은 16글자를 초과할 수 없습니다.',
    }),
});

const Profile = () => {
  const { register, getValues } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  // TODO1: 프로필 이미지, 닉네임 변경 여부에 따라 완료 버튼 활성화
  // const [hasChanged, setHasChanged] = useState(false);
  const handleSubmit = () => {
    const { username } = getValues();
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <section className="flex flex-col items-center">
      <header className="mb-10 flex h-12 w-full items-center justify-between">
        <Link href="/my-page">
          <IconArrowLeft className="h-4 w-4 " />
        </Link>
        <h1 className="font-title-medium-md font-semibold">프로필 수정</h1>
        <Button variant="label" size="xxs" onClick={handleSubmit}>
          완료
        </Button>
      </header>
      <div className="relative mb-10">
        <Sheet>
          <SheetTrigger asChild>
            <div>
              <div className="absolute -bottom-4 -right-4 h-11 w-11 rounded-full bg-gray-20" />
              <Image
                src={profileImage || '/images/profile.png'}
                alt="avatar"
                width="90"
                height="90"
                className="rounded-xl"
              />
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
      <form className="w-full">
        <TextInput
          {...register('username')}
          countLength={16}
          className="w-full bg-gray-5"
          placeholder="이름을 입력해주세요"
        />
      </form>
    </section>
  );
};

export default Profile;
