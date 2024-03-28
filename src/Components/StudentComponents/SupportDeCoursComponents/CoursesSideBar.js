import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Center } from '@chakra-ui/react';

const mockData = {
  semestre1: {
    matieres: [
      { id: 1, name: 'Mathématiques' },
      { id: 2, name: 'Physique' },
      { id: 3, name: 'Chimie' },
    ],
    cours: [
      { id: 1, matiereId: 1, title: 'Cours de mathématiques 1', file: 'cours_mathematiques_1.pdf' },
      { id: 2, matiereId: 1, title: 'Cours de mathématiques 2', file: 'cours_mathematiques_2.pdf' },
      { id: 3, matiereId: 2, title: 'Cours de physique 1', file: 'cours_physique_1.pdf' },
    ],
  },
  semestre2: {
    matieres: [
      { id: 4, name: 'Informatique' },
      { id: 5, name: 'Biologie' },
    ],
    cours: [
      { id: 4, matiereId: 4, title: 'Cours d\'informatique 1', file: 'cours_informatique_1.pdf' },
      { id: 5, matiereId: 4, title: 'Cours d\'informatique 2', file: 'cours_informatique_2.pdf' },
      { id: 6, matiereId: 5, title: 'Cours de biologie 1', file: 'cours_biologie_1.pdf' },
    ],
  },
};

function CourseList({ courses }) {
  return (
    <List>
      {courses.map((course) => (
        <ListItem key={course.id}>
          <ListItemText primary={course.title} />
          <IconButton href={course.file} download>
            <GetAppIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

function LeftSidebar() {
  const [selectedSemester, setSelectedSemester] = useState('semestre1');
  const [selectedMatiere, setSelectedMatiere] = useState(null);

  const handleSemesterChange = (event, newValue) => {
    setSelectedSemester(newValue);
    setSelectedMatiere(null);
  };

  const handleMatiereClick = (matiereId) => {
    setSelectedMatiere(matiereId);
  };

  return (
    <Box display="flex" justifyContent="left" alignItems="center">
      <Box width="50%">
        <Tabs value={selectedSemester} onChange={handleSemesterChange}>
          <Tab label="Semestre 1" value="semestre1" />
          <Tab label="Semestre 2" value="semestre2" />
        </Tabs>
        
        <Box mt={2} sx={{ border: '1px solid #ccc' }}>
          <Typography variant="h6" align="center" sx={{ backgroundColor: '#BEE3F8', padding:'8px' }}> Liste des matières - {selectedSemester} </Typography>
          <List>
            {mockData[selectedSemester].matieres.map((matiere) => (
              <div key={matiere.id}>
                <ListItem button selected={selectedMatiere === matiere.id} onClick={() => handleMatiereClick(matiere.id)} sx={{
    backgroundColor: selectedMatiere === matiere.id ? '#63B3ED'  : 'inherit', '&:hover': { backgroundColor: selectedMatiere === matiere.id ? '#C3DAFE' : '#F3F4F6',  },
  }}>

  <ListItemText primary={matiere.name} />
</ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      </Box>
      {selectedMatiere && (
        <Box width="50%" mt={2} ml={2} sx={{ border: '1px solid #ccc', marginTop: '26px', maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
          <Typography variant="h6" align="center"  sx={{ backgroundColor: '#E2E8F0', padding:'8px' }}>Cours disponibles pour {mockData[selectedSemester].matieres.find(m => m.id === selectedMatiere).name}</Typography>
          <Divider orientation="vertical" flexItem />
          <CourseList courses={mockData[selectedSemester].cours.filter(course => course.matiereId === selectedMatiere)} />
        </Box>
      )}
    </Box>
  );
}

export default LeftSidebar;
