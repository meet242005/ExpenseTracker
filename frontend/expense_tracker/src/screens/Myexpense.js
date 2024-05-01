import React, { useEffect, useState } from "react";
import FilterSlider from "../components/filter/FilterSlider";
import SideDrawer from "../components/SideDrawer";
import { getExpensesByUser, loadStats } from "../Api";
import moment from "moment";
import { useCookies } from "react-cookie";
import {
  faBathtub,
  faCheckCircle,
  faHospital,
  faHouse,
  faToolbox,
  faTrain,
  faUmbrellaBeach,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const icons = {
  "Food & Dining": faUtensils,
  Housing: faHouse,
  Transportation: faTrain,
  Healthcare: faHospital,
  Entertainment: faUmbrellaBeach,
  Utilities: faBathtub,
  "Personal Care": faCheckCircle,
  Others: faToolbox,
};

const colors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-lime-500",
  "bg-teal-500",
  "bg-amber-500",
  "bg-fuchsia-500",
  "bg-emerald-500",
  "bg-gray-500",
  "bg-orange-500",
];

const Myexpense = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [activeTab, setActiveTab] = useState("Food & Dining");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [userId, setUserId] = useState(cookies.userId);
  const [expenses, setExpenses] = useState(null);

  const fetchExpenses = async () => {
    const currentTime = moment().toISOString();
    try {
      const response = await getExpensesByUser(userId, currentTime.toString());
      setExpenses(response.data);
      console.log("Expenses:", response.data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, []);

  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="flex bg-blue-700">
        <SideDrawer isOpen={true} />
        <div className="my-1.5  bg-gray-50  rounded-tl-3xl rounded-bl-3xl px-4 py-4 w-full">
          <div className="flex justify-center">
            <FilterSlider activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            {expenses &&
              expenses
                .filter((expense) => expense.category == activeTab)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((expense) => (
                  <div key={expense._id}>
                    <div className="bg-white shadow-md rounded-xl p-6  w-64   my-2 mx-0.5">
                      <div className="flex items-center mb-2 ">
                        <div
                          className={`${
                            colors[Math.floor(Math.random() * colors.length)]
                          } rounded-xl w-10 h-10 flex items-center justify-center text-white`}
                        >
                          <FontAwesomeIcon icon={icons[expense.category]} />{" "}
                        </div>
                        <h2 className="ml-4 text-lg font-semibold">
                          {expense.name}
                        </h2>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl text-gray-900">
                          ₹ {expense.amount}
                        </span>
                        <span className="text-md text-gray-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div>{expense.description}</div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Myexpense;
