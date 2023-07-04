import Image from 'next/image';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { useUserChallengeList } from '@/features/record/queries';
import { cn } from '@/lib/utils';
import { IconArrowLeft } from '@/public/svgs';
import { Button } from '@/shared/components/button';
import { ChipGroup } from '@/shared/components/chip';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/Form';
import BottomNavLayout from '@/shared/components/layout/BottomNavLayout';
import { TextInput } from '@/shared/components/text-input';
import { Textarea } from '@/shared/components/textarea';

export const memoMaxLength = 80;
export const spendSchema = z.object({
  price: z.number().positive().int(),
  title: z.string().max(16),
  memo: z.string().max(memoMaxLength),
});
const images = [
  { src: '/images/low.png', alt: 'low' },
  { src: '/images/medium.png', alt: 'medium' },
  { src: '/images/high.png', alt: 'high' },
];

export default function CostPage() {
  const { data: challengeList } = useUserChallengeList();
  const form = useForm<z.infer<typeof spendSchema>>();
  const [selected, setSelected] = useState<null | number>(null);
  const onSubmit = (values: z.infer<typeof spendSchema>) => {
    console.log(values);
  };
  console.log(challengeList?.result.participatedChallenges);

  const memo = form.watch('memo');
  return (
    <>
      <header className="border-b-gray20 flex h-12 items-center justify-center border-b-[1px] px-5">
        <IconArrowLeft className="absolute left-4 h-6 w-6" />
        <h1>지출 추가</h1>
      </header>
      <article className="px-5 pt-6">
        <div className="pb-4">
          <div className="mb-2 flex gap-x-1">
            <h4>거지방</h4>
            <p className="text-primary-dark">*</p>
          </div>
          {challengeList && (
            <ChipGroup
              initialChips={
                challengeList?.result.participatedChallenges[0].title
              }
            >
              {challengeList?.result.participatedChallenges.map((challenge) => (
                <ChipGroup.Chip
                  key={challenge.challengeId}
                  value={challenge.title}
                >
                  {challenge.title}
                </ChipGroup.Chip>
              ))}
            </ChipGroup>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <div className="flex flex-col gap-y-4">
                  <FormItem>
                    <FormLabel>
                      <div className="mb-2 flex gap-x-1">
                        <h4>가격</h4>
                        <p className="text-primary-dark">*</p>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <TextInput
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
                <div className="flex flex-col gap-y-4">
                  <FormItem>
                    <FormLabel>
                      <div className="mb-2 flex gap-x-1">
                        <h4>지출명</h4>
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
            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <div className="flex flex-col gap-y-4">
                  <FormItem>
                    <FormLabel>
                      <div className="mb-2 flex gap-x-1">
                        <h4>지출명</h4>
                        <p className="text-primary-dark">*</p>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-y-4 rounded-lg bg-gray-10 p-4">
                        <Textarea
                          placeholder="메모를 입력해주세요"
                          className="w-full"
                          maxLength={16}
                          {...field}
                        />
                        <span className="font-body-regular-sm text-right text-gray-50">
                          {memo ? memo.length : 0} / {memoMaxLength}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <div>
              <h4>내 지출 평가</h4>
              <div className="flex justify-center gap-x-5 pt-5">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    onClick={() => setSelected(index)}
                    className={cn('cursor-pointer rounded-sm', {
                      'bg-gray-30': index === selected,
                    })}
                    src={image.src}
                    width={40}
                    height={40}
                    alt={image.alt}
                  />
                ))}
              </div>
            </div>
            <Button className="w-full" size="lg">
              완료
            </Button>
          </form>
        </Form>
      </article>
    </>
  );
}

CostPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomNavLayout>{page}</BottomNavLayout>;
};
