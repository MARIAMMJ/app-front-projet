import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School'; 
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

function StudentSidebar({ onSidebarClick }) {
  const [selectedItem, setSelectedItem] = React.useState('Dashboard');

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (onSidebarClick) {
      onSidebarClick(item);
    }
  };

  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
      }}
    >
     
      <img src={"./logoissat.png"} alt="University Logo" style={{ width: 100, height: 100, marginBottom: '16px' }} />

      <List>
        {['Dashboard', 'Emploi De Temps', 'Supports De cours', 'Quizs', 'Payment', 'Statistics', 'Logout'].map((text, index) => (
          <ListItem 
            button 
            key={text} 
            sx={{ bgcolor: selectedItem === text ? 'primary.main' : 'background.paper' }}
            onClick={() => handleItemClick(text)}
          >
            <ListItemIcon sx={{ color: selectedItem === text ? 'primary.contrastText' : 'inherit' }}>
              {text === 'Dashboard' && <DashboardIcon />}
              {text === 'Emploi De Temps' && <PeopleAltIcon />}
              {text === 'Supports De cours' && <SchoolIcon />}
              {text === 'Quizs' && <EventIcon />}
              {text === 'Payment' && <PaymentIcon />}
              {text === 'Statistics' && <BarChartIcon />}
              {text === 'Logout' && <LogoutIcon />}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ color: selectedItem === text ? 'primary.contrastText' : 'inherit' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default StudentSidebar;
