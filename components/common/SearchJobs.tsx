import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function SearchJobs() {
  return (
    <div className="flex items-center gap-2 flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5">
      <Search className="w-4 h-4 text-zinc-400 shrink-0" />
      <Input
        type="text"
        placeholder="Search jobs by name, number, or client..."
        className="flex-1 bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 outline-none border-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:border-none h-6"
      />
    </div>
  );
}
