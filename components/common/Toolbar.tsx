import {
  CalendarDays,
  LayoutGrid,
  List,
  ListFilter,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { SearchJobs } from "./SearchJobs";
import { MachineCategory } from "./MachineCategory";

/**
 * Toolbar
 * Search and filter controls for the job list. This is a separate component to keep the Main component clean and focused on displaying the job list.
 */

export default function Toolbar() {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-100">
      {/* Search Jobs */}
      <SearchJobs />

      {/* Machines Category */}
      <MachineCategory />

      {/* This Week */}
      <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors whitespace-nowrap">
        <CalendarDays className="w-4 h-4 text-zinc-400" />
        This Week
        <svg
          className="w-3 h-3 text-zinc-400 ml-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* View toggles */}
      <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
        <button className="px-2 py-1.5 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors border-r border-zinc-200">
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button className="px-2 py-1.5 text-zinc-400 hover:bg-zinc-50 transition-colors">
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
