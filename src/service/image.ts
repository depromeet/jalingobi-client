import { httpClient } from './index';

export const getPresignedUrl = async (file?: File): Promise<string> => {
  if (!file) return Promise.resolve('');
  const response = await httpClient.post('/image/presigned', {
    name: file?.name,
    type: file?.type,
  });
  return response.data.url;
};
