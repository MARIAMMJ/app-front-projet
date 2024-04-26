import React, { useState } from 'react';
import { Box, Typography, Grid, Select, FormControl, InputLabel, MenuItem, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';

function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFiliereOrDepartement, setSelectedFiliereOrDepartement] = useState('');
  const [actualites, setActualites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedActualite, setSelectedActualite] = useState(null);
  const [newActualite, setNewActualite] = useState({ title: '', description: '', file: null });

  const categories = ['Étudiants', 'Enseignants'];

  const filieres = {
    'Filière 1': [
      { id: 1, title: 'Actualité 1', content: 'Contenu de l\'actualité 1', pdf: 'exemple.pdf' },
      { id: 2, title: 'Actualité 2', content: 'Contenu de l\'actualité 2', pdf: 'exemple2.pdf' },
    ],
    'Filière 2': [
      { id: 3, title: 'Actualité 3', content: 'Contenu de l\'actualité 3', pdf: 'exemple3.pdf' },
      { id: 4, title: 'Actualité 4', content: 'Contenu de l\'actualité 4', pdf: 'exemple4.pdf' },
    ],
    'Filière 3': [
      { id: 5, title: 'Actualité 5', content: 'Contenu de l\'actualité 5', pdf: 'exemple5.pdf' },
    ],
  };

  const departements = ['Département 1', 'Département 2', 'Département 3'];

  const loadActualites = (category) => {
    setSelectedCategory(category);
    setSelectedFiliereOrDepartement('');
    setActualites([]);
  };

  const loadActualitesByFiliereOrDepartement = (item) => {
    setSelectedFiliereOrDepartement(item);
    setActualites(filieres[item] || []); 
  };

  const deleteActualite = (id) => {
    setActualites(actualites.filter(actualite => actualite.id !== id));
  };

  const addActualite = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleViewDialogClose = () => {
    setOpenViewDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActualite(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewActualite(prevState => ({
      ...prevState,
      file: file,
    }));
  };

  const handleSaveActualite = () => {
    console.log('Ajouter une nouvelle actualité', newActualite);
    // Ajouter la nouvelle actualité à la liste
    // Réinitialiser le formulaire
    setNewActualite({ title: '', description: '', file: null });
    setOpenDialog(false);
  };

  const handleActualiteClick = (actualite) => {
    setSelectedActualite(actualite);
    setOpenViewDialog(true);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px' }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Arial', color: 'primary.main' }}>
            Actualités
          </Typography>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="category-select-label" sx={{ color: 'primary.main' }}>Sélectionner une catégorie</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={(e) => loadActualites(e.target.value)}
              sx={{ color: 'black', width: 300 }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {selectedCategory && (
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Arial' }}>
            Choisir un {selectedCategory === 'Étudiants' ? 'département' : 'département'} :
          </Typography>
          <Grid container spacing={2}>
            {(selectedCategory === 'Étudiants' ? Object.keys(filieres) : departements).map((item) => (
              <Grid item key={item} xs={3}>
                <Button fullWidth onClick={() => loadActualitesByFiliereOrDepartement(item)} sx={{ fontFamily: 'Arial', color: 'primary.main', textTransform: 'none', fontSize: '16px' }}>
                  {item}
                </Button>
              </Grid>
            ))}
          </Grid>
          {selectedFiliereOrDepartement && (
            <Box sx={{ width: '100%', mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Arial'}}>
                Actualités de {selectedFiliereOrDepartement} :
              </Typography>
              <List>
                {actualites.map((actualite) => (
                  <React.Fragment key={actualite.id}>
                    <ListItem button onClick={() => handleActualiteClick(actualite)}>
                      <ListItemText primary={actualite.title} secondary={actualite.content} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteActualite(actualite.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button color="primary" variant="contained" mt={4} onClick={addActualite} sx={{ fontFamily: 'Arial', textTransform: 'none' }}>
                Ajouter une nouvelle actualité
              </Button>
            </Box>
          )}
        </Box>
      )}
      <Dialog open={openViewDialog} onClose={handleViewDialogClose}>
        <DialogTitle>{selectedActualite && selectedActualite.title}</DialogTitle>
        <DialogContent>
          <Typography>{selectedActualite && selectedActualite.content}</Typography>
          {selectedActualite && (
            <Button
              href={selectedActualite.pdf}
              target="_blank"
              download
              startIcon={<GetAppIcon />}
              sx={{ mt: 2 }}
            >
              Télécharger le PDF
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewDialogClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Ajouter une nouvelle actualité</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Titre d'actualité"
            type="text"
            fullWidth
            value={newActualite.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newActualite.description}
            onChange={handleInputChange}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-file"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="upload-file">
            <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
              Upload
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Annuler</Button>
          <Button onClick={handleSaveActualite}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ActualitesPage;
