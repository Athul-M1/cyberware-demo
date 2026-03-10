import {
    BarChart2Icon,
    LayoutDashboardIcon,
    LogOutIcon,
    ShieldOffIcon,
    ShieldIcon,
    UsersIcon,
    HistoryIcon,
    MenuIcon,
    XIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboardIcon, to: "/admin/dashboard" },
    { label: "Users", icon: UsersIcon, to: "/admin/users" },
    { label: "Scan History", icon: HistoryIcon, to: "/admin/scans" },
    { label: "Blocked Users", icon: ShieldOffIcon, to: "/admin/blocked" },
    { label: "Intelligence", icon: BarChart2Icon, to: "/admin/intelligence" },
];

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    return (
        <div className="flex h-screen bg-white font-[Roboto,sans-serif] overflow-hidden relative">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence mode="wait">
                <motion.aside
                    initial={{ x: -250 }}
                    animate={{ x: 0 }}
                    exit={{ x: -250 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className={`fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] flex flex-col border-r border-white/5 z-50 lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        }`}
                >
                    {/* Brand */}
                    <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2.5">
                            <ShieldIcon className="size-5 text-white" />
                            <span className="text-white font-semibold tracking-wide text-sm">
                                Cyberware AI
                            </span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-1 text-white/40 hover:text-white"
                        >
                            <XIcon className="size-5" />
                        </button>
                    </div>
                    <p className="text-white/30 text-[10px] mt-1 ml-6 tracking-widest uppercase mb-4">
                        Admin Panel
                    </p>

                    {/* Nav */}
                    <nav className="flex-1 px-3 py-5 space-y-0.5 mt-2">
                        {navItems.map(({ label, icon: Icon, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150 ${isActive
                                        ? "text-white border border-white/15 bg-white/5"
                                        : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                    }`
                                }
                            >
                                <Icon className="size-4 shrink-0" />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="px-3 py-5 border-t border-white/5">
                        <button
                            onClick={() => {
                                sessionStorage.removeItem("token");
                                sessionStorage.removeItem("user");
                                navigate("/login");
                            }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-150 w-full"
                        >
                            <LogOutIcon className="size-4 shrink-0" />
                            <span>Logout</span>
                        </button>
                    </div>
                </motion.aside>
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Mobile Header (Hidden on Desktop) */}
                <header className="lg:hidden h-14 bg-white border-b border-gray-100 flex items-center px-4 justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <MenuIcon className="size-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <ShieldIcon className="size-5 text-gray-900" />
                        <span className="text-gray-900 font-bold tracking-tight text-lg">
                            Cyberware AI
                        </span>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </header>

                <div className="shrink-0 h-4 hidden lg:block" />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50/50">
                    <Outlet context={{ search: "" }} />
                </main>
            </div>
        </div>
    );
}
