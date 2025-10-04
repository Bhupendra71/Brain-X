// src/components/QuizScreen.js
import React, { useState } from 'react';
import './QuizScreen.css';

function QuizScreen({ questions, topic, onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerSelect = (selectedOption) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="topic-title">{topic}</h2>
      </div>
      <div className="progress-section">
        <span>Progress: {currentQuestionIndex + 1}/{questions.length}</span>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      <div className="question-card">
        <h3>Question {currentQuestionIndex + 1}: {currentQuestion.question}</h3>
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button key={index} className={`option-btn ${userAnswers[currentQuestionIndex] === option ? 'selected' : ''}`} onClick={() => handleAnswerSelect(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          &lt; Previous
        </button>
        {isLastQuestion ? (
          <button className="finish-btn" onClick={() => onQuizComplete(userAnswers)}>
            Finish Quiz
          </button>
        ) : (
          <button onClick={handleNext}>
            Next &gt;
          </button>
        )}
      </div>
    </div>
  );
}
export default QuizScreen;