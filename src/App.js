import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import ReviewScreen from './components/ReviewScreen';
import { fetchQuizQuestions, fetchScoreFeedback } from './geminiService.js';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [quizTopic, setQuizTopic] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [aiFeedback, setAiFeedback] = useState('');

  const handleRestart = () => {
    setCurrentScreen('home');
    setQuestions([]);
    setQuizTopic('');
    setUserAnswers([]);
    setUserScore(0);
    setAiFeedback('');
  };

  const handleStartQuiz = async (topic) => {
    setCurrentScreen('loading');
    setQuizTopic(topic);

    // adding a small delay so the loading screen doesn't flash too quick
    const questionsPromise = fetchQuizQuestions(topic);
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 200));

    try {
        const [questionsData] = await Promise.all([questionsPromise, minLoadingTime]);

        if (questionsData && questionsData.length > 0) {
            setQuestions(questionsData);
            setCurrentScreen('quiz');
        } else {
            alert("Sorry, couldn't generate questions. Please try again.");
            handleRestart();
        }
    } catch (error) {
        console.error("Quiz generation failed:", error);
        alert("An error occurred during quiz generation. Please try again.");
        handleRestart();
    }
  };

  // calculate score after quiz finishes
  useEffect(() => {
    if (currentScreen === 'results') {
      let correctAnswersCount = 0;
      
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].correctAnswer === userAnswers[i]) {
          correctAnswersCount++;
        }
      }
      
      setUserScore(correctAnswersCount);

      // get AI feedback based on score
      fetchScoreFeedback(correctAnswersCount, questions.length, quizTopic).then(feedback => {
        setAiFeedback(feedback);
      });
    }
  }, [currentScreen, questions, userAnswers, quizTopic]);

  const handleQuizComplete = (answers) => {
    setUserAnswers(answers);
    setCurrentScreen('results');
  };

  const handleShowReview = () => {
    setCurrentScreen('review');
  };

  const renderCurrentScreen = () => {
    if (currentScreen === 'loading') return <LoadingScreen />;
    
    if (currentScreen === 'quiz') {
      return <QuizScreen questions={questions} topic={quizTopic} onQuizComplete={handleQuizComplete} />;
    }
    
    if (currentScreen === 'results') {
      return (
        <ResultScreen 
          score={userScore} 
          totalQuestions={questions.length} 
          aiFeedback={aiFeedback} 
          onReview={handleShowReview} 
          onRestart={handleRestart} 
        />
      );
    }
    
    if (currentScreen === 'review') {
      return <ReviewScreen questions={questions} userAnswers={userAnswers} onRestart={handleRestart} />;
    }
    
    return <HomeScreen onStartQuiz={handleStartQuiz} isLoading={currentScreen === 'loading'} />;
  };

  return (
    <div className="App">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;