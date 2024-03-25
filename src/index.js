import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Components/DashboardTS/Dashboard';
import ContactForm from './Components/ContactForm';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import SignIn from './Components/AuthManagement/SignInComp';
import UserProfile from './Components/Profile';
import SignInSide from './Components/Admin/AdminSignInComp';
import Navbar from './Components/navbar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContactForm/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
