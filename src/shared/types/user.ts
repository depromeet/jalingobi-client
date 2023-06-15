import { ApiResponse } from '@/shared/types/api';

export type UserChallengeResult = {
  PROCEEDING: number;
  SUCCESS: number;
  COMPLETED: number;
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
    userChallengeResult: UserChallengeResult;
  };
};

export type UserUpdateRequest = {
  nickName: string;
  profileImgUrl: string;
};

export type UserResponse = User & ApiResponse;
