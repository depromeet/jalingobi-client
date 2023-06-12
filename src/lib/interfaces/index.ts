import { operations } from './api.interface';

export type IUpdateChallenge = operations['updateChallenge'];

// example of how to get the type of the body
type IUpdateChallengeBody =
  IUpdateChallenge['requestBody']['content']['application/json'];
