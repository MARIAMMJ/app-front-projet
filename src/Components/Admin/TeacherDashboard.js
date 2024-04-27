import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AddTeacher from './AddTeacher';
import IconButton from '@mui/material/IconButton';
import {
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
  const [editedPassword, setEditedPassword] = useState('');
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [inscriptionNumber, setInscriptionNumber] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleAddTeacherClick = () => {
    setIsAddingTeacher(true);
    setFilter(null);
  };

  const handleCancelAddTeacher = () => {
    setIsAddingTeacher(false);
  };

  const handleRemoveTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsRemovingTeacher(true);
    setInscriptionNumber(teacher.id.toString());
    setNom(teacher.lastName);
    setPrenom(teacher.firstName);
  };

  const handleCancelRemoveTeacher = () => {
    setSelectedTeacher(null);
    setIsRemovingTeacher(false);
  };

  const handleConfirmRemoveTeacher = () => {
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
    setEditedPassword('');
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
    const updatedTeacherDetails = {
      ...selectedTeacherDetails,
      details: {
        ...selectedTeacherDetails.details,
        phoneNumber: editedPhoneNumber,
        email: editedEmail,
        password: editedPassword,
      },
    };
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === selectedTeacherDetails.id ? updatedTeacherDetails : teacher
    );
    setSelectedTeacherDetails(updatedTeacherDetails);
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
    <div style={{ marginTop: '20px', flexGrow: 1, p: 3, marginLeft: '240px', position: 'relative' }}>
      <Button variant="contained" color="primary" onClick={handleAddTeacherClick} style={{ position: 'absolute', top: 0, right: 0, margin: '20px' }}>
        Ajouter un enseignant
      </Button>
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
                <CardContent style={{ position: 'relative' }}>
                  <Button
                    style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, color: 'red' }}
                    onClick={() => handleRemoveTeacherClick(teacher)}
                  >
                    X
                  </Button>
                  <div onClick={() => handleTeacherDetailsClick(teacher)}>
                    <Avatar alt={`${teacher.firstName} ${teacher.lastName}`} src={teacher.image} sx={{ width: 80, height: 80, margin: 'auto' }} />
                    <Typography variant="h6" gutterBottom align="center">{`${teacher.firstName} ${teacher.lastName}`}</Typography>
                    <Typography variant="body1" gutterBottom align="center">{teacher.subject}</Typography>
                    <Typography variant="body2" color="textSecondary" align="center">Joined: {teacher.dateJoined}</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={isRemovingTeacher} onClose={handleCancelRemoveTeacher}>
        <DialogTitle>Supprimer Enseignant</DialogTitle>
        <DialogContent>
          <TextField label="Numéro d'inscription" fullWidth margin="normal" value={inscriptionNumber} />
          <TextField label="Nom" fullWidth margin="normal" value={nom} />
          <TextField label="Prénom" fullWidth margin="normal" value={prenom} />
          <TextField label="Cause" fullWidth margin="normal" />
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
