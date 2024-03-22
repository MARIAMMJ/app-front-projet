import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import routes from './routes'; 
import AdminSignIn from './Pages/AdminSignIn'
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/admin" component={AdminSignIn} exact key="admin" />
      </Routes>

     
  </Router>
   
  );
}

export default App;
