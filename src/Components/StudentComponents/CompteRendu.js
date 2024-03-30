import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, makeStyles, TextField, Container, Grid } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const useStyles = makeStyles((theme) => ({
  uploadButton: {
    backgroundColor: '#4682B4',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#ADD8E6',
    },
  },
  root: {
    border: '1px solid #E0E0E0', 
    width: '700px', 
    margin: 'auto', 
    marginTop: '50px', 
    padding: '20px', 
  },
  fileInput: {
    display: 'none',
  },
  fileContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  fileName: {
    marginLeft: theme.spacing(1),
  },
}));

const CompteRendu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dateDebut = "xx/xx/xxxx";
  const dateLimiteDepot = "xx/xx/xxxx";
  const descriptionTravail = "Description du travail : deposer votre travail ici .Description du travail : deposer votre travail ici";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFile(null); // Réinitialisation de selectedFile
    setOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    console.log('Fichier envoyé :', selectedFile);
    setSelectedFile(null); // Réinitialisation de selectedFile
    setOpen(false);
  };

  return (
    <Container className={classes.root}>
      <List>
      <ListItem>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <ListItemText primary="Travail 1" secondary={`Date de début: ${dateDebut}, Date limite de dépôt: ${dateLimiteDepot}`} />
        <ListItemText secondary={descriptionTravail} />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" className={classes.uploadButton} onClick={handleClickOpen}>Déposer</Button>
      </Grid>
    </Grid>
    
    </ListItem>
    <ListItem>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <ListItemText primary="Travail 1" secondary={`Date de début: ${dateDebut}, Date limite de dépôt: ${dateLimiteDepot}`} />
        <ListItemText secondary={descriptionTravail} />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" className={classes.uploadButton} onClick={handleClickOpen}>Déposer</Button>
      </Grid>
    </Grid>
    
    </ListItem>
      </List>

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
            className={classes.fileInput}
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
              className={classes.uploadButton}
            >
              Importer fichier
            </Button>
          </label>
          {selectedFile && (
            <Grid container className={classes.fileContainer}>
              <InsertDriveFileIcon />
              <span className={classes.fileName}>{selectedFile.name}</span>
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
    </Container>
  );
};

export default CompteRendu;
