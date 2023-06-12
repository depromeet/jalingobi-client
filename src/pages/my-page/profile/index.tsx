import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { IconArrowLeft } from '@/public/svgs';
import { Button } from '@/shared/components/button';
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
  const handleSubmit = () => {
    const { username } = getValues();
    console.log(username);
  };

  return (
    <section className="flex flex-col items-center">
      <header className="flex h-12 w-full items-center justify-between">
        <IconArrowLeft className="h-4 w-4 " />
        <h1>프로필 수정</h1>
        <Button variant="label" size="xs" onClick={handleSubmit}>
          완료
        </Button>
      </header>
      <div className="mb-16 mt-10">
        <Image
          src="/images/avatar.png"
          alt="avatar"
          width="90"
          height={90}
          className="rounded-xl"
        />
      </div>

      <form>
        <TextInput
          {...register('username')}
          countLength={16}
          className="bg-gray-5"
          placeholder="이름을 입력해주세요"
        />
      </form>
    </section>
  );
};

export default Profile;
