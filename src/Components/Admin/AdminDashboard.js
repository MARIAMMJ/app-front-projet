import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from './Sidebar';
import ChartsAndList from './ChartsAndList';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import TeachersTable from './TeacherDashboard';
import StudentsPage from './StudentsPage';
import CalendarPage from './CalendarPage';

function AdminDashboard() {
  const [currentPage, setCurrentPage] = React.useState('Dashboard');

  const handleSidebarClick = (page) => {
    if (page === 'Logout') {
      window.location.href = '/AdminSignInComp'; 
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Sidebar onSidebarClick={handleSidebarClick} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" gutterBottom>{new Date().toLocaleDateString()}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          {currentPage === 'Dashboard' && <ChartsAndList />}
          {currentPage === 'Teachers' && <TeachersTable />}
          {currentPage === 'Students' && <StudentsPage />}
          {currentPage === 'Calendar' && <CalendarPage />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;
