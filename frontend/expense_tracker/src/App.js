import React, { useState, useEffect } from "react";
import CategoryCard from "./components/CategoryCard";
import TotalCard from "./components/TotalCard";
import SideDrawer from "./components/SideDrawer";
import { PieChart } from "@mui/x-charts/PieChart";
import moment from 'moment';

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
import { loadStats, getExpensesByUser } from "./Api.js";
import DashboardExpenseCard from "./components/DashboardExpenseCard.js";

const App = () => {
  const [userId, setUserId] = useState("6631684159792de2d56ad20d");

  const [stats, setStats] = useState(null);
  const [expenses, setExpenses] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await loadStats(userId);
      setStats(response.data);
      console.log("Stats:", response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const fetchExpenses = async () => {
    const currentTime = moment().toISOString();
    try {
      console.log(currentTime)
      const response = await getExpensesByUser(userId, currentTime.toString());
      const firstFourExpenses = response.data.slice(0, 4);
      setExpenses(firstFourExpenses);
      console.log("Expenses:", response.data);
    }
    catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStats();
      fetchExpenses();
    }
  }, [userId]);

  return (
    <div className="flex  bg-blue-700">
      <SideDrawer isOpen={true} />
      <div className="my-1.5  bg-gray-50  rounded-tl-3xl rounded-bl-3xl px-4 py-4   w-full">
        <h1 className="text-xl mb-2 mt-4 font-semibold text-gray-800">
          Dashboard
        </h1>
        <div className="flex-wrap  flex justify-start ">
          <TotalCard
            spends={stats?.totalMonthlySpend}
            totalBudget={stats?.monthlyBudget}
            allTotalSpends={stats?.totalSpendAllTime}
          />
          <div className="ml-3 bg-white shadow-md rounded-xl p-0 w-96     flex-grow 1  h-56  my-0.5  flex  justify-center">
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value:
                        (stats?.categorySpends["Food & Dining"] /
                          stats?.totalMonthlySpend) *
                        100,
                      label: "Food & Dining",
                    },
                    {
                      id: 1,
                      value:
                        (stats?.categorySpends["Housing"] /
                          stats?.totalMonthlySpend) *
                        100,
                      label: "Housing",
                    },
                    {
                      id: 2,
                      value:
                        (stats?.categorySpends["Transportation"] /
                          stats?.totalMonthlySpend) *
                        100,
                      label: "Transportation",
                    },
                    {
                      id: 3,
                      value:
                        (stats?.categorySpends["Healthcare"] /
                          stats?.totalMonthlySpend) *
                        100,
                      label: "Healthcare",
                    },
                    {
                      id: 4,
                      value:
                        (stats?.categorySpends["Entertainment"] /
                          stats?.totalMonthlySpend) *
                        100,
                      label: "Entertainment",
                    },
                    {
                      id: 5,
                      value:
                        (stats?.categorySpends["Utilities"] /
                          stats?.totalMonthlySpend) *
                        100,
                      label: "Utilities",
                    },
                    {
                      id: 6,
                      value:
                        (stats?.categorySpends["Personal Care"] /
                          stats?.totalMonthlySpend) *
                        100,
                      label: "Personal Care",
                    },
                    {
                      id: 7,
                      value:
                        (stats?.categorySpends["Others"] /
                          stats?.totalMonthlySpend) *
                        100,
                      label: "Others",
                    },
                  ],

                  innerRadius: 30,
                  paddingAngle: 1,
                  cornerRadius: 5,
                },
              ]}
            />
          </div>
        </div>
        <h1 className="text-xl mb-2 mt-4 font-semibold text-gray-800">
          Recent Expenses
        </h1>
        <div
          className="flex justify-between"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
       
          {expenses?.map((expense) => (
            <DashboardExpenseCard
              key={expense._id}
              name={expense.name}
              amount={expense.amount}
              category={expense.category}
              date={expense.date}
            />
          ))}
        </div>
        <h1 className="text-xl mb-2 mt-4 font-semibold text-gray-800">
          Category Spendings
        </h1>
        <div
          className="flex justify-between"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <CategoryCard
            category="Food"
            icon={faUtensils}
            spends={stats?.categorySpends["Food & Dining"] ?? 0}
            totalBudget={stats?.categoryBudgets["Food & Dining"] ?? 0}
          />
          <CategoryCard
            category="Housing"
            icon={faHouse}
            spends={stats?.categorySpends["Housing"] ?? 0}
            totalBudget={stats?.categoryBudgets["Housing"] ?? 0}
          />
          <CategoryCard
            category="Travel"
            icon={faTrain}
            spends={stats?.categorySpends["Transportation"] ?? 0}
            totalBudget={stats?.categoryBudgets["Transportation"] ?? 0}
          />
          <CategoryCard
            category="Healthcare"
            icon={faHospital}
            spends={stats?.categorySpends["Healthcare"] ?? 0}
            totalBudget={stats?.categoryBudgets["Healthcare"] ?? 0}
          />
        </div>
        <div
          className="flex  justify-between"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          <CategoryCard
            category="Entertainment"
            icon={faUmbrellaBeach}
            spends={stats?.categorySpends["Entertainment"] ?? 0}
            totalBudget={stats?.categoryBudgets["Entertainment"] ?? 0}
          />
          <CategoryCard
            category="Utilities"
            icon={faToolbox}
            spends={stats?.categorySpends["Utilities"] ?? 0}
            totalBudget={stats?.categoryBudgets["Utilities"] ?? 0}
          />
          <CategoryCard
            category="Personal Care"
            icon={faBathtub}
            spends={stats?.categorySpends["Personal Care"] ?? 0}
            totalBudget={stats?.categoryBudgets["Personal Care"] ?? 0}
          />
          <CategoryCard
            category="Others"
            icon={faCheckCircle}
            spends={stats?.categorySpends["Others"] ?? 0}
            totalBudget={stats?.categoryBudgets["Others"] ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
