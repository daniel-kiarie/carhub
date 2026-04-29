import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((r) => setUsers(r.data))
      .catch((err) => console.error("Failed to fetch users:", err))
      .finally(() => setLoading(false));
  }, [user?.token]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user.");
    }
  };

  if (loading) return <div className="text-center p-10">Loading users...</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>
        <div className="bg-blue-50 border border-blue-100 px-5 py-3 rounded-xl">
          <p className="text-xs text-blue-400 uppercase tracking-widest font-semibold">Total Users</p>
          <p className="text-3xl font-bold text-blue-600 text-center">{users.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-bold text-sm text-gray-600">Name</th>
              <th className="p-4 font-bold text-sm text-gray-600">Email</th>
              <th className="p-4 font-bold text-sm text-gray-600">Role</th>
              <th className="p-4 font-bold text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400 text-sm">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4 text-gray-600">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(u._id, u.name)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;