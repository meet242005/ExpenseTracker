import React, { useState } from "react";
import SideDrawer from "./SideDrawer";

const AddExpensePopup = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(true); // Set isOpen to true by default

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle submitting the form data, for example, sending it to an API or performing some action
    console.log("Submitted:", { name, amount, description, category });
    // Clear the form fields
    setName("");
    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-1/4">
        {/* Render the SideDrawer component with isOpen set to isSideDrawerOpen */}
        <SideDrawer isOpen={isSideDrawerOpen} />
      </div>

      <div className="bg-white p-6 rounded-lg w-3/4 ml-4  mr-8 pr-8"> {/* Adjust the width of the form, add left margin, and add right padding */}
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="border rounded w-full py-2 px-3 resize-none"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="border rounded w-full py-2 px-3"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Housing">Housing</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpensePopup;
