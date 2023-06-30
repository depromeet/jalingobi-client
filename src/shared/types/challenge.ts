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
  sortType?: string;
};

export type ChallengeSearch = {
  id: number;
  title: string;
  currentPeopleCount: number;
  availablePeopleCount: number;
  imgUrl: string;
  price: number;
  keywords: string[];
  startAt: string;
  createdAt: string;
  period: number;
  status: string;
};

export type ChallengeResponse = ApiResponse<ChallengeDetail>;
export type ChallengeListResponse = ApiResponse<ChallengeDetail[]>;
export type ChallengeSearchResponse = ApiResponse<ChallengeSearch[]>;
