import {
  ChallengeFilter,
  ChallengeResponse,
  ChallengeSearchResponse,
} from '@/shared/types/challenge';
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

export const searchChallengeList = async ({
  category,
  filter,
  sortedType,
}: ChallengeFilter): Promise<ChallengeSearchResponse> => {
  const { data } = await httpClient.get('/challenge/search', {
    params: {
      category: category === 'ALL' ? '' : category,
      filter,
      sortedType: sortedType === '금액 낮은순' ? 'price' : '',
    },
  });
  return data;
};

export const fetchChallengeById = async (
  id: number,
): Promise<ChallengeResponse> => {
  const { data } = await httpClient.get(`/challenge/${id}`);
  return data;
};

export const joinChallenge = async (
  id?: number,
): Promise<ChallengeResponse> => {
  return httpClient.post(`/challenge/join/${id}`);
};
