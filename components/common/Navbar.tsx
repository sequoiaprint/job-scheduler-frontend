import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full h-18 flex items-center px-4 py-2 fixed top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div>
        <h1 className="text-2xl font-bold">Job Scheduler</h1>
        <p className="text-sm text-zinc-500">
          Manage and track all printing jobs
        </p>
      </div>
    </header>
  );
}
