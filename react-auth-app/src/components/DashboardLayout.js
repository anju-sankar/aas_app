// DashboardLayout.js
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 pb-12 md:p-10 md:pb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[60vh]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
