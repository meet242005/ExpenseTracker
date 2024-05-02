import React, { useEffect, useState } from "react";
import FilterSlider from "../components/filter/FilterSlider";
import SideDrawer from "../components/SideDrawer";
import { getExpensesByUser } from "../Api";
import moment from "moment";
import { useCookies } from "react-cookie";
import ChipSlider from "../components/chipfilter/chipSlider";


const Myexpense = () => {
  const [cookies] = useCookies();
  const [activeTab, setActiveTab] = useState("All");
  const [userId] = useState(cookies.userId);
  const [expenses, setExpenses] = useState(null);
  const [activeMonth, setActiveMonth] = useState(moment().toISOString());

  const handleMonthClick = (clickedMonth) => {
    setActiveMonth(clickedMonth);
    //fetchExpenses();
    console.log("Clicked month:", clickedMonth);
  };

  const fetchExpenses = async () => {
    try {
      const response = await getExpensesByUser(userId, activeMonth.toString());
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

  useEffect(() => {
    if (activeMonth) {
      fetchExpenses();
    }
  }, [activeMonth]);

  return (
    <div className="flex bg-blue-700">
      <SideDrawer isOpen={true} />
      <div className="my-1.5 bg-gray-50 rounded-tl-3xl rounded-bl-3xl px-4 py-4" style={{width:"80%"}}>
        <ChipSlider setActiveMonth={handleMonthClick} />
        <div className="flex justify-start">
          <FilterSlider
            className="w-full"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="mt-4">
          <table className=" divide-y divide-gray-200  w-full    ">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses &&
                expenses
                  .filter(
                    (expense) =>
                      activeTab === "All" || expense.category === activeTab
                  ) // Added condition here
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((expense) => (
                    <tr key={expense._id} className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {expense.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {expense.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹ {expense.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {expense.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Myexpense;
