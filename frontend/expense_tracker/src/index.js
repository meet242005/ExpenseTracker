import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddExpensePopup from './components/Addpopup';
import SetBudget from './components/SetBudget';

function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        {/* <Route path="posts" element={<PostDetail />} />
        <Route path="author" element={<AuthorDetails />} /> */}
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
