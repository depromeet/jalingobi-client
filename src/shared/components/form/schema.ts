import { z } from 'zod';

import { memoMaxLength } from '@/shared/constant';

export const spendSchema = z.object({
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number({
        invalid_type_error: '금액은 숫자여야 합니다.',
      })
      .positive({
        message: '금액은 정수여야 합니다.',
      }),
  ),
  title: z
    .string()
    .max(16, {
      message: '지출명은 16자 이내로 입력해주세요',
    })
    .min(1, {
      message: '지출명을 입력해주세요',
    }),
  memo: z.string().max(memoMaxLength),
});
