import axios from 'axios';

import { getPresignedUrl } from '@/service/image';
import { httpClient } from '@/service/index';
import {
  GetUserInfoResponse,
  UserChallengeListResult,
  UserResponse,
  UserUpdateRequest,
} from '@/shared/types/user';

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  const response = await httpClient.get('/user/info');
  return response.data;
};

export const fetchUserProfile = async (): Promise<UserResponse> => {
  const response = await httpClient.get('/mypage');
  return response.data;
};

const putPresignedUrl = async (presignedUrl: string, file?: File) => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });
};

export const updateUserProfile = async (userUpdate: UserUpdateRequest) => {
  const presignedUrlInfo = await getPresignedUrl(
    userUpdate.profileImage?.image,
    userUpdate.profileImage?.type,
  );

  if (presignedUrlInfo) {
    await putPresignedUrl(
      presignedUrlInfo.presignedUrl,
      userUpdate.profileImage?.image,
    );
  }

  return httpClient.patch('/mypage/profile', {
    nickName: userUpdate.nickName,
    profileImgUrl: presignedUrlInfo.imgUrl || userUpdate.profileImage?.imageUrl,
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
