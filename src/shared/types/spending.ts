import { z } from 'zod';

import { spendSchema } from '../components/form/schema';

import { ImageInfo } from './user';

export type Spending = {
  poorRoom: string;
  imageInfo?: ImageInfo;
} & z.infer<typeof spendSchema>;
