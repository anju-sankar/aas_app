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
    <div className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">User Panel</h2>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="hover:bg-gray-700 p-2 rounded transition-colors"
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
              className="hover:bg-gray-700 p-2 rounded transition-colors"
            >
              {link.name}
            </Link>
          ))}
      </nav>
    </div>
  );
}
