import Main from "@/components/common/Main";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

/**
 * Read Carefully
 * All the components are conneted with it's parent's height
 * Before Changing Anything Please check the hierarchy
 */
export default function Home() {
  return (
    <AuthProvider>
      <div className="bg-zinc-50 font-sans dark:bg-black grid grid-cols-[20%_80%] h-screen overflow-hidden">
        {/* Side Bar */}
        <Sidebar />
        <div className="flex flex-col h-full min-h-0">
          {/* Navbar */}
          <Navbar />
          {/* Main content area */}
          <div className="flex-1 max-h-full min-h-0 p-3">
            {/* The Main page where all the jobs will come based on machines  */}
            <Main />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
