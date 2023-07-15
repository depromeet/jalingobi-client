/**
 * 확장자를 반환합니다.
 * @example
 * @param "image/png"
 * @return "png"
 */
export const getExtension = (type: string) => {
  return type.split('/')[1];
};
