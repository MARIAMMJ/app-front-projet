import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Sample data representing a list of quizzes
const quizzes = [
  {
    id: 1,
    title: 'Quiz 1',
    questions: 10,
    isDone: true, // Example status: Quiz is done
  },
  {
    id: 2,
    title: 'Quiz 2',
    questions: 15,
    isDone: false, // Example status: Quiz is not done
  },
  // Add more quizzes as needed
];

const QuizList = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {quizzes.map(quiz => (
        <Card key={quiz.id} style={{ margin: '10px', minWidth: '300px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {quiz.title}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Number of Questions: {quiz.questions}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Status: {quiz.isDone ? 'Done' : 'Not Done'}
            </Typography>
            <Button
              //component={Link}
             // to={`/quiz/${quiz.id}`} // Assuming quiz id is used for routing
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuizList;
