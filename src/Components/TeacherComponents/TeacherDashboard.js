import * as React from 'react';
import { Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, InputBase, Box, Grid } from '@mui/material';
//import StudentSidebar from './StudentSideBar'

//import QuizList from './QuizComponents/QuizList';
import Demande from '../StudentComponents/Demande'
import TeacherSidebar from './TeacherSideBar';
import AddCompteRendu from './AddCompteRendu';
import AddQuiz from './AddQuiz'
//import CompteRendu from './CompteRendu';


function TeacherDashboard() {
  const [currentPage, setCurrentPage] = React.useState('Dashboard');
  const [searchQuery, setSearchQuery] = React.useState('');


  const handleSidebarClick = (page) => {
    if (page === 'Logout') {
      window.location.href = '/AdminSignInComp'; 
    } else {
      setCurrentPage(page);
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    placeholder="Rechercher..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ color: 'white' }} 
                  />
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Avatar alt="Teacher" src="/path/to/teacher-image.jpg" sx={{ width: 40, height: 40, marginLeft: '8px' }} />
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
          
          
         

          {currentPage === 'Demandes' && <Demande/>}
          {currentPage === 'Comptes Rendus' && <AddCompteRendu/>}
<<<<<<< HEAD
          {currentPage === 'Quizs' && <AddQuiz/>}


=======
          
>>>>>>> 1639496c6333f84aef094dd9443fd57d198aa0c7
          



          



         </Box>
      </Box>
  );
}

export default TeacherDashboard;
