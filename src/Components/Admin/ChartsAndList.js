import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, IconButton, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AddIcon from '@mui/icons-material/Add';

const initialAbsentTeachers = [
  { image: 'url_de_l_image', firstName: 'Nadhem', lastName: 'Zaaleni', subject: 'Mathematics', session: 'S1' },
  { image: 'url_de_l_image', firstName: 'Ahmed', lastName: 'Maalel', subject: 'IHM', session: 'S3' },
];

function TeachersTable({ teachers }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="teachers table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Subject</TableCell>
            <TableCell align="left">Session</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Avatar alt={`${teacher.firstName} ${teacher.lastName}`} src={teacher.image} />
              </TableCell>
              <TableCell align="left">{teacher.firstName}</TableCell>
              <TableCell align="left">{teacher.lastName}</TableCell>
              <TableCell align="left">{teacher.subject}</TableCell>
              <TableCell align="left">{teacher.session}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ChartsAndList() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [openPopup, setOpenPopup] = useState(false);
  const [absentTeachers, setAbsentTeachers] = useState(initialAbsentTeachers);

  const handleSidebarClick = (page) => {
    if (page === 'Dashboard') {
      window.location.href = './AdminDashboard';
    } else {
      setCurrentPage(page);
    }
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleConfirmAddTeacher = () => {
    // Récupérer les valeurs des champs de la popup
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const subject = document.getElementById('subject').value;
    const session = document.getElementById('session').value;

    // Vérifier si tous les champs sont remplis
    if (name && lastName && subject && session) {
      // Créer un nouvel objet enseignant avec les valeurs saisies
      const newTeacher = {
        firstName: name,
        lastName: lastName,
        subject: subject,
        session: session,
        // Vous pouvez également ajouter l'image si nécessaire
      };

      // Ajouter le nouvel enseignant à la liste des enseignants absents
      setAbsentTeachers([...absentTeachers, newTeacher]);

      // Fermer la popup
      handleClosePopup();
    } else {
      // Afficher un message d'erreur si tous les champs ne sont pas remplis
      alert('Veuillez remplir tous les champs.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, p: 3, marginLeft: '240px' }} onSidebarClick={handleSidebarClick}>
      {/* Charts */}
      <Box sx={{ width: '60%', mr: 2 }}>
        {/* Pie Chart */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              Total Students and Teachers
            </Typography>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={dataPieChart}
                  outerRadius={50}
                  fill="#8884d8"
                  label
                >
                  {dataPieChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Chart */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
              Attendance
            </Typography>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                data={dataStackedBarChart}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" stackId="a" fill="#8884d8" />
                <Bar dataKey="teachers" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* List of Absent Teachers */}
      <Box sx={{ width: '60%' }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                List of Absent Teachers
              </Typography>
              <IconButton onClick={handleOpenPopup}>
                <AddIcon />
              </IconButton>
            </Box>
            <TeachersTable teachers={absentTeachers} />
          </CardContent>
        </Card>
      </Box>

      {/* Popup for Adding a Teacher */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Add Absent Teacher</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="Name" fullWidth />
          <TextField margin="dense" id="lastName" label="Last Name" fullWidth />
          <TextField margin="dense" id="subject" label="Subject" fullWidth />
          <TextField margin="dense" id="session" label="Session" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Cancel</Button>
          <Button onClick={handleConfirmAddTeacher}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Données pour les charts
const dataPieChart = [
  { name: 'Students', value: 400 },
  { name: 'Teachers', value: 150 },
];

const dataStackedBarChart = [
  {
    name: 'Present',
    students: 200,
    teachers: 100,
  },
  {
    name: 'Absent',
    students: 50,
    teachers: 20,
  },
  {
    name: 'Sick',
    students: 30,
    teachers: 10,
  },
];

export default ChartsAndList;
