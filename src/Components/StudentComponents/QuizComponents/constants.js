export const jsQuizz = {
     questions: [
    {
    question:
    "Which of the following is used in React.js to increase performance?",
    choices: [
    "Virtual DOM",
    "Original DOM",
    "Both A and B",
    "None of the above",
    ],
    type: "MCQS",
    correctAnswer: "Virtual DOM",},
    {
    question: "What is ReactJS?",
     choices: [
    "Server-side framework",
    
     "User Interface framework",
      "both a and b",
       "None of the above",
    ],
    type: "MCQS",
correctAnswer: "User Interface framework",
    },
    {
question:
"Identify the one which is used to pass data to components from outside",
 choices: [
    "Render with arguments",
     "setState", "PropTypes",
      "props"
    ],
     type: "MCQS",
    correctAnswer: "props",
},
{
question: 
    "In which language is React.js written?",
choices: [
    "Python",
     "Java",
      "C#",
       "JavaScript"
    ],
type: "MCQS",
correctAnswer: "JavaScript",
},
{
question: "What is Babel?",
choices: [
    "JavaScript interpreter",
    "JavaScript transpiler",
    "JavaScript compiler",
    "None of the above",
],
   
    type: "MCQS",
    correctAnswer: "JavaScript compiler", 
},
],
};
export const resultInitialState={
    score:0,
    correctAnswers:0,
    wrongAnswers:0,
}