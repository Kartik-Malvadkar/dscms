import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Settings,
  BarChart3,
  History,
  LogOut,
  Menu
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
     ${isActive
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
      : "text-gray-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <div
        className={`${collapsed ? "w-20" : "w-64"
          } bg-slate-950 text-white 
          transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col h-screen justify-between sticky top-0">

          {/* TOP SECTION */}
          <div className="relative p-4">

            <h2
              className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent 
              transition-all duration-300 ${
                collapsed ? "opacity-0 translate-x-[-20px]" : "opacity-100"
              }`}
            >
              Onkar Digital
            </h2>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="absolute top-4 right-4 p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-all duration-200"
            >
              <Menu size={18} />
            </button>

            <nav className="mt-10 flex flex-col gap-2">
              <NavLink to="/dashboard" end className={linkClass}>
                <LayoutDashboard size={20} />
                {!collapsed && "Dashboard"}
              </NavLink>

              <NavLink to="/dashboard/new-entry" className={linkClass}>
                <PlusCircle size={20} />
                {!collapsed && "New Entry"}
              </NavLink>

              <NavLink to="/dashboard/services" className={linkClass}>
                <Settings size={20} />
                {!collapsed && "Services"}
              </NavLink>

              <NavLink to="/dashboard/reports" className={linkClass}>
                <BarChart3 size={20} />
                {!collapsed && "Reports"}
              </NavLink>

              <NavLink to="/dashboard/history" className={linkClass}>
                <History size={20} />
                {!collapsed && "History"}
              </NavLink>
            </nav>
          </div>

          {/* LOGOUT */}
          <div className="p-4">
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-all px-4 py-3 rounded-lg w-full"
            >
              <LogOut size={20} />
              {!collapsed && "Logout"}
            </button>
          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-x-hidden">
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;