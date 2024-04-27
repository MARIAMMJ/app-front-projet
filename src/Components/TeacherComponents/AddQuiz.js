import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, makeStyles, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
  root: {
    marginTop: '20px',
    marginLeft: '20px',
  },
  addButton: {
    marginLeft: '20px',
    marginTop: '20px', 
  },
  formControl: {
    minWidth: '120px',
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
});

function QuizList() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
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
    setQuestions([]);
    setErrors({});
  };

  const handleNextStep = () => {
    let isValid = true;
    const newErrors = {};

    if (step === 1 && !quizTitle.trim()) {
      newErrors.quizTitle = 'Le titre du quiz est requis';
      isValid = false;
    }

    if (step === 2 && questions.length === 0) {
      newErrors.questionCount = 'Veuillez spécifier le nombre de questions';
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

    if (questions.length === 0) {
      newErrors.questionCount = 'Veuillez spécifier le nombre de questions';
      isValid = false;
    }

    if (isValid) {
      const newQuizzes = [...quizzes];
      newQuizzes.push({
        title: quizTitle,
        questions: questions.map((questionItem) => ({
          question: questionItem.question,
          answers: questionItem.answers,
          correctAnswerIndex: questionItem.correctAnswerIndex,
        })),
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
    if (event.target.value === 'Matière 1') {
      setQuizzes([
        { title: 'Quiz 1', questions: [], createdAt: '2024-03-31' },
        { title: 'Quiz 2', questions: [], createdAt: '2024-03-30' },
        { title: 'Quiz 3', questions: [], createdAt: '2024-03-29' },
      ]);
    } else if (event.target.value === 'Matière 2') {
      setQuizzes([
        { title: 'Quiz 4', questions: [], createdAt: '2024-03-28' },
        { title: 'Quiz 5', questions: [], createdAt: '2024-03-27' },
      ]);
    } else if (event.target.value === 'Matière 3') {
      setQuizzes([
        { title: 'Quiz 6', questions: [], createdAt: '2024-03-26' },
        { title: 'Quiz 7', questions: [], createdAt: '2024-03-25' },
        { title: 'Quiz 8', questions: [], createdAt: '2024-03-24' },
      ]);
    } else {
      setQuizzes([]);
    }
  };

  return (
    <div className={classes.root} >
      {/* Menu de sélection des matières */}
      <FormControl className={classes.formControl}  >
        <InputLabel id="select-matiere-label"  >Matière</InputLabel>
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
                  Nombre de questions: {quiz.questions.length}
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
              {questions.map((questionItem, questionIndex) => (
                <div key={questionIndex}>
                  <TextField
                    margin="dense"
                    label={`Question ${questionIndex + 1}`}
                    type="text"
                    fullWidth
                    value={questionItem.question}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[questionIndex].question = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    error={!!errors[`question${questionIndex}`]}
                    helperText={errors[`question${questionIndex}`]}
                  />
                  {questionItem.answers.map((answer, answerIndex) => (
                    <TextField
                      key={answerIndex}
                      margin="dense"
                      label={`Réponse ${answerIndex + 1}`}
                      type="text"
                      fullWidth
                      value={answer}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[questionIndex].answers[answerIndex] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />
                  ))}
                  <FormControl fullWidth>
                    <InputLabel id={`correctAnswerLabel${questionIndex}`}>Réponse correcte</InputLabel>
                    <Select
                      labelId={`correctAnswerLabel${questionIndex}`}
                      value={questionItem.correctAnswerIndex}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[questionIndex].correctAnswerIndex = e.target.value;
                        setQuestions(newQuestions);
                      }}
                    >
                      {questionItem.answers.map((answer, answerIndex) => (
                        <MenuItem key={answerIndex} value={answerIndex}>{`Réponse ${answerIndex + 1}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setQuestions([
                    ...questions,
                    {
                      question: '',
                      answers: ['', '', '', ''],
                      correctAnswerIndex: 0,
                    }
                  ]);
                }}
                className={classes.addButton} // Ajouter la classe addButton ici
              >
                Ajouter une question
              </Button>
            </div>
          )}

        </DialogContent>
        <DialogActions>
          {step > 1 && (
            <Button onClick={handlePreviousStep}>
              Retour
            </Button>
          )}

          {step < 2 && (
            <IconButton onClick={handleNextStep}>
              <ArrowForwardIcon />
            </IconButton>
          )}

          {step === 2 && (
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
