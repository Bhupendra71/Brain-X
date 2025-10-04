// src/components/ReviewScreen.js
import React from 'react';
import './ReviewScreen.css';

function ReviewScreen({ questions, userAnswers, onRestart }) {
  return (
    <div className="review-container">
      <h2>Review Your Answers</h2>
      {questions.map((q, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = q.correctAnswer;
        const isCorrect = userAnswer === correctAnswer;

        return (
          <div key={index} className="review-question-card">
            <p className="review-question-text">{index + 1}. {q.question}</p>
            <div className="review-options">
              {q.options.map((option, i) => {
                let className = 'review-option';
                if (option === correctAnswer) {
                  className += ' correct';
                }
                if (option === userAnswer && !isCorrect) {
                  className += ' incorrect';
                }
                return <div key={i} className={className}>{option}</div>;
              })}
            </div>
          </div>
        );
      })}
      <button onClick={onRestart} className="restart-btn-review">Take Another Quiz</button>
    </div>
  );
}

export default ReviewScreen;