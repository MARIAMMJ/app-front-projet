import React, { useState } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton , MenuItem } from '@mui/material';
import { Edit as EditIcon, Download as DownloadIcon } from '@mui/icons-material';

// Exemple de données de demandes
const demandes = [
  { id: 1, titre: 'Demande 1', numeroInscription: '2021001', nom: 'Doe', prenom: 'John', type: 'Étudiant', etat: 'Nouvelle', pdfUrl: 'lien_vers_pdf_1' },
  { id: 2, titre: 'Demande 2', numeroInscription: '2021002', nom: 'Smith', prenom: 'Alice', type: 'Enseignant', etat: 'En cours', pdfUrl: 'lien_vers_pdf_2' },
  { id: 3, titre: 'Demande 3', numeroInscription: '2021003', nom: 'Johnson', prenom: 'Bob', type: 'Étudiant', etat: 'Terminée', pdfUrl: 'lien_vers_pdf_3' },
];

const DemandesPage = () => {
  const [demandesData, setDemandesData] = useState(demandes);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [etatDemande, setEtatDemande] = useState('');

  const handleOpenDialog = (demande) => {
    setSelectedDemande(demande);
    setOpenDialog(true);
    setEtatDemande(demande.etat);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeEtat = () => {
    // Mettre à jour l'état de la demande dans la liste des demandes
    const updatedDemandes = demandesData.map((demande) => {
      if (demande.id === selectedDemande.id) {
        return { ...demande, etat: etatDemande };
      }
      return demande;
    });
    setDemandesData(updatedDemandes);
    handleCloseDialog();
  };

  const handleFileUpload = (e) => {
    // Gérer le téléchargement de fichier
    const file = e.target.files[0];
    console.log('Fichier ajouté:', file);
  };

  const handleDownloadPDF = (pdfUrl) => {
    // Ajoutez le code pour télécharger le PDF à partir de l'URL
    console.log(`Télécharger PDF depuis: ${pdfUrl}`);
  };

  return (
    <Box sx={{ padding: '20px' , marginLeft: '240px' }}>
      <Typography variant="h4" gutterBottom>Demandes</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numéro d'inscription</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>État</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demandesData.map((demande) => (
              <TableRow key={demande.id} onClick={() => handleOpenDialog(demande)} style={{ cursor: 'pointer' }}>
                <TableCell>{demande.numeroInscription}</TableCell>
                <TableCell>{demande.titre}</TableCell>
                <TableCell>{demande.nom}</TableCell>
                <TableCell>{demande.prenom}</TableCell>
                <TableCell>{demande.type}</TableCell>
                <TableCell>
                  <Chip
                    label={demande.etat}
                    color={demande.etat === 'Nouvelle' ? 'secondary' : demande.etat === 'En cours' ? 'warning' : 'success'}
                    style={{ cursor: 'pointer' }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => { e.stopPropagation(); handleDownloadPDF(demande.pdfUrl); }}>
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedDemande?.titre}</DialogTitle>
        <DialogContent>
          <Typography>État de la demande:</Typography>
          <TextField
            fullWidth
            select
            value={etatDemande}
            onChange={(e) => setEtatDemande(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Nouvelle">Nouvelle</MenuItem>
            <MenuItem value="En cours">En cours</MenuItem>
            <MenuItem value="Terminée">Terminée</MenuItem>
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Répondre à la demande"
            margin="normal"
          />
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outlined" component="span">
              Ajouter un fichier
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleChangeEtat} color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DemandesPage;
