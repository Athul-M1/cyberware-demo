import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { CheckIcon, LockIcon, MailIcon, ShieldIcon } from "lucide-react";

export default function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleLogin = (e) => {
        e.preventDefault()
        const { email, password } = credentials
        if (!email || !password) {
            alert("Please fill all the fields")
        } else {
            console.log("Login credential:", credentials);
            navigate('/')
        }
    }

    return (
        <div className="flex items-center min-h-screen justify-center max-w-6xl h-screen  mx-auto relative">
            <div className="flex-1 hidden md:flex flex-col justify-center items-start px-12 gap-0" >
                <div className="mb-8 flex items-center gap-3">
                    <ShieldIcon className="size-12 text-gray-900 fill-gray-900/5" />
                    <span className="text-gray-900 font-bold tracking-tight text-4xl">
                        Cyberware AI
                    </span>
                </div>

                <h1 className="text-5xl text-gray-900/90 flex flex-col gap-2">
                    AI-Powered Protection
                    <span className="text-gray-500/90 text-4xl">Against Phishing Threats</span>
                </h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <form className="md:w-96 w-full flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium">Login</h2>
                    <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>
                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90">sign in with email</p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                        <MailIcon size={18} className="text-gray-400" />
                        <input type="email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} placeholder="Email id" className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                        <LockIcon size={18} className="text-gray-400" />
                        <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} placeholder="Password" className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full" required />
                    </div>

                    <div className="w-full flex justify-end mt-4 px-2">
                        <Link to="/forgot-password" size="sm" className="text-md text-black font-normal underline hover:text-gray-800 transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                    <button type="submit" onClick={handleLogin} className="mt-8 w-full h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition">
                        Login
                    </button>

                    <p className="text-gray-500/90 mt-4">Don't have an account? <Link to={'/signup'}> <span className="text-gray-800 underline">Sign up</span></Link></p>
                </form>
            </div>
        </div>
    );
};