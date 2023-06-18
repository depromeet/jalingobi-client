import { operations } from './api.interface';

export type IUpdateChallenge = operations['updateChallenge'];
export type IAuthKakao = operations['authKakao'];

// example of how to get the type of the body
type IUpdateChallengeBody =
  IUpdateChallenge['requestBody']['content']['application/json'];

export type IAuthKakaoBody =
  IAuthKakao['requestBody']['content']['application/json'];
export type IAuthKakaoResponse =
  IAuthKakao['responses']['200']['content']['*/*'];
