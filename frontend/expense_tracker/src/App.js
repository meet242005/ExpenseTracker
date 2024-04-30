// import React, { useState } from 'react';
import CategoryCard from "./components/CategoryCard";
import SideDrawer from "./components/SideDrawer";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // const [stats, setStats] = useState();

  // const fetchData = async () => {
  //   try {
      
  //     const response = await fetch('http://localhost:5001/api/loadUser',{
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'POST',
  //       body: JSON.stringify({
  //       'id':'663127341e1610bee4d9f7ec',
    
  //   })});
  //   console.log(response);
  //     const jsonData = await response.json();
  //     console.log(jsonData);
  //     // setStats(jsonData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // fetchData();
  return (
    <div className="flex  bg-blue-700">
      <SideDrawer isOpen={true} />
      <div className="my-1.5  bg-gray-50  rounded-tl-3xl rounded-bl-3xl px-4 py-4   w-full">
        <div className="flex justify-between">

        
      <CategoryCard
        category="Food"
        icon={faUtensils} 
        spends={100}
        totalBudget={500}
      />
    
        </div>

      </div>
    </div>
  );
};

export default App;
