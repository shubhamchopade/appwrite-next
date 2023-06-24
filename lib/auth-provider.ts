import { Models } from "appwrite"
import { create } from "zustand"

interface AuthState {
  auth: Models.User<Models.Preferences> | null
  setAuth: (auth: Models.User<Models.Preferences>) => void
  owner: boolean
  setOwner: (owner: boolean) => void
}

export const useAuthState = create<AuthState>()((set) => ({
  auth: null,
  setAuth: (auth) => set({ auth }),
  owner: false,
  setOwner: (owner) => set({ owner }),
}))
