import React, { useState } from 'react';
import './QuizScreen.css';

function QuizScreen({ questions, topic, onQuizComplete }) {
  const [idx, setIdx] = useState(0);
  const [ans, setAns] = useState(Array(questions.length).fill(null));

  const selectAns = (opt) => {
    const temp = [...ans];
    temp[idx] = opt;
    setAns(temp);
  };

  const next = () => {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    }
  };

  const prev = () => {
    if (idx > 0) {
      setIdx(idx - 1);
    }
  };

  const q = questions[idx];
  const isLast = idx === questions.length - 1;
  const prog = ((idx + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="topic-title">{topic}</h2>
      </div>
      <div className="progress-section">
        <span>Progress: {idx + 1}/{questions.length}</span>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${prog}%` }}></div>
        </div>
      </div>
      <div className="question-card">
        <h3>Question {idx + 1}: {q.question}</h3>
        <div className="options-grid">
          {q.options.map((opt, i) => (
            <button 
              key={i} 
              className={`option-btn ${ans[idx] === opt ? 'selected' : ''}`} 
              onClick={() => selectAns(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={prev} disabled={idx === 0}>
          &lt; Previous
        </button>
        {isLast ? (
          <button className="finish-btn" onClick={() => onQuizComplete(ans)}>
            Finish Quiz
          </button>
        ) : (
          <button onClick={next}>
            Next &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizScreen;