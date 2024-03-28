import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
//import routes from './routes'; 
import AdminSignIn from './Pages/AdminSignIn'
import Quiz from './Components/StudentComponents/QuizComponents/Quiz';
import { jsQuizz } from './Components/StudentComponents/QuizComponents/constants';
import "./Components/StudentComponents/QuizComponents/Quiz.scss" 
import Home from './Pages/Home';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ChartsAndList from './Components/Admin/ChartsAndList';
import StudentsPage from './Components/Admin/StudentsPage';
import StudentDashboard from './Components/StudentComponents/StudentDashboardComp';
import  SignIn  from "./Components/AuthManagement/SignInComp";
import AccueilAuth from './Components/AccueilAuth';
function App() {
  return (
  <div>
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/AccueilAuth" />} />

      <Route path='/studentspage' element={<StudentsPage/>}></Route>
      <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
    <Route path='/adminsignin' element={<AdminSignIn/>}></Route>
    <Route path='/StudentDashboard' element={<StudentDashboard/>}></Route>
    <Route path='/StudentSignIn' element={<SignIn/>}></Route>
    <Route path='/AccueilAuth' element={<AccueilAuth/>}></Route>


    <Route path='/Home' element={<Home/>}></Route>
    </Routes>
    </Router>
  </div>
  );
}

export default App;
