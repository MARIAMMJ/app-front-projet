import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  card: {
    marginTop:'20px',
    alignItems:'center',
    backgroundColor: '#C0C0FF',
    color: 'white',
    minWidth: 200,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginLeft: 'auto',
  },
}));

function QuizList() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState(new Array(5).fill(''));
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [errors, setErrors] = useState({});
  const [quizzes, setQuizzes] = useState([
    { title: 'Quiz 1', questionCount: 5, createdAt: '2024-03-31' },
    { title: 'Quiz 2', questionCount: 10, createdAt: '2024-03-30' },
    { title: 'Quiz 3', questionCount: 8, createdAt: '2024-03-29' },
  ]);

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
      // Code pour ajouter le quiz
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={classes.root}>
      {/* Bouton d'ajout */}
      <Button className={classes.addButton} variant="contained" color="primary" onClick={handleOpen}>Créer un nouveau quiz</Button>

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
