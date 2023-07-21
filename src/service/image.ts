import { PresignedUrlResponse } from '@/shared/types/image';
import { getExtension } from '@/shared/utils/file';

import { httpClient } from './index';

export const createPresignedUrl = async (
  file: File,
  type: string,
): Promise<PresignedUrlResponse> => {
  const response = await httpClient.post('/image/presigned', {
    imageFileExtension: getExtension(file?.type).toUpperCase(),
    type,
  });

  return response.data.result;
};
