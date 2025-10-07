import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  // Define sidebar links
  const links = [
    { name: "Home", to: "/dashboard" },
  ];

  // Admin-only links
  const adminLinks = [
    { name: "Users", to: "/dashboard/users" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col justify-between rounded-r-2xl shadow-lg">
      <div>
        <h2 className="text-2xl font-bold mb-6 tracking-tight">User Panel</h2>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:bg-gray-700 p-2 rounded-lg transition-colors font-medium flex items-center gap-2"
            >
              {link.name}
            </Link>
          ))}

          {/* Render admin links only if user has admin role */}
          {user?.roles?.includes("admin") &&
            adminLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:bg-purple-700 bg-purple-600 p-2 rounded-lg transition-colors font-medium flex items-center gap-2 mt-2"
              >
                {link.name}
              </Link>
            ))}
        </nav>
      </div>
      <div className="mt-8 pt-4 border-t border-gray-700 flex items-center gap-3">
        <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <div>
          <div className="font-semibold">{user?.name || "User"}</div>
          <div className="text-xs text-gray-400">{user?.roles?.join(", ") || "Member"}</div>
        </div>
      </div>
    </aside>
  );
}
