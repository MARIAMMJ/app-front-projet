import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Import de l'icône MenuBook
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HelpIcon from '@mui/icons-material/Help';
import DescriptionIcon from '@mui/icons-material/Description';
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
        {['Dashboard', 'Emploi De Temps', 'Supports De cours', 'Quizs', 'Demandes', 'Comptes Rendus', 'Logout'].map((text, index) => (
          <ListItem 
            button 
            key={text} 
            sx={{ bgcolor: selectedItem === text ? 'primary.main' : 'background.paper' }}
            onClick={() => handleItemClick(text)}
          >
            <ListItemIcon sx={{ color: selectedItem === text ? 'primary.contrastText' : 'inherit' }}>
              {text === 'Dashboard' && <DashboardIcon />}
              {text === 'Emploi De Temps' && <ScheduleIcon />}
              {text === 'Supports De cours' && <MenuBookIcon />} 
              {text === 'Quizs' && <QuestionAnswerIcon />}
              {text === 'Demandes' && <HelpIcon />}
              {text === 'Comptes Rendus' && <DescriptionIcon />}
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