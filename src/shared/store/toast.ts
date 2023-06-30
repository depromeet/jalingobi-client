import { create } from 'zustand';

type State = {
  toastMessage: string | null;
};

type Action = {
  setToastMessage: (toastMessage: State['toastMessage']) => void;
};

const initialState = {
  toastMessage: null,
};

export const useToastStore = create<State & Action>((set) => ({
  ...initialState,
  setToastMessage: (message) =>
    set(() => ({
      toastMessage: message,
    })),
}));
