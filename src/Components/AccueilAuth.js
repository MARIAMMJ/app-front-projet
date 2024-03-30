import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Person as PersonIcon, School as SchoolIcon, Work as WorkIcon } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

function AccueilAuth() {
  const navigate = useNavigate(); // Initialize useHistory hook

  const handleAdminLogin = () => {
    // Logique de connexion pour l'administrateur
    console.log("Connexion en tant qu'administrateur");
  };

  const handleTeacherLogin = () => {
    // Logique de connexion pour l'enseignant
    console.log("Connexion en tant qu'enseignant");
    navigate('/TeacherDashboard');
  };

  const handleStudentLogin = () => {
    // Logique de connexion pour l'étudiant
    console.log("Connexion en tant qu'étudiant");
    navigate('/StudentDashboard');

  };

  return (
    <Grid container spacing={2} justify="center" style={{ marginTop:'300px' }}>
      <Grid item>
        <Button variant="contained" color="primary" style={{  }} startIcon={<WorkIcon />} onClick={handleAdminLogin}>
          Administrateur
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<SchoolIcon />} onClick={handleTeacherLogin}>
          Enseignant
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<PersonIcon />} onClick={handleStudentLogin}>
          Étudiant
        </Button>
      </Grid>
    </Grid>
  );
}

export default AccueilAuth;
