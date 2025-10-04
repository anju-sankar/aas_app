import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function UsersList() {
  const { user } = useContext(AuthContext); // get current user (for role check)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.roles?.includes("admin")) {
        setError("Unauthorized: Admins only");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/users"); // make sure your backend has this route protected by admin
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center border-b">
                <td className="py-2 px-4 border">{u.id}</td>
                <td className="py-2 px-4 border">{u.name}</td>
                <td className="py-2 px-4 border">{u.email}</td>
                <td className="py-2 px-4 border">{u.roles?.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
