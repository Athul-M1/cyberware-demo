import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Loader2Icon, ShieldAlertIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminScans() {
    const { search } = useOutletContext();
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetchScans();
    }, [page, search]);

    const fetchScans = () => {
        setLoading(true);
        setTimeout(() => {
            let data = [
                { url: "https://amazon-secure-login.com", prediction: "phishing", confidence_score: 0.95, createdAt: new Date().toISOString(), user_name: "James Wilson", user_email: "james.w@example.com" },
                { url: "https://google.com", prediction: "safe", confidence_score: 0.01, createdAt: new Date(Date.now() - 3600000).toISOString(), user_name: "Emily Davis", user_email: "emily.d@example.com" },
                { url: "http://paypal-verify-alert.net", prediction: "phishing", confidence_score: 0.88, createdAt: new Date(Date.now() - 7200000).toISOString(), user_name: "Michael Chen", user_email: "m.chen@example.com" },
                { url: "https://microsoft-login.live.com", prediction: "safe", confidence_score: 0.02, createdAt: new Date(Date.now() - 10800000).toISOString(), user_name: "Sarah Parker", user_email: "sarah.p@example.com" },
                { url: "http://bankofamerica-access.info", prediction: "phishing", confidence_score: 0.91, createdAt: new Date(Date.now() - 14400000).toISOString(), user_name: "William Moore", user_email: "will.m@example.com" },
                { url: "https://appleid.apple.com", prediction: "safe", confidence_score: 0.03, createdAt: new Date(Date.now() - 18000000).toISOString(), user_name: "Jessica Brown", user_email: "jess.b@example.com" },
                { url: "https://netflix-update-billing.xyz", prediction: "phishing", confidence_score: 0.97, createdAt: new Date(Date.now() - 21600000).toISOString(), user_name: "Robert Taylor", user_email: "robert.t@example.com" }
            ];

            if (search) {
                data = data.filter(s =>
                    s.url.toLowerCase().includes(search.toLowerCase()) ||
                    s.user_name.toLowerCase().includes(search.toLowerCase())
                );
            }
            setScans(data);
            setPagination({ total: data.length, totalPages: 1 });
            setLoading(false);
        }, 500);
    };

    return (
        <div className="px-8 py-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Scan History</h1>
                <p className="text-sm text-gray-400 mt-1">Full log of all URL scans performed</p>
            </motion.div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-x-auto scrollbar-hide">
                <table className="w-full text-sm min-w-[700px] lg:min-w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            {["URL", "Result", "Confidence", "Date", "User"].map((h) => (
                                <th key={h} className="text-left px-5 py-3.5 text-xs text-gray-400 font-medium uppercase tracking-wider">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-5 py-20 text-center">
                                    <Loader2Icon className="size-6 animate-spin text-gray-300 mx-auto" />
                                </td>
                            </tr>
                        ) : scans.map((scan, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                            >
                                <td className="px-5 py-3.5 text-gray-600 font-mono text-xs truncate max-w-[220px]">
                                    {scan.url}
                                </td>
                                <td className="px-5 py-3.5">
                                    <ResultBadge result={scan.prediction} />
                                </td>
                                <td className="px-5 py-3.5">
                                    <ConfidenceBadge score={scan.confidence_score} />
                                </td>
                                <td className="px-5 py-3.5 text-gray-400 text-xs">
                                    {scan.createdAt ? new Date(scan.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="text-gray-600 text-xs font-medium">{scan.user_name}</div>
                                    <div className="text-gray-400 text-[10px]">{scan.user_email}</div>
                                </td>
                            </motion.tr>
                        ))}
                        {!loading && scans.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-10 text-center text-gray-400 text-sm">
                                    No scan records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                        Showing page {page} of {pagination.totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={page === pagination.totalPages}
                            className="px-4 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
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

