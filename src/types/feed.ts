import { ApiResponse } from './api';

export type TEmojiInfo = {
  selectedEmoji: string | null;
  crazy: number;
  regretful: number;
  wellDone: number;
  comment: number;
};

export type TChallengeFeed = {
  isMine: boolean;
  userInfo: {
    imgUrl: string;
    nickname: string;
    currentCharge: number;
  };
  recordInfo: {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    price: number;
    date: string;
  };
  emojiInfo: TEmojiInfo;
};

export type TMyFeed = {
  recordInfo: {
    id: number;
    imgUrl: string;
    title: string;
    content: string;
    price: number;
    date: string;
  };
  challengeInfo: {
    imgUrl: string;
    title: string;
  };
  emojiInfo: {
    selectedEmoji: string | null;
    crazy: number;
    regretful: number;
    wellDone: number;
    comment: number;
  };
};

export type TChallengeRoomFeedListResult = {
  result: {
    total: number;
    limit: number;
    current: number;
    lastRecordId: number;
    challengeFeedList: TChallengeFeed[];
  };
};

export type TMyRoomFeedListResult = {
  result: {
    total: number;
    limit: number;
    current: number;
    myFeedList: TMyFeed[];
  };
};

export type ChallengeRoomFeedListRequest = {
  challengeId: number;
  offsetRecordId: number;
};

export type ChallengeRoomFeedListResponse = ApiResponse &
  TChallengeRoomFeedListResult;

export type MyRoomFeedListResponse = ApiResponse & TMyRoomFeedListResult;
