import { create } from "zustand";

interface JobCardStore {
  job_number: string | null;
  active_run_order: number | null;
  setActiveCard: (job_number: string | null, active_run_order: number | null) => void;
}

export const useJobCardStore = create<JobCardStore>((set) => ({
  job_number: null,
  active_run_order: null,
  setActiveCard: (job_number, active_run_order) => set({ job_number, active_run_order }),
}));
