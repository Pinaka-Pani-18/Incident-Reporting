import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ReportingPage from "./pages/ReportingPage";
import DepartmentHead from "./pages/DepartmentHead";
import Home from "./components/Home";
import Login from "./components/Login";
// import Success from "./components/Success";

const App = () => {
  return (
    <div>
      <Navbar />

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/reporting-page" element={<ReportingPage />} />
          <Route path="/department-head" element={<DepartmentHead />} />
          <Route path="/edit-report-status/:id" element={<ReportingPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
