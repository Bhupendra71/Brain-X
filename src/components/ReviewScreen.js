import React from 'react';
import './ReviewScreen.css';

function ReviewScreen({ questions, userAnswers, onRestart }) {
  return (
    <div className="review-container">
      <h2>Review Your Answers</h2>
      {questions.map((question, questionIndex) => {
        const userSelectedAnswer = userAnswers[questionIndex];
        const correctAnswer = question.correctAnswer;

        return (
          <div key={questionIndex} className="review-question-card">
            <p className="review-question-text">
              {questionIndex + 1}. {question.question}
            </p>
            <div className="review-options">
              {question.options.map((option, optionIndex) => {
                let optionClass = 'review-option';
                
                // highlight correct answer in green
                if (option === correctAnswer) {
                  optionClass += ' correct';
                }
                
                // highlight wrong answer in red if user selected it
                if (option === userSelectedAnswer && userSelectedAnswer !== correctAnswer) {
                  optionClass += ' incorrect';
                }
                
                return (
                  <div key={optionIndex} className={optionClass}>
                    {option}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <button onClick={onRestart} className="restart-btn-review">
        Take Another Quiz
      </button>
    </div>
  );
}

export default ReviewScreen;