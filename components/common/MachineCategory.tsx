"use client";

import { useState } from "react";
import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { machine } from "os";

export function DropdownMenuCheckboxesIcons() {
  const [machine, setMachine] = useState([
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
      machine_name: "Faltbed 1",
      is_checked: false,
    },
    {
      machine_name: "Flatbed 2",
      is_checked: false,
    },
  ]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Notifications</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>

          <DropdownMenuCheckboxItem
            checked={machine["ryobi_3"]}
            onCheckedChange={(checked) =>
              setMachine({ ...machine, ryobi_3: checked === true })
            }
          >
            <BellIcon />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function renderMachineList(machines: Record<string, boolean>) {
  return (
    <DropdownMenuCheckboxItem
      checked={machine.isChecked}
      onCheckedChange={(checked) =>
        setMachine({ ...machine, ryobi_1: checked === true })
      }
    >
      <MailIcon />
      Email notifications
    </DropdownMenuCheckboxItem>
  );
}
