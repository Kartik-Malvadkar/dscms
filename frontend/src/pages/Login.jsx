import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">

            <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 text-white border border-white/10">

                <h2 className="text-3xl font-bold text-center mb-2">
                    Onkar Digital Seva Center
                </h2>

                <p className="text-center text-sm text-gray-300 mb-8">
                    Secure Login Access
                </p>

                <div className="mb-5">
                    <label className="block mb-2 text-sm text-gray-300">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-300">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={async () => {
                        try {
                            const res = await axios.post(
                                "http://localhost/dscms/backend/api/login.php",
                                {
                                    email: email,
                                    password: password,
                                }
                            );

                            if (res.data.status === "success") {
                                localStorage.setItem("user", JSON.stringify(res.data.user));
                                navigate("/dashboard");
                            } else {
                                alert("Invalid Email or Password");
                            }

                        } catch (error) {
                            console.error(error);
                            alert("Server Error");
                        }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
                >
                    Login Securely
                </button>

                <p className="text-center mt-6 text-sm text-gray-400">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="underline cursor-pointer text-blue-300"
                    >
                        Register
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;