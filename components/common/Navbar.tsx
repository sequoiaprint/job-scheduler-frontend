"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useJobCardStore } from "@/store/job-card/job-card";
import { API_BASE_URL } from "@/lib/config";

export default function Navbar() {
  const { job_number: activeJobNumber, active_run_order } = useJobCardStore();
  const [sheetUpdated, setSheetUpdated] = useState(false);
  const [message, setMessage] = useState("");
  const [jobNumber, setJobNumber] = useState("");

  useEffect(() => {
    const socket = io(API_BASE_URL);
    console.log(socket);

    socket.on(
      "sheet:updated",
      (data: { message: string; jobNumber: string }) => {
        console.log("log");
        setMessage(data.message);
        setJobNumber(data.jobNumber);
        setSheetUpdated(true);
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const onButtonClick = async () => {
    console.log("Hit");
    const response = await axios.put(
      `${API_BASE_URL}/api/sheet/update`,
      {
        jobNumber,
      },
    );
    const data = response.data;
    console.log(data);

    if (data.status) {
      window.location.reload();
    }
  };

  return (
    <header className="w-full h-[72px] justify-between shrink-0 flex items-center px-4 py-2 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div>
        <h1 className="text-2xl font-bold">Job Scheduler</h1>
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
          <span className="text-[12px] text-zinc-400">order: {active_run_order}</span>
        </div>
      )}

      {sheetUpdated && (
        <div className="text-red-400 flex justify-center items-end flex-col">
          <p>
            {message} {jobNumber}
          </p>
          <Button onClick={onButtonClick}>Refresh</Button>
        </div>
      )}
    </header>
  );
}
