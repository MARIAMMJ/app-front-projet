import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Paper } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, School as SchoolIcon, Work as WorkIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: 0, 
  },
  appBar: {
    backgroundColor: '#ffffff', 
    boxShadow: 'none', 
  },
  paper: {
    padding: theme.spacing(9),
    backgroundColor: '#2C5282',
    borderRadius: '0px 0px 3500px 3500px',
  },
  welcomeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  quoteText: {
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    color: '#2C5282', 
    backgroundColor: '#ffffff', 
    '&:hover': {
      backgroundColor: '#ffffff', 
    },
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    color: '#2C5282', 
    marginLeft: theme.spacing(3), 
    marginRight: theme.spacing(3), 
  },
  gridItem: {
    position: 'relative', 
    top: '-40px', 
  },
  icon: {
    fontSize: '2rem', 
    color: '#2C5282', 
  },
  buttonText: {
    fontSize: '1rem', 
  },
  footerText: {
    color: '#2C5282', 
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  seeMoreButton: {
    color: '#2C5282',
    borderColor: '#2C5282',
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
  },
}));

function AccueilAuth() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    console.log("Connexion en tant qu'administrateur");
    navigate('/AdminDashboard');
  };

  const handleTeacherLogin = () => {
    console.log("Connexion en tant qu'enseignant");
    navigate('/TeacherDashboard');
  };

  const handleStudentLogin = () => {
    console.log("Connexion en tant qu'étudiant");
    navigate('/StudentDashboard');
  };

  const handleSeeMore = () => {
    console.log("Voir plus");
  
  };

  const linkStyle = {
    fontSize: '16px', 
    margin: '0 10px', 
    textDecoration: 'none', 
    color: '#2C5282', 
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src="./logoissat.png" alt="Logo" width={'5%'} height={'2%'}/>

          <Typography variant="h6" className={classes.title}>
            <a href="/" style={linkStyle}>Présentation</a>
            <a href="/" style={linkStyle}>Formations</a>
            <a href="/" style={linkStyle}>Entreprises</a>
            <a href="/" style={linkStyle}>Issatso+</a>
          </Typography>

          <Button color="inherit" className={classes.button} onClick={() => console.log("Contactez-nous")} style={{ backgroundColor: '#ffffff'}}>
            Contactez-nous
          </Button>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" className={classes.welcomeText}>
          Bienvenue dans ISSATSO
        </Typography>
        <Typography variant="subtitle1" className={classes.quoteText}>
          L'éducation est la meilleure clé de succès dans la vie
        </Typography>
      </Paper>

      <Grid container spacing={2} justify="center">
        <Grid item className={classes.gridItem}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleAdminLogin}
          >
            <WorkIcon className={classes.icon} />
            <br />
            <span className={classes.buttonText}>Administrateur</span>
          </Button>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleStudentLogin}
          >
            <AccountCircleIcon className={classes.icon} />
            <br />
            <span className={classes.buttonText}>Étudiant</span>
          </Button>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleTeacherLogin}
          >
            <SchoolIcon className={classes.icon} />
            <br />
            <span className={classes.buttonText}>Enseignant</span>
          </Button>
        </Grid>
      </Grid>

      <Typography variant="body1" className={classes.footerText}>
       <h2> L'Institut supérieur des sciences appliquées et de technologie de Sousse ou ISSATSO</h2>
       </Typography>
        <h4>Un établissement scientifique relevant de l'Université de Sousse (Tunisie). <br /> Il est créé en application des dispositions du décret n°1385-2001 du 7 juin 2001. <br />L'institut ouvre ses portes dans les espaces réservés à l'Institut préparatoire aux études d'ingénieur <br /> et, dans ce cadre, le contenu de la bibliothèque et le matériel scientifique acquis durant les trois années de la vie de l'institut préparatoire sont exploités.</h4>
      

      <Button
        variant="outlined"
        className={classes.seeMoreButton}
        onClick={handleSeeMore}
      >
        Voir plus
      </Button>
    </div>
  );
}

export default AccueilAuth;
