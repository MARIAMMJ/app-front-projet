import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Sidebar from './Sidebar';


function StudentClassItem({ classe, onViewDetails }) {
  const handleViewDetails = () => {
    onViewDetails(classe);
  };

  return (
    <TableRow>
      <TableCell>{classe.filiere}</TableCell>
      <TableCell>{classe.groupe}</TableCell>
      <TableCell>{classe.nombreEtudiants}</TableCell>
      <TableCell align="right">
        <Button variant="outlined" size="small" color="primary" onClick={handleViewDetails}>
          Voir détails
        </Button>
      </TableCell>
    </TableRow>
  );
}

function StudentsPage() {
  const [selectedClass, setSelectedClass] = React.useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [classes, setClasses] = React.useState([
    {
      id: 1,
      filiere: '1ere ING',
      groupe: 'Groupe 1',
      nombreEtudiants: 25,
      students: [
        { id: 1, cin: '1234567890', numInscription: '2023001', nom: 'Doe', prenom: 'John' },
        { id: 2, cin: '0987654321', numInscription: '2023002', nom: 'Smith', prenom: 'Jane' },
      ]
    },
  ]);
  const [currentPage, setCurrentPage] = useState('Students');
  const handleSidebarClick = (page) => {
    if (page === 'Students') {
      window.location.href = './StudentsPage';
    } else {
      setCurrentPage(page);
    }
  };

  const handleViewDetails = (classe) => {
    setSelectedClass(classe);
  };

  const handleAddStudent = (classeId) => {
    console.log("Ajouter étudiant à la classe avec l'ID :", classeId);
  };

  const handleDeleteStudent = () => {
    const updatedStudents = selectedClass.students.filter(student => student.id !== selectedStudent.id);

    const updatedClass = { ...selectedClass, students: updatedStudents };

    const updatedClasses = classes.map(classe => {
      if (classe.id === selectedClass.id) {
        return updatedClass;
      } else {
        return classe;
      }
    });

    setClasses(updatedClasses);
    setSelectedClass(updatedClass);
    setDeleteConfirmation(false); 
  };

  const openDeleteConfirmation = (student) => {
    setSelectedStudent(student);
    setDeleteConfirmation(true);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px',onSidebarClick:{handleSidebarClick} }}>
        <Typography variant="h4" gutterBottom>Liste des classes</Typography>
      {selectedClass ? (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h5">Détails de la classe</Typography>
            </Box>
            <Box>
              <Button variant="contained" size="small" sx={{ mr: 1 }} color="success" onClick={() => handleAddStudent(selectedClass.id)}>
                Ajouter étudiant
              </Button>
              <Button variant="outlined" size="small" color="primary" onClick={() => setSelectedClass(null)}>
                Retour
              </Button>
            </Box>
          </Box>
          <Typography variant="body1">Filière: {selectedClass.filiere}</Typography>
          <Typography variant="body1">Groupe: {selectedClass.groupe}</Typography>
          <Typography variant="body1">Nombre d'étudiants: {selectedClass.nombreEtudiants}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CIN</TableCell>
                <TableCell>Numéro d'inscription</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedClass.students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.cin}</TableCell>
                  <TableCell>{student.numInscription}</TableCell>
                  <TableCell>{student.nom}</TableCell>
                  <TableCell>{student.prenom}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" aria-label="delete" onClick={() => openDeleteConfirmation(student)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            open={deleteConfirmation}
            onClose={() => setDeleteConfirmation(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirmation de suppression</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Êtes-vous sûr de vouloir supprimer cet étudiant ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmation(false)} color="primary">
                Annuler
              </Button>
              <Button onClick={handleDeleteStudent} color="error" autoFocus>
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Filière</TableCell>
              <TableCell>Groupe</TableCell>
              <TableCell>Nombre d'étudiants</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mappez chaque classe pour afficher ses détails */}
            {classes.map((classe) => (
              <StudentClassItem key={classe.id} classe={classe} onViewDetails={handleViewDetails} />
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default StudentsPage ;
