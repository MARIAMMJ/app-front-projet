import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const teachers = [
  { id: 1, firstName: 'Nadhem', lastName: 'Zaaleni', subject: 'Mathematics', dateJoined: '2022-03-28', image: 'url_de_l_image1' },
  { id: 2, firstName: 'Ahmed', lastName: 'Maalel', subject: 'IHM', dateJoined: '2021-12-15', image: 'url_de_l_image2' },
  { id: 3, firstName: 'Roua', lastName: 'Jabla', subject: 'IHM', dateJoined: '2023-11-17', image: 'url_de_l_image3' },
];

function TeacherDashboard() {
  return (
    <Grid container spacing={2}>
      {teachers.map((teacher) => (
        <Grid item xs={12} sm={6} md={4} key={teacher.id}>
          <Card>
            <CardContent>
              <img src={teacher.image} alt={`${teacher.firstName} ${teacher.lastName}`} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <Typography variant="h6" gutterBottom>{`${teacher.firstName} ${teacher.lastName}`}</Typography>
              <Typography variant="body1" gutterBottom>{teacher.subject}</Typography>
              <Typography variant="body2" color="textSecondary">Joined: {teacher.dateJoined}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TeacherDashboard;
