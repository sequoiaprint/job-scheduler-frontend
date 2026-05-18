"use client";

import { Calendar } from "lucide-react";

const heartbeatStyle = `
  @keyframes heartbeat {
    0%   { border-color: rgb(34 197 94); box-shadow: 0 0 12px 3px rgba(34, 197, 94, 0.5); }
    50%  { border-color: transparent;    box-shadow: 0 0 0px  0px rgba(34, 197, 94, 0);   }
    100% { border-color: rgb(34 197 94); box-shadow: 0 0 12px 3px rgba(34, 197, 94, 0.5); }
  }
  .heartbeat {
    animation: heartbeat 2s ease-in-out infinite;
  }
`;

export function CompletedJobCard({
  jobName,
  deadline,
  job_number,
  updated_at,
  created_at,
  priority,
  index,
}: {
  jobName?: string;
  deadline?: string;
  job_number?: string;
  updated_at?: string;
  created_at?: string;
  priority?: number;
  index: number;
}) {
  const isRecentUpdated =
    updated_at && (Date.now() - new Date(updated_at).getTime()) / 1000;
  const isRecent =
    isRecentUpdated && isRecentUpdated <= 30 && created_at !== updated_at;

  return (
    <>
      {isRecent && <style>{heartbeatStyle}</style>}

      <div
        className={`bg-green-100/30 rounded-2xl p-4 shadow-sm border border-green-500/50 hover:shadow-md cursor-pointer hover:border-green-500/80 transition-all duration-200 ${isRecent ? "heartbeat" : ""} select-none`}
      >
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-zinc-800 text-[14px] leading-tight mb-1  line-through">
              {jobName}
            </h3>
            <span className="text-zinc-500 text-[12px]">{index + 1}</span>
          </div>

          <div className="inline-flex items-center gap-1.5">
            <span className="text-[13px] font-medium text-white bg-orange-400 px-2 py-0.5 rounded-md tracking-wide">
              #{job_number}
            </span>
            <span
              className={`text-[13px] font-medium text-white ${priority === 1 && "bg-pink-600"} ${priority === 2 && "bg-blue-400"} ${priority === 3 && "bg-green-400"} px-2 py-0.5 rounded-md tracking-wide`}
            >
              #{priority}
            </span>
            <div className="flex items-start gap-2 bg-[#ffffffaf] px-2 py-0.5 text-black rounded-md border">
              <Calendar size={14} className="mt-0.5" />
              <div className="flex justify-between w-full gap-1 text-[13px]">
                <span>{deadline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
