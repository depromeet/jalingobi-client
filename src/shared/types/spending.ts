import { z } from 'zod';

import { spendSchema } from '../components/form/schema';

import { ChallengeEvaluation } from './challenge';
import { ImageInfo } from './user';

export type Spending = {
  challengeId: number;
  imageInfo?: ImageInfo;
  evaluation?: ChallengeEvaluation;
} & z.infer<typeof spendSchema>;
