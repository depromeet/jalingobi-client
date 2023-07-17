import { z } from 'zod';

import { contentMaxLength, maxPrice } from '@/shared/constant';

export const spendSchema = z.object({
  price: z
    .string()
    .transform((year) => Number(year))
    .pipe(
      z
        .number()
        .positive({
          message: '금액은 0원 이상이어야 합니다.',
        })
        .max(maxPrice, {
          message: `${maxPrice}원 이하로 입력해주세요`,
        }),
    )
    .transform((year) => year.toString()),
  title: z
    .string()
    .max(16, {
      message: '지출명은 16자 이내로 입력해주세요',
    })
    .min(1, {
      message: '지출명을 입력해주세요',
    }),
  content: z.string().max(contentMaxLength, {
    message: `${contentMaxLength}자 이하로 작성해주세요`,
  }),
});
