import axios from 'axios';

import { getPresignedUrl } from '@/service/image';
import { httpClient } from '@/service/index';
import {
  UserChallengeListResult,
  UserResponse,
  UserUpdateRequest,
} from '@/shared/types/user';

export const fetchUserProfile = async (): Promise<UserResponse> => {
  const response = await httpClient.get('/mypage');
  return response.data;
};

export const updateUserProfile = async (userUpdate: UserUpdateRequest) => {
  const presignedUrl = await getPresignedUrl(userUpdate.profileImage?.image);
  if (presignedUrl) {
    await axios.put(presignedUrl, userUpdate.profileImage?.image);
  }

  return httpClient.patch('/mypage/profile', {
    ...userUpdate,
    profileImgUrl: presignedUrl || userUpdate.profileImage?.imageUrl,
  });
};

export const fetchUserChallengeList =
  async (): Promise<UserChallengeListResult> => {
    const response = await httpClient.get('/mypage/challenges');
    return response.data;
  };

export const leaveChallenge = async (challengeId: number) => {
  return httpClient.delete(`/mypage/challenges/${challengeId}`);
};
