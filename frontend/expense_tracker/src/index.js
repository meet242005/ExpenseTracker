import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AddExpensePopup from "./screens/Addpopup";
import SetBudget from "./screens/SetBudget";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import Myexpense from "./screens/Myexpense";
import 'react-toastify/dist/ReactToastify.css';
import LoginSignupPage from "./screens/LoginSignup";
import SideDrawer from "./components/SideDrawer";

function RouteApp() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Conditionally render the side drawer based on the current route
  const renderSideDrawer = () => {
    if (location.pathname === "/login") {
      return null; // Don't render side drawer on login page
    }
    return <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />;
  };

  var div_class = isDrawerOpen ? "my-1.5  bg-gray-50  rounded-tl-3xl rounded-bl-3xl px-4 py-4   w-full" : " bg-gray-50   px-4 py-4   w-full";
  return (
    <div className="flex bg-blue-700">
      {renderSideDrawer()}
      <div className={div_class}>
        <Routes>
          <Route path="/" element={<LoginSignupPage />} />
          <Route path="login" element={<LoginSignupPage />} />
          <Route path="dashboard" element={<App />} />
          <Route path="myExpense" element={<Myexpense />} />
          <Route path="addExpense" element={<AddExpensePopup />} />
          <Route path="setBudget" element={<SetBudget />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
