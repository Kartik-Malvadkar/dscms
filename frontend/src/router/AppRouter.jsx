import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NewEntry from "../pages/NewEntry";
import Services from "../pages/Services";
import Reports from "../pages/Reports";
import History from "../pages/History";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            localStorage.getItem("user")
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        >
          <Route index element={<Home />} />
          <Route path="new-entry" element={<NewEntry />} />
          <Route path="services" element={<Services />} />
          <Route path="reports" element={<Reports />} />
          <Route path="history" element={<History />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;