import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { GetApp as GetAppIcon } from '@mui/icons-material';

// Sample data representing a list of quizzes
const quizzes = [
  {
    id: 1,
    title: 'Quiz 1',
    questions: 10,
    isDone: true, // Example status: Quiz is done
  },
  {
    id: 2,
    title: 'Quiz 2',
    questions: 15,
    isDone: false, // Example status: Quiz is not done
  },
  // Add more quizzes as needed
];

const mockData = {
  semestre1: {
    Mathématiques: [
      {
        id: 1,
        title: 'Quiz Maths 1',
        questions: 10,
        isDone: true,
      },
      {
        id: 2,
        title: 'Quiz Maths 2',
        questions: 15,
        isDone: false,
      },
    ],
    Physique: [
      {
        id: 3,
        title: 'Quiz Physique 1',
        questions: 10,
        isDone: true,
      },
    ],
    Chimie: [],
  },
  semestre2: {
    Informatique: [
      {
        id: 4,
        title: 'Quiz Informatique 1',
        questions: 10,
        isDone: true,
      },
      {
        id: 5,
        title: 'Quiz Informatique 2',
        questions: 15,
        isDone: false,
      },
    ],
    Biologie: [],
  },
};

function QuizList() {
  const [selectedSemester, setSelectedSemester] = useState('semestre1');
  const [selectedMatiere, setSelectedMatiere] = useState(null);

  const handleSemesterChange = (event, newValue) => {
    setSelectedSemester(newValue);
    setSelectedMatiere(null);
  };

  const handleMatiereClick = (matiereName) => {
    setSelectedMatiere(matiereName);
  };

  return (
    <Box display="flex">
      <Box width="30%">
        <Tabs value={selectedSemester} onChange={handleSemesterChange}>
          <Tab label="Semestre 1" value="semestre1" />
          <Tab label="Semestre 2" value="semestre2" />
        </Tabs>
        
        <Box mt={2} sx={{ border: '1px solid #ccc' }}>
          <Typography variant="h6" align="center" sx={{ backgroundColor: '#BEE3F8', padding:'8px' }}> Liste des matières - {selectedSemester} </Typography>
          <List>
            {Object.keys(mockData[selectedSemester]).map((matiereName) => (
              <div key={matiereName}>
                <ListItem button selected={selectedMatiere === matiereName} onClick={() => handleMatiereClick(matiereName)}>
                  <ListItemText primary={`Quizs de ${matiereName}`} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      </Box>
      {selectedMatiere && (
        <Box width="70%" marginTop="10px">
          <Typography variant="h6" align="center" sx={{ backgroundColor: '#E2E8F0', padding:'8px' }}>
            Quizs disponibles pour {selectedMatiere}
          </Typography>
          {/* Your Quiz Cards here */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {mockData[selectedSemester][selectedMatiere].map(quiz => (
              <Box key={quiz.id} style={{ margin: '10px', minWidth: '300px', border: '1px solid #ccc', padding: '16px', borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
                {/* Your Quiz Card */}
                <Typography variant="h5" component="div">
                  {quiz.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Number of Questions: {quiz.questions}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Status: {quiz.isDone ? 'Done' : 'Not Done'}
                </Typography>
                <IconButton>
                  <GetAppIcon />
                </IconButton>
              </Box>
            ))}
          </div>
        </Box>
      )}
    </Box>
  );
}

export default QuizList;
