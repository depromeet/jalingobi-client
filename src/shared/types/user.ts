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

export type Social = {
  id: string;
  platform: 'KAKAO';
};

// QUESITON: 창완님 swagger에서는 nickname으로 되어있네요. 수정 필요할 것 같아요
export type Profile = {
  name: string;
  email: string;
  imgUrl: string;
};

export type ProfileImage = {
  image?: File;
  imageUrl: string;
};

export type User = {
  result: {
    social: Social;
    profile: Profile;
    notification: boolean;
    userChallengeResult: ChallengeStatus;
  };
};

export type UserUpdateRequest = {
  nickName: string;
  profileImage?: ProfileImage;
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
  participantCount: number;
  status: Status;
  statusTag: string[];
  categories: string[];
  keywords: string[];
};

export type UserChallengeListResult = ApiResponse & {
  result: {
    participatedChallenges: UserChallenge[];
  };
};
