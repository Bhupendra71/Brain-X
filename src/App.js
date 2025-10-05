// src/App.js
import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import ReviewScreen from './components/ReviewScreen';
import { fetchQuizQuestions, fetchScoreFeedback } from './geminiService.js';
import './App.css';

function App() {
  // State to manage the current view of the application
  // 'home', 'loading', 'quiz', 'results', 'review'
  const [gameState, setGameState] = useState('home');

  // State for our quiz data
  const [questions, setQuestions] = useState([]);
  const [topic, setTopic] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [aiFeedback, setAiFeedback] = useState('');

  // Constant for the minimum time to stay on the loader (3 seconds)
  const MIN_LOADING_TIME = 200;

  // Function to reset everything for a new quiz
  const restartQuiz = () => {
    setGameState('home');
    setQuestions([]);
    setTopic('');
    setUserAnswers([]);
    setScore(0);
    setAiFeedback('');
  };

  // Function to start the quiz, called from HomeScreen
  const handleStartQuiz = async (selectedTopic) => {
    setGameState('loading');
    setTopic(selectedTopic);

    // 1. Start the API call to fetch questions
    const apiPromise = fetchQuizQuestions(selectedTopic);
    
    // 2. Start the minimum delay timer (3 seconds)
    const delayPromise = new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME));

    // 3. Wait for both the API call AND the timer to complete
    try {
        // Promise.all ensures both must resolve before proceeding.
        // We only care about the first element (fetchedQuestions) from the array.
        const [fetchedQuestions] = await Promise.all([apiPromise, delayPromise]);

        if (fetchedQuestions && fetchedQuestions.length > 0) {
            setQuestions(fetchedQuestions);
            // Transition to quiz only after min time has passed
            setGameState('quiz');
        } else {
            alert("Sorry, couldn't generate questions. Please try again.");
            restartQuiz();
        }
    } catch (error) {
        console.error("Quiz generation failed:", error);
        alert("An error occurred during quiz generation. Please try again.");
        restartQuiz();
    }
  };

  // This is a special hook that runs code only when gameState changes to 'results'
  useEffect(() => {
    if (gameState === 'results') {
      // Calculate score
      let correctAnswers = 0;
      questions.forEach((question, index) => {
        if (question.correctAnswer === userAnswers[index]) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);

      // Fetch AI feedback after calculating score
      const getFeedback = async () => {
        const feedback = await fetchScoreFeedback(correctAnswers, questions.length, topic);
        setAiFeedback(feedback);
      };
      getFeedback();
    }
  }, [gameState, questions, userAnswers, topic]);

  // Function to handle the end of the quiz
  const handleQuizComplete = (answers) => {
    setUserAnswers(answers);
    setGameState('results'); // This will trigger the useEffect above
  };

  // Function to switch to the review screen
  const handleReview = () => {
    setGameState('review');
  };

  // This function decides which component to show
  const renderContent = () => {
    switch (gameState) {
      case 'loading':
        return <LoadingScreen />;
      case 'quiz':
        return <QuizScreen questions={questions} topic={topic} onQuizComplete={handleQuizComplete} />;
      case 'results':
        return <ResultScreen score={score} totalQuestions={questions.length} aiFeedback={aiFeedback} onReview={handleReview} onRestart={restartQuiz} />;
      case 'review':
        return <ReviewScreen questions={questions} userAnswers={userAnswers} onRestart={restartQuiz} />;
      case 'home':
      default:
        return <HomeScreen onStartQuiz={handleStartQuiz} isLoading={gameState === 'loading'} />;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;