import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import ReviewScreen from './components/ReviewScreen';
import { fetchQuizQuestions, fetchScoreFeedback } from './geminiService.js';
import './App.css';

function App() {
  const [screen, setScreen] = useState('home');
  const [ques, setQues] = useState([]);
  const [topic, setTopic] = useState('');
  const [ans, setAns] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const restart = () => {
    setScreen('home');
    setQues([]);
    setTopic('');
    setAns([]);
    setScore(0);
    setFeedback('');
  };

  const startQuiz = async (t) => {
    setScreen('loading');
    setTopic(t);

    const apiCall = fetchQuizQuestions(t);
    const delay = new Promise(resolve => setTimeout(resolve, 200));

    try {
        const [data] = await Promise.all([apiCall, delay]);

        if (data && data.length > 0) {
            setQues(data);
            setScreen('quiz');
        } else {
            alert("Sorry, couldn't generate questions. Please try again.");
            restart();
        }
    } catch (err) {
        console.error("Quiz generation failed:", err);
        alert("An error occurred during quiz generation. Please try again.");
        restart();
    }
  };

  useEffect(() => {
    if (screen === 'results') {
      let correct = 0;
      for(let i=0; i<ques.length; i++){
        if (ques[i].correctAnswer === ans[i]) {
          correct++;
        }
      }
      setScore(correct);

      fetchScoreFeedback(correct, ques.length, topic).then(fb => {
        setFeedback(fb);
      });
    }
  }, [screen, ques, ans, topic]);

  const finishQuiz = (answers) => {
    setAns(answers);
    setScreen('results');
  };

  const showReview = () => {
    setScreen('review');
  };

  const render = () => {
    if(screen === 'loading') return <LoadingScreen />;
    if(screen === 'quiz') return <QuizScreen questions={ques} topic={topic} onQuizComplete={finishQuiz} />;
    if(screen === 'results') return <ResultScreen score={score} totalQuestions={ques.length} aiFeedback={feedback} onReview={showReview} onRestart={restart} />;
    if(screen === 'review') return <ReviewScreen questions={ques} userAnswers={ans} onRestart={restart} />;
    return <HomeScreen onStartQuiz={startQuiz} isLoading={screen === 'loading'} />;
  };

  return (
    <div className="App">
      {render()}
    </div>
  );
}

export default App;