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
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


function StudentsPage() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      filiere: '1ere ING',
      groupe: 'Groupe 1',
      nombreEtudiants: 25,
      students: [
        { 
          id: 1, 
          cin: '1234567890', 
          numInscription: '2023001', 
          nom: 'Doe', 
          prenom: 'John',
          mail: 'john.doe@example.com',
          groupe: 'Groupe 1',
          filiere: '1ere ING'
        },
        { 
          id: 2, 
          cin: '0987654321', 
          numInscription: '2023002', 
          nom: 'Smith', 
          prenom: 'Jane',
          mail: 'jane.smith@example.com',
          groupe: 'Groupe 2',
          filiere: '2eme ING'
        },
      ]
    },
  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);

  const handleViewDetails = (classe) => {
    setSelectedClass(classe);
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

  const handleOpenEditDialog = (student) => {
    setEditedStudent(student);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Changes saved:', editedStudent);
    setEditDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px' }}>
      <Typography variant="h4" gutterBottom>Liste des classes</Typography>
      {selectedClass ? (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h5">Détails de la classe</Typography>
            </Box>
            <Box>
              <Button variant="contained" size="small" sx={{ mr: 1 }} color="success" component={Link} to="/add-student">
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
                <TableCell>Courriel</TableCell>
                <TableCell>Groupe</TableCell>
                <TableCell>Filière</TableCell>
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
                  <TableCell>{student.mail}</TableCell>
                  <TableCell>{student.groupe}</TableCell>
                  <TableCell>{student.filiere}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" aria-label="delete" onClick={() => openDeleteConfirmation(student)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="edit" onClick={() => handleOpenEditDialog(student)}>
                      <EditIcon />
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
          <Dialog
  open={editDialogOpen}
  onClose={handleCloseEditDialog}
  aria-labelledby="form-dialog-title"
>
  <DialogTitle id="form-dialog-title">{`${editedStudent?.nom} ${editedStudent?.prenom}`}</DialogTitle>
  <DialogContent>
    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
      <Avatar
        sx={{ width: 80, height: 80, marginBottom: 1 }}
        alt={`${editedStudent?.nom} ${editedStudent?.prenom}`}
        src={editedStudent?.avatar}
      />
<Typography variant="body2" gutterBottom align="center">Numéro d'inscription: {editedStudent?.numInscription}</Typography>
    </Box>
    <TextField
      autoFocus
      margin="dense"
      label="Courriel"
      type="email"
      fullWidth
      value={editedStudent?.mail}
      onChange={(e) => setEditedStudent({ ...editedStudent, mail: e.target.value })}
    />
    <TextField
      margin="dense"
      label="Numéro de téléphone"
      type="text"
      fullWidth
      value={editedStudent?.numTel}
      onChange={(e) => setEditedStudent({ ...editedStudent, numTel: e.target.value })}
    />
    <TextField
      margin="dense"
      label="Filière"
      type="text"
      fullWidth
      value={editedStudent?.filiere}
      onChange={(e) => setEditedStudent({ ...editedStudent, filiere: e.target.value })}
    />
    <TextField
      margin="dense"
      label="Groupe"
      type="text"
      fullWidth
      value={editedStudent?.groupe}
      onChange={(e) => setEditedStudent({ ...editedStudent, groupe: e.target.value })}
    />
    <TextField
      margin="dense"
      label="Mot de passe"
      type="password"
      fullWidth
      value={editedStudent?.password}
      onChange={(e) => setEditedStudent({ ...editedStudent, password: e.target.value })}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseEditDialog} color="primary">
      Annuler
    </Button>
    <Button onClick={handleSaveChanges} color="primary">
      Enregistrer
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
            {classes.map((classe) => (
              <TableRow key={classe.id}>
                <TableCell>{classe.filiere}</TableCell>
                <TableCell>{classe.groupe}</TableCell>
                <TableCell>{classe.nombreEtudiants}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" size="small" color="primary" onClick={() => handleViewDetails(classe)}>
                    Voir détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default StudentsPage;
