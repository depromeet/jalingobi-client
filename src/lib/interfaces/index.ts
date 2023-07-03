import { operations } from './api.interface';

export type UpdateChallenge = operations['updateChallenge'];
export type AuthKakao = operations['authKakao'];
export type AuthRefresh = operations['refreshToken'];

export type AuthKakaoBody =
  AuthKakao['requestBody']['content']['application/json'];
export type AuthKakaoResponse = AuthKakao['responses']['200']['content']['*/*'];
export type AuthRefreshResponse =
  AuthRefresh['responses']['200']['content']['*/*'];
