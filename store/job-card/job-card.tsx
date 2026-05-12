import { create } from "zustand";

interface JobCardStore {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

export const useJobCardStore = create<JobCardStore>((set) => ({
  activeIndex: null,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));
