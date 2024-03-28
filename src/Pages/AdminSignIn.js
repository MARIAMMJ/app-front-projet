import React from "react";
import SignInSide from '../Components/Admin/AdminSignInComp';
import { BrowserRouter as Router, Link, useRoutes } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom'; // Importing useHistory

const AdminSignIn = () => { 
  return (
    <SignInSide />
  );
};

export default AdminSignIn;
