import { Spending } from '@/shared/types/spending';

import { httpClient } from '.';

export const addSpending = async ({
  price,
  title,
  content,
  imageUrl,
  challengeId,
  evaluation,
}: Spending) => {
  return httpClient.post(`/record/${challengeId}`, {
    price,
    title,
    content,
    evaluation,
    imgUrl: imageUrl,
  });
};
