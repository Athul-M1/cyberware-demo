import { MenuIcon, XIcon, UserIcon, LogOutIcon, ShieldIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = useRef(0);
    const navigate = useNavigate();

    const isAuthenticated = true;
    const user = { user_name: "Demo User", email: "demo@example.com", name: "Demo User" };

    const handleLogout = () => {
        navigate("/login");
        setIsOpen(false);
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "History", href: "/history" },
        { name: "Statistics", href: "/statistics" },
        { name: "Docs", href: "/docs" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScrollY.current && currentScroll > 80) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            lastScrollY.current = currentScroll;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-40 bg-white/60 backdrop-blur-md transition-transform duration-400 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="flex items-center justify-between px-4 py-4 md:px-16 lg:px-24 xl:px-32 border-b border-gray-200">

                    <Link to="/" className="flex items-center gap-2.5 group">
                        <ShieldIcon className="size-6 text-gray-900 fill-gray-900/5 transition-transform group-hover:scale-110" />
                        <span className="text-gray-900 font-bold tracking-tight text-xl">
                            Cyberware AI
                        </span>
                    </Link>


                    <div className="hidden md:flex items-center gap-8 text-gray-600">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="hover:text-gray-800">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2 text-gray-700 font-medium">
                                    <UserIcon size={20} />
                                    <span>{user?.user_name || user?.email}</span>
                                </div>
                                <button onClick={handleLogout} className="flex items-center gap-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                                    <LogOutIcon size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-6 py-2.5 hover:bg-gray-100 rounded-lg">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-5 py-2 text-white rounded-lg">
                                    Create new account
                                </Link>
                            </>
                        )}
                    </div>

                    <button onClick={() => setIsOpen(true)} className="transition active:scale-90 md:hidden">
                        <MenuIcon className="size-6.5" />
                    </button>
                </div>
            </nav>

            <div className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-white/40 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {isAuthenticated ? (
                    <>
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                            <UserIcon size={20} />
                            <span>{user?.name || user?.email}</span>
                        </div>
                        <button onClick={handleLogout} className="text-red-600">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" onClick={() => setIsOpen(false)} className="px-6 py-2.5">
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            onClick={() => setIsOpen(false)}
                            className="bg-linear-to-b from-gray-600 to-gray-800 px-5 py-2 text-white rounded-lg"
                        >
                            Sign Up
                        </Link>
                    </>
                )}

                <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md bg-linear-to-b from-gray-600 to-gray-800 p-2 text-white ring-white active:ring-2"
                >
                    <XIcon />
                </button>
            </div>
            <div className="h-18" />
        </>
    );
}
