import React, { useState } from 'react';
import StudentSidebar from './StudentSideBar'
import AnnonceE from '../DashboardTS/Annonce';
import EmploiTemps from './EmploiTempsComponent';
import Quiz from './QuizComponents/Quiz';
import { jsQuizz } from './QuizComponents/constants';
import LeftSidebar from './SupportDeCoursComponents/CoursesSideBar'
import QuizList from './QuizComponents/QuizList';
import Demande from './Demande'
import CompteRendu from './CompteRendu';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, InputBase, Box, Grid } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



function StudentDashboard() {
  const [currentPage, setCurrentPage] = React.useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const handleSidebarClick = (page) => {
    if (page === 'Logout') {
      window.location.href = '/SignIn'; 
    } else {
      setCurrentPage(page);
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleProfile = () => {
    navigate('/profile');
    console.log("profile");
  };
  const handleEmploi = () => {
    navigate('/studentemploi');
  };

  return (
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <StudentSidebar onSidebarClick={handleSidebarClick} />
        <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{ backgroundColor: '#3182CE' , marginTop:"-10px" , marginRight:"30px" }}>
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ marginLeft:"250px" }}>
                  {new Date().toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <div onClick={handleProfile}>
                  <Avatar alt="Admin" src="/path/to/admin-image.jpg" sx={{ width: 40, height: 40, marginLeft: '8px' }}  /></div>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
          {currentPage === 'Dashboard' && <AnnonceE />}
          <div onClick={handleEmploi}>
          {currentPage === 'Emploi De Temps' && <EmploiTemps />}
          </div>
          {currentPage === 'Supports De cours' && <LeftSidebar />}
          
          {currentPage === 'Quizs' && <QuizList/>}
          {currentPage === 'Demandes' && <Demande/>}
          {currentPage === 'Comptes Rendus' && <CompteRendu/>}



          



         </Box>
      </Box>
  );
}

export default StudentDashboard;