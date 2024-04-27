import * as React from 'react';
import { Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, InputBase, Box, Grid } from '@mui/material';
import Cookies from 'js-cookie'; 
import Demande from '../StudentComponents/Demande'
import TeacherSidebar from './TeacherSideBar';
import AddCompteRendu from './AddCompteRendu';
import AddQuiz from './AddQuiz'
import AnnonceEns from './AnnonceEns';
import TeacherEmploi from './teacheremploi';
import SupportCours from './TeacherSupportDeCours';
import { useNavigate } from 'react-router-dom';



function TeacherDashboard() {
  const [currentPage, setCurrentPage] = React.useState('Dashboard');
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();


  // const isLoggedIn = Cookies.get('isLoggedIn') === 'true'; 
  const handleSidebarClick = (page) => {
  //   if (page === 'Logout') {
  //     Cookies.remove('isLoggedIn'); 
  //     window.location.href = '/SignIn'; 
  //   } else {
    setCurrentPage(page);
    }
  // };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProfile = () => {
    navigate('/Profil');
    console.log("profile");
  };

  const handleEmploi = () => {
    navigate('/teacheremploi');
  };
  // if (!isLoggedIn) {
  //   window.location.href = '/SignIn'; 
  //   return null;
  // }

  return (
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <TeacherSidebar onSidebarClick={handleSidebarClick} />
        <Box sx={{ flexGrow: 1 }}>
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
                <div onClick={handleProfile}>
                  <Avatar alt="Teacher" src="/path/to/teacher-image.jpg" sx={{ width: 40, height: 40, marginLeft: '8px' }} />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
          
         
          {currentPage === 'Dashboard' && <AnnonceEns/>}
          {currentPage === 'Emploi De Temps' && <TeacherEmploi/>}
          {currentPage === 'Demandes' && <Demande/>}
          {currentPage === 'Comptes Rendus' && <AddCompteRendu/>}
          {currentPage === 'Supports De cours' && <SupportCours/>}
          {currentPage === 'Quizs' && <AddQuiz/>}
        </Box>
      </Box>
  );
}

export default TeacherDashboard;
