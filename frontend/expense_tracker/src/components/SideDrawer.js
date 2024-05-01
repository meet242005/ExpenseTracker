import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadUser } from "../Api";
import {
  faTachometerAlt,
  faMoneyBillWave,
  faPlusCircle,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const userId = "6631684159792de2d56ad20d";
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
      className={`flex flex-col h-screen w-64 bg-blue-700 px-4 py-6 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col flex-grow">
        <h4 className="text-white text-xl font-bold">Expense Tracker</h4>
        <div className="mt-6">
          <ul>
            <li className="text-white py-2" onClick={()=>navigate("/",{ replace: true })}>
              <FontAwesomeIcon className="pr-2" icon={faTachometerAlt} />{" "}
              Dashboard
            </li>
            <li className="text-white py-2">
              <FontAwesomeIcon className="pr-2" icon={faMoneyBillWave} /> My
              Expenses
            </li>
            <li className="text-white py-2" onClick={()=>navigate("/addExpense",{ replace: true })}>
              <FontAwesomeIcon className="pr-2" icon={faPlusCircle} /> Add
              Expense
            </li>
            <li className="text-white py-2" onClick={()=>navigate("/setBudget",{ replace: true })}>
              <FontAwesomeIcon className="pr-2" icon={faChartLine} /> Set Budget
            </li>
          </ul>
        </div>
      </div>
      <div className="flex  items-center text-white">
        <div className="h-10 w-10 bg-gray-500 rounded-full flex justify-center items-center">
          {getInitials(user == null ? "" : user.username)}
        </div>
        <span className="ml-2">{user?.username}</span>
      </div>
    </div>
  );
};

export default SideDrawer;
