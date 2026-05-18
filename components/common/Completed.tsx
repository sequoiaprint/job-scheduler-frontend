import Toolbar from "./Toolbar";
import { MachineColumn } from "../machine/MachineColumn";
import { API_BASE_URL } from "@/lib/config";
import { CompletedMachineColumn } from "../machine/CompletedMachineColumn";

export default function Completed() {
  // Types of machine based on this data the cards will show
  const machines = [
    {
      name: "Ryobi 3",
      apiEndpoint: `${API_BASE_URL}/api/jobs/completed/RYOBI3`,
    },
    {
      name: "Ryobi 2",
      apiEndpoint: `${API_BASE_URL}/api/jobs/completed/RYOBI2`,
    },
    {
      name: "Komori",
      apiEndpoint: `${API_BASE_URL}/api/jobs/completed/KOMORI`,
    },
    {
      name: "Flatbed 1",
      apiEndpoint: `${API_BASE_URL}/api/jobs/completed/FLATBED1`,
    },
    {
      name: "Flatbed 2",
      apiEndpoint: `${API_BASE_URL}/api/jobs/completed/FLATBED2`,
    },
  ];
  return (
    <div className="bg-white h-full border rounded-xl flex flex-col">
      {/* Search and Filters */}
      <Toolbar />

      <div className="p-6 flex gap-6 bg-zinc-50/50 w-full h-full flex-1 overflow-y-hidden">
        {/* Mapping the machines */}
        {machines.map((machine) => (
          <CompletedMachineColumn
            key={machine.name}
            machineName={machine.name}
            apiEndpoint={machine.apiEndpoint}
          />
        ))}
      </div>
    </div>
  );
}
