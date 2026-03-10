import { Link } from "react-router";
import { MailIcon, ShieldIcon, ArrowLeftIcon } from "lucide-react";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            alert("Please enter your email address");
            return;
        }
        // Simulated success for UI only
        setIsSubmitted(true);
    };

    return (
        <div className="flex items-center min-h-screen justify-center max-w-6xl h-screen mx-auto relative">
            <div className="flex-1 hidden md:flex flex-col justify-center items-start px-12 gap-0">
                <div className="mb-8 flex items-center gap-3">
                    <ShieldIcon className="size-12 text-gray-900 fill-gray-900/5" />
                    <span className="text-gray-900 font-bold tracking-tight text-4xl">
                        Cyberware AI
                    </span>
                </div>

                <h1 className="text-5xl text-gray-900/90 flex flex-col gap-2">
                    Recover Your Account
                    <span className="text-gray-500/90 text-4xl">Securely and Efficiently</span>
                </h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="md:w-96 w-full flex flex-col items-center justify-center">
                        <h2 className="text-4xl text-gray-900 font-medium">Forgot Password?</h2>
                        <p className="text-sm text-gray-500/90 mt-3 text-center px-4">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <div className="flex items-center gap-4 w-full my-8">
                            <div className="w-full h-px bg-gray-300/90"></div>
                        </div>

                        <div className="flex items-center w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                            <MailIcon size={18} className="text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-8 w-full h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition shadow-sm font-medium"
                        >
                            Send Reset Link
                        </button>

                        <div className="mt-6 flex items-center gap-2 text-gray-500/90 hover:text-gray-900 transition">
                            <ArrowLeftIcon size={16} />
                            <Link to="/login" className="text-sm font-medium">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                ) : (
                    <div className="md:w-96 w-full flex flex-col items-center justify-center text-center px-6">
                        <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <MailIcon className="text-gray-800 size-8" />
                        </div>
                        <h2 className="text-3xl text-gray-900 font-medium mb-3">Check your email</h2>
                        <p className="text-gray-500 mb-8">
                            We've sent a password reset link to <br />
                            <span className="font-semibold text-gray-900">{email}</span>
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="w-full h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition shadow-sm font-medium"
                        >
                            Try another email
                        </button>
                        <Link
                            to="/login"
                            className="mt-6 text-sm text-gray-500 hover:text-gray-900 transition font-medium"
                        >
                            Return to login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
