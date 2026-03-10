import { ShieldAlertIcon, ShieldCheckIcon, ScanIcon, UsersIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = () => {
            setTimeout(() => {
                setStats({
                    total_users: 142,
                    total_searches: 1250,
                    total_blocked_users: 8,
                    last_10_searches: [
                        { url: "https://secure-login-paypal.com", prediction: "phishing", confidence_score: 0.98, user_name: "Alice Smith", user_email: "alice@test.com", createdAt: new Date().toISOString() },
                        { url: "https://github.com/login", prediction: "safe", confidence_score: 0.02, user_name: "Bob Wilson", user_email: "bob@test.com", createdAt: new Date(Date.now() - 3600000).toISOString() },
                        { url: "https://amazon-verify-account.co", prediction: "phishing", confidence_score: 0.94, user_name: "Charlie Brown", user_email: "charlie@test.com", createdAt: new Date(Date.now() - 7200000).toISOString() },
                        { url: "https://google.com", prediction: "safe", confidence_score: 0.01, user_name: "David Miller", user_email: "david@test.com", createdAt: new Date(Date.now() - 10800000).toISOString() },
                        { url: "https://microsoft-support-update.net", prediction: "phishing", confidence_score: 0.89, user_name: "Eve Jones", user_email: "eve@test.com", createdAt: new Date(Date.now() - 14400000).toISOString() },
                        { url: "https://facebook.com", prediction: "safe", confidence_score: 0.03, user_name: "Frank White", user_email: "frank@test.com", createdAt: new Date(Date.now() - 18000000).toISOString() },
                        { url: "https://netflix-billing-update.info", prediction: "phishing", confidence_score: 0.91, user_name: "Grace Lee", user_email: "grace@test.com", createdAt: new Date(Date.now() - 21600000).toISOString() }
                    ]
                });
                setLoading(false);
            }, 500);
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2Icon className="size-8 animate-spin text-gray-400" />
                <p className="text-gray-500 mt-4 text-sm tracking-wide">Initializing dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <ShieldAlertIcon className="size-12 text-gray-200 mb-4" />
                <h3 className="text-lg font-medium text-gray-800">Connection Failed</h3>
                <p className="text-gray-500 mt-2 max-w-xs">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg text-sm transition hover:bg-black"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    const statCards = [
        { label: "Total Users", value: stats?.total_users || 0, icon: UsersIcon },
        { label: "Total Scans", value: stats?.total_searches || 0, icon: ScanIcon },
        { label: "Phishing Detected", value: stats?.last_10_searches?.filter(s => s.prediction === 'phishing').length || 0, icon: ShieldAlertIcon },
        { label: "Blocked Users", value: stats?.total_blocked_users || 0, icon: ShieldCheckIcon },
    ];

    return (
        <div className="px-8 py-8 max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                    Admin Control Panel
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Monitor and Manage Phishing Activity
                </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {statCards.map(({ label, value, icon: Icon }, index) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-100 rounded-xl p-5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                                {label}
                            </span>
                            <Icon className="size-4 text-gray-300" />
                        </div>
                        <p className="text-3xl font-semibold text-gray-900 tracking-tight">
                            {value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Divider */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="border-t border-gray-100 mb-8"
            />

            {/* Recent Scans */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full overflow-hidden"
            >
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">
                    Recent Scans
                </h2>
                <div className="bg-white border border-gray-100 rounded-xl overflow-x-auto">
                    <table className="w-full text-sm font-light min-w-[600px] lg:min-w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wider">URL</th>
                                <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wider">Result</th>
                                <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wider">Confidence</th>
                                <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wider">User</th>
                                <th className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.last_10_searches?.map((scan, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 + (i * 0.05) }}
                                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                                >
                                    <td className="px-5 py-3.5 text-gray-600 font-mono text-xs truncate max-w-[200px]">{scan.url}</td>
                                    <td className="px-5 py-3.5">
                                        <ResultBadge result={scan.prediction} />
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <ConfidenceBadge score={scan.confidence_score} />
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="text-gray-600 text-xs font-medium">{scan.user_name}</div>
                                        <div className="text-gray-400 text-[10px]">{scan.user_email}</div>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-400 text-xs">
                                        {scan.createdAt ? new Date(scan.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

function ResultBadge({ result }) {
    const isSafe = result?.toLowerCase() === 'safe';
    return (
        <span className={`inline-block px-2.5 py-0.5 rounded border text-[10px] uppercase font-bold tracking-wider ${isSafe
            ? "border-green-100 text-green-600 bg-green-50"
            : "border-red-100 text-red-600 bg-red-50"
            }`}>
            {result}
        </span>
    );
}

function ConfidenceBadge({ score }) {
    const percentage = score ? (score * 100).toFixed(1) : '0';
    let style = "border-gray-100 text-gray-400";
    if (score > 0.8) style = "border-gray-800 text-gray-900 font-semibold";
    else if (score > 0.6) style = "border-gray-400 text-gray-600";

    return (
        <span className={`inline-block px-2.5 py-0.5 rounded border text-xs ${style}`}>
            {percentage}%
        </span>
    );
}

