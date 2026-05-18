import { create } from "zustand";

export interface Job {
  job_id?: string;
  job_number: string;
  job_name: string;
  remarks: string | null;
  job_priority: number;
  machine_name: string;
  expected_delivery_date: string;
  deadline?: string;
  deadline_in_days?: string;
  revised_delivery_date?: string;
  updated_at?: string;
  created_at?: string;
  run_order: number;
  is_completed: boolean;
}

interface JobsStore {
  jobsByMachine: Record<string, Job[]>;
  setJobsForMachine: (machineName: string, jobs: Job[]) => void;
  updateJob: (machineName: string, job_number: string, updates: Partial<Job>) => void;
  removeJob: (job_number: string) => void;
  clearMachine: (machineName: string) => void;
}

export const useJobsStore = create<JobsStore>((set) => ({
  jobsByMachine: {},

  setJobsForMachine: (machineName, jobs) =>
    set((state) => ({
      jobsByMachine: { ...state.jobsByMachine, [machineName]: jobs },
    })),

  updateJob: (machineName, job_number, updates) =>
    set((state) => {
      const jobs = state.jobsByMachine[machineName] ?? [];
      return {
        jobsByMachine: {
          ...state.jobsByMachine,
          [machineName]: jobs.map((j) =>
            j.job_number === job_number ? { ...j, ...updates } : j
          ),
        },
      };
    }),

  removeJob: (job_number) =>
    set((state) => {
      const updated: Record<string, Job[]> = {};
      for (const machine in state.jobsByMachine) {
        updated[machine] = state.jobsByMachine[machine].filter(
          (j) => j.job_number !== job_number
        );
      }
      return { jobsByMachine: updated };
    }),

  clearMachine: (machineName) =>
    set((state) => {
      const { [machineName]: _, ...rest } = state.jobsByMachine;
      return { jobsByMachine: rest };
    }),
}));
