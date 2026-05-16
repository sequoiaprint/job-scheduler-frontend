import { CalendarDays, LayoutGrid, List } from "lucide-react";

import { SearchJobs } from "./SearchJobs";

/**
 * Toolbar
 * Search and filter controls for the job list. This is a separate component to keep the Main component clean and focused on displaying the job list.
 */
export default function Toolbar() {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-100">
      {/* Search Jobs */}
      <SearchJobs />

      {/* This needs to use in future */}

      {/* This Week
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
      </button> */}
    </div>
  );
}
