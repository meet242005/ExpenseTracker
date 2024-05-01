import React, { useState, useEffect } from "react";
import { loadUser } from "../Api";
import SideDrawer from "../components/SideDrawer";
import { updateBudget } from "../Api";
import { toast } from "react-toastify";
import {useCookies} from 'react-cookie';

const SetBudget = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userId, setUserId] = useState(cookies.userId);

  const [totalBudget, setTotalBudget] = useState(0);
  const [user, setUser] = useState(null);
  const [budgets, setBudgets] = useState({
    "Food & Dining": 0,
    Housing: 0,
    Transportation: 0,
    Healthcare: 0,
    Entertainment: 0,
    Utilities: 0,
    "Personal Care": 0,
    Others: 0,
  });
  const [isSideDrawerOpen] = useState(true);

  const loadUserProfile = async () => {
    console.log("Loading user...");
    try {
      const response = await loadUser(userId);
      setUser(response.data);
      setBudgets(response.data.categoryBudgets);
      console.log("User:", response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      loadUserProfile();
    }
  }, [user]);

  const handleSliderChange = (category, value) => {
    console.log("Slider changed:", category, value);
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudget(userId, totalBudget, budgets);
    toast.success("Budget Updated Successfully! 💸 ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    console.log("Submitted Budgets:", budgets);
  };

  useEffect(() => {
    setTotalBudget(
      budgets["Food & Dining"] +
        budgets.Housing +
        budgets.Transportation +
        budgets.Healthcare +
        budgets.Entertainment +
        budgets.Utilities +
        budgets["Personal Care"] +
        budgets.Others
    );
  }, [budgets]);

  return (
    <div className="flex bg-blue-700">
      <SideDrawer isOpen={isSideDrawerOpen} />

      <div className="my-1.5 bg-gray-50 rounded-tl-3xl rounded-bl-3xl px-4 py-4 w-full">
        <h2 className="text-xl font-bold mb-4">Set Budget</h2>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(budgets).map(([category, value]) => (
            <div key={category} className="bg-white shadow-lg rounded-lg p-2">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor={category}
              >
                {category}
              </label>
              <input
                type="range"
                id={category}
                name={category}
                min={0}
                max={10000}
                value={value}
                onChange={(e) =>
                  handleSliderChange(category, parseInt(e.target.value))
                }
                className="w-full slider"
                style={{
                  width: "100%",
                  height: "10px",
                  appearance: "none",
                  background: `linear-gradient(to right,  #3B82F6 0%,  #3B82F6 ${
                    value / 110
                  }%, #d3d3d3 ${value / 100}%`,
                  borderRadius: "5px",
                  outline: "none",
                  margin: "10px 0",
                }}
              />
              <div className="flex justify-between">
                <span>{value}</span>
                <span>10000</span>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-l font-bold mt-4">
          Total Monthly Budget: {totalBudget}
        </h2>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Set Budget
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
