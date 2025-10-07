import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
  <h2 className="text-xl font-bold mb-4 text-blue-700">Profile</h2>
      <div className="flex items-center gap-4 mb-4">
  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <div>
          <div className="font-semibold text-base">{user?.name || "User"}</div>
          <div className="text-gray-500 text-sm">{user?.email || "No email"}</div>
          <div className="text-gray-400 text-xs mt-1">Role: {user?.roles?.join(", ") || "Member"}</div>
        </div>
      </div>
    </div>
  );
}
