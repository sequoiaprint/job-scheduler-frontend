import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { useJobCardStore } from "@/store/job-card/job-card";

export function DropArea({
  prevRunOrder,
  nextRunOrder,
  machineName,
}: {
  prevRunOrder: number | null;
  nextRunOrder: number | null;
  machineName: string;
}) {
  const [showDrop, setShowDrop] = useState(false);
  const { job_number, active_run_order } = useJobCardStore();

  const handleDrop = async () => {
    setShowDrop(false);

    if (!job_number || active_run_order === null) return;

    const response = await axios.put(`${API_BASE_URL}/api/jobs/update-order`, {
      job_number,
      current_run_order: String(active_run_order),
      prev_run_order: prevRunOrder !== null ? String(prevRunOrder) : null,
      next_run_order: nextRunOrder !== null ? String(nextRunOrder) : null,
      machine_name: machineName,
    });

    if (response.data.status) {
      window.location.reload();
    }
  };
  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`${!showDrop ? "opacity-0 -my-4" : "bg-transparent rounded-2xl p-4 min-h-23 shadow-sm border border-dashed border-zinc-400/80 hover:shadow-md cursor-pointer hover:border-zinc-300 transition-all duration-200 flex justify-center items-center opacity-60"}`}
    >
      Drop Here
    </section>
  );
}
