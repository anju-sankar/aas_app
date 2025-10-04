import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.name}</span>
        <button 
          onClick={logout} 
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
}
