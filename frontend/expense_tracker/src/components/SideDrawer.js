import React from 'react';

const SideDrawer = ({ isOpen, onClose }) => {
  return (
    <div className={`h-screen w-48  bg-blue-700 px-4 py-6 ${isOpen ? 'block' : 'hidden'}`}>

      <div className="mt-6">
        <ul>
          <li className="text-white py-2">Item 1</li>
          <li className="text-white py-2">Item 2</li>
          <li className="text-white py-2">Item 3</li>
          <li className="text-white py-2">Item 4</li>
        </ul>
      </div>
    </div>
  );
};

export default SideDrawer;
