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

const workspaceNav = [
  { icon: LayoutDashboard, label: "Overview", badge: null },
  { icon: ClipboardList, label: "Job Board", badge: 12, active: true },
  { icon: CalendarClock, label: "Schedule", badge: null },
  { icon: CheckCheck, label: "Completed", badge: 48 },
];

const resourcesNav = [
  { icon: Printer, label: "Machines", badge: 4 },
  { icon: Layers, label: "Inventory", badge: null },
  { icon: Settings, label: "Settings", badge: null },
];

export default function Sidebar() {
  return (
    <div className="h-full bg-zinc-50 border-r border-zinc-200 dark:border-zinc-700 flex flex-col">
      {/* Header */}
      <div className="h-18 flex items-center gap-3 px-4 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Printer className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold tracking-widest uppercase text-zinc-800 dark:text-zinc-100 truncate">
            Sequoia Print
          </p>
          <p className="text-xs text-zinc-500 truncate">Job Scheduler</p>
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
      <div className="px-4 pt-4">
        <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-amber-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
          <RefreshCw className="w-4 h-4" />
          Refresh All Jobs
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-5 space-y-5 overflow-y-auto">
        {/* Workspace */}
        <div>
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

        {/* Resources */}
        <div>
          <p className="px-2 mb-1.5 text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
            Resources
          </p>
          <ul className="space-y-0.5">
            {resourcesNav.map(({ icon: Icon, label, badge }) => (
              <li key={label}>
                <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-zinc-600 hover:bg-white hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-800">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{label}</span>
                  {badge !== null && (
                    <span className="text-xs text-zinc-500 font-medium">
                      {badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer card */}
      <div className="p-3">
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 shadow-sm">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 mb-1">
            Active Jobs
          </p>
          <p className="text-xl font-bold text-zinc-900 dark:text-white">
            12 jobs
          </p>
          <p className="text-xs text-emerald-500 font-medium mt-0.5">
            ▲ +2 since yesterday
          </p>
        </div>
      </div>
    </div>
  );
}
