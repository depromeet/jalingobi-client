import axios from 'axios';

import { createPresignedUrl } from '@/service/image';
import { httpClient } from '@/service/index';
import {
  ImageRequest,
  UserChallengeListResult,
  UserDefaultImageResponse,
  UserProfileResponse,
  UserResponse,
  UserUpdateRequest,
} from '@/shared/types/user';

export const getUserInfo = async (): Promise<UserProfileResponse> => {
  const response = await httpClient.get('/user/info');
  return response.data;
};

export const fetchUserProfile = async (): Promise<UserResponse> => {
  const response = await httpClient.get('/mypage');
  return response.data;
};

export const uploadImageWithPresignedUrl = async (
  presignedUrl: string,
  file?: File,
) => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });
};

export const updateUserProfile = async (userUpdate: UserUpdateRequest) => {
  return httpClient.patch('/mypage/profile', {
    nickName: userUpdate.nickName,
    profileImgUrl: userUpdate.imageUrl,
  });
};

export const updateImage = async ({ image, type }: ImageRequest) => {
  const presignedUrlInfo = await createPresignedUrl(image, type);

  if (presignedUrlInfo.presignedUrl && presignedUrlInfo.imgUrl) {
    await uploadImageWithPresignedUrl(presignedUrlInfo.presignedUrl, image);
  }

  return presignedUrlInfo.imgUrl;
};

export const fetchUserChallengeList =
  async (): Promise<UserChallengeListResult> => {
    const response = await httpClient.get('/mypage/challenges');
    return response.data;
  };

export const leaveChallenge = async (challengeId: number) => {
  return httpClient.delete(`/mypage/challenge/${challengeId}`);
};

export const fetchUserDefaultImage =
  async (): Promise<UserDefaultImageResponse> => {
    const response = await httpClient.get('/mypage/jalingobi');
    return response.data;
  };
