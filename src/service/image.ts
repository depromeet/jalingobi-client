import { PresignedUrlResponse } from '@/shared/types/image';
import { getExtension } from '@/shared/utils/file';

import { httpClient } from './index';

export const getPresignedUrl = async (
  file?: File,
  type?: string,
): Promise<PresignedUrlResponse> => {
  if (!file) {
    return Promise.resolve({ presignedUrl: '', imgUrl: '' });
  }

  const response = await httpClient.post('/image/presigned', {
    imageFileExtension: getExtension(file?.type).toUpperCase(),
    type,
  });

  return response.data.result;
};
