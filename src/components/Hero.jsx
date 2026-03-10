import { Loader2Icon, ScanIcon, TrendingUpIcon, ShieldAlertIcon, ShieldCheckIcon } from "lucide-react";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
    const [prompt, setPrompt] = useState("");

    const [loading, setLoading] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);


    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setResult(null);

        setTimeout(() => {
            setResult({
                result: Math.random() > 0.5 ? 'phishing' : 'safe',
                confidence: 0.85 + Math.random() * 0.14
            });
            setLoading(false);
        }, 1500);
    };

    const placeholders = [
        "https://paypa1-secure-login.com",
        "http://amazon-verify-account.net",
        "https://faceb00k-support.xyz",
        "http://bankofamerica-alert.info",
        "https://apple-id-suspended.tk",
    ];


    const prompts = [
        { label: "🔗 URL Scanner" },
        { label: "📧 Email Link Check" },
        { label: "🌐 Domain Spoof Detect" },
        { label: "🏦 Bank Phishing" },
        { label: "🛒 E-commerce Fraud" },
        { label: "🔒 SSL Fake Sites" },
        { label: "📱 SMS Phishing" },
        { label: "☁️ Cloud Login Scam" },
        { label: "🎣 Social Engineering" },
        { label: "📄 Malicious PDFs" },
    ];


    useEffect(() => {
        if (prompt) return;

        const currentWord = placeholders[textIndex];

        if (!deleting && charIndex === currentWord.length) {
            setTimeout(() => setDeleting(true), 2000);
            return;
        }

        if (deleting && charIndex === 0) {
            setDeleting(false);
            setTextIndex((prev) => (prev + 1) % placeholders.length);
            return;
        }

        const timeout = setTimeout(() => {
            setCharIndex((prev) => prev + (deleting ? -1 : 1));
        }, 50);

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, textIndex, prompt]);

    const animatedPlaceholder = placeholders[textIndex].substring(0, charIndex);

    return (
        <section id="home" className="relative flex flex-col items-center justify-center overflow-hidden">

            {/* Gradient pulse blob */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-92 h-92 rounded-full bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/10 blur-3xl pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-gray-500 mt-32"
            >
                <TrendingUpIcon className="size-4.5" />
                <span>Scanned 1M+ URLs · Trusted by 50,000+ users</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-5xl/17 md:text-[64px]/20 font-semibold max-w-2xl m-2"
            >
                AI-Powered Phishing Site Detector
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-base text-gray-500 max-w-md mt-2"
            >
                “Advanced AI algorithms to identify and block phishing attempts in real-time. Protect your digital identity.”
            </motion.p>

            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit}
                className="focus-within:ring-2 focus-within:ring-gray-300 border border-gray-200 rounded-xl max-w-2xl w-full mt-8"
            >
                <textarea
                    className="w-full resize-none p-4 outline-none text-gray-600"
                    placeholder={`e.g. ${animatedPlaceholder}`}
                    rows={3}
                    minLength={10}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                />

                <div className="flex items-center justify-end p-4 pt-0">
                    <button className={`flex items-center bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-4 h-9 text-white rounded-lg ${loading ? "cursor-not-allowed opacity-80" : ""}`}>
                        {loading ? (
                            <Loader2Icon className="size-5 animate-spin" />
                        ) : (
                            <>
                                <ScanIcon className="size-4" />
                                <span className="ml-2">Scan</span>
                            </>
                        )}
                    </button>
                </div>
            </motion.form>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`mt-10 p-6 rounded-2xl border w-full max-w-2xl flex items-center gap-6 ${result.result === 'phishing'
                            ? "bg-red-50 border-red-200"
                            : "bg-green-50 border-green-200"
                            }`}
                    >
                        <div className={`p-4 rounded-xl ${result.result === 'phishing' ? "bg-red-100" : "bg-green-100"
                            }`}>
                            {result.result === 'phishing'
                                ? <ShieldAlertIcon className="size-8 text-red-600" />
                                : <ShieldCheckIcon className="size-8 text-green-600" />
                            }
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-xl font-bold uppercase tracking-wide ${result.result === 'phishing' ? "text-red-700" : "text-green-700"
                                }`}>
                                Website is {result.result === 'phishing' ? "Suspicious" : "safe"}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 truncate max-w-md">
                                {prompt}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                    Confidence Score: {(result.confidence * 100).toFixed(1)}%
                                </div>
                                <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${result.result === 'phishing' ? "bg-red-500" : "bg-green-500"
                                            }`}
                                        style={{ width: `${result.confidence * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setResult(null)}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <span className="text-xl">×</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="w-full max-w-2xl"
            >
                <Marquee gradient speed={30} pauseOnHover className="w-full mt-4 overflow-hidden" >
                    {prompts.map((item) => (
                        <span
                            key={item.label}
                            className="px-2 py-2 mx-4 border rounded-full text-gray-500 bg-gray-50 border-gray-200 "
                        >
                            {item.label}
                        </span>
                    ))}
                </Marquee>
            </motion.div>
        </section>
    );
}