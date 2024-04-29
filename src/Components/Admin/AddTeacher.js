import React, { useState } from 'react';
import { Typography, TextField, Grid, Button, Avatar, Checkbox, MenuItem, FormControlLabel } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AddTeacher({ onTeacherAdded }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [cin, setCin] = useState('');
  const [password, setPassword] = useState('');
  const [diplome, setDiplome] = useState('');
  const [institut, setInstitut] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [groupes, setGroupes] = useState([]); // Modifier groupes en un tableau pour stocker plusieurs numéros de groupe
  const [role, setRole] = useState('');
  const [chefDepartement, setChefDepartement] = useState('');
  const [photo, setPhoto] = useState(null);
  const [estChefDepartement, setEstChefDepartement] = useState(false); 

  const handleAddTeacher = () => {
    const newTeacherInfo = {
      nom,
      prenom,
      cin,
      password,
      diplome,
      institut,
      numero,
      email,
      dateNaissance,
      adresse,
      groupes,
      role,
      chefDepartement,
      photo
    };
    onTeacherAdded(newTeacherInfo); 
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleGoBack = () => {
    window.history.back(); // Rediriger l'utilisateur vers la page précédente
  };

  return (
    <div style={{ padding: '20px', marginTop: '-20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Button startIcon={<ArrowBackIcon />} color="primary" onClick={handleGoBack}>
          Retour
        </Button>
        <span style={{ marginLeft:'200px' }}></span> 
        <Typography variant="h4">Ajouter Enseignant</Typography>
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} sx={{ marginLeft: '10px', marginTop: '0px' }}>
          <input
            type="file"
            accept="image/*"
            id="photo-input"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo-input">
            <Avatar
              alt="Photo de l'enseignant"
              src={photo}
              sx={{ width: 80, height: 80, cursor: 'pointer' }}
            >
              <AddPhotoAlternateIcon />
            </Avatar>
          </label>
        </Grid>
        <Grid item xs={4.4} sx={{ marginLeft: '-200px' }}>
          <TextField
            fullWidth
            label="Nom"
            variant="outlined"
            size="small"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ marginLeft: '0px' }}>
          <TextField
            fullWidth
            label="Prénom"
            variant="outlined"
            size="small"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="CIN"
            variant="outlined"
            size="small"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Diplôme"
            variant="outlined"
            size="small"
            value={diplome}
            onChange={(e) => setDiplome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nom de l'institut"
            variant="outlined"
            size="small"
            value={institut}
            onChange={(e) => setInstitut(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Numéro"
            variant="outlined"
            size="small"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Date de naissance"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            size="small"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            select
            label="Rôle"
            variant="outlined"
            defaultValue=""
            size="small"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="professeur">Professeur</MenuItem>
            <MenuItem value="assistant">Assistant</MenuItem>
            <MenuItem value="chercheur">Chercheur</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Groupes"
            variant="outlined"
            defaultValue=""
            size="small"
            value={groupes}
            onChange={(e) => setGroupes(e.target.value)}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => selected.join(', '),
            }}
          >
            <MenuItem value="groupe1">Groupe 1</MenuItem>
            <MenuItem value="groupe2">Groupe 2</MenuItem>
            <MenuItem value="groupe3">Groupe 3</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Adresse"
            variant="outlined"
            size="small"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={estChefDepartement}
                onChange={(e) => setEstChefDepartement(e.target.checked)}
                color="primary"
              />
            }
            label="Ajouter comme chef de département"
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" style={{ width: '200px' }} onClick={handleAddTeacher}>
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddTeacher;
