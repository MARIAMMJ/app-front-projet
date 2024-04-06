import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, makeStyles, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
  root: {
    marginBottom: '20px',
  },
  card: {
    marginTop: '20px',
    alignItems: 'center',
    backgroundColor: '#BEE3F8',
    color: 'white',
    minWidth: 200,
    marginLeft: '20px',
    marginBottom: '10px',
  },
  addButton: {
    marginLeft: 'auto',
    marginBottom: '10px',
    marginRight: '10px',
    marginTop: '10px',
  },
  formControl: {
    minWidth: '120px',
    marginBottom: '20px',
  },
});

function QuizList() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState(new Array(5).fill(''));
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedMatiere, setSelectedMatiere] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setQuizTitle('');
    setQuestions(new Array(5).fill(''));
    setCorrectAnswer('');
    setErrors({});
  };

  const handleNextStep = () => {
    let isValid = true;
    const newErrors = {};

    if (step === 1 && !quizTitle.trim()) {
      newErrors.quizTitle = 'Le titre du quiz est requis';
      isValid = false;
    }

    if (step === 2) {
      questions.forEach((question, index) => {
        if (!question.trim()) {
          newErrors[`question${index}`] = `La question ${index + 1} est requise`;
          isValid = false;
        }
      });
    }

    if (step === 3 && !correctAnswer.trim()) {
      newErrors.correctAnswer = 'La réponse correcte est requise';
      isValid = false;
    }

    if (isValid) {
      setStep(step + 1);
    }
    setErrors(newErrors);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleAddQuiz = () => {
    let isValid = true;
    const newErrors = {};

    if (!quizTitle.trim()) {
      newErrors.quizTitle = 'Le titre du quiz est requis';
      isValid = false;
    }

    questions.forEach((question, index) => {
      if (!question.trim()) {
        newErrors[`question${index}`] = `La question ${index + 1} est requise`;
        isValid = false;
      }
    });

    if (!correctAnswer.trim()) {
      newErrors.correctAnswer = 'La réponse correcte est requise';
      isValid = false;
    }

    if (isValid) {
      // Ajouter le quiz spécifique à la matière sélectionnée
      const newQuizzes = [...quizzes];
      newQuizzes.push({
        title: quizTitle,
        questionCount: questions.length,
        createdAt: new Date().toLocaleDateString(),
      });
      setQuizzes(newQuizzes);
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  const handleMatiereChange = (event) => {
    setSelectedMatiere(event.target.value);
    // Mettre à jour les quizs en fonction de la matière sélectionnée
    if (event.target.value === 'Matière 1') {
      setQuizzes([
        { title: 'Quiz 1', questionCount: 5, createdAt: '2024-03-31' },
        { title: 'Quiz 2', questionCount: 10, createdAt: '2024-03-30' },
        { title: 'Quiz 3', questionCount: 8, createdAt: '2024-03-29' },
      ]);
    } else if (event.target.value === 'Matière 2') {
      setQuizzes([
        { title: 'Quiz 4', questionCount: 6, createdAt: '2024-03-28' },
        { title: 'Quiz 5', questionCount: 7, createdAt: '2024-03-27' },
      ]);
    } else if (event.target.value === 'Matière 3') {
      setQuizzes([
        { title: 'Quiz 6', questionCount: 9, createdAt: '2024-03-26' },
        { title: 'Quiz 7', questionCount: 4, createdAt: '2024-03-25' },
        { title: 'Quiz 8', questionCount: 12, createdAt: '2024-03-24' },
      ]);
    } else {
      // Si aucune matière n'est sélectionnée, réinitialiser la liste des quizs
      setQuizzes([]);
    }
  };

  return (
    <div className={classes.root}>
      {/* Menu de sélection des matières */}
      <FormControl className={classes.formControl} style={{ marginLeft: '20px' , marginTop:'10px' }} >
        <InputLabel id="select-matiere-label" >Matière</InputLabel>
        <Select
          labelId="select-matiere-label"
          id="select-matiere"
          value={selectedMatiere}
          onChange={handleMatiereChange}
        >
          <MenuItem value="">
            <em>Sélectionner une matière</em>
          </MenuItem>
          <MenuItem value="Matière 1">Matière 1</MenuItem>
          <MenuItem value="Matière 2">Matière 2</MenuItem>
          <MenuItem value="Matière 3">Matière 3</MenuItem>
        </Select>
      </FormControl>

      {/* Bouton d'ajout */}
      {selectedMatiere && (
  <Button
    className={classes.addButton}
    variant="contained"
    color="primary"
    onClick={handleOpen}
    style={{ marginLeft: '20px' , marginTop:'20px' }} 
  >
    Créer un nouveau quiz
  </Button>
)}


      {/* Liste des quizs */}
      <Grid container spacing={2}>
        {quizzes.map((quiz, index) => (
          <Grid item key={index}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {quiz.title}
                </Typography>
                <Typography color="textSecondary">
                  Nombre de questions: {quiz.questionCount}
                </Typography>
                <Typography color="textSecondary">
                  Date de création: {quiz.createdAt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pop-up de création de quiz */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
        <DialogTitle id="form-dialog-title">Créer un nouveau quiz</DialogTitle>
        <DialogContent>
          {/* Contenu du formulaire */}
          {step === 1 && (
            <TextField
              autoFocus
              margin="dense"
              id="quizTitle"
              label="Titre du quiz"
              type="text"
              fullWidth
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              error={!!errors.quizTitle}
              helperText={errors.quizTitle}
            />
          )}

          {step === 2 && (
            <div>
              {questions.map((question, index) => (
                <TextField
                  key={index}
                  margin="dense"
                  label={`Question ${index + 1}`}
                  type="text"
                  fullWidth
                  value={question}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index] = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  error={!!errors[`question${index}`]}
                  helperText={errors[`question${index}`]}
                />
              ))}
            </div>
          )}

          {step === 3 && (
            <TextField
              margin="dense"
              id="correctAnswer"
              label="Réponse correcte"
              type="text"
              fullWidth
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              error={!!errors.correctAnswer}
              helperText={errors.correctAnswer}
            />
          )}
        </DialogContent>
        <DialogActions>
          {step > 1 && (
            <Button onClick={handlePreviousStep}>
              Retour
            </Button>
          )}

          {step < 3 && (
            <IconButton onClick={handleNextStep}>
              <ArrowForwardIcon />
            </IconButton>
          )}

          {step === 3 && (
            <Button onClick={handleAddQuiz} color="primary">
              Ajouter quiz
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuizList;
