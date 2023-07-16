import { getExtension } from '@/shared/utils/file';

import { httpClient } from './index';

export const getPresignedUrl = async (
  file?: File,
  type?: string,
): Promise<string> => {
  if (!file) return Promise.resolve('');

  const response = await httpClient.post('/image/presigned', {
    imageFileExtension: getExtension(file?.type).toUpperCase(),
    type,
  });

  return response.data.presignedUrl;
};
