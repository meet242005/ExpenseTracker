import React from 'react';

const DashboardExpenseCard = ({ name, amount, category }) => {
 
  return (
    <div className="bg-white shadow-md rounded-xl p-6  w-64   my-2 mx-0.5" >
      <div className="flex items-center mb-4">
       
        <h2 className="ml-4 text-lg font-semibold">{name}</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex  justify-between mb-4">
         
          <h3 className="ml-0 text-gray-600">₹ {amount} </h3>
          <span className="ml-2 text-gray-700">₹ {category}</span>
        </div>
       
      </div>
    </div>
  );
};

export default DashboardExpenseCard;
