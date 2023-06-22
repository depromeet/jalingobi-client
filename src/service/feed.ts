import {
  ChallengeRoomFeedListRequest,
  ChallengeRoomFeedListResponse,
  MyRoomFeedListResponse,
} from '@/types/feed';

import { httpClient } from '.';

export const getChallengeRoomFeedList = async ({
  challengeId,
  offsetRecordId,
}: ChallengeRoomFeedListRequest): Promise<ChallengeRoomFeedListResponse> => {
  const response = await httpClient.get(`/challenge/${challengeId}/feed`, {
    params: {
      offsetRecordId,
    },
  });
  return response.data;
};

export const getMyRoomFeedList = async (
  offset: number,
): Promise<MyRoomFeedListResponse> => {
  const response = await httpClient.get(`/challenge/my-room/feed`, {
    params: {
      offset,
    },
  });
  return response.data;
};
