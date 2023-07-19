import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useUserChallengeList } from '@/features/challenge/queries';
import { useAddSpendingMutation } from '@/features/spending/queries';
import { cn } from '@/lib/utils';
import { IconAdd } from '@/public/svgs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form';
import { contentMaxLength } from '@/shared/constant';
import { useToast } from '@/shared/hooks/useToast';
import { ChallengeEvaluation } from '@/shared/types/challenge';
import { ImageInfo } from '@/shared/types/user';
import { isActiveChallenge } from '@/shared/utils/date';

import { Button } from '../button';
import { ChipGroup } from '../chip';
import { Input } from '../input';
import { Label } from '../label';
import { TextInput } from '../text-input';
import { Textarea } from '../textarea';

import { spendSchema } from './schema';

const images = [
  { path: '/images/low', value: 'CRAZY', description: '미친거지' },
  { path: '/images/medium', value: 'REGRETFUL', description: '후회할거지' },
  { path: '/images/high', value: 'WELLDONE', description: '잘한거지' },
];

export default function SpendingForm() {
  const { data: challengeList, isError, isLoading } = useUserChallengeList();
  const activeChallengeList =
    challengeList?.result.participatedChallenges.filter(
      ({ duration: { startAt, endAt } }) =>
        isActiveChallenge({
          startAt,
          endAt,
        }),
    );
  const addSpending = useAddSpendingMutation();
  const [challengeId, setChallengeId] = useState<string>('');
  const [evaluation, setEvaluation] = useState<ChallengeEvaluation | undefined>(
    undefined,
  );
  const router = useRouter();
  const { setToastMessage } = useToast();
  const [image, setImage] = useState<ImageInfo>({
    imageUrl: '',
  });
  const form = useForm<z.infer<typeof spendSchema>>({
    resolver: zodResolver(spendSchema),
    defaultValues: {
      price: '',
      title: '',
      content: '',
    },
  });
  const content = form.watch('content');

  useEffect(() => {
    if (activeChallengeList?.length === 0) {
      router.push('/search');
      setToastMessage('진행 중인 챌린지가 없어요');
    }
  }, [activeChallengeList]);

  useEffect(() => {
    setChallengeId(String(activeChallengeList?.[0]?.challengeId));
  }, [challengeList]);

  const onSubmit = (values: z.infer<typeof spendSchema>) => {
    addSpending.mutate(
      {
        ...values,
        challengeId: Number(challengeId),
        imageInfo: image,
        evaluation,
      },
      {
        onSuccess: () => router.back(),
      },
    );
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage({
      image: file,
      imageUrl: url,
      type: 'RECORD',
    });
  };

  if (
    challengeList?.result.participatedChallenges.length === 0 ||
    isLoading ||
    isError
  )
    return null;

  return (
    <Form {...form}>
      <ChipGroup
        className="mb-4"
        initialChips={
          String(challengeList?.result.participatedChallenges[0].challengeId) ||
          ''
        }
        onChange={setChallengeId}
      >
        {activeChallengeList?.map((challenge) => (
          <ChipGroup.Chip
            key={challenge.challengeId}
            value={String(challenge.challengeId)}
          >
            {challenge.title}
          </ChipGroup.Chip>
        ))}
      </ChipGroup>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <div className="flex flex-col gap-y-4">
              <FormItem>
                <FormLabel>
                  <div className="mb-2 flex items-center gap-x-1">
                    <h4 className="font-caption-medium-lg font-semibold">
                      가격
                    </h4>
                    <p className="text-primary-dark">*</p>
                  </div>
                </FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="0"
                    type="number"
                    classNames={{
                      input: 'text-right',
                    }}
                    className="w-full"
                    rightSection={<span>원</span>}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <div className="flex flex-col gap-y-4 ">
              <FormItem>
                <FormLabel>
                  <div className="mb-2 flex items-center gap-x-1">
                    <h4 className="font-caption-medium-lg font-semibold">
                      지출명
                    </h4>
                    <p className="text-primary-dark">*</p>
                  </div>
                </FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="지출을 입력해주세요"
                    className="w-full"
                    maxLength={16}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <div className="flex flex-col items-start gap-y-2">
          <h4 className="font-caption-medium-lg font-semibold">사진</h4>
          <Label
            htmlFor="picture"
            className="flex h-[84px] w-[84px] items-center justify-center rounded-lg bg-gray-10"
          >
            {image.imageUrl ? (
              <div className="relative h-24 w-24">
                <Image
                  src={image.imageUrl}
                  alt="image"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ) : (
              <IconAdd className="h-4 w-4 text-gray-50" />
            )}
            <Input
              onChange={handleImageUpload}
              id="picture"
              type="file"
              accept="image/*"
            />
          </Label>
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <div className="flex flex-col gap-y-4">
              <FormItem>
                <FormLabel>
                  <div className="mb-2 flex gap-x-1">
                    <h4 className="font-caption-medium-lg font-semibold">
                      메모
                    </h4>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-y-4 rounded-lg bg-gray-10 p-4">
                    <Textarea
                      placeholder="메모를 입력해주세요"
                      className="w-full"
                      maxLength={contentMaxLength}
                      {...field}
                    />
                    <span className="font-body-regular-sm text-right text-gray-50">
                      {content ? content.length : 0} / {contentMaxLength}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <div>
          <h4 className="font-caption-medium-lg font-semibold">내 지출 평가</h4>
          <div className="flex justify-around gap-x-5 pt-5">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center gap-y-1"
              >
                {image.value === evaluation && (
                  <Image
                    src="/images/check.png"
                    width={24}
                    height={24}
                    alt="check"
                    className="absolute right-0 top-0"
                  />
                )}
                <Image
                  onClick={() =>
                    setEvaluation(image.value as ChallengeEvaluation)
                  }
                  className={cn('cursor-pointer rounded-sm')}
                  src={`${image.path}${
                    image.value === evaluation ? '-check' : ''
                  }.png`}
                  width={64}
                  height={64}
                  alt={image.value}
                />
                <span className="font-caption-medium-sm text-gray-60">
                  {image.description}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Button
          disabled={addSpending.isLoading}
          type="submit"
          className="w-full"
          size="lg"
        >
          완료
        </Button>
      </form>
    </Form>
  );
}
