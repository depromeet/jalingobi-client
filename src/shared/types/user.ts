import { ApiResponse } from '@/shared/types/api';

export type ChallengeStatus = {
  PROCEEDING: number;
  SUCCESS: number;
  COMPLETED: number;
};
export type Status = keyof ChallengeStatus;

export const StatusMap: Record<Status, string> = {
  PROCEEDING: '참가중',
  SUCCESS: '성공',
  COMPLETED: '완료',
};

export type Profile = {
  name: string;
  email: string;
  imgUrl: string;
};

export type User = {
  result: {
    profile: Profile;
    notification: boolean;
    userChallengeResult: ChallengeStatus;
  };
};

export type UserUpdateRequest = {
  nickName: string;
  profileImgUrl: string;
};

export type UserResponse = User & ApiResponse;

export type UserChallenge = {
  challengeId: number;
  title: string;
  imgUrl: string;
  active: boolean;
  duration: {
    period: number;
    startAt: string;
    endAt: string;
  };
  availableCount: number;
  status: Status;
  categories: string[];
  keywords: string[];
  participantCount: number;
};

export type UserChallengeListResult = ApiResponse & {
  result: {
    participatedChallenges: UserChallenge[];
  };
};
