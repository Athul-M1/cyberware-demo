import { useEffect, useState } from "react";
import { Trash2Icon, SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, page]);

    const fetchUsers = () => {
        setLoading(true);
        setTimeout(() => {
            setUsers([
                { _id: '1', user_name: "James Wilson", email: "james.w@example.com", total_searches: 15, isBlocked: false },
                { _id: '2', user_name: "Sarah Parker", email: "sarah.p@example.com", total_searches: 42, isBlocked: true },
                { _id: '3', user_name: "Michael Chen", email: "m.chen@example.com", total_searches: 8, isBlocked: false },
                { _id: '4', user_name: "Emily Davis", email: "emily.d@example.com", total_searches: 21, isBlocked: false },
                { _id: '5', user_name: "Robert Taylor", email: "robert.t@example.com", total_searches: 5, isBlocked: false },
                { _id: '6', user_name: "Jessica Brown", email: "jess.b@example.com", total_searches: 11, isBlocked: true },
                { _id: '7', user_name: "William Moore", email: "will.m@example.com", total_searches: 3, isBlocked: false }
            ]);
            setPagination({ total: 3, totalPages: 1 });
            setLoading(false);
        }, 500);
    };

    const toggleBlock = (user) => {
        setUsers(users.map(u => u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u));
    };

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to delete this user? This will also delete their search history.")) {
            setUsers(users.filter(u => u._id !== userId));
        }
    };

    return (
        <div className="px-8 py-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Users</h1>
                <p className="text-sm text-gray-400 mt-1">Manage all registered users</p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="relative w-full md:w-80">
                    <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        placeholder="Search by name or email..."
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full pl-11 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all shadow-sm placeholder:text-gray-400 text-gray-900"
                    />
                </div>
                {search && (
                    <button onClick={() => setSearch("")} className="text-xs text-gray-400 hover:text-gray-600 font-medium whitespace-nowrap">Clear search</button>
                )}
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-x-auto">
                <table className="w-full text-sm min-w-[700px] lg:min-w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {["Name", "Email", "Total Scans", "Status", "Actions"].map((h) => (
                                <th key={h} className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wider">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-5 py-10 text-center text-gray-400 text-sm">
                                    Loading users...
                                </td>
                            </tr>
                        ) : users.map((user, index) => (
                            <motion.tr
                                key={user._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                            >
                                <td className="px-5 py-3.5 text-gray-800 font-medium">{user.user_name}</td>
                                <td className="px-5 py-3.5 text-gray-500 text-xs">{user.email}</td>
                                <td className="px-5 py-3.5 text-gray-500">{user.total_searches || 0}</td>
                                <td className="px-5 py-3.5">
                                    <span className={`text-xs font-medium ${!user.isBlocked ? "text-gray-800" : "text-gray-400"
                                        }`}>
                                        {user.isBlocked ? "Blocked" : "Active"}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleBlock(user)}
                                            className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded hover:border-gray-400 hover:text-gray-800 transition-colors"
                                        >
                                            {user.isBlocked ? "Unblock" : "Block"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-1.5 text-red-400 hover:text-red-600 border border-transparent hover:border-red-100 hover:bg-red-50 rounded transition-all"
                                            title="Delete User"
                                        >
                                            <Trash2Icon size={14} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                        {!loading && users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-10 text-center text-gray-400 text-sm">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                        Showing page {page} of {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 text-xs border border-gray-200 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={page === pagination.totalPages}
                            className="px-3 py-1 text-xs border border-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
