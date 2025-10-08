import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="p-6 pb-12 md:pl-64 md:p-10 md:pb-16 transition-all duration-300">
        {/* Wider content area */}
        <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[60vh] mx-auto w-full md:w-[90%] lg:w-[85%]">
          {children}
        </div>
      </main>
    </div>
  );
}
