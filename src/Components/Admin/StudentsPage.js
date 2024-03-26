import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

// Fonction ou composant représentant un élément de la liste des classes
function StudentClassItem({ classe }) {
  return (
    <TableRow>
      <TableCell>{classe.filiere}</TableCell>
      <TableCell>{classe.groupe}</TableCell>
      <TableCell>{classe.nombreEtudiants}</TableCell>
      <TableCell>
        <Button variant="outlined" size="small" color="primary" href={`/students/${classe.id}`}>
          Voir détails
        </Button>
      </TableCell>
    </TableRow>
  );
}

// Composant StudentsPage
function StudentsPage() {
  // Supposons que vous ayez une liste de classes
  const classes = [
    { id: 1, filiere: '1ere ING', groupe: 'Groupe 1', nombreEtudiants: 25 },
    { id: 2, filiere: '2eme ING', groupe: 'Groupe 4', nombreEtudiants: 30 },
    { id: 3, filiere: '2eme ING', groupe: 'Groupe 1', nombreEtudiants: 32 },
    { id: 4, filiere: '2eme ING', groupe: 'Groupe 3', nombreEtudiants: 33 },
    { id: 5, filiere: '1ere ING', groupe: 'Groupe 2', nombreEtudiants: 27 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Liste des classes</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Filière</TableCell>
            <TableCell>Groupe</TableCell>
            <TableCell>Nombre d'étudiants</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Mappez chaque classe pour afficher ses détails */}
          {classes.map((classe) => (
            <StudentClassItem key={classe.id} classe={classe} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default StudentsPage;
