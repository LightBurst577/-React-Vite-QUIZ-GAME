import React from "react";
import Quiz from "./components/Quiz";
import StartPage from "./components/StartPage";

// Main App component that manages the state and flow of the quiz game
export default function App() {
  const [quizStarted, setQuizStarted] = React.useState(false); // State to track if the quiz has started
  const [isExiting, setIsExiting] = React.useState(false); // State to manage the exit animation for the StartPage component
  const [questions, setQuestions] = React.useState([]); // State to hold the fetched quiz questions
  const [selectedAnswers, setSelectedAnswers] = React.useState({}); // State to track the user's selected answers for each question

  const handleAnswerSelect = (questionIndex, answer) => {
    // Function to handle the selection of an answer for a specific question
    setSelectedAnswers((prevSelectedAnswers) => ({
      // Update the selectedAnswers state with the new answer for the given question index
      ...prevSelectedAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleStartQuiz = async () => {
    // Function to start the quiz, fetch questions from the API, and set the state accordingly
    // Logic to start the quiz goes here
    console.log("Quiz started!");

    const response = await fetch(
      // Fetch quiz questions from the Open Trivia Database API
      "https://opentdb.com/api.php?amount=5&category=32",
      { method: "GET" },
    );
    const data = await response.json();
    // Format the data right away so each question has its frozen array of answers
    const formattedQuestions = data.results.map((question, index) => {
      // Combine correct and incorrect answers
      const allcorrectAnswers = [
        question.correct_answer,
        ...question.incorrect_answers,
      ];
      // Shuffle the answers to randomize their order
      // (To be honest, this is not a perfect shuffle, but it works for our purposes.
      // I'm just confused as you are with this line of code if it works) this from stackoverflow maybe I forgor link if not same: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      const shuffledAnswers = allcorrectAnswers.sort(() => Math.random() - 0.5);
      return {
        // Return a new object for each question with its id, question text, correct answer, and shuffled answers
        id: index, // Use the index as a unique identifier for each question
        question: question.question, // Store the question text
        correct_answer: question.correct_answer, // Store the correct answer for later scoring
        answers: shuffledAnswers, // Store the shuffled array of answers for rendering
      };
    });

    setQuestions(formattedQuestions); // Update the questions state with the formatted questions
    setQuizStarted(true); // Set the quizStarted state to true to transition from the StartPage to the Quiz component
    setIsExiting(false); // Reset the isExiting state to false to ensure the StartPage component is not in an exit state when the quiz starts
  };

  const [quizOver, setQuizOver] = React.useState(false); // State to track if the quiz is over, used to conditionally render the score and restart button
  const [score, setScore] = React.useState(0); // State to hold the user's score, calculated when the quiz is completed

  const handleRestartQuiz = () => {
    // Function to reset the quiz state and allow the user to start a new quiz
    setQuizStarted(false);
    setQuizOver(false);
    setScore(0);
    setQuestions([]);
    setSelectedAnswers({}); // <--- Clear selections here
  };

  const handleCheckAnswers = () => {
    // Function to calculate the user's score based on their selected answers and the correct answers
    console.log("Checking answers... time to calculate the score!");
    let newScore = 0;
    questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.id]; // Get the user's selected answer for the current question
      if (selectedAnswer === question.correct_answer) {
        // If the selected answer matches the correct answer, increment the score
        newScore++; // Increment the score for each correct answer
      }
    });
    setScore(newScore); // Update the score state with the calculated score
    setQuizOver(true); // Set the quizOver state to true to indicate that the quiz has ended and to trigger the display of the score and restart button
  };

  return (
    // Render the main application container with the appropriate component based on the quiz state
    <>
      <div className="mainStart">
        <svg // Render the first decorative blob SVG with conditional exit animation based on the quizStarted or isExiting state
          className={`blob1 ${quizStarted || isExiting ? "blob1-exit" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="158"
          height="141"
          viewBox="0 0 158 141"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M62.5096 81.3947C34.2214 50.8508 -3.58201 21.7816 0.272833 -19.6933C4.5395 -65.599 38.9541 -105.359 81.5192 -123.133C121.897 -139.994 169.136 -130.256 204.922 -105.149C235.047 -84.0141 235.923 -43.8756 245.241 -8.27104C255.27 30.0508 281.621 70.8106 259.601 103.779C236.639 138.159 188.091 143.432 147.031 138.768C111.418 134.723 86.8506 107.677 62.5096 81.3947Z"
            fill="#FFFAD1"
          />
        </svg>
        <svg // Render the second decorative blob SVG with conditional exit animation based on the quizStarted or isExiting state
          className={`blob2 ${quizStarted || isExiting ? "blob2-exit" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="148"
          height="118"
          viewBox="0 0 148 118"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z"
            fill="#DEEBF8"
          />
        </svg>
        {quizStarted ? ( // Conditionally render the Quiz component if the quiz has started, passing necessary props for managing state and user interactions
          <Quiz
            questions={questions} // Pass the fetched quiz questions to the Quiz component
            selectedAnswers={selectedAnswers} // Pass the user's selected answers to the Quiz component
            handleAnswerSelect={handleAnswerSelect} // Pass the function to handle answer selection to the Quiz component
            handleCheckAnswers={handleCheckAnswers} // Pass the function to check answers and calculate the score to the Quiz component
            quizOver={quizOver} // Pass the quizOver state to the Quiz component to indicate if the quiz has ended
            score={score} // Pass the user's score to the Quiz component for display when the quiz is over
            handleRestartQuiz={handleRestartQuiz} // Pass the function to restart the quiz to the Quiz component for resetting the state and starting a new quiz
          />
        ) : (
          <StartPage
            handleStartQuiz={handleStartQuiz} // Pass the function to start the quiz to the StartPage component for initiating the quiz and fetching questions
            isExiting={isExiting} // Pass the isExiting state to the StartPage component to manage the exit animation when transitioning to the Quiz component
            setIsExiting={setIsExiting} // Pass the function to update the isExiting state to the StartPage component for triggering the exit animation when the user clicks the "Start Quiz" button
          />
        )}
      </div>
    </>
  );
}
