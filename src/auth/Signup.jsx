import { CheckIcon, CloudCog, LockIcon, MailIcon, User2, ShieldIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
// import { Link } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // console.log(user);
    const handleSignup = (e) => {
        e.preventDefault()
        const { username, email, password } = user
        if (!username || !email || !password) {
            alert("Please fill all the fields")
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setStep(2);
                setIsLoading(false);
            }, 1000);
        }
    }

    const handleVerifyOtp = (e) => {
        e.preventDefault()
        if (otp.length < 4) {
            alert("Please enter a valid OTP")
            return
        }

        alert("Verification successful! You can now log in.")
        setUser({
            username: "",
            email: "",
            password: ""
        })
        setOtp("")
        navigate('/login')
    }

    return (
        <div className="flex items-center min-h-screen justify-center max-w-6xl h-screen mx-auto relative">
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
                {step === 1 ? (
                    <form className="md:w-96 w-full flex flex-col  items-center justify-center">
                        <h2 className="text-4xl text-gray-900 font-medium">Sign up</h2>
                        <p className="text-sm text-gray-500/90 mt-3">Start by creating your account</p>
                        <div className="flex items-center gap-4 w-full my-5">
                            <div className="w-full h-px bg-gray-300/90"></div>
                            <p className="w-full text-nowrap text-sm text-gray-500/90">Sign up with email</p>
                            <div className="w-full h-px bg-gray-300/90"></div>
                        </div>
                        <div className="flex items-center mt-4 w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                            <User2 size={18} className="text-gray-400" />
                            <input type="text" value={user.username} placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full" required />
                        </div>
                        <div className="flex items-center mt-4 w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                            <MailIcon size={18} className="text-gray-400" />
                            <input type="email" value={user.email} placeholder="Email id" onChange={(e) => setUser({ ...user, email: e.target.value })} className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full" required />
                        </div>

                        <div className="flex items-center mt-4 w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                            <LockIcon size={18} className="text-gray-400" />
                            <input type="password" value={user.password} placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full" required />
                        </div>

                        <div className="w-full flex items-center justify-between mt-8">
                            <label className="flex gap-2 items-center cursor-pointer">
                            </label>
                        </div>

                        <button type="submit" onClick={handleSignup} disabled={isLoading} className=" w-full h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition flex items-center justify-center gap-2">
                            {isLoading ? (
                                <>
                                    <Loader2Icon className="size-5 animate-spin" />
                                    Signing up...
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </button>
                        <p className="text-gray-500/90 mt-4">Already have an account? <Link to={'/login'}> <span className="text-gray-800 underline">Login</span></Link></p>
                    </form>
                ) : (
                    <form className="md:w-96 w-full flex flex-col items-center justify-center px-4">
                        <div className="size-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mb-6">
                            <ShieldIcon className="text-gray-800 size-8" />
                        </div>
                        <h2 className="text-3xl text-gray-900 font-medium mb-3">Verify Your Email</h2>
                        <p className="text-sm text-gray-500/90 mt-2 mb-8 text-center max-w-xs">
                            We've sent an OTP to your email address. Please enter it below to verify your account.
                        </p>

                        <div className="flex items-center w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2 mb-6">
                            <LockIcon size={18} className="text-gray-400" />
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP code"
                                maxLength={6}
                                className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full tracking-widest font-medium"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleVerifyOtp}
                            className="w-full h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition font-medium shadow-sm"
                        >
                            Verify & Complete Signup
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="mt-6 text-sm text-gray-500 hover:text-gray-900 transition font-medium"
                        >
                            Back to sign up
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};