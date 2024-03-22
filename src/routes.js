import React from 'react';
import { Route } from 'react-router-dom';
import AdminSignIn from '../src/Pages/AdminSignIn';
const routes = [
    // Other routes...
    <Route path="/admin" component={AdminSignIn} exact key="admin" />,
  ];
  
  export default routes;