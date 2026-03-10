import { motion } from "framer-motion";
import {
    ZapIcon,
    ShieldIcon,
    TargetIcon,
    GlobeIcon,
    GaugeIcon,
    ActivityIcon,
    AlertTriangleIcon,
    ShieldAlertIcon
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminIntelligence() {
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setTimeout(() => {
            setScans([
                { prediction: 'phishing', confidence_score: 0.95 },
                { prediction: 'safe', confidence_score: 0.1 },
                { prediction: 'phishing', confidence_score: 0.88 },
                { prediction: 'safe', confidence_score: 0.05 },
                { prediction: 'phishing', confidence_score: 0.92 }
            ]);
            setLoading(false);
        }, 500);
    };

    // Derived stats for the "Intelligence" feel
    const phishingScans = scans.filter(s => s.prediction === 'phishing');
    const avgConfidence = scans.length > 0
        ? (scans.reduce((acc, curr) => acc + (curr.confidence_score || 0), 0) / scans.length * 100).toFixed(1)
        : 0;

    return (
        <div className="px-8 py-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Threat Intelligence</h1>
                <p className="text-sm text-gray-400 mt-1">Real-time analysis of phishing patterns and model performance</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <IntelCard
                    title="Model Precision"
                    value="98.2%"
                    icon={<GaugeIcon className="size-4 text-blue-600" />}
                    status="Operational"
                    color="text-blue-600"
                />
                <IntelCard
                    title="Threat Detection"
                    value={`${phishingScans.length} active`}
                    icon={<AlertTriangleIcon className="size-4 text-red-600" />}
                    status="High Alert"
                    color="text-red-600"
                />
                <IntelCard
                    title="Global Traffic"
                    value="1.2M queries"
                    icon={<GlobeIcon className="size-4 text-green-600" />}
                    status="Stable"
                    color="text-green-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Model Insights */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <ZapIcon className="size-4" />
                            AI Engine Performance
                        </h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">Model Version</div>
                            <div className="px-3 py-1 bg-gray-50 text-gray-800 text-xs font-mono rounded-full border border-gray-100 italic">Cyberware v3.2-r12</div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-gray-400">
                                <span>Detection Speed</span>
                                <span>~42ms</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "95%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gray-900"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-gray-400">
                                <span>Average Confidence Level</span>
                                <span>{avgConfidence}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${avgConfidence}%` }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="h-full bg-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                        <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">Automated Actions</div>
                        <ul className="text-xs text-gray-500 space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="size-1 rounded-full bg-green-500" />
                                Geo-Fencing is currently active for 14 regions
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="size-1 rounded-full bg-green-500" />
                                Auto-Block triggered for domains with {">"}90% risk
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Threat Landscape */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <TargetIcon className="size-4" />
                            Targeted Sectors
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: "Financial Institutions", count: "42%", trend: "up" },
                            { label: "E-Commerce", count: "28%", trend: "down" },
                            { label: "Social Networks", count: "15%", trend: "stable" },
                            { label: "Cloud Services", count: "10%", trend: "up" },
                            { label: "Others", count: "5%", trend: "stable" }
                        ].map((sector, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-gray-50 hover:bg-gray-50/50 transition-all">
                                <div className="text-xs font-medium text-gray-700">{sector.label}</div>
                                <div className="flex items-center gap-4">
                                    <div className="text-xs font-bold text-gray-900">{sector.count}</div>
                                    <div className={`size-1.5 rounded-full ${sector.trend === 'up' ? 'bg-red-400 animate-pulse' :
                                        sector.trend === 'down' ? 'bg-green-400' : 'bg-gray-300'
                                        }`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-2.5 text-xs text-center border border-gray-100 rounded-xl hover:bg-gray-50 transition-all text-gray-500 font-medium">
                        View Detailed Threat Report
                    </button>
                </motion.div>
            </div>

            {/* Retrain Model section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 bg-gray-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden relative"
            >
                <div className="relative z-10">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-2 italic">Model Evolution</h2>
                    <p className="text-white/50 text-xs md:text-sm max-w-sm">Use your latest scan history to fine-tune the detection engine and reduce false positives.</p>
                    <button className="mt-6 px-5 py-2 md:px-6 md:py-2 bg-white text-gray-900 text-[10px] md:text-xs font-bold rounded-full hover:bg-gray-200 transition-all uppercase tracking-widest flex items-center gap-2">
                        <ActivityIcon className="size-3" />
                        Retrain Model Now
                    </button>
                </div>
                <ShieldAlertIcon className="hidden md:block size-48 text-white/5 absolute -right-8 -bottom-8 pointer-events-none" />
            </motion.div>
        </div>
    );
}

function IntelCard({ title, value, icon, status, color }) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white border border-gray-100 p-5 rounded-2xl"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="p-1.5 bg-gray-50 rounded-lg">{icon}</div>
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{status}</div>
            </div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{title}</div>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
        </motion.div>
    );
}
