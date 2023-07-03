import {
  ChallengeDetailRequest,
  ChallengeDetailResponse,
} from '@/shared/types/feed';

import { httpClient } from '.';

export const getChallengeDetail = async ({
  challengeId,
  recordId,
}: ChallengeDetailRequest): Promise<ChallengeDetailResponse> => {
  const response = await httpClient.get(`/record/${challengeId}/${recordId}`);

  return response.data;
};
