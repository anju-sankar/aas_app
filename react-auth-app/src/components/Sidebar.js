import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">User Panel</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">Home</Link>
        <Link to="/dashboard/analytics" className="hover:bg-gray-700 p-2 rounded">Analytics</Link>
        <Link to="/dashboard/users" className="hover:bg-gray-700 p-2 rounded">Users</Link>
        <Link to="/dashboard/settings" className="hover:bg-gray-700 p-2 rounded">Settings</Link>
      </nav>
    </div>
  );
}
