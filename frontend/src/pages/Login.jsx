import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("operator");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        if (e) e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {

            const res = await axios.post(
                "http://localhost/dscms/backend/api/login.php",
                {
                    email: email,
                    password: password,
                    role: role
                }
            );

            const data = res.data;

            if (data.status === "success") {

                const user = data.user;

                localStorage.setItem("user", JSON.stringify(user));

                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/operator/new-entry");
                }

            }
            else if (data.status === "invalid_password") {
                alert("Wrong password");
            }
            else if (data.status === "not_found") {
                alert("User not found");
            }
            else if (data.status === "role_mismatch") {
                alert("You selected wrong role");
            }
            else {
                alert("Login failed");
            }

        } catch (error) {

            console.error(error);
            alert("Server error");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">

            <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 text-white border border-white/10">

                <h2 className="text-3xl font-bold text-center mb-2">
                    Onkar Digital Seva Center
                </h2>

                <p className="text-center text-sm text-gray-300 mb-8">
                    Secure Login Access
                </p>


                {/* ROLE SELECTION */}

                <div className="mb-4">

                    <label className="block mb-2 text-sm text-gray-300">
                        Login As
                    </label>

                    <div className="flex gap-4">

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="admin"
                                checked={role === "admin"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Admin
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="operator"
                                checked={role === "operator"}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Operator
                        </label>

                    </div>

                </div>


                {/* EMAIL */}

                <div className="mb-5">

                    <label className="block mb-2 text-sm text-gray-300">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                </div>


                {/* PASSWORD */}

                <div className="mb-6">

                    <label className="block mb-2 text-sm text-gray-300">
                        Password
                    </label>

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleLogin();
                            }}
                            className="w-full px-4 py-2 pr-10 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            type="button"
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onMouseLeave={() => setShowPassword(false)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                        >
                            👁
                        </button>

                    </div>

                </div>


                {/* LOGIN BUTTON */}

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
                >
                    Login Securely
                </button>


                {/* REGISTER LINK */}

                <p className="text-center text-sm text-gray-300 mt-6">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/admin-register")}
                        className="text-blue-400 cursor-pointer hover:underline"
                    >
                        Create one
                    </span>
                </p>

            </div>

        </div>

    );
}

export default Login;