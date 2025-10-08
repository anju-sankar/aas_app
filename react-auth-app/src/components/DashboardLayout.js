// DashboardLayout.js
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 pb-12 md:pl-64 md:p-10 md:pb-16">
        <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[60vh]">
          {children}
        </div>
      </main>
    </div>
  );
}

