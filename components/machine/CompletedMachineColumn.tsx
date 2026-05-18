"use client";

import React from "react";
import { Minus, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { CompletedJobCard } from "./CompletedJobCard";

export function CompletedMachineColumn({
  machineName,
  apiEndpoint,
}: {
  machineName: string;
  apiEndpoint: string;
}) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobsByMachine = async () => {
      try {
        const data = await axios.get(apiEndpoint);
        setJobs(data.data.jobs || []);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobsByMachine();
  }, []);

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
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pb-2 max-h-full px-1">
          {isLoading ? (
            [0, 1, 2].map((_, index) => (
              <Skeleton className="bg-[#e6e6e6] h-30 w-full" key={index} />
            ))
          ) : (
            <>
              {jobs.map((job, index) => (
                <React.Fragment key={job?.job_id}>
                  <CompletedJobCard
                    jobName={job?.job_name}
                    deadline={
                      job?.revised_delivery_date || job?.expected_delivery_date
                    }
                    job_number={job?.job_number}
                    updated_at={job?.updated_at}
                    created_at={job?.created_at}
                    priority={job?.job_priority}
                    index={index}
                  />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
