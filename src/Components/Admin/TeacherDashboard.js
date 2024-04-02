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
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const teachers = [
  { id: 1, firstName: 'Nadhem', lastName: 'Zaaleni', subject: 'Mathematics', dateJoined: '2022-03-28', image: 'url_de_l_image1', 
    details: {
      birthDate: '1990-05-15',
      phoneNumber: '0123456789',
      email: 'nadhem@example.com',
      diploma: 'Master in Mathematics',
      institute: 'University of XYZ'
    }
  },
  { id: 2, firstName: 'Ahmed', lastName: 'Maalel', subject: 'IHM', dateJoined: '2021-12-15', image: 'url_de_l_image2', 
    details: {
      birthDate: '1985-08-22',
      phoneNumber: '0987654321',
      email: 'ahmed@example.com',
      diploma: 'Bachelor in Computer Science',
      institute: 'College ABC'
    }
  },
  { id: 3, firstName: 'Roua', lastName: 'Jabla', subject: 'IHM', dateJoined: '2023-11-17', image: 'url_de_l_image3',
    details: {
      birthDate: '1995-02-10',
      phoneNumber: '0654321098',
      email: 'roua@example.com',
      diploma: 'PhD in Human-Computer Interaction',
      institute: 'Institute of XYZ'
    }
  },
];

function TeacherDashboard() {
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isRemovingTeacher, setIsRemovingTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filter, setFilter] = useState(null);
  const [openTeacherDetails, setOpenTeacherDetails] = useState(false);
  const [selectedTeacherDetails, setSelectedTeacherDetails] = useState(null);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState(''); // Nouvel état pour le mot de passe
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false); // Nouvel état pour activer/désactiver la modification du mot de passe

  const handleAddTeacherClick = () => {
    setIsAddingTeacher(true);
    setFilter(null); // Supprime le filtre lorsque l'ajout d'enseignant est activé
  };

  const handleCancelAddTeacher = () => {
    setIsAddingTeacher(false);
  };

  const handleRemoveTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsRemovingTeacher(true);
  };

  const handleCancelRemoveTeacher = () => {
    setSelectedTeacher(null);
    setIsRemovingTeacher(false);
  };

  const handleConfirmRemoveTeacher = () => {
    // Ajouter le code pour supprimer l'enseignant
    setIsRemovingTeacher(false);
    setSelectedTeacher(null);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value === 'Tout' ? null : event.target.value);
  };

  const handleTeacherDetailsClick = (teacher) => {
    setSelectedTeacherDetails(teacher);
    setOpenTeacherDetails(true);
    setEditedPhoneNumber(teacher.details.phoneNumber);
    setEditedEmail(teacher.details.email);
    setEditedPassword(''); // Réinitialiser le champ de mot de passe lors de l'ouverture des détails de l'enseignant
  };

  const handleCloseTeacherDetails = () => {
    setOpenTeacherDetails(false);
    setIsEditingPhoneNumber(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  };

  const handlePhoneNumberChange = (event) => {
    setEditedPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEditedEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setEditedPassword(event.target.value);
  };

  const handleSaveChanges = () => {
    // Mettre à jour le numéro de téléphone, l'e-mail et le mot de passe dans les détails de l'enseignant
    const updatedTeacherDetails = {
      ...selectedTeacherDetails,
      details: {
        ...selectedTeacherDetails.details,
        phoneNumber: editedPhoneNumber,
        email: editedEmail,
        password: editedPassword, // Mettre à jour le mot de passe
      },
    };
    // Mettre à jour les détails de l'enseignant dans la liste des enseignants
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === selectedTeacherDetails.id ? updatedTeacherDetails : teacher
    );
    // Mettre à jour l'état local avec les nouveaux détails de l'enseignant
    setSelectedTeacherDetails(updatedTeacherDetails);
    // Mettre à jour la liste des enseignants
    // (vous pouvez ajouter la logique pour mettre à jour la liste dans la base de données ici)
    setSelectedTeacherDetails(null);
    setOpenTeacherDetails(false);
    setIsEditingPhoneNumber(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  };

  const uniqueSubjects = [...new Set(teachers.map((teacher) => teacher.subject))];

  const filteredTeachers = filter
    ? teachers.filter((teacher) => teacher.subject === filter)
    : teachers;

  return (
    <div style={{ marginTop: '20px', flexGrow: 1, p: 3, marginLeft: '240px' }}>
      {!isAddingTeacher && (
        <TextField
          select
          label="Filtrer par matière"
          value={filter || 'Tout'}
          onChange={handleFilterChange}
          style={{ marginBottom: '30px', width: '200px' }}
        >
          <MenuItem value="Tout">Tout</MenuItem>
          {uniqueSubjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </TextField>
      )}
      {isAddingTeacher ? (
        <AddTeacher onCancel={handleCancelAddTeacher} />
      ) : (
        <Grid container spacing={2}>
          {filteredTeachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
              <Card>
                <CardContent onClick={() => handleTeacherDetailsClick(teacher)} style={{ cursor: 'pointer' }}>
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
                <IconButton style={{ color: 'red' }} aria-label="Supprimer Enseignant" onClick={() => handleRemoveTeacherClick(teacher)}>
                  <RemoveCircleIcon fontSize="large" />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Popup de suppression */}
      <Dialog open={isRemovingTeacher} onClose={handleCancelRemoveTeacher}>
        <DialogTitle>Supprimer Enseignant</DialogTitle>
        <DialogContent>
          <TextField label="Numéro d'inscription" fullWidth margin="normal" />
          <TextField label="Nom" fullWidth margin="normal" />
          <TextField label="Prénom" fullWidth margin="normal" />
          <TextField label="Cause" fullWidth margin="normal" />
          {/* Utilisez les composants de DatePicker pour les dates */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemoveTeacher} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmRemoveTeacher} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour afficher les détails de l'enseignant */}
      <Dialog open={openTeacherDetails} onClose={handleCloseTeacherDetails} maxWidth="sm" >
        <DialogTitle>{`${selectedTeacherDetails?.firstName} ${selectedTeacherDetails?.lastName}`}</DialogTitle>
        <DialogContent>
          <Avatar alt={`${selectedTeacherDetails?.firstName} ${selectedTeacherDetails?.lastName}`} src={selectedTeacherDetails?.image} sx={{ width: 80, height: 80, margin: 'auto' }} />
          <Typography variant="body1" gutterBottom align="center">{selectedTeacherDetails?.subject}</Typography>
          <Typography variant="body2" color="textSecondary" align="center">Inscrit depuis: {selectedTeacherDetails?.dateJoined}</Typography>
          <Typography variant="body2" color="textPrimary" align="center" style={{ fontWeight: 'bold', marginTop: '20px' }}>Détails personnels:</Typography>
          <Typography variant="body2" gutterBottom align="center">Date de rejoint: {selectedTeacherDetails?.dateJoined}</Typography>
          <Typography variant="body2" gutterBottom align="center">Date de naissance: {selectedTeacherDetails?.details?.birthDate}</Typography>
          {isEditingPhoneNumber ? (
            <TextField 
            sx={{ textAlign: 'center' }} 
              label="Numéro de téléphone"
              fullWidth
              value={editedPhoneNumber}
              onChange={handlePhoneNumberChange}
              style={{ marginBottom: '10px' }}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Typography variant="body2" gutterBottom align="center">Numéro de téléphone: {selectedTeacherDetails?.details?.phoneNumber}</Typography>
              <IconButton aria-label="Modifier" onClick={() => setIsEditingPhoneNumber(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          )}
          {isEditingEmail ? (
            <TextField
              label="Adresse email"
              fullWidth
              value={editedEmail}
              onChange={handleEmailChange}
              style={{ marginBottom: '10px' }}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Typography variant="body2" gutterBottom align="center">Adresse email: {selectedTeacherDetails?.details?.email}</Typography>
              <IconButton aria-label="Modifier" onClick={() => setIsEditingEmail(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          )}
          {isEditingPassword ? (
            <TextField
             textAlign= 'center'  
              label="Mot de passe"
              fullWidth
              value={editedPassword}
              onChange={handlePasswordChange}
              style={{ marginBottom: '10px' }}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Typography variant="body2" gutterBottom align="center">Mot de passe: ********</Typography>
              <IconButton aria-label="Modifier" onClick={() => setIsEditingPassword(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </div>
          )}
          <Typography variant="body2" color="textPrimary" align="center" style={{ fontWeight: 'bold', marginTop: '20px' }}>Détails éducatifs:</Typography>
          <Typography variant="body2" gutterBottom align="center">Diplôme: {selectedTeacherDetails?.details?.diploma}</Typography>
          <Typography variant="body2" gutterBottom align="center">Institut: {selectedTeacherDetails?.details?.institute}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTeacherDetails} color="primary">
            Fermer
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TeacherDashboard;
