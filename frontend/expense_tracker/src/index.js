import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddExpensePopup from './screens/Addpopup';
import SetBudget from './screens/SetBudget';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="addExpense" element={<AddExpensePopup />} />
        <Route path="setBudget" element={<SetBudget />} />
      </Routes>
      <ToastContainer />
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
