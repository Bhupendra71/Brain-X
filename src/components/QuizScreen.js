import React, { useState } from 'react';
import './QuizScreen.css';

function QuizScreen({ questions, topic, onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));

  const handleSelectAnswer = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
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
          {currentQuestion.options.map((option, optionIndex) => (
            <button 
              key={optionIndex} 
              className={`option-btn ${selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}`} 
              onClick={() => handleSelectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="navigation-buttons">
        <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
          &lt; Previous
        </button>
        {isLastQuestion ? (
          <button className="finish-btn" onClick={() => onQuizComplete(selectedAnswers)}>
            Finish Quiz
          </button>
        ) : (
          <button onClick={goToNextQuestion}>
            Next &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizScreen;