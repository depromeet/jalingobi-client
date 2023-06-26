import { ApiResponse } from './api';

export type emojiType = 'CRAZY' | 'REGRETFUL' | 'WELLDONE' | 'comment';

export type EmojiInfoType = {
  selected: emojiType | null;
  CRAZY: number;
  REGRETFUL: number;
  WELLDONE: number;
  comment: number;
};

export type ChallengeFeedType = {
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
  emojiInfo: EmojiInfoType;
};

export type MyFeedType = {
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
    selected: emojiType | null;
    CRAZY: number;
    REGRETFUL: number;
    WELLDONE: number;
    comment: number;
  };
};

export type ChallengeRoomFeedListResultType = {
  result: {
    total: number;
    limit: number;
    current: number;
    lastRecordId: number;
    challengeFeedList: ChallengeFeedType[];
  };
};

export type MyRoomFeedListResultType = {
  result: {
    total: number;
    limit: number;
    current: number;
    myFeedList: MyFeedType[];
  };
};

export type AchievementResultType = {
  result: {
    goalCharge: number;
    currentCharge: number;
    percent: number;
    dueDay: number;
  };
};

export type ChallengeListResultType = {
  result: {
    challengeId: number;
    title: string;
    imgUrl: string;
    active: boolean;
  }[];
};

export type ChallengeRoomFeedListRequest = {
  challengeId: number;
  offsetRecordId: number;
};

export type MyRoomFeedListRequest = {
  offset: number;
};

export type ChallengeAchievementRequest = {
  challengeId: number;
};

export type ChallengeRoomFeedListResponse = ApiResponse &
  ChallengeRoomFeedListResultType;

export type MyRoomFeedListResponse = ApiResponse & MyRoomFeedListResultType;

export type ChallengeAchievementResponse = ApiResponse & AchievementResultType;

export type ChallengeListResponse = ApiResponse & ChallengeListResultType;
