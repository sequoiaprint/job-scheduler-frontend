"use client";

import { useState } from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { useJobCardStore } from "@/store/job-card/job-card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { useJobsStore } from "@/store/jobs/jobs";

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
  index,
}: {
  jobName?: string;
  deadline?: string;
  job_number?: string;
  updated_at?: string;
  created_at?: string;
  priority?: number;
  run_order: number;
  index: number;
}) {
  const setActiveCard = useJobCardStore((s) => s.setActiveCard);
  const { removeJob } = useJobsStore();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRecentUpdated =
    updated_at && (Date.now() - new Date(updated_at).getTime()) / 1000;
  const isRecent =
    isRecentUpdated && isRecentUpdated <= 30 && created_at !== updated_at;

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await axios.put(`${API_BASE_URL}/api/jobs/mark-completed/${job_number}`);
      setShowModal(false);
      removeJob(job_number!);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isRecent && <style>{heartbeatStyle}</style>}

      <div
        className={`bg-white rounded-2xl p-4 shadow-sm border border-zinc-200/80 hover:shadow-md cursor-pointer hover:border-zinc-300 transition-all duration-200 ${isRecent ? "heartbeat" : ""} select-none`}
        draggable={true}
        onDragStart={() => setActiveCard(job_number ?? null, run_order)}
        onDragEnd={() => setActiveCard(null, null)}
        onClick={() => setShowModal(true)}
      >
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-zinc-800 text-[14px] leading-tight mb-1">
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

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-zinc-900">
                  Job Completed?
                </h2>
                <p className="text-[13px] text-zinc-500 mt-1">
                  Mark{" "}
                  <span className="font-medium text-zinc-700">
                    #{job_number}
                  </span>{" "}
                  as completed?
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
              >
                No
              </Button>
              <Button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                onClick={handleComplete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Yes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
