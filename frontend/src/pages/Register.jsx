import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">

            <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 text-white border border-white/10">

                <h2 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h2>

                <p className="text-center text-sm text-gray-300 mb-8">
                    Register for Secure Access
                </p>

                <div className="mb-5">
                    <label className="block mb-2 text-sm text-gray-300">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

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
                        placeholder="Create password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={async () => {
                        try {
                            const res = await axios.post(
                                "http://localhost/dscms/backend/api/register.php",
                                {
                                    name: name,
                                    email: email,
                                    password: password,
                                }
                            );

                            if (res.data.status === "success") {
                                alert("Registration Successful");
                                navigate("/login");
                            } else {
                                alert("Registration Failed");
                            }

                        } catch (error) {
                            console.error(error);
                            alert("Server Error");
                        }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
                >
                    Register Securely
                </button>

            </div>

        </div>
    );
}

export default Register;