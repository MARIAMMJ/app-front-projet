import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, List, ListItem, ListItemText, Divider, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import { CloudUpload as CloudUploadIcon, InsertDriveFile as InsertDriveFileIcon, Delete as DeleteIcon } from '@mui/icons-material';

const mockData = {
  semestre1: {
    Mathématiques: [
      {
        id: 1,
        title: 'Compte Rendu Maths 1',
        date: '2024-04-01',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 2,
        title: 'Compte Rendu Maths 2',
        date: '2024-03-31',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
    Physique: [
      {
        id: 3,
        title: 'Compte Rendu Physique 1',
        date: '2024-04-02',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
    Chimie: [],
  },
  semestre2: {
    Informatique: [
      {
        id: 4,
        title: 'Compte Rendu Informatique 1',
        date: '2024-04-01',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 5,
        title: 'Compte Rendu Informatique 2',
        date: '2024-03-31',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
    Biologie: [],
  },
};

function CompteRenduList() {
  const [selectedSemester, setSelectedSemester] = useState('semestre1');
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSemesterChange = (event, newValue) => {
    setSelectedSemester(newValue);
    setSelectedMatiere(null);
  };

  const handleMatiereClick = (matiereName) => {
    setSelectedMatiere(matiereName);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setSelectedFile(null);
    setOpen(false);
  };
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    console.log('Fichier envoyé :', selectedFile);
    setSelectedFile(null);
    setOpen(false);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  return (
    <Box display="flex">
      <Box width="30%">
        <Tabs value={selectedSemester} onChange={handleSemesterChange}>
          <Tab label="Semestre 1" value="semestre1" />
          <Tab label="Semestre 2" value="semestre2" />
        </Tabs>
        
        <Box mt={2} sx={{ border: '1px solid #ccc' }}>
          <Typography variant="h6" align="center" sx={{ backgroundColor: '#BEE3F8', padding:'8px' }}> Liste des matières - {selectedSemester} </Typography>
          <List>
            {Object.keys(mockData[selectedSemester]).map((matiereName) => (
              <div key={matiereName}>
                <ListItem button selected={selectedMatiere === matiereName} onClick={() => handleMatiereClick(matiereName)}>
                  <ListItemText primary={`Comptes Rendus de ${matiereName}`} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      </Box>
      {selectedMatiere && (
        <Box width="70%" marginTop="10px">
          <Typography variant="h6" align="center" sx={{ backgroundColor: '#E2E8F0', padding:'8px' }}>
            Comptes Rendus disponibles pour {selectedMatiere}
          </Typography>
          {/* Your Compte Rendu Cards here */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {mockData[selectedSemester][selectedMatiere].map(compteRendu => (
              <Box key={compteRendu.id} style={{ margin: '10px', minWidth: '300px', border: '1px solid #ccc', padding: '16px', borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)' }}>
                {/* Your Compte Rendu Card */}
                <Typography variant="h5" component="div">
                  {compteRendu.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Date: {compteRendu.date}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Description: {compteRendu.description}
                </Typography>
                <Button onClick={handleOpen} variant="contained" startIcon={<CloudUploadIcon />}>
                  Déposer
                </Button>
              </Box>
            ))}
          </div>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Déposer </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Écrire ici"
            type="text"
            fullWidth
          />
          <input
            accept=".pdf,.doc,.docx"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Importer fichier
            </Button>
          </label>
          {selectedFile && (
            <Grid container alignItems="center" sx={{ mt: 2 }}>
              <Grid item>
                <InsertDriveFileIcon />
              </Grid>
              <Grid item flexGrow={1}>
                <Typography sx={{ ml: 1 }}>{selectedFile.name}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={handleDeleteFile}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleUpload} color="primary">
            Déposer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CompteRenduList;
