import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from './StudentSideBar';
import AnnonceE from '../DashboardTS/Annonce';
import EmploiTemps from './EmploiTempsComponent';
import LeftSidebar from './SupportDeCoursComponents/CoursesSideBar';
import QuizList from './QuizComponents/QuizList';
import Demande from './Demande';
import CompteRendu from './CompteRendu';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, Box, Grid } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

function StudentDashboard() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const navigate = useNavigate();

  const handleSidebarClick = (page) => {
    if (page === 'Logout') {
      logout(); 
    } else {
      setCurrentPage(page);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleEmploi = () => {
    navigate('/studentemploi');
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:9191/issatso/logout', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ${refreshToken}', 
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('token'); 
        navigate('/SignIn'); 
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StudentSidebar onSidebarClick={handleSidebarClick} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#3182CE', marginTop: '-10px', marginRight: '30px' }}>
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ marginLeft: '250px' }}>
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
                    <Avatar alt="Admin" src="/path/to/admin-image.jpg" sx={{ width: 40, height: 40, marginLeft: '8px' }} />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* Render different components based on currentPage */}
        {currentPage === 'Dashboard' && <AnnonceE />}
        {currentPage === 'Emploi De Temps' && <EmploiTemps />}
        {currentPage === 'Supports De cours' && <LeftSidebar />}
        {currentPage === 'Quizs' && <QuizList />}
        {currentPage === 'Demandes' && <Demande />}
        {currentPage === 'Comptes Rendus' && <CompteRendu />}
      </Box>
    </Box>
  );
}

export default StudentDashboard;
