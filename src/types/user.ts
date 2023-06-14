import { ApiResponse } from '@/types/api';

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

export type UserResponse = User & ApiResponse;
