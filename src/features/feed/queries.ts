import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  getChallengeAchievement,
  getChallengeList,
  getChallengeRoomFeedList,
  getMyRoomFeedList,
} from '@/service/feed';
import {
  ChallengeAchievementRequest,
  ChallengeRoomFeedListRequest,
  MyRoomFeedListRequest,
} from '@/shared/types/feed';

export const useChallengeRoomFeedList = ({
  challengeId,
  offsetRecordId,
}: ChallengeRoomFeedListRequest) => {
  return useInfiniteQuery({
    queryKey: ['challengeRoomFeedList', challengeId, offsetRecordId],
    queryFn: ({ pageParam = offsetRecordId }) =>
      getChallengeRoomFeedList({ challengeId, offsetRecordId: pageParam }),
    getNextPageParam: ({ result }) => {
      const isLastPage = result.current < result.limit;

      if (isLastPage) {
        return false;
      }

      return result.lastRecordId;
    },
  });
};

export const useMyRoomFeedList = ({ offset }: MyRoomFeedListRequest) => {
  return useInfiniteQuery({
    queryKey: ['myRoomFeedList', offset],
    queryFn: ({ pageParam = offset }) =>
      getMyRoomFeedList({ offset: pageParam }),
    getNextPageParam: ({ result }) => {
      const isLastPage = result.current < result.limit;

      if (isLastPage) {
        return false;
      }
      return offset + result.current;
    },
  });
};

export const useChallengeAchievement = ({
  challengeId,
}: ChallengeAchievementRequest) => {
  return useQuery({
    queryKey: ['challengeAchievement', challengeId],
    queryFn: () => getChallengeAchievement({ challengeId }),
  });
};

export const useChallengeList = () => {
  return useQuery({
    queryKey: ['challengeList'],
    queryFn: getChallengeList,
  });
};
