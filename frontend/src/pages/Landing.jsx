import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide">
          Onkar Digital Seva Center
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition"
        >
          Secure Login
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Digital Service Management System for Onkar Digital Seva Center
        </h1>

        <p className="mb-8 text-lg max-w-2xl text-gray-300">
          Streamline your digital services, manage customer records, and track profits with ease. Our system is designed to help you focus on what matters most – providing excellent service to your customers.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Access Dashboard
          </button>

          <button
            onClick={() => navigate("/register")}
            className="border border-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:border-blue-600 transition"
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-32 px-10 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          System Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              Service Management
            </h3>
            <p className="text-gray-300">
              Add, update and manage digital services with pricing and tracking.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              Secure Data Handling
            </h3>
            <p className="text-gray-300">
              Maintain customer records and transactions securely.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              Profit & Reports
            </h3>
            <p className="text-gray-300">
              Generate daily, weekly and monthly income reports instantly.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Landing;