import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from '../src/shared/header';
import Summary from '../src/components/summary/summary';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import {SharedSnackbarProvider   } from './shared/snackBar';
import Experience from './components/experience/experience';
import Education from './components/education/Education'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
     <SharedSnackbarProvider>
    <Router>
    <Header />
      <Routes>
        <Route exact path="/" element={<></>} />
        <Route exact path="/Projects" element={<Summary/>} />
        <Route exact path="/expereince" element={<Experience/>} />
        <Route exact path="/education" element={<Education/>} />
      </Routes>
    </Router>
    </SharedSnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
