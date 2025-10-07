import { useEffect, useState, useContext } from "react";
import React from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function UsersList() {
  const { user } = useContext(AuthContext); // get current user (for role check)
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.roles?.includes("admin")) {
        setError("Unauthorized: Admins only");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await api.get(`/users?page=${page}&pageSize=${pageSize}`); // backend should support pagination
        console.log('API response:', res.data); // Debug response
        setUsers(res.data.data || []); // expects { data: [...], total: ... }
        setTotal(res.data.total || 0);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, page]);

  if (loading) return (
    <div className="flex justify-center items-center h-40">
  <span className="text-gray-500 text-base animate-pulse">Loading users...</span>
    </div>
  );
  if (error) return <p className="text-red-500 text-center font-semibold mt-8">{error}</p>;

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const paginatedUsers = users; // already paginated from backend

  return (
  <div className="p-2 font-sans text-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-2xl">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 font-bold text-base text-gray-700">ID</th>
              <th className="py-3 px-4 font-bold text-base text-gray-700">Name</th>
              <th className="py-3 px-4 font-bold text-base text-gray-700">Email</th>
              <th className="py-3 px-4 font-bold text-base text-gray-700">Roles</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u, idx) => (
              <tr key={u.id} className={"text-center " + (((page - 1) * pageSize + idx) % 2 === 0 ? "bg-gray-50" : "bg-white") + " hover:bg-blue-100 transition"}>
                <td className="py-3 px-4 border-b text-sm font-normal">{u.id}</td>
                <td className="py-3 px-4 border-b text-left text-sm font-normal">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center font-bold text-sm mr-2 align-middle">
                    {u.name ? u.name[0].toUpperCase() : "U"}
                  </span>
                  <span className="align-middle">{u.name}</span>
                </td>
                <td className="py-3 px-4 border-b text-sm font-normal">{u.email}</td>
                <td className="py-3 px-4 border-b text-sm font-normal">
                  <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs font-medium">
                    {u.roles?.join(", ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-medium disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="font-semibold">Page {page} of {totalPages}</span>
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-medium disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
