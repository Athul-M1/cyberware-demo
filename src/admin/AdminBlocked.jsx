import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";

export default function AdminBlocked() {
    const [blocked, setBlocked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchBlockedUsers();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const fetchBlockedUsers = () => {
        setLoading(true);
        setTimeout(() => {
            const mockData = [
                { _id: '1', user_name: "Unauthorized Access", email: "hacker@evil.com", createdAt: new Date().toISOString() },
                { _id: '2', user_name: "Spam Bot 9000", email: "bot@spamservices.net", createdAt: new Date(Date.now() - 86400000).toISOString() },
                { _id: '3', user_name: "Bad Actor", email: "malicious@user.io", createdAt: new Date(Date.now() - 172800000).toISOString() },
                { _id: '4', user_name: "Phishing King", email: "phish@master.com", createdAt: new Date(Date.now() - 259200000).toISOString() }
            ];

            const filteredData = search ? mockData.filter(u =>
                u.user_name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())
            ) : mockData;

            setBlocked(filteredData);
            setLoading(false);
        }, 500);
    };

    const handleUnblock = (user) => {
        setBlocked(blocked.filter(u => u._id !== user._id));
    };

    return (
        <div className="px-8 py-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Blocked Users</h1>
                <p className="text-sm text-gray-400 mt-1">Users currently restricted from the platform</p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="relative w-full md:w-80">
                    <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        placeholder="Search blocked users..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all shadow-sm placeholder:text-gray-400 text-gray-900"
                    />
                </div>
                {search && (
                    <button onClick={() => setSearch("")} className="text-xs text-gray-400 hover:text-gray-600 font-medium whitespace-nowrap">Clear filter</button>
                )}
            </div>

            {loading ? (
                <div className="bg-white border border-gray-100 rounded-xl px-8 py-16 text-center">
                    <p className="text-gray-400 text-sm">Loading blocked users...</p>
                </div>
            ) : blocked.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-xl px-8 py-16 text-center">
                    <p className="text-gray-400 text-sm">No blocked users.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {blocked.map((user, index) => (
                        <motion.div
                            key={user._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white border border-gray-100 rounded-xl px-6 py-5 flex items-start justify-between gap-6 hover:border-gray-200 transition-colors"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-sm font-medium text-gray-800">{user.user_name}</span>
                                    <span className="text-xs text-gray-400">{user.email}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">
                                    <span className="text-gray-400 mr-1">Status:</span>
                                    Blocked
                                </p>
                                <p className="text-xs text-gray-300">Joined on {user.createdAt?.split('T')[0]}</p>
                            </div>
                            <button
                                onClick={() => handleUnblock(user)}
                                className="shrink-0 text-xs text-gray-500 border border-gray-200 px-4 py-1.5 rounded hover:border-gray-400 hover:text-gray-800 transition-colors"
                            >
                                Unblock
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
