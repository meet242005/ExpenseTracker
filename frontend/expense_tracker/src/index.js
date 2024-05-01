import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddExpensePopup from './screens/Addpopup';
import SetBudget from './screens/SetBudget';


function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="addExpense" element={<AddExpensePopup />} />
        <Route path="setBudget" element={<SetBudget />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouteApp />
  </React.StrictMode>
);

reportWebVitals();
