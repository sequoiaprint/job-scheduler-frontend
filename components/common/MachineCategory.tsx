"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function MachineCategory() {
  const [machines, setMachines] = useState([
    {
      machine_name: "Ryobi 2",
      is_checked: false,
    },
    {
      machine_name: "Ryobi 3",
      is_checked: false,
    },
    {
      machine_name: "Komori",
      is_checked: false,
    },
    {
      machine_name: "Flatbed 1",
      is_checked: false,
    },
    {
      machine_name: "Flatbed 2",
      is_checked: false,
    },
  ]);

  const toggleMachine = (index: number, checked: boolean) => {
    const newMachines = [...machines];
    newMachines[index].is_checked = checked;
    setMachines(newMachines);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm font-normal text-zinc-600">
          Select Machines
          <svg
            className="w-3 h-3 text-zinc-400 ml-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Machines</DropdownMenuLabel>

          {machines.map((machine, index) => (
            <DropdownMenuCheckboxItem
              key={machine.machine_name}
              checked={machine.is_checked}
              onCheckedChange={(checked) =>
                toggleMachine(index, checked === true)
              }
            >
              {machine.machine_name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
