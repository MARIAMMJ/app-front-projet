//import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
//import routes from './routes'; 
//import AdminSignIn from './Pages/AdminSignIn'
import Quiz from './Components/StudentComponents/QuizComponents/Quiz';
import { jsQuizz } from './Components/StudentComponents/QuizComponents/constants';
import "./Components/StudentComponents/QuizComponents/Quiz.scss" 

function App() {
  return (
  
    <Quiz questions={jsQuizz.questions}></Quiz>
  );
}

export default App;
