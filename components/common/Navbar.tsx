"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useJobCardStore } from "@/store/job-card/job-card";
import { useUserStore } from "@/store/user/user";
import { useRouter } from "next/navigation";
import { useJobsStore } from "@/store/jobs/jobs";
import { useMemo } from "react";

export default function Navbar() {
  const { job_number: activeJobNumber, active_run_order } = useJobCardStore();
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  const jobsByMachine = useJobsStore((s) => s.jobsByMachine);

  const activeJobs = useMemo(() => {
    return Object.values(jobsByMachine)
      .flat()
      .filter((job) => !job.is_completed);
  }, [jobsByMachine]);

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <header className="w-full h-[72px] justify-between shrink-0 flex items-center px-4 py-2 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div>
        <h1 className="text-2xl font-bold">ATLAS</h1>
        <p className="text-sm text-zinc-500">
          Manage and track all printing jobs
        </p>
      </div>

      {activeJobNumber !== null && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg">
          <span className="text-[12px] text-zinc-500">Dragging card</span>
          <span className="text-[12px] font-semibold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-md">
            #{activeJobNumber}
          </span>
          <span className="text-[12px] text-zinc-400">
            order: {active_run_order}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="bg-white border border-green-500 dark:bg-zinc-800 dark:border-zinc-700 rounded-xl px-2 py-1 shadow-sm">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-green-600">
            Active: {activeJobs.length} jobs
          </p>
        </div>
        {user && (
          <div className="flex flex-col items-end">
            <span className="text-[13px] font-semibold text-zinc-800">{user.name}</span>
            <span className="text-[11px] text-zinc-400 capitalize">{user.role}</span>
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-zinc-600 hover:text-red-500 hover:border-red-300"
        >
          <LogOut size={14} />
          Logout
        </Button>
      </div>
    </header>
  );
}
