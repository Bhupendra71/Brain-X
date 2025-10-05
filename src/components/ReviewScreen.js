import React from 'react';
import './ReviewScreen.css';

function ReviewScreen({ questions, userAnswers, onRestart }) {
  return (
    <div className="review-container">
      <h2>Review Your Answers</h2>
      {questions.map((q, idx) => {
        const userAns = userAnswers[idx];
        const correct = q.correctAnswer;

        return (
          <div key={idx} className="review-question-card">
            <p className="review-question-text">{idx + 1}. {q.question}</p>
            <div className="review-options">
              {q.options.map((opt, i) => {
                let cls = 'review-option';
                if (opt === correct) cls = cls + ' correct';
                if (opt === userAns && userAns !== correct) cls = cls + ' incorrect';
                return <div key={i} className={cls}>{opt}</div>;
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