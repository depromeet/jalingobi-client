import { ApiResponse } from './api';

export type Participant = {
  imgUrl: string;
  nickname: string;
  level: number;
};

export type ChallengeDate = {
  period: number;
  startAt: string;
  endAt: string;
};

export type ChallengeDetail = {
  challengeId: number;
  category: string;
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

export type ChallengeFilter = {
  category?: string;
  filter?: string;
  sortedType?: string;
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

export type SortedType = '인원순' | '금액 낮은순';

export type ChallengeResponse = ApiResponse<ChallengeDetail>;
export type ChallengeListResponse = ApiResponse<ChallengeDetail[]>;
export type ChallengeSearchResponse = ApiResponse<ChallengeSearchResult>;
