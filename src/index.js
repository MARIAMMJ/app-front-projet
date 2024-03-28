import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Quiz from './Components/StudentComponents/QuizComponents/Quiz';
import ContactForm from './Components/ContactForm';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import AdminDashboard from './Components/Admin/AdminDashboard';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
