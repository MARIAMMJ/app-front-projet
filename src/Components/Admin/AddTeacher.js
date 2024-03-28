import React, { useState } from 'react';
import { Typography, TextField, Grid, Button, Avatar, Checkbox, MenuItem, FormControlLabel, FormControl } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


function AddTeacher({ onTeacherAdded }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [diplome, setDiplome] = useState('');
  const [institut, setInstitut] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [matiere, setMatiere] = useState('');
  const [role, setRole] = useState('');
  const [chefDepartement, setChefDepartement] = useState('');
  const [photo, setPhoto] = useState(null);
  const [estChefDepartement, setEstChefDepartement] = useState(false); // Utilisation d'un booléen pour la checkbox

  const handleAddTeacher = () => {
    const newTeacherInfo = {
      nom,
      prenom,
      diplome,
      institut,
      numero,
      email,
      dateNaissance,
      adresse,
      matiere,
      role,
      chefDepartement,
      photo
    };
    onTeacherAdded(newTeacherInfo); // Appeler la fonction de rappel pour ajouter l'enseignant
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

  return (
    <div style={{ padding: '20px', marginTop: '-90px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Ajouter Enseignant</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} sx={{ marginLeft: '10px', marginTop: '-20px' }}>
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
            label="Matière"
            variant="outlined"
            defaultValue=""
            size="small"
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
          >
            <MenuItem value="mathematiques">Mathématiques</MenuItem>
            <MenuItem value="informatique">Informatique</MenuItem>
            <MenuItem value="physique">Physique</MenuItem>
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

