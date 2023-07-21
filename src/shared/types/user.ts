import { ApiResponse } from '@/shared/types/api';

import { categoryMap } from '../constants/challenge';

import { PresignedImageType } from './presigned';

export type ChallengeStatus = {
  PROCEEDING: number;
  SUCCESS: number;
  COMPLETED: number;
  WAITING: number;
  FAILURE: number;
};
export type Status = keyof ChallengeStatus;

export const StatusMap: Record<Status, string> = {
  PROCEEDING: '참가중',
  SUCCESS: '성공',
  COMPLETED: '완료',
  WAITING: '대기중',
  FAILURE: '실패',
};

export type Social = {
  id: string;
  platform: string;
};

export type Profile = {
  nickname: string;
  email: string;
  imgUrl: string;
};

export type ImageInfo = {
  image?: File;
  type?: PresignedImageType;
  imageUrl: string;
};

export type ImageRequest = {
  image: File;
  type: PresignedImageType;
};

export type User = {
  social: Social;
  profile: Profile;
  notification: boolean;
  userChallengeResult: Partial<ChallengeStatus>;
};

export type UserProfile = {
  id: number;
  nickname: string;
  email: string;
  imgUrl: string;
  platform: string;
  role: string;
  score: number;
};

export type UserUpdateRequest = {
  nickName?: string;
  imageUrl?: string;
};

export type UserResponse = ApiResponse<User>;

export type UserProfileResponse = ApiResponse<UserProfile>;

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
  participantCount: number;
  status: Status;
  statusTag: string[];
  category: keyof typeof categoryMap;
  keywords: string[];
};

export type UserChallengeListResult = ApiResponse<{
  participatedChallenges: UserChallenge[];
}>;

export type UserDefaultImageResponse = ApiResponse<{
  imgUrl: string;
}>;
