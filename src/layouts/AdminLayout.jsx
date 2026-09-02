import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sideba";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-primary/4 to-transparent pointer-events-none" aria-hidden="true"></div>
      
      <div className="relative mx-auto flex max-w-[1400px] gap-6 px-4 py-6 lg:px-8">
       
        <Sidebar />

        <main className="w-full pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
