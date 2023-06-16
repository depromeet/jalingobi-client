import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import {
  useUpdateUserProfile,
  useUserProfile,
} from '@/features/profile/queries';
import ProfileBottomSheet from '@/pages/my-page/profile/ProfileBottomSheet';
import ProfileHeader from '@/pages/my-page/profile/ProfileHeader';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/form/Form';
import { TextInput } from '@/shared/components/text-input';

const formSchema = z.object({
  nickName: z
    .string()
    .min(1, {
      message: '유저 이름은 1글자 이상이어야 합니다.',
    })
    .max(16, {
      message: '유저 이름은 16글자를 초과할 수 없습니다.',
    }),
});

const Profile = () => {
  const { data } = useUserProfile();
  const { mutate } = useUpdateUserProfile();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      nickName: '',
    },
  });
  const [profileImage, setProfileImage] = useState<string>('');

  const name = form.watch('nickName');
  const hasChanged =
    name !== data?.result.profile.name ||
    profileImage !== data?.result.profile.imgUrl;

  useEffect(() => {
    if (!data) return;
    setProfileImage(data.result.profile.imgUrl);
    form.setValue('nickName', data.result.profile.name);
  }, [data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      nickName: values.nickName,
      profileImgUrl: profileImage,
    });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <body className="flex flex-col items-center">
      <ProfileHeader hasChanged={hasChanged} />
      <ProfileBottomSheet
        profileImage={profileImage}
        handleImageUpload={handleImageUpload}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="profile-form"
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="nickName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextInput
                    {...field}
                    className="w-full"
                    placeholder="이름을 입력해주세요"
                    defaultValue={data?.result.profile.name}
                    maxLength={16}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </body>
  );
};

export default Profile;
