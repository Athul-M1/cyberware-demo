import { useEffect, useState } from "react";
import { History, ShieldAlert, ShieldCheck, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = () => {
            setTimeout(() => {
                setHistory([
                    { _id: '1', url: 'https://paypal-secure-login.com', prediction: 'phishing', confidence_score: 0.98, createdAt: new Date().toISOString() },
                    { _id: '2', url: 'https://github.com/login', prediction: 'safe', confidence_score: 0.99, createdAt: new Date(Date.now() - 86400000).toISOString() },
                    { _id: '3', url: 'http://amazon-verify-account.net', prediction: 'phishing', confidence_score: 0.92, createdAt: new Date(Date.now() - 172800000).toISOString() },
                    { _id: '4', url: 'https://google.com', prediction: 'safe', confidence_score: 0.99, createdAt: new Date(Date.now() - 259200000).toISOString() },
                    { _id: '5', url: 'https://microsoft-support.xyz', prediction: 'phishing', confidence_score: 0.87, createdAt: new Date(Date.now() - 345600000).toISOString() },
                    { _id: '6', url: 'https://netflix.com', prediction: 'safe', confidence_score: 0.99, createdAt: new Date(Date.now() - 432000000).toISOString() },
                    { _id: '7', url: 'https://bank-of-america-verify.info', prediction: 'phishing', confidence_score: 0.95, createdAt: new Date(Date.now() - 518400000).toISOString() }
                ]);
                setLoading(false);
            }, 1000);
        };

        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="relative pt-12 pb-20">
                {/* Background blob */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-pink-400/5 blur-3xl pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <History className="size-6 text-gray-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">Scan History</h1>
                        <p className="text-gray-500">Your recent phishing detection activity</p>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                    </div>
                ) : history.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200"
                    >
                        <History className="size-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600">No scans found</h3>
                        <p className="text-gray-400">Your scan history will appear here once you start scanning URLs.</p>
                    </motion.div>
                ) : (
                    <div className="grid gap-4">
                        {history.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group p-5 bg-white border border-gray-200 rounded-xl hover:shadow-sm hover:border-gray-300 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4 overflow-hidden">
                                        <div className={`mt-1 p-2 rounded-lg shrink-0 ${item.prediction === 'phishing'
                                            ? 'bg-red-50 text-red-600 border border-red-100'
                                            : 'bg-green-50 text-green-600 border border-green-100'
                                            }`}>
                                            {item.prediction === 'phishing' ? <ShieldAlert className="size-5" /> : <ShieldCheck className="size-5" />}
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-xs font-bold uppercase tracking-wider ${item.prediction === 'phishing' ? 'text-red-500' : 'text-green-500'
                                                    }`}>
                                                    {item.prediction}
                                                </span>
                                                <span className="text-gray-300">•</span>
                                                <div className="flex items-center text-xs text-gray-400">
                                                    <Calendar className="size-3 mr-1" />
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <h3 className="text-gray-700 font-medium truncate mb-1">
                                                {item.url}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 shrink-0">
                                        {item.confidence_score && (
                                            <div className="text-right">
                                                <div className="text-xs text-gray-400">Confidence</div>
                                                <div className="text-sm font-semibold text-gray-700">
                                                    {(item.confidence_score * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        )}
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition"
                                        >
                                            <ExternalLink className="size-5" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
