import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getChallengeDetail } from '@/service/challenge';
import {
  getChallengeAchievement,
  getChallengeList,
  getChallengeRoomFeedList,
  getMyRoomFeedList,
} from '@/service/feed';
import {
  ChallengeAchievementRequest,
  ChallengeDetailRequest,
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
    suspense: true,
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
    suspense: true,
  });
};

export const useChallengeAchievement = ({
  challengeId,
}: ChallengeAchievementRequest) => {
  return useQuery({
    queryKey: ['challengeAchievement', challengeId],
    queryFn: () => getChallengeAchievement({ challengeId }),
    suspense: true,
  });
};

export const useChallengeList = () => {
  return useQuery({
    queryKey: ['challengeList'],
    queryFn: getChallengeList,
    suspense: true,
  });
};

export const useChallengeDetail = ({
  challengeId,
  recordId,
}: ChallengeDetailRequest) => {
  return useQuery({
    queryKey: ['challengeDetail', challengeId, recordId],
    queryFn: () => getChallengeDetail({ challengeId, recordId }),
  });
};
