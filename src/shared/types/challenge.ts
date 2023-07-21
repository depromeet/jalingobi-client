import { ApiResponse } from './api';

export type Participant = {
  userId: number;
  imgUrl: string;
  nickname: string;
  level: number;
};

export type ChallengeDate = {
  period: number;
  startAt: string;
  endAt: string;
};

export type CategoryKey =
  | 'ALL'
  | 'FOOD'
  | 'HOBBY_LEISURE'
  | 'FASHION_BEAUTY'
  | 'TRANSPORTATION_AUTOMOBILE';

export type Category =
  | '전체'
  | '식비'
  | '취미/여가'
  | '패션/뷰티'
  | '교통/차량';

export type ChallengeDetail = {
  challengeId: number;
  category: CategoryKey;
  title: string;
  price: number;
  challengeImgUrl: string;
  keywords: string[];
  headCount: {
    availableCount: number;
    participants: number;
  };
  participantsInfo: Participant[];
  rules: string[];
  status: string;
  dateInfo: ChallengeDate;
  recruiting: boolean;
};

export type SortedType = '인원순' | '금액 낮은순';
export type ChallengeEvaluation = 'WELLDONE' | 'REGRETFUL' | 'CRAZY';

export type ChallengeFilter = {
  userId?: number;
  category?: string;
  filter?: string;
  sortedType?: SortedType;
};

export type ChallengeSearch = {
  id: number;
  title: string;
  imgUrl: string;
  currentPeopleCount: number;
  availablePeopleCount: number;
  startAt: string;
  createdAt: string;
  price: number;
  keywords: string[];
  period: number;
  status: string;
};

export type ChallengeSearchResult = {
  challenges: ChallengeSearch[];
  hasNext: boolean;
};

export type ChallengeResponse = ApiResponse<ChallengeDetail>;
export type ChallengeListResponse = ApiResponse<ChallengeDetail[]>;
export type ChallengeSearchResponse = ApiResponse<ChallengeSearchResult>;
