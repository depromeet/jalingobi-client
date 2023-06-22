import { useQuery } from '@tanstack/react-query';

import { getChallengeRoomFeedList } from '@/service/feed';
import { ChallengeRoomFeedListRequest } from '@/types/feed';

// QUESTION: key 값 관리 이렇게 하는거 맞나용..??
// const challengeFeedKeys = {
//   all: ['challengeFeed'] as const,
//   challengeFeedLists: () => [...challengeFeedKeys.all, 'list'] as const,
//   challengeFeed: (challengeId: number) => [...challengeFeedKeys.all, {challengeId}] as const
// }

// const myRoomFeedKeys = {
//   all: ['myRoomFeedKeys'] as const,
//   myRoomFeedLists: () => [...myRoomFeedKeys.all, 'list'] as const,
//   myRoomFeed: () => [...myRoomFeedKeys.all, {CHALLENGE_ID_MY_ROOM}] as const
// }

export const useChallengeRoomFeedList = ({
  challengeId,
  offsetRecordId,
}: ChallengeRoomFeedListRequest) => {
  return useQuery({
    queryKey: ['challengeRoomFeedList', challengeId, offsetRecordId],
    queryFn: () => getChallengeRoomFeedList({ challengeId, offsetRecordId }),
  });
};
