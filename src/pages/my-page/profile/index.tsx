import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import {
  useUpdateUserProfile,
  useUserMyPage,
} from '@/features/profile/queries';
import { profileSchema } from '@/lib/validation/user';
import { updateImage } from '@/service/user';
import ProfileBottomSheet from '@/shared/components/bottom-sheet/ProfileBottomSheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/form/Form';
import ProfileHeader from '@/shared/components/layout/header/ProfileHeader';
import { TextInput } from '@/shared/components/text-input';
import { ImageInfo } from '@/shared/types/user';

const Profile = () => {
  const { data } = useUserMyPage();
  const updateUser = useUpdateUserProfile();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: {
      nickName: '',
    },
  });
  const [profileImage, setProfileImage] = useState<ImageInfo>({
    imageUrl: '',
  });

  const name = form.watch('nickName');

  const hasChanged =
    name !== data?.result.profile.nickname ||
    profileImage?.imageUrl !== data?.result.profile.imgUrl;

  useEffect(() => {
    if (!data) return;
    setProfileImage({
      ...profileImage,
      imageUrl: data.result.profile.imgUrl,
    });
    form.setValue('nickName', data.result.profile.nickname);
  }, [data]);

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    let imageUrl = '';
    if (profileImage.type && profileImage.image) {
      imageUrl = await updateImage({
        image: profileImage.image,
        type: profileImage.type,
      });
    }

    updateUser.mutate({
      nickName: values.nickName,
      imageUrl: imageUrl || data?.result.profile.imgUrl,
    });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImage({
      image: file,
      imageUrl: url,
      type: 'PROFILE',
    });
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="flex flex-col items-center px-5">
      <ProfileHeader hasChanged={hasChanged} />
      <ProfileBottomSheet
        user={data?.result.profile}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        isOpen={isBottomSheetOpen}
        profileImage={profileImage?.imageUrl || ''}
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
                    defaultValue={data?.result.profile.nickname}
                    maxLength={16}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Profile;
