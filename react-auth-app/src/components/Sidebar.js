import { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", to: "/dashboard" },
    { name: "Analytics", to: "/dashboard/analytics" },
  ];

  const adminLinks = [{ name: "Users", to: "/dashboard/users" }];

  return (
    <>
      {/* Hamburger button for mobile */}
      {!isOpen && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-gray-800 text-white rounded-md focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-6 flex flex-col justify-between rounded-r-2xl shadow-lg
          transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex
        `}
      >
        <div>
          {/* Heading + Close button on mobile */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight">User Panel</h2>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-gray-700 rounded-md focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setActiveMenu(link.to)}
                className={`p-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                  activeMenu === link.to ? "bg-purple-700 text-white" : "hover:bg-purple-700"
                }`}
              >
                {link.name}
              </NavLink>
            ))}

            {user?.roles?.includes("tenant-admin") &&
              adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setActiveMenu(link.to)}
                  className={`p-2 rounded-lg transition-colors font-medium flex items-center gap-2 mt-2 ${
                    activeMenu === link.to ? "bg-purple-700 text-white" : "hover:bg-purple-700"
                  }`}
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

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
