import React, { useState } from "react";
import SideDrawer from "./SideDrawer";

const SetBudget = () => {
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

  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(true);

  const handleSliderChange = (category, value) => {
    console.log("Slider changed:", category, value); // Debugging statement
    setBudgets({ ...budgets, [category]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle submitting the budget data, for example, sending it to an API or performing some action
    console.log("Submitted Budgets:", budgets);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideDrawer isOpen={isSideDrawerOpen} />

      {/* Budget setting form */}
      <div className="flex-grow p-6">
        <h2 className="text-xl font-bold mb-4">Set Budget</h2>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(budgets).map(([category, value]) => (
            <div key={category}>
              <label className="block text-gray-700 font-bold mb-2" htmlFor={category}>
                {category}
              </label>
              <input
                type="range"
                id={category}
                name={category}
                min={0}
                max={1000}
                value={value}
                onChange={(e) => handleSliderChange(category, parseInt(e.target.value))}
                className="w-full slider"
                style={{
                  // CSS styles for the range input
                  width: "100%",
                  height: "10px",
                  appearance: "none",
                  background: `linear-gradient(to right,  #3B82F6 0%,  #3B82F6 ${value / 10}%, #d3d3d3 ${value / 10}%, #d3d3d3 100%)`,
                  borderRadius: "5px",
                  outline: "none",
                  margin: "10px 0",
                }}
              />
              <div className="flex justify-between">
                <span>{value}</span>
                <span>1000</span>
              </div>
            </div>
          ))}
        </div>
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
