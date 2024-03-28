import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, InputBase, Box, Grid } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from './Sidebar';
import ChartsAndList from './ChartsAndList';
import TeachersTable from './TeacherDashboard';
import StudentsPage from './StudentsPage';
import CalendarPage from './CalendarPage';
import AdminSignInComp from './AdminSignInComp';
import { Text } from "@chakra-ui/react";

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSidebarClick = (page) => {
    if (page === 'Dashboard') {
      window.location.href = './AdminDashboard';
    } else {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ flexGrow: 2 }}>
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
                    placeholder="Search..."
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
                  <Avatar alt="Admin" src="/path/to/admin-image.jpg" sx={{ width: 40, height: 40, marginLeft: '8px' }} />
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', marginTop: '-20px' }}>
          <Sidebar onSidebarClick={handleSidebarClick} />
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {currentPage === 'Dashboard' && <ChartsAndList />}
            {currentPage === 'Teachers' && <TeachersTable />}
            {currentPage === 'Students' && <StudentsPage />}
            {currentPage === 'Calendar' && <CalendarPage />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminDashboard;
