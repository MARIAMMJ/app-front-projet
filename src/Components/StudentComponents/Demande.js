import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RequestPage = () => {
  const [requests, setRequests] = useState([
    {
      title: "Demande d'aide pour le projet",
      type: "Demande de support technique",
      text: "Bonjour, j'ai besoin d'aide pour résoudre un problème avec le code du projet.",
      date: "01/04/2024",
      status: 'Nouvelle',
      pdfUrl: "https://example.com/first_request.pdf",
    },
    {
      title: "Renseignements sur le cours",
      type: "Demande d'information",
      text: "Bonjour, je voudrais obtenir plus d'informations sur le contenu du cours.",
      date: "03/04/2024",
      status: 'En cours',
      pdfUrl: "https://example.com/second_request.pdf",
    },
    {
      title: "Problème de connexion",
      type: "Signaler un problème",
      text: "Bonjour, je rencontre des difficultés à me connecter à mon compte.",
      date: "05/04/2024",
      status: 'Terminée',
      pdfUrl: "https://example.com/third_request.pdf",
    }
  ]);
  const [open, setOpen] = useState(false);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestType, setRequestType] = useState('');
  const [requestText, setRequestText] = useState('');
  const [file, setFile] = useState(null);

  const handleRequestTitleChange = (event) => {
    setRequestTitle(event.target.value);
  };

  const handleRequestTypeChange = (event) => {
    setRequestType(event.target.value);
  };

  const handleRequestTextChange = (event) => {
    setRequestText(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRequest = {
      title: requestTitle,
      type: requestType,
      text: requestText,
      date: new Date().toLocaleDateString(),
      status: 'Nouvelle',
      pdfUrl: null, // placeholder for PDF URL
    };
    setRequests([...requests, newRequest]);
    setRequestTitle('');
    setRequestType('');
    setRequestText('');
    setFile(null);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Container style={{ marginTop: '10px', padding: '20px', borderRadius: '1px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2>Liste des demandes</h2>
          <Button onClick={handleClickOpen} variant="contained" color="primary">
            Ajouter une demande
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titre</TableCell>
                <TableCell>Date de dépôt</TableCell>
                <TableCell>Fichier PDF</TableCell>
                <TableCell>État</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.pdfUrl ? <a href={request.pdfUrl} target="_blank" rel="noopener noreferrer">Télécharger PDF</a> : 'Aucun fichier'}</TableCell>
                  <TableCell>
                    <span style={{ color: request.status === 'Nouvelle' ? 'red' : request.status === 'En cours' ? 'blue' : 'green' }}>
                      {request.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Popup for adding a new request */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nouvelle demande</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Titre de la demande"
              value={requestTitle}
              onChange={handleRequestTitleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              select
              label="Type de demande"
              value={requestType}
              onChange={handleRequestTypeChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            >
              <MenuItem value="Demande de support technique">Demande de support technique</MenuItem>
              <MenuItem value="Demande d'information">Demande d'information</MenuItem>
              <MenuItem value="Signaler un problème">Signaler un problème</MenuItem>
            </TextField>
            <TextField
              label="Texte de la demande"
              value={requestText}
              onChange={handleRequestTextChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
              required
            />
            <input
              accept="application/pdf"
              id="file-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Choisir un fichier PDF
              </Button>
            </label>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Annuler
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Envoyer la demande
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RequestPage;
