import { Spending } from '@/shared/types/spending';

import { createPresignedUrl } from './image';
import { putPresignedUrl } from './user';

import { httpClient } from '.';

export const addSpending = async ({
  price,
  title,
  content,
  imageInfo,
  challengeId,
  evaluation,
}: Spending) => {
  let presignedResponse;
  if (imageInfo) {
    presignedResponse = await createPresignedUrl(
      imageInfo.image,
      imageInfo.type,
    );
    await putPresignedUrl(presignedResponse.presignedUrl, imageInfo.image);
  }

  return httpClient.post(`/record/${challengeId}`, {
    price,
    title,
    content,
    evaluation,
    ...(presignedResponse ? { imageUrl: presignedResponse.imgUrl } : {}),
  });
};
