import { Link } from "react-router";
import { LockIcon, ShieldIcon, CheckCircleIcon } from "lucide-react";
import { useState } from "react";

export default function ResetPassword() {
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!passwords.newPassword || !passwords.confirmPassword) {
            alert("Please fill all the fields");
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("Passwords do not match!");
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
                    Set New Password
                    <span className="text-gray-500/90 text-4xl">Secure Your Account</span>
                </h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="md:w-96 w-full flex flex-col items-center justify-center px-4">
                        <h2 className="text-4xl text-gray-900 font-medium text-center">Reset Password</h2>
                        <p className="text-sm text-gray-500/90 mt-3 text-center">
                            Please enter your new password below.
                        </p>

                        <div className="flex items-center gap-4 w-full my-8">
                            <div className="w-full h-px bg-gray-300/90"></div>
                        </div>

                        <div className="flex items-center w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2 mb-4">
                            <LockIcon size={18} className="text-gray-400" />
                            <input
                                type="password"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                placeholder="New Password"
                                className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <div className="flex items-center w-full bg-transparent border border-gray-200 focus-within:border-gray-300 h-12 rounded-full overflow-hidden pl-5 gap-2">
                            <LockIcon size={18} className="text-gray-400" />
                            <input
                                type="password"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                placeholder="Confirm New Password"
                                className="bg-transparent placeholder-gray-400 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-8 w-full h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition shadow-sm font-medium"
                        >
                            Reset Password
                        </button>
                    </form>
                ) : (
                    <div className="md:w-96 w-full flex flex-col items-center justify-center text-center px-6">
                        <div className="size-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                            <CheckCircleIcon className="text-green-600 size-8" />
                        </div>
                        <h2 className="text-3xl text-gray-900 font-medium mb-3">Password Reset!</h2>
                        <p className="text-gray-500 mb-8">
                            Your password has been successfully updated. You can now use your new password to log in.
                        </p>
                        <Link
                            to="/login"
                            className="w-full flex items-center justify-center h-11 rounded-full text-white bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition shadow-sm font-medium"
                        >
                            Continue to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
