import { useState } from "react";
import "./App.css";

const questions = [
  {
    type: "multiple_choice",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    type: "true_false",
    question: "The Wix Campus has a pool.",
    answer: false,
  },
  {
    type: "true_false",
    question: "The sky is blue.",
    answer: "true",
  },
  {
    type: "multiple_choices",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
  },
];

const getNextQuestion = (currentQuestion) => {
  const currentIndex = questions.findIndex(
    (question) => question.question === currentQuestion.question
  );

  return currentIndex < questions.length ? questions[currentIndex + 1] : null;
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResults, setShowResults] = useState(false);

  const startQuiz = () => {
    setCurrentQuestion(questions[0]);
    setScore(0);
    setFeedback("");
    setShowResults(false);
  };

  const checkAnswer = (selectedAnswer) => {
    const question = currentQuestion;
    const isCorrect = selectedAnswer == question.answer;

    setFeedback(isCorrect ? "Correct!" : "Wrong!");
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      const nextQuestion = getNextQuestion(currentQuestion);

      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setFeedback("");
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <button
        key={index}
        onClick={() => checkAnswer(option)}
        className="option-button"
      >
        {option}
      </button>
    ));
  };

  const renderTrueFalseOptions = () => (
    <>
      <button onClick={() => checkAnswer(1)} className="option-button">
        True
      </button>
      <button onClick={() => checkAnswer(0)} className="option-button">
        False
      </button>
    </>
  );

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {showResults ? (
        <div>
          <h2>
            You scored {score} out of {questions.length}
          </h2>
          <button onClick={startQuiz} className="start-button">
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="quiz-container">
            <h2>{currentQuestion.question}</h2>
            {currentQuestion.type === "multiple_choice"
              ? renderOptions(currentQuestion.options)
              : renderTrueFalseOptions()}
          </div>
          <div
            className={`feedback ${
              feedback === "Correct!" ? "correct" : "wrong"
            }`}
          >
            {feedback}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
