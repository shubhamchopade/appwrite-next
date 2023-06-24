import { Models } from "appwrite"
import { create } from "zustand"

interface ProfileState {
  profile: Models.Document | null
  setProfile: (profile: Models.Document) => void
}

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}))
