import { ApiResponse } from './api';

export type EmojiType = 'CRAZY' | 'REGRETFUL' | 'WELLDONE' | 'comment';

export type EmojiTypeName = '미친거지' | '후회할거지' | '잘할거지';

export type EmojiInfoType = {
  selected: EmojiType | null;
  CRAZY: number;
  REGRETFUL: number;
  WELLDONE: number;
  comment: number;
};

export type UserInfoType = {
  imgUrl: string;
  nickname: string;
  currentCharge: number;
};

export type RecordInfoType = {
  id: number;
  imgUrl: string;
  title: string;
  content: string;
  price: number;
  date: string;
  evaluation: EmojiType;
};

export type ChallengeInfoType = {
  imgUrl: string;
  title: string;
  id: string;
};

export type ChallengeFeedType = {
  isMine: boolean;
  userInfo: UserInfoType;
  recordInfo: RecordInfoType;
  challengeInfo: { id: string };
  emojiInfo: EmojiInfoType;
};

export type MyFeedType = {
  recordInfo: RecordInfoType;
  challengeInfo: ChallengeInfoType;
  emojiInfo: EmojiInfoType;
};

export type ChallengeRoomFeedListResultType = {
  total: number;
  limit: number;
  current: number;
  lastRecordId: number;
  challengeFeedList: ChallengeFeedType[];
};

export type MyRoomFeedListResultType = {
  total: number;
  limit: number;
  current: number;
  myFeedList: MyFeedType[];
};

export type AchievementResultType = {
  goalCharge: number;
  currentCharge: number;
  percent: number;
  dueDay: number;
};

export type ChallengeListResultType = {
  participatedChallengeList: {
    challengeId: number;
    title: string;
    imgUrl: string;
    participants: number;
    maxParticipants: number;
    status: 'PROCEEDING' | 'RECRUITING';
  }[];
};

export type ChallengeDetailRequest = {
  challengeId: number;
  recordId: number;
};

export type CommentInfoType = {
  isMine: boolean;
  commenterId: number;
  nickname: string;
  imgUrl: string;
  commentId: number;
  content: string;
  commentDate: string;
};

export type ChallengeDetailResultType = {
  isMine: boolean;
  userInfo: UserInfoType;
  recordInfo: RecordInfoType;
  emojiInfo: EmojiInfoType;
  commentInfoList: CommentInfoType[];
};

export type ChallengeDetailResponse = ApiResponse<ChallengeDetailResultType>;

export type ChallengeRoomFeedListRequest = {
  challengeId: number;
  offsetRecordId: number | null;
};

export type MyRoomFeedListRequest = {
  offset: number;
};

export type ChallengeAchievementRequest = {
  challengeId: number;
};

export type ChallengeRoomFeedListResponse =
  ApiResponse<ChallengeRoomFeedListResultType>;

export type MyRoomFeedListResponse = ApiResponse<MyRoomFeedListResultType>;

export type ChallengeAchievementResponse = ApiResponse<AchievementResultType>;

export type ChallengeListResponse = ApiResponse<ChallengeListResultType>;
