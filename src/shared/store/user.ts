import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { UserProfile } from '../types/user';

type UserState = {
  user?: UserProfile;
  setUser: (user: UserProfile) => void;
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    setUser: (user) => set({ user }),
  })),
);
