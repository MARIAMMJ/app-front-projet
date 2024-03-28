import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import StudentSidebar from './StudentSideBar'
import AnnonceE from '../DashboardTS/Annonce';
import EmploiTemps from './EmploiTempsComponent';
import Quiz from './QuizComponents/Quiz';
import { jsQuizz } from './QuizComponents/constants';
import LeftSidebar from './SupportDeCoursComponents/CoursesSideBar'
import QuizList from './QuizComponents/QuizList';
import Demande from './Demande'


function StudentDashboard() {
  const [currentPage, setCurrentPage] = React.useState('Dashboard');

  const handleSidebarClick = (page) => {
    if (page === 'Logout') {
      window.location.href = '/AdminSignInComp'; 
    } else {
      setCurrentPage(page);
    }
  };

  return (
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <StudentSidebar onSidebarClick={handleSidebarClick} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb:2,backgroundColor:'#63B3ED', minHeight: '70px' }}>
            <Typography variant="h5" gutterBottom>{new Date().toLocaleDateString()}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' ,padding:'200'}}>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <input type="text" placeholder="Search..." style={{ marginLeft: '8px' }} />
              <IconButton>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar alt="Admin" src="/path/to/admin-image.jpg" sx={{ width: 40, height: 40, marginLeft: '8px' }} />
            </Box>
          </Box>
          {currentPage === 'Dashboard' && <AnnonceE />}
          {currentPage === 'Emploi De Temps' && <EmploiTemps />}
          {currentPage === 'Supports De cours' && <LeftSidebar />}

          {currentPage === 'Quizs' && <QuizList/>}
          {currentPage === 'Demandes' && <Demande/>}


          



         </Box>
      </Box>
  );
}

export default StudentDashboard;
