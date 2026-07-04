import clsx from "clsx";
import { decode } from "html-entities";
import Confetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function Quiz(props) {
  // This to convert the selectedAnswers object into an array of answers for easier checking
  const allAnswered =
    Object.keys(props.selectedAnswers).length === props.questions.length;

  // To the custom message based on the exact score
  const getScoreMessage = () => {
    const totalQuestions = props.questions.length;

    if (props.score === 0)
      return `How did you get 0/${totalQuestions} score? 😭`;
    if (props.score === 1)
      return `You scored 1/${totalQuestions} correct answers. 🙏`;
    if (props.score === 2)
      return `Only 2/${totalQuestions} answers? Aren't you just guessing? 😭`;
    if (props.score === 3)
      return `You scored 3/${totalQuestions} correct answers. 👀`;
    if (props.score === 4)
      return `You scored 4 out of ${totalQuestions} correct answers, so close! 😮`;
    if (props.score === totalQuestions)
      return `You got ${totalQuestions}/${totalQuestions} correct answers, well done! 🎉`;

    return `You scored ${props.score}/${totalQuestions} correct answers.`;
  };

  useEffect(() => {
    // This effect runs when the quiz is over and the score is 0, triggering a toast notification
    if (props.quizOver && props.score === 0) {
      // First Toast: Appears after 2 seconds
      const firstTimer = setTimeout(() => {
        toast.error("I have no words. 🙏😭", {
          duration: 2800,
          position: "top-center",
          icon: "💔",
          style: {
            border: "1px solid #13192dd4",
            padding: "16px",
            color: "#293264",
            backgroundColor: "#fbf9e8",
            fontWeight: "bold",
          },
        });
      }, 3000);

      // Second Toast: Appears after 5 seconds total (3 seconds after the first one)
      const secondTimer = setTimeout(() => {
        toast("I'll pretend like I didn't see that. 🙏", {
          duration: 4000,
          position: "top-center",
          icon: "✨",
          style: {
            border: "1px solid #13192dd4",
            padding: "16px",
            color: "#293264",
            backgroundColor: "#e8f4fb",
            fontWeight: "bold",
          },
        });
      }, 5800);

      const LastTimer = setTimeout(() => {
        toast("Are you reviewing your answers? You can always try again! 🙏", {
          duration: 5000,
          position: "top-center",
          icon: "✨",
          style: {
            border: "1px solid #13192dd4",
            padding: "16px",
            color: "#293264",
            backgroundColor: "#e8f4fb",
            fontWeight: "bold",
          },
        });
      }, 9900);

      const VeryLastTimer = setTimeout(() => {
        toast("But the next answer will not be the same. 🙏🙏", {
          duration: 7000,
          position: "top-center",
          icon: "💀",
          style: {
            border: "1px solid #020202d4",
            padding: "16px",
            color: "#060606",
            backgroundColor: "#fff0d6eb",
            fontWeight: "bold",
          },
        });
      }, 18000);

      const TheVeryLastTimer = setTimeout(() => {
        toast("😭 🙏", {
          duration: 3000,
          position: "top-center",
          icon: "🙏",
          style: {
            border: "1px solid #020202d4",
            padding: "16px",
            color: "#060606",
            backgroundColor: "#fff0d6eb",
            fontWeight: "bold",
          },
        });
      }, 28000);
      return () => {
        clearTimeout(firstTimer);
        clearTimeout(secondTimer);
        clearTimeout(LastTimer);
        clearTimeout(VeryLastTimer);
        clearTimeout(TheVeryLastTimer);
      };
    }
  }, [props.quizOver, props.score]); // Dependency array ensures the effect runs when quizOver or score changes
  return (
    <>
      {/* Render the Toaster component to display toast notifications */}
      <Toaster />
      {props.quizOver && props.score === props.questions.length && (
        // Render the Confetti component when the quiz is over and the user has a perfect score
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="quizContainer fade-in-entry">
        {props.questions.map((question) => {
          return (
            // Render each question and its answer options
            <div key={question.id} className="question-container">
              <div className="question-content">
                <p className="question">
                  {
                    // Decode the question text to handle any HTML entities
                    decode(question.question)
                  }
                </p>

                <div className="radio-group">
                  {question.answers.map((answer, i) => {
                    // Render each answer option for the current question
                    const isSelected =
                      props.selectedAnswers[question.id] === answer;
                    const isCorrect = answer === question.correct_answer;
                    // Use clsx to conditionally apply classes based on the answer's state
                    const answerClass = clsx("answer-text", {
                      chosen: isSelected && !props.quizOver,
                      correct: props.quizOver && isCorrect,
                      incorrect: props.quizOver && isSelected && !isCorrect,
                      dimmed: props.quizOver && !isCorrect && !isSelected,
                    });
                    return (
                      // Render the answer option with a radio button and label
                      <label key={i} className="answer-label">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={answer}
                          checked={
                            props.selectedAnswers[question.id] === answer
                          }
                          onChange={() =>
                            // Call the handleAnswerSelect function from props to update the selected answer for the current question
                            props.handleAnswerSelect(question.id, answer)
                          }
                          disabled={props.quizOver}
                        />
                        <span
                          // Render the answer text with the appropriate class based on its state
                          className={answerClass}
                        >
                          {decode(answer)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <hr />{" "}
              {/* Render a horizontal line to separate questions for better visual clarity */}
            </div>
          );
        })}

        <div className="quiz-footer">
          {!props.quizOver ? (
            // Render the "Check Answers" button only if the quiz is not over and all questions have been answered
            allAnswered && (
              <button
                className="check-answers-btn"
                onClick={props.handleCheckAnswers}
              >
                Check Answers
              </button>
            )
          ) : (
            // Render the score message and "Play again" button when the quiz is over
            <div className="quizOverContainer">
              <span className="score-text">{getScoreMessage()}</span>
              <button
                className="check-answers-btn"
                onClick={props.handleRestartQuiz}
              >
                Play again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
