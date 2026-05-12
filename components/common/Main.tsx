import Toolbar from "./Toolbar";
import { MachineColumn } from "./machine/MachineColumn";
import { API_BASE_URL } from "@/lib/config";

export default function Main() {
  // Types of machine based on this data the cards will show
  const machines = [
    {
      name: "Ryobi 2",
      apiEndpoint: `${API_BASE_URL}/jobs/by-machine/RYOBI`,
    },
    {
      name: "Komori",
      apiEndpoint: `${API_BASE_URL}/jobs/by-machine/KOMORI`,
    },
    {
      name: "Flatbed",
      apiEndpoint: `${API_BASE_URL}/jobs/by-machine/FLATBED`,
    },
  ];
  return (
    <div className="bg-white max-h-full border rounded-xl flex flex-col">
      {/* Search and Filters */}
      <Toolbar />

      <div className="p-6 flex gap-6 bg-zinc-50/50 w-full max-h-full overflow-hidden">
        {/* Mapping the machines */}
        {machines.map((machine) => (
          <MachineColumn
            key={machine.name}
            machineName={machine.name}
            apiEndpoint={machine.apiEndpoint}
          />
        ))}
      </div>
    </div>
  );
}
