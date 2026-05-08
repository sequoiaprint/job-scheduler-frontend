import Main from "@/components/common/Main";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

export default function Home() {
  return (
    <div className="flex-1 bg-zinc-50 font-sans dark:bg-black grid grid-cols-[15%_85%]">
      <Sidebar />
      <div className="h-full">
        <Navbar />
        {/* Main content area
            The height of the Navbar is 72px (h-18), so we subtract that from the total height to make the content area fill the remaining space.
        */}
        <div className="h-[calc(100%-72px)] p-3">
          <Main />
        </div>
      </div>
    </div>
  );
}
