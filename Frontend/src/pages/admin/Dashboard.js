import React from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import admin from "../../assets/admin.png";

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
      <div className="dashboard-admin">
        <h2>Hallo, Selamat Datang di Dashboard Admin!</h2>
        <img src={admin}></img>
      </div>
    </div>
  );
}

export default Dashboard;
