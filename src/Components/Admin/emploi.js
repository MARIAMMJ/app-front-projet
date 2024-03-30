import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';

function EmploisPage() {
  const [displayStudents, setDisplayStudents] = useState(true); // true: afficher les classes, false: afficher les enseignants

  // Exemple de données des classes
  const classes = [
    { id: 1, name: 'Class A', filiere: 'Filière 1', lastUpdated: '2024-03-30', employment: 'emplois_a.js' },
    { id: 2, name: 'Class B', filiere: 'Filière 2', lastUpdated: '2024-03-28', employment: 'emplois_b.js' },
    // Ajouter d'autres classes ici
  ];

  // Exemple de données des enseignants
  const teachers = [
    { id: 1, name: 'John Doe', lastUpdated: '2024-03-30', employment: 'emplois_john_doe.js' },
    { id: 2, name: 'Jane Smith', lastUpdated: '2024-03-28', employment: 'emplois_jane_smith.js' },
    // Ajouter d'autres enseignants ici
  ];

  // Fonction pour gérer l'affichage des classes ou des enseignants
  const handleToggleDisplay = () => {
    setDisplayStudents(!displayStudents);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px' }}>
      <Typography variant="h4" gutterBottom>Emploi du temps</Typography>
      <Box sx={{ mb: 2 }}>
        <IconButton onClick={handleToggleDisplay}>
          {displayStudents ? <Typography variant="body1">Afficher les enseignants</Typography> : <Typography variant="body1">Afficher les classes</Typography>}
        </IconButton>
      </Box>
      {displayStudents ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de la classe</TableCell>
              <TableCell>Filière</TableCell>
              <TableCell>Date de dernière mise à jour</TableCell>
              <TableCell>Emploi</TableCell>
              <TableCell align="right">Uploader</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.filiere}</TableCell>
                <TableCell>{classItem.lastUpdated}</TableCell>
                <TableCell>
                  <IconButton
                    component="a"
                    href={classItem.employment}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    component={Link}
                    to={`/upload-employment/${classItem.id}`}
                  >
                    <CloudUploadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de l'enseignant</TableCell>
              <TableCell>Date de dernière modification</TableCell>
              <TableCell>Emploi</TableCell>
              <TableCell align="right">Uploader</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.lastUpdated}</TableCell>
                <TableCell>
                  <IconButton
                    component="a"
                    href={teacher.employment}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    component={Link}
                    to={`/upload-employment/${teacher.id}`}
                  >
                    <CloudUploadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default EmploisPage;
