import { z } from 'zod';

import { spendSchema } from '../components/form/schema';

import { ChallengeEvaluation } from './challenge';

export type Spending = {
  challengeId: number;
  imageUrl?: string;
  evaluation?: ChallengeEvaluation;
} & z.infer<typeof spendSchema>;
