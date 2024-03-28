import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddTeacher from './AddTeacher';

const teachers = [
  { id: 1, firstName: 'Nadhem', lastName: 'Zaaleni', subject: 'Mathematics', dateJoined: '2022-03-28', image: 'url_de_l_image1' },
  { id: 2, firstName: 'Ahmed', lastName: 'Maalel', subject: 'IHM', dateJoined: '2021-12-15', image: 'url_de_l_image2' },
  { id: 3, firstName: 'Roua', lastName: 'Jabla', subject: 'IHM', dateJoined: '2023-11-17', image: 'url_de_l_image3' },
];

function TeacherDashboard() {
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  
  const handleAddTeacherClick = () => {
    setIsAddingTeacher(true);
  };

  const handleCancelAddTeacher = () => {
    setIsAddingTeacher(false);
  };

  return (
    <div style={{ marginTop: '80px',flexGrow: 1, p: 3, marginLeft: '240px' }}>
      {isAddingTeacher ? (
        <AddTeacher onCancel={handleCancelAddTeacher} />
      ) : (
        <Grid container spacing={2}>
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
              <Card>
                <CardContent>
                  <Avatar alt={`${teacher.firstName} ${teacher.lastName}`} src={teacher.image} sx={{ width: 80, height: 80, margin: 'auto' }} />
                  <Typography variant="h6" gutterBottom align="center">{`${teacher.firstName} ${teacher.lastName}`}</Typography>
                  <Typography variant="body1" gutterBottom align="center">{teacher.subject}</Typography>
                  <Typography variant="body2" color="textSecondary" align="center">Joined: {teacher.dateJoined}</Typography>
                </CardContent>
              </Card>
              <div style={{ position: 'absolute', top: '80px', right: '70px' }}>
                <IconButton style={{ color: 'green' }} aria-label="Ajouter Enseignant" onClick={handleAddTeacherClick}>
                  <AddCircleIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ color: 'red' }} aria-label="Supprimer Enseignant">
                  <RemoveCircleIcon fontSize="large" />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default TeacherDashboard;
