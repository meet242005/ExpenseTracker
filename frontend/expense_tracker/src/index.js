import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AddExpensePopup from "./screens/Addpopup";
import SetBudget from "./screens/SetBudget";
import { useCookies } from "react-cookie";
import { loginUser } from "./Api";
import { ToastContainer } from "react-toastify";
import Myexpense from "./screens/Myexpense";
import 'react-toastify/dist/ReactToastify.css';


function RouteApp() {
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (!cookies.userId) {
      handleLogin();
    }
  }, []);

  const handleLogin = async () => {
    const email = window.prompt("Enter your email:");
    const password = window.prompt("Enter your password:");

    if (email && password) {
      try {
        const response = await loginUser(email, password);
        setCookie("userId", response.data._id, { path: "/" });
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="myExpense" element={<Myexpense />} />
        <Route path="addExpense" element={<AddExpensePopup />} />
        <Route path="setBudget" element={<SetBudget />} />
        <Route path="logout" element={<div>Thank you for using!</div>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouteApp />
  </React.StrictMode>
);

reportWebVitals();
