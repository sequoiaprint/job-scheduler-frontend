"use client";

import { Minus, Printer } from "lucide-react";
import { JobCard } from "./JobCard";
import { DropArea } from "./DropArea";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobCardStore } from "@/store/job-card/job-card";

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
}

export function MachineColumn({
  machineName,
  apiEndpoint,
}: {
  machineName: string;
  apiEndpoint: string;
}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true); // for shimmer state

  useEffect(() => {
    const fetchJobsByMachine = async () => {
      try {
        const data = await axios.get(apiEndpoint);
        setJobs(data.data.jobs);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobsByMachine();
  }, []);

  const activeIndex = useJobCardStore((s) => s.activeIndex);

  const onDrop = (machineName: string, position: number) => {
    console.log(
      "dragged run_order:",
      activeIndex,
      "drop position:",
      position,
      "machine:",
      machineName,
    );
  };

  return (
    <div className="w-90 shrink-0 bg-[#fbfbfb] rounded-2xl border border-zinc-200 flex flex-col overflow-hidden shadow-xl max-h-full">
      {/* Header */}
      <div className="h-16 flex items-center justify-between p-3 bg-white/50 border-b border-zinc-100 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-rose-400 to-rose-500 text-white shadow-sm">
            <Printer size={20} />
          </div>
          <h2 className="font-semibold text-zinc-800 text-[15px]">
            {machineName}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animation-duration-[2s]" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <button className="p-1 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer">
            <Minus size={18} />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-1 p-2 gap-4 max-h-[calc(100%-64px)]">
        {/* Cards */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-2 max-h-full px-1">
          <DropArea onDrop={onDrop} machineName={machineName} position={1000} />
          {isLoading
            ? [0, 1, 2].map((id, index) => (
                <Skeleton className="bg-[#e6e6e6] h-30 w-full" key={index} />
              ))
            : jobs.map((job, index) => (
                <JobCard
                  jobName={job?.job_name}
                  deadline={
                    job?.revised_delivery_date || job?.expected_delivery_date
                  }
                  key={job?.job_id}
                  job_number={job?.job_number}
                  updated_at={job?.updated_at}
                  created_at={job?.created_at}
                  priority={job?.job_priority}
                  run_order={job?.run_order}
                  machineName={job?.machine_name}
                  onDrop={onDrop}
                  index={index}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
