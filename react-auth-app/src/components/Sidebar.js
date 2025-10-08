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
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col rounded-r-2xl shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:block`}
      >
        {/* Main flex container (fills height) */}
        <div className="flex flex-col justify-between h-full">
          {/* Top section with nav */}
          <div className="p-6 flex flex-col flex-grow overflow-y-auto">
            {/* Header */}
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

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => {
                    setActiveMenu(link.to);
                    setIsOpen(false);
                  }}
                  className={`p-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                    activeMenu === link.to
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-700"
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
                    onClick={() => {
                      setActiveMenu(link.to);
                      setIsOpen(false);
                    }}
                    className={`p-2 rounded-lg transition-colors font-medium flex items-center gap-2 mt-2 ${
                      activeMenu === link.to
                        ? "bg-purple-700 text-white"
                        : "hover:bg-purple-700"
                    }`}
                  >
                    {link.name}
                  </NavLink>
                ))}
            </nav>
          </div>

          {/* Bottom user section (stays fixed at bottom) */}
          <div className="p-6 border-t border-gray-700">
            <div className="flex items-center gap-3 w-full mb-3">
              <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-base">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div>
                <div className="font-semibold">{user?.name || "User"}</div>
                <div className="text-xs text-gray-400">
                  {user?.roles?.join(", ") || "Member"}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
