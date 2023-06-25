import { z } from 'zod';

export const profileSchema = z.object({
  nickName: z
    .string()
    .min(1, {
      message: '유저 이름은 1글자 이상이어야 합니다.',
    })
    .max(16, {
      message: '유저 이름은 16글자를 초과할 수 없습니다.',
    }),
});
