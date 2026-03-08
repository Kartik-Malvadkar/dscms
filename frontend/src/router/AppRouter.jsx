import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminRegister from "../pages/AdminRegister";

import Dashboard from "../pages/Dashboard";
import OperatorPanel from "../pages/OperatorPanel";

import Home from "../pages/Home";
import NewEntry from "../pages/NewEntry";
import Services from "../pages/Services";
import Reports from "../pages/Reports";
import History from "../pages/History";

function AppRouter() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />

        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            user && user.role === "admin"
              ? <Dashboard />
              : <Navigate to="/admin" />
          }
        >
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="reports" element={<Reports />} />
          <Route path="history" element={<History />} />
        </Route>

        {/* OPERATOR PANEL */}
        <Route
          path="/operator"
          element={
            user && user.role === "operator"
              ? <OperatorPanel />
              : <Navigate to="/operator/new-entry" />
          }
        >
          <Route path="new-entry" element={<NewEntry />} />
          <Route path="history" element={<History />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;