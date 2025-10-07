import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  // Define sidebar links
  const links = [
    { name: "Home", to: "/dashboard" },
    { name: "Analytics", to: "/dashboard/analytics" },
  ];

  // Admin-only links
  const adminLinks = [
    { name: "Users", to: "/dashboard/users" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col justify-between rounded-r-2xl shadow-lg">
      <div>
  <h2 className="text-xl font-bold mb-6 tracking-tight">User Panel</h2>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setActiveMenu(link.to)}
              className={
                `p-2 rounded-lg transition-colors font-medium flex items-center gap-2 ` +
                (activeMenu === link.to ? "bg-purple-700 text-white" : "hover:bg-purple-700")
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Render admin links only if user has admin role */}
          {user?.roles?.includes("tenant-admin") &&
            adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setActiveMenu(link.to)}
                className={
                  `p-2 rounded-lg transition-colors font-medium flex items-center gap-2 mt-2 ` +
                  (activeMenu === link.to ? "bg-purple-700 text-white" : "hover:bg-purple-700")
                }
              >
                {link.name}
              </NavLink>
            ))}
        </nav>
      </div>
      <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 w-full">
          <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-base">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <div className="font-semibold">{user?.name || "User"}</div>
            <div className="text-xs text-gray-400">{user?.roles?.join(", ") || "Member"}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow mt-2"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
