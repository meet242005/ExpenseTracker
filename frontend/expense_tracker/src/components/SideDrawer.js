import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadUser } from "../Api";
import { useCookies } from "react-cookie";
import {
  faTachometerAlt,
  faMoneyBillWave,
  faPlusCircle,
  faChartLine,
  faSignOut,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({ isOpen, onClose }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userId, setUserId] = useState(cookies.userId);

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const loadUserProfile = async () => {
    console.log("Loading user...");
    try {
      const response = await loadUser(userId);
      setUser(response.data);
      console.log("User:", response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleLogout = () => {
    removeCookie("userId");
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (!user) {
      loadUserProfile();
    }
  }, [userId]);

  // Function to get the initials from the name
  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.slice(0, 2).join("").toUpperCase();
  };

  return (
    <div
      className={`flex flex-col justify-between h-screen  bg-blue-700 px-4 py-6 transition-all duration-300 ${
        isOpen ? "w-80" : "w-12"
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className={`text-white text-xl font-bold ${isOpen ? "" : "hidden"}`}>Expense Tracker</h4>
        <button onClick={onClose} className="text-white focus:outline-none ">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className={`flex flex-col flex-grow mt-6 ${isOpen ? "" : "hidden"}`}>
        <ul>
          <li
            className="text-white py-2"
            onClick={() => navigate("/dashBoard", { replace: true })}
          >
            <FontAwesomeIcon className="pr-2" icon={faTachometerAlt} /> Dashboard
          </li>
          <li
            className="text-white py-2"
            onClick={() => navigate("/myExpense", { replace: true })}
          >
            <FontAwesomeIcon className="pr-2" icon={faMoneyBillWave} /> My Expenses
          </li>
          <li
            className="text-white py-2"
            onClick={() => navigate("/addExpense", { replace: true })}
          >
            <FontAwesomeIcon className="pr-2" icon={faPlusCircle} /> Add Expense
          </li>
          <li
            className="text-white py-2"
            onClick={() => navigate("/setBudget", { replace: true })}
          >
            <FontAwesomeIcon className="pr-2" icon={faChartLine} /> Set Budget
          </li>
        </ul>
      </div>
      <div>
        <div className={`border-t border-gray-300 mb-4 ${isOpen ? "" : "hidden"}`}></div>
        <div className={`flex items-center text-white ${isOpen ? "" : "hidden"}`}>
          <div className="h-10 w-10 bg-blue-500 rounded-full flex justify-center items-center">
            {getInitials(user == null ? "" : user.username)}
          </div>
          <span className="ml-2 text-sm">
            {user?.username}
            <br></br>
            <div style={{ fontSize: "12px" }}>{user?.email}</div>
          </span>
        </div>
        <div
          className={`text-l pt-5 text-white flex justify-between ${isOpen ? "" : "hidden"}`}
          onClick={() => handleLogout()}
        >
          Logout <FontAwesomeIcon className="pt-1" icon={faSignOut} />
        </div>
        <div
          className={`pt-2 text-white flex justify-between ${isOpen ? "" : "hidden"}`}
          style={{ fontSize: "7px" }}
        >
          2023-24, SYB.Tech CE, DJSCE.<br></br> Programming Laboratory - II Web
          Development Project<br></br> Meet Chavan, Dhruv Mehta, Devesh Bhayani
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
