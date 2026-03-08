import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { PlusCircle, History, BarChart3, LogOut, Menu } from "lucide-react";

function OperatorPanel() {

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
     ${
       isActive
         ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
         : "text-gray-400 hover:bg-slate-800 hover:text-white"
     }`;

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-slate-950 text-white transition-all duration-500`}
      >
        <div className="flex flex-col h-screen justify-between">

          <div className="relative p-4">

            <h2
              className={`text-xl font-bold text-green-400 transition-all ${
                collapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Operator Panel
            </h2>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="absolute top-4 right-4 p-2 bg-slate-900 border border-slate-800 rounded-lg"
            >
              <Menu size={18} />
            </button>

            <nav className="mt-10 flex flex-col gap-2">

              <NavLink to="/operator/new-entry" className={linkClass}>
                <PlusCircle size={20} />
                {!collapsed && "New Entry"}
              </NavLink>

              <NavLink to="/operator/history" className={linkClass}>
                <History size={20} />
                {!collapsed && "History"}
              </NavLink>

              {/* <NavLink to="/operator/reports" className={linkClass}>
                <BarChart3 size={20} />
                {!collapsed && "Reports"}
              </NavLink> */}

            </nav>

          </div>

          <div className="p-4">

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg w-full"
            >
              <LogOut size={20} />
              {!collapsed && "Logout"}
            </button>

          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
}

export default OperatorPanel;