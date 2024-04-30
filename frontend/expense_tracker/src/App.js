import React, { useState } from 'react';
import SideDrawer from './components/SideDrawer';

const App = () => {


  return (
    <div className="flex  bg-blue-700">
   
      <SideDrawer isOpen={true}  />
      <div className="my-1.5  bg-white rounded-tl-3xl rounded-bl-3xl px-4 py-4   w-full">
       <h1>Heading</h1>
       <h1>asfs</h1>
      </div>
    
    </div>
  );
};

export default App;
