import { create } from 'zustand';

type AuthStoreType = {
    accessToken: string,
    actions: {
        saveAccessToken: (token: string) => void
    }
}


export const useAuthStore = create<AuthStoreType>((set) => ({
  accessToken: "",
  actions: {
    saveAccessToken: (token) => set(() => ({accessToken : token })),
  }
}))