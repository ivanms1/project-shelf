import { create } from 'zustand'

const useZustandStore = create((set) => ({
  isAuthLoading: false,
  setIsAuthLoading: (payload) => set((state) => ({ isAuthLoading: payload })),

}))

export default useZustandStore