export default function StartPage({
  handleStartQuiz,
  isExiting,
  setIsExiting,
}) {
  const handleClick = () => {
    // Function to handle the click event on the "Start Quiz" button
    setIsExiting(true); // Triggers both the text fade-out and the App's blob movement

    // Wait 500ms (matching the 0.5s CSS exit speed) before switching screens
    setTimeout(() => {
      handleStartQuiz();
    }, 500);
  };

  return (
    // Render the StartPage component with a fade-in or fade-out effect based on the isExiting state
    <div className={isExiting ? "fade-out-exit" : "fade-in-entry"}>
      <div className="mainStart">
        <h1>Quiz Game</h1>
        <p>Welcome to the Quiz Game!</p>
        <button className="startBtn" onClick={handleClick}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
