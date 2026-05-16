"use client";

import { API_BASE_URL } from "@/lib/config";
import axios from "axios";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarClock,
  CheckCheck,
  Printer,
  Layers,
  Settings,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "../ui/button";
import { motion, type Transition } from "framer-motion";
import { AllJobs } from "../jobs/Jobs";
import Image from "next/image";

const heartbeatTransition: Transition = {
  duration: 2,
  repeat: Infinity,
  repeatType: "mirror",
};

const workspaceNav = [
  { icon: ClipboardList, label: "Job Board", badge: 12, active: true },
  { icon: CalendarClock, label: "Unscheduled", badge: null },
  { icon: CheckCheck, label: "Completed", badge: 48 },
];

export default function Sidebar() {
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
    const response = await axios.put(`${API_BASE_URL}/api/sheet/update`, {
      jobNumber,
    });
    const data = response.data;
    console.log(data);

    if (data.status) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className="sticky top-0 h-screen bg-zinc-50 border-r border-zinc-200 dark:border-zinc-700 flex flex-col">
        {/* Header */}
        <div className="h-18 flex items-center gap-3 px-4 py-4 border-b border-zinc-200 dark:border-zinc-700">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Printer className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <Image
              src="/logo/sequoia-print-logo.png"
              alt="Sequoia Print"
              width={120}
              height={40}
              />
          </div>
          <button className="text-zinc-400 hover:text-zinc-600">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Refresh button */}
        <div className="px-4 pt-4 ">
          {sheetUpdated && (
            <div className="cursor-pointer w-full flex items-center justify-center gap-2 bg-white text-black text-sm font-medium py-2.5 rounded-lg transition-colors shadow px-2 mb-2 border border-red-400">
              <p>
                {" "}
                ⚠️ Master Google Sheet Updated:{" "}
                <span className="font-bold text-red-500">{jobNumber}</span>
              </p>
            </div>
          )}

          <motion.button
            onClick={() => window.location.reload()}
            className="cursor-pointer w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl backdrop-blur-md border"
            initial={{
              backgroundColor: "rgba(0,0,0,0)",
              color: "var(--primary)",
              borderColor: "var(--primary)",
            }}
            animate={
              sheetUpdated
                ? {
                    borderColor: ["rgb(251,146,60)", "rgba(251,146,60,0.15)"],
                    color: ["rgb(251,146,70)", "#ffffff"],
                    backgroundColor: [
                      "rgba(251,146,60,0.00)",
                      "rgba(251,146,60,0.85)",
                    ],
                  }
                : {
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                    backgroundColor: "rgba(0,0,0,0)",
                  }
            }
            whileHover={{
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              borderColor: "var(--primary)",
            }}
            transition={sheetUpdated ? heartbeatTransition : { duration: 1 }}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Board
          </motion.button>
        </div>

        {/* Nav */}
        <nav className="flex w-full min-h-0 px-3 pt-5 space-y-5 overflow-y-auto">
          {/* Workspace */}
          <div className="w-full">
            <p className="px-2 mb-1.5 text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
              Workspace
            </p>
            <ul className="space-y-0.5">
              {workspaceNav.map(({ icon: Icon, label, badge, active }) => (
                <li key={label}>
                  <button
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors
                    ${
                      active
                        ? "bg-white border border-zinc-200 text-zinc-900 font-medium shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        : "text-zinc-600 hover:bg-white hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 text-left">{label}</span>
                    {badge !== null && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full font-medium
                      ${active ? "bg-indigo-100 text-indigo-600" : "text-zinc-500"}`}
                      >
                        {badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <AllJobs />
      </div>
    </>
  );
}
