import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faMoneyBillWave,
  faPlusCircle,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const SideDrawer = ({ isOpen, onClose }) => {
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
            <li className="text-white py-2">
              <FontAwesomeIcon className="pr-2" icon={faTachometerAlt} />{" "}
              Dashboard
            </li>
            <li className="text-white py-2">
              <FontAwesomeIcon className="pr-2" icon={faMoneyBillWave} /> My
              Expenses
            </li>
            <li className="text-white py-2">
              <FontAwesomeIcon className="pr-2" icon={faPlusCircle} /> Add
              Expense
            </li>
            <li className="text-white py-2">
              <FontAwesomeIcon className="pr-2" icon={faChartLine} /> Set Budget
            </li>
          </ul>
        </div>
      </div>
      <div className="flex  items-center text-white">
  <div className="h-10 w-10 bg-gray-500 rounded-full flex justify-center items-center">
    {getInitials("Dhruv Mehta")}
  </div>
  <span className="ml-2">Dhruv Mehta</span>
</div>

    </div>
  );
};

export default SideDrawer;
