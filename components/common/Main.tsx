import Toolbar from "./Toolbar";

export default function Main() {
  return (
    <div className="bg-white h-full border rounded-xl flex flex-col mt-18">
      <Toolbar />

      {/* Content area */}
      <div className="flex-1" />
    </div>
  );
}
