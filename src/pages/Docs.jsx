import { FileText, Shield, Cpu, Zap, Search, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="relative pt-12 pb-20 max-w-4xl mx-auto">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-pink-400/5 blur-3xl pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-500 text-sm mb-4">
                        <FileText className="size-4" />
                        Documentation
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Understanding the Detector</h1>
                    <p className="text-lg text-gray-500 leading-relaxed">
                        Our AI-powered phishing site detector uses advanced machine learning to protect you from malicious intent.
                        Learn how our system evaluates URLs and identifies potential threats.
                    </p>
                </motion.div>

                <div className="grid gap-12">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                            <Cpu className="size-6 text-gray-400" />
                            The Detection Engine
                        </h2>
                        <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                            <p>
                                Unlike traditional blacklisting which relies on a database of known bad sites, our system uses a **Random Forest Classifier**
                                to evaluate URLs in real-time. This allows us to detect "Zero-Day" phishing attacks that haven't been reported yet.
                            </p>
                            <p>
                                The engine analyzes 30 distinct structural features of every URL, looking for patterns that human attackers commonly use
                                to spoof legitimate services.
                            </p>
                        </div>
                    </motion.section>

                    <section className="grid md:grid-cols-2 gap-8">
                        <DocFeatureCard
                            icon={<Search className="size-6 text-gray-600 mb-4" />}
                            title="Structural Analysis"
                            desc="We examine URL length, the use of special characters (@, -, //), and the complexity of subdomains to identify suspicious nesting."
                            delay={0.3}
                        />
                        <DocFeatureCard
                            icon={<Zap className="size-6 text-gray-600 mb-4" />}
                            title="Behavioral Heuristics"
                            desc="Our system looks for malicious behavioral markers like hidden iframes, deceptive favicons, and unauthorized port access."
                            delay={0.4}
                        />
                        <DocFeatureCard
                            icon={<Shield className="size-6 text-gray-600 mb-4" />}
                            title="Trust Verification"
                            desc="By checking SSL status, domain registration length, and web traffic rankings, we assign a probability score to every scan."
                            delay={0.5}
                        />
                        <DocFeatureCard
                            icon={<Lock className="size-6 text-gray-600 mb-4" />}
                            title="Privacy First"
                            desc="Your scans are encrypted and private. We only utilize the structural data to improve our global detection models."
                            delay={0.6}
                        />
                    </section>

                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="border-t border-gray-100 pt-12"
                    >
                        <div className="bg-linear-to-b from-gray-600 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Ready to stay safe?</h3>
                                <p className="text-gray-300 mb-6">Start scanning URLs and build your personal defense history today.</p>
                                <a href="/" className="inline-flex items-center px-6 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition">
                                    Analyze a URL
                                </a>
                            </div>
                            <Shield className="absolute -right-8 -bottom-8 size-48 text-white/5 rotate-12" />
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}

function DocFeatureCard({ icon, title, desc, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-white hover:shadow-sm transition-all"
        >
            {icon}
            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
        </motion.div>
    );
}
