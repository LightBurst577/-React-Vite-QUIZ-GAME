# Quiz Project Game

A fast, animated trivia game built with React and Vite. Each round pulls five multiple-choice questions from the Open Trivia DB API, shuffles the answers, and lets you test how many you can get right before restarting for another run.

## Live deployment

This project is configured for GitHub Pages deployment.

- Homepage: [https://LightBurst577.github.io/-React-Vite-QUIZ-GAME]

## Features

- Start screen with animated transition into the quiz
- Fetches a fresh set of questions from Open Trivia DB
- Randomized answer order for every round
- Answer selection with immediate visual feedback after checking
- Score summary at the end of the game
- Confetti celebration for a perfect score
- Play-again flow for quick replaying

## Tech Stack

- React 19
- Vite
- `clsx` for conditional styling
- `html-entities` for decoding trivia text
- `react-confetti` for the perfect-score effect
- `react-hot-toast` for end-of-game messages

## How To Play

1. Click Start Quiz.
2. Answer all five questions.
3. Click Check Answers once every question has been answered.
4. Review your score and play again if you want another round.

## Project Structure

- `src/App.jsx` - main quiz state and screen flow
- `src/components/StartPage.jsx` - landing screen and start transition
- `src/components/Quiz.jsx` - question rendering, scoring, and end-game feedback
- `src/main.jsx` - app entry point

## Notes

- Questions are fetched live from Open Trivia DB when a round starts.
- Answers are shuffled on each round, so the same question may appear with a different order.
- If the API request fails, the quiz will not load questions until a new round is started successfully.
- I only encountered 1 bug, so bugs are expected 😭🙏
