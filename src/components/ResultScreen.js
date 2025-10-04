// src/components/ResultScreen.js
import React from 'react';
import './ResultScreen.css';

function ResultScreen({ score, totalQuestions, aiFeedback, onReview, onRestart }) {
  return (
    <div className="result-container">
      <h2>Quiz Completed!</h2>
      <div className="score-display">
        <p>Your Score:</p>
        <span className="score">{score}</span>
        <span className="total">/ {totalQuestions}</span>
      </div>
      <div className="ai-feedback">
        <p className="feedback-title">AI Feedback:</p>
        {aiFeedback ? (
          <p className="feedback-text">"{aiFeedback}"</p>
        ) : (
          <p className="feedback-loading">Generating feedback...</p>
        )}
      </div>
      <div className="result-actions">
        <button onClick={onReview} className="review-btn">Review Answers</button>
        <button onClick={onRestart} className="restart-btn">Take Another Quiz</button>
      </div>
    </div>
  );
}

export default ResultScreen;