import { Calendar } from "lucide-react";
import { useJobCardStore } from "@/store/job-card/job-card";
import { DropArea } from "./DropArea";

const heartbeatStyle = `
  @keyframes heartbeat {
    0%   { border-color: rgb(251 146 60); box-shadow: 0 0 12px 3px rgba(251, 146, 60, 0.5); }
    50%  { border-color: transparent;    box-shadow: 0 0 0px  0px rgba(251, 146, 60, 0);   }
    100% { border-color: rgb(251 146 60); box-shadow: 0 0 12px 3px rgba(251, 146, 60, 0.5); }
  }
  .heartbeat {
    animation: heartbeat 2s ease-in-out infinite;
  }
`;

export function JobCard({
  jobName,
  deadline,
  job_number,
  updated_at,
  created_at,
  priority,
  run_order,
  onDrop,
  machineName,
  index,
}: {
  jobName?: string;
  deadline?: string;
  job_number?: string;
  updated_at?: string;
  created_at?: string;
  priority?: number;
  run_order: number;
  machineName: string;
  onDrop: (machineName: string, position: number) => void;
  index: number;
}) {
  const setActiveIndex = useJobCardStore((s) => s.setActiveIndex);
  const isRecentUpdated =
    updated_at && (Date.now() - new Date(updated_at).getTime()) / 1000;
  const isRecent =
    isRecentUpdated && isRecentUpdated <= 300 && created_at !== updated_at;

  return (
    <>
      {isRecent && <style>{heartbeatStyle}</style>}
      <div
        className={`bg-white rounded-2xl p-4 shadow-sm border border-zinc-200/80 hover:shadow-md cursor-pointer hover:border-zinc-300 transition-all duration-200 ${isRecent ? "heartbeat" : ""} select-none`}
        draggable={true}
        onDragStart={() => setActiveIndex(run_order)}
        onDragEnd={() => setActiveIndex(null)}
        onClick={() => console.log(run_order)}
      >
        <div>
          <h3 className="font-medium text-zinc-800 text-[14px] leading-tight mb-1">
            {jobName}
          </h3>
          <div className="inline-flex items-center gap-1.5 mb-3">
            <span className="text-[13px] text-zinc-400 font-normal">
              Job Number:{" "}
            </span>
            <span className="text-[13px] font-medium text-white bg-orange-400 px-2 py-0.5 rounded-md tracking-wide">
              #{job_number}
            </span>
            <span
              className={`text-[13px] font-medium text-white ${priority === 1 && "bg-pink-600"} ${priority === 2 && "bg-blue-400"} ${priority === 3 && "bg-green-400"} px-2 py-0.5 rounded-md tracking-wide`}
            >
              #{priority}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-2">
            <Calendar size={14} className="text-zinc-400 mt-0.5" />
            <div className="flex justify-between w-full gap-1 text-[13px]">
              <span className="text-zinc-500">
                <span className="text-zinc-800 font-normal">Deadline: </span>
                {deadline}
              </span>

              <span className="text-zinc-500">
                <span className="text-zinc-800 font-normal"></span>
                {index + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
      <DropArea
        onDrop={onDrop}
        machineName={machineName}
        position={run_order}
      />
    </>
  );
}
