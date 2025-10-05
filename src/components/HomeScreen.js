import React, { useState, useEffect, useRef } from 'react';
import './HomeScreen.css';

const HomeScreen = ({ onStartQuiz, isLoading }) => {
  const [nightMode, setNightMode] = useState(false);
  const [topic, setTopic] = useState('');
  const btnRef = useRef(null);

  const toggleMode = () => {
    setNightMode(!nightMode);
  };

  useEffect(() => {
    if (nightMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [nightMode]);

  const handleGenerate = () => {
    const t = topic.trim();
    if (t) {
      onStartQuiz(t);
    } else {
      alert("Please enter a topic to generate the quiz!");
    }
  };

  const selectTopic = (t) => {
    setTopic(t);
  };

  const handleInput = (e) => {
    setTopic(e.target.value);
  };

  const btnDisabled = isLoading || !topic.trim();

  return (
    <div className="home-screen-container">
      <header className="header">
        <div className="logo"> Brain-X</div>
      </header>

      <main className="main-content">
        <h1>Your Personal AI-Powered Quiz Generator</h1>
        <p className="subtitle">Your custom learning experience begins now.</p>
        
        <div className="topic-selector">
          <p className="choose-topic-label"><b>Choose a Topic</b></p>
          <div className="topic-buttons">
            <button 
                className="topic-btn science"
                onClick={() => selectTopic('Science & Nature')}
            >
                Science & Nature
            </button>
            <button 
                className="topic-btn history"
                onClick={() => selectTopic('History')}
            >
                History
            </button>
            <button 
                className="topic-btn tech"
                onClick={() => selectTopic('Tech Trends')}
            >
                Tech Trends
            </button>
            <button 
                className="topic-btn wellness"
                onClick={() => selectTopic('Wellness')}
            >
                Wellness
            </button>
          </div>
        </div>
        
        <div className="custom-topic-input">
          <span className="or-divider">Or</span>
          <div className="input-group">
            <input 
                type="text" 
                placeholder="type any topic here..." 
                value={topic}
                onChange={handleInput}
            />
            <button 
                ref={btnRef} 
                className="generate-btn" 
                onClick={handleGenerate} 
                disabled={btnDisabled}
            >
                {isLoading ? 'Loading...' : 'Generate Quiz'}
            </button>
          </div>
        </div>
      </main>

      <button className="night-mode-toggle" onClick={toggleMode}>
        <span style={{ fontSize: '24px' }}>{nightMode ? '☀️' : '🌙'}</span>
      </button>
    </div>
  );
};

export default HomeScreen;