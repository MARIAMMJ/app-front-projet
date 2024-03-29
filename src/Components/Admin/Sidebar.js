import React from 'react';
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
import ScheduleIcon from '@mui/icons-material/Schedule'; // Icône pour l'emploi de temps
import LogoutIcon from '@mui/icons-material/Logout';
import NoteIcon from '@mui/icons-material/Note'; // Nouvelles icônes
import NewsIcon from '@mui/icons-material/Article'; // Nouvelles icônes

function Sidebar({ onSidebarClick }) {
  const [selectedItem, setSelectedItem] = React.useState('Tableau de bord');

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (onSidebarClick) {
      onSidebarClick(item);
    }
    // Si l'élément cliqué est "Logout", effectuez la redirection
    if (item === 'Déconnexion') {
      window.location.href = '/AdminSignIn'; // Redirection vers AdminSignInComp
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
        position: 'fixed',
        top: 0,
        bottom: 0,
        zIndex: 1000, 
        overflowY: 'auto', 
      }}
    >
     
      <img src={"./logoissat.png"} alt="Logo de l'Université" style={{ width: 100, height: 100, marginBottom: '16px' }} />
      <List>
        {['Tableau de bord', 'Enseignants', 'Étudiants', 'Calendrier', 'Emploi du temps', 'Notes', 'Actualités', 'Déconnexion'].map((text, index) => (
          <ListItem 
            button 
            key={text} 
            sx={{ bgcolor: selectedItem === text ? 'primary.main' : 'background.paper' }}
            onClick={() => handleItemClick(text)}
          >
            <ListItemIcon sx={{ color: selectedItem === text ? 'primary.contrastText' : 'inherit' }}>
              {text === 'Tableau de bord' && <DashboardIcon />}
              {text === 'Enseignants' && <PeopleAltIcon />}
              {text === 'Étudiants' && <SchoolIcon />}
              {text === 'Calendrier' && <EventIcon />}
              {text === 'Emploi du temps' && <ScheduleIcon />} {/* Nouvelle icône pour l'emploi de temps */}
              {text === 'Notes' && <NoteIcon />}
              {text === 'Actualités' && <NewsIcon />}
              {text === 'Déconnexion' && <LogoutIcon />}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ color: selectedItem === text ? 'primary.contrastText' : 'inherit' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
