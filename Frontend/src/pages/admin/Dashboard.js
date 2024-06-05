import React from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";

function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  console.log("token", token);

  return (
    <div>
      <Sidebar />
      <Profile />
    </div>
  );
}

export default Dashboard;
