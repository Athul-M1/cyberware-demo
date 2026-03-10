import { useEffect, useState } from "react";
import { BarChart3, PieChart, ShieldAlert, ShieldCheck, Globe, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function StatisticsPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = () => {
            setError(null);
            setTimeout(() => {
                setStats({
                    total_searches: 125,
                    phishing_detected: 15,
                    safe_sites: 110,
                    recent_activity_7d: 32,
                    top_domains: [
                        { domain: "google.com", count: 45 },
                        { domain: "paypal-secure.com", count: 32 },
                        { domain: "amazon.co.uk", count: 18 },
                        { domain: "github.com", count: 14 },
                        { domain: "microsoft-login.net", count: 9 },
                        { domain: "facebook.com", count: 7 }
                    ]
                });
                setLoading(false);
            }, 1000);
        };

        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
                <div className="relative">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-pink-400/5 blur-3xl pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-10"
                    >
                        <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                            <BarChart3 className="size-6 text-gray-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-800">Security Insights</h1>
                            <p className="text-gray-500">Analytics and trends from your scanning activity</p>
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                        </div>
                    ) : error ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-red-50/50 rounded-2xl border border-dashed border-red-200"
                        >
                            <ShieldAlert className="size-12 text-red-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-red-600">{error}</h3>
                            <button onClick={() => window.location.reload()} className="mt-4 text-xs font-semibold text-gray-500 underline uppercase tracking-widest hover:text-gray-800">
                                Try Again
                            </button>
                        </motion.div>
                    ) : stats?.total_searches === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200"
                        >
                            <Activity className="size-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-600">No scan data yet</h3>
                            <p className="text-gray-400">Complete some scans to see your security insights.</p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <StatCard
                                title="Total Scans"
                                value={stats.total_searches}
                                icon={<Globe className="size-5" />}
                                bg="bg-gray-50"
                                text="text-gray-600"
                                delay={0.1}
                            />
                            <StatCard
                                title="Phishing Detected"
                                value={stats.phishing_detected}
                                icon={<ShieldAlert className="size-5" />}
                                bg="bg-red-50 text-red-600"
                                text="text-red-600"
                                delay={0.2}
                            />
                            <StatCard
                                title="Safe Sites"
                                value={stats.safe_sites}
                                icon={<ShieldCheck className="size-5" />}
                                bg="bg-green-50 text-green-600"
                                text="text-green-600"
                                delay={0.3}
                            />
                            <StatCard
                                title="Recent (7d)"
                                value={stats.recent_activity_7d}
                                icon={<Activity className="size-5" />}
                                bg="bg-blue-50 text-blue-600"
                                text="text-blue-600"
                                delay={0.4}
                            />
                        </div>
                    )}

                    {stats?.top_domains?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white border border-gray-200 rounded-2xl p-8"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <PieChart className="size-5 text-gray-500" />
                                Most Scanned Domains
                            </h3>
                            <div className="space-y-4">
                                {stats.top_domains.map((domain, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                                                {index + 1}
                                            </div>
                                            <span className="text-gray-700 font-medium">{domain.domain}</span>
                                        </div>
                                        <div className="flex items-center gap-4 flex-1 max-w-xs ml-4">
                                            <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gray-600 rounded-full"
                                                    style={{ width: `${(domain.count / stats.total_searches) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-500 font-medium w-8">{domain.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, bg, text, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-sm transition-all"
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                {icon}
            </div>
            <div className="text-sm font-medium text-gray-400 mb-1">{title}</div>
            <div className={`text-3xl font-bold ${text}`}>{value}</div>
        </motion.div>
    );
}
