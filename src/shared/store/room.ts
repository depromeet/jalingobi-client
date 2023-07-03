import { create } from 'zustand';

import { CHALLENGE_ID_MY_ROOM } from '../constants';

type State = {
  challengeId: number;
};

type Action = {
  setChallengeId: (challengeId: State['challengeId']) => void;
};

export const useRoom = create<State & Action>((set) => ({
  challengeId: CHALLENGE_ID_MY_ROOM,
  setChallengeId: (challengeId) => set(() => ({ challengeId })),
}));
