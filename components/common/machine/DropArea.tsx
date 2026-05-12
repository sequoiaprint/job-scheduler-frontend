import { useState } from "react";

export function DropArea({
  onDrop,
  machineName,
  position,
}: {
  onDrop: (machineName: string, position: number) => void;
  machineName: string;
  position: number;
}) {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop(machineName, position);
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`${!showDrop ? "opacity-0 -my-4" : "bg-transparent rounded-2xl p-4 min-h-23 shadow-sm border border-dashed border-zinc-400/80 hover:shadow-md cursor-pointer hover:border-zinc-300 transition-all duration-200 flex justify-center items-center opacity-60"} `}
    >
      Drop Here
    </section>
  );
}
