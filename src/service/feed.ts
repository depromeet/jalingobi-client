import {
  ChallengeAchievementRequest,
  ChallengeAchievementResponse,
  ChallengeListResponse,
  ChallengeRoomFeedListRequest,
  ChallengeRoomFeedListResponse,
  MyRoomFeedListRequest,
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

export const getMyRoomFeedList = async ({
  offset,
}: MyRoomFeedListRequest): Promise<MyRoomFeedListResponse> => {
  const response = await httpClient.get(`/challenge/my-room/feed`, {
    params: {
      offset,
    },
  });
  return response.data;
};

export const getChallengeAchievement = async ({
  challengeId,
}: ChallengeAchievementRequest): Promise<ChallengeAchievementResponse> => {
  const response = await httpClient.get(
    `challenge/${challengeId}/proceeding/info`,
  );
  return response.data;
};

export const getChallengeList = async (): Promise<ChallengeListResponse> => {
  const response = await httpClient.get('challenge/my-list');
  return response.data;
};
