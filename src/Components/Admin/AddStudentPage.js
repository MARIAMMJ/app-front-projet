import React, { useState } from 'react';
import { Typography, TextField, Button, Avatar, Drawer, Grid, MenuItem, AppBar, Toolbar, IconButton, Badge, InputBase, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from './Sidebar';
import { Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';


function AddStudentPage({ onStudentAdded }) {
  const [cin, setCin] = useState('');
  const [numInscription, setNumInscription] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [filiere, setFiliere] = useState('');
  const [groupe, setGroupe] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true); // État pour contrôler l'ouverture/fermeture du Sidebar
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddStudent = () => {
    const newStudentInfo = {
      cin,
      numInscription,
      email,
      phoneNumber,
      address,
      photo,
      filiere,
      groupe
    };
    onStudentAdded(newStudentInfo);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={sidebarOpen} // Utilisez l'état pour contrôler l'ouverture/fermeture du Sidebar
      >
        <Sidebar /> {/* Inclure le Sidebar ici */}
      </Drawer>
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#3182CE' , marginTop:"-10px" , marginRight:"30px" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleGoBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Ajouter un étudiant
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Rechercher..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ color: 'white' }} 
              />
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar alt="Admin" src="/path/to/admin-image.jpg" sx={{ width: 40, height: 40, marginLeft: '8px' }} />
            </Box>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} style={{ padding: '20px', marginTop: '-10px', textAlign: 'center' }}>
        <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              id="photo-input"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo-input">
              <Avatar
                alt="Photo de l'étudiant"
                src={photo}
                sx={{ width: 80, height: 80, cursor: 'pointer', margin: 'auto' }}
              >
                <AddPhotoAlternateIcon />
              </Avatar>
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CIN"
              variant="outlined"
              size="small"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Numéro d'inscription"
              variant="outlined"
              size="small"
              value={numInscription}
              onChange={(e) => setNumInscription(e.target.value)}
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Numéro de téléphone"
              variant="outlined"
              size="small"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Adresse"
              variant="outlined"
              size="small"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Filière"
              variant="outlined"
              defaultValue=""
              size="small"
              value={filiere}
              onChange={(e) => setFiliere(e.target.value)}
            >
              <MenuItem value="filiere1">Filière 1</MenuItem>
              <MenuItem value="filiere2">Filière 2</MenuItem>
              <MenuItem value="filiere3">Filière 3</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Groupe"
              variant="outlined"
              defaultValue=""
              size="small"
              value={groupe}
              onChange={(e) => setGroupe(e.target.value)}
            >
              <MenuItem value="groupe1">Groupe 1</MenuItem>
              <MenuItem value="groupe2">Groupe 2</MenuItem>
              <MenuItem value="groupe3">Groupe 3</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStudent}
            >
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AddStudentPage;
