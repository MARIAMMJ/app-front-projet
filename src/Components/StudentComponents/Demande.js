import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
const RequestForm = () => {
  const [requestType, setRequestType] = useState('');
  const [requestText, setRequestText] = useState('');

  const handleRequestTypeChange = (event) => {
    setRequestType(event.target.value);
  };

  const handleRequestTextChange = (event) => {
    setRequestText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Type de demande :', requestType);
    console.log('Texte de la demande :', requestText);
    setRequestType('');
    setRequestText('');
  };

  return (
    <Box>
        
    <Container  style={{ backgroundColor: 'lightGray', marginTop :'20px',padding: '20px', borderRadius: '1px' }}>
    <h2> Envoyer un demande</h2>
    <form width='' onSubmit={handleSubmit}>
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
      <Button type="submit" variant="contained" color="primary">
        Envoyer la demande
      </Button>
    </form>
    </Container>
    </Box>
  );
};

export default RequestForm;
