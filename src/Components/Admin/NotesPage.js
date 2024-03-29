import React, { useState } from 'react';
import { Box, Typography, Grid, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

function NotesPage() {
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedSemestre, setSelectedSemestre] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleFiliereChange = (event) => {
    setSelectedFiliere(event.target.value);
  };

  const handleSemestreChange = (event) => {
    setSelectedSemestre(event.target.value);
  };

  const handleLoadStudents = () => {
    setLoading(true);
    if (selectedFiliere && selectedSemestre) {
      const studentsData = [
        { id: 1, numInscri: '2021001', nom: 'Doe', prenom: 'John', phys: '', math: '', info: '', algo: '' },
        { id: 2, numInscri: '2021002', nom: 'Smith', prenom: 'Jane', phys: '', math: '', info: '', algo: '' },
        { id: 3, numInscri: '2021003', nom: 'Brown', prenom: 'Bob', phys: '', math: '', info: '', algo: '' },
      ];
      setStudents(studentsData);
    }
    setLoading(false);
  };

  const handleNoteChange = (event, id, field) => {
    const updatedStudents = students.map(student => {
      if (student.id === id) {
        return {...student, [field]: event.target.value};
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleSaveChanges = () => {
    // Vous pouvez implémenter la logique pour sauvegarder les modifications ici
    console.log("Modifications enregistrées :", students);
    // Réinitialiser l'état de l'édition
    setEditable(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '20px' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            Filière :
          </Typography>
          <Select
            value={selectedFiliere}
            onChange={handleFiliereChange}
            fullWidth
            required
          >
            <MenuItem value="filiere1">Filière 1</MenuItem>
            <MenuItem value="filiere2">Filière 2</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            Semestre :
          </Typography>
          <Select
            value={selectedSemestre}
            onChange={handleSemestreChange}
            fullWidth
            required
          >
            <MenuItem value="semestre1">Semestre 1</MenuItem>
            <MenuItem value="semestre2">Semestre 2</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoadStudents}
            disabled={!selectedFiliere || !selectedSemestre || loading}
            sx={{ marginTop: '20px' }}
          >
            {loading ? 'Chargement...' : 'Charger les étudiants'}
          </Button>
        </Grid>
      </Grid>
      {students.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            Liste des notes
            <IconButton sx={{ marginLeft: 'auto' }} onClick={() => setEditable(!editable)}>
              <EditIcon />
            </IconButton>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Numéro d'inscription</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Physique</TableCell>
                  <TableCell>Mathématiques</TableCell>
                  <TableCell>Informatique</TableCell>
                  <TableCell>Algorithmique</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.numInscri}</TableCell>
                    <TableCell>{student.nom}</TableCell>
                    <TableCell>{student.prenom}</TableCell>
                    <TableCell>
                      {editable ? (
                        <TextField
                          value={student.phys}
                          onChange={(e) => handleNoteChange(e, student.id, 'phys')}
                        />
                      ) : student.phys}
                    </TableCell>
                    <TableCell>
                      {editable ? (
                        <TextField
                          value={student.math}
                          onChange={(e) => handleNoteChange(e, student.id, 'math')}
                        />
                      ) : student.math}
                    </TableCell>
                    <TableCell>
                      {editable ? (
                        <TextField
                          value={student.info}
                          onChange={(e) => handleNoteChange(e, student.id, 'info')}
                        />
                      ) : student.info}
                    </TableCell>
                    <TableCell>
                      {editable ? (
                        <TextField
                          value={student.algo}
                          onChange={(e) => handleNoteChange(e, student.id, 'algo')}
                        />
                      ) : student.algo}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default NotesPage;
