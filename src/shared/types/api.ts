export type ApiResponse<T> = {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
};
