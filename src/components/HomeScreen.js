import React, { useState, useEffect, useRef } from 'react';
import './HomeScreen.css';

const HomeScreen = ({ onStartQuiz, isLoading }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const generateButtonRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleGenerateQuiz = () => {
    const topicText = customTopic.trim();
    if (topicText) {
      onStartQuiz(topicText);
    } else {
      alert("Please enter a topic to generate the quiz!");
    }
  };

  const handleTopicSelect = (selectedTopic) => {
    setCustomTopic(selectedTopic);
  };

  const handleTopicInput = (e) => {
    setCustomTopic(e.target.value);
  };

  const isButtonDisabled = isLoading || !customTopic.trim();

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
                onClick={() => handleTopicSelect('Science & Nature')}
            >
                Science & Nature
            </button>
            <button 
                className="topic-btn history"
                onClick={() => handleTopicSelect('History')}
            >
                History
            </button>
            <button 
                className="topic-btn tech"
                onClick={() => handleTopicSelect('Tech Trends')}
            >
                Tech Trends
            </button>
            <button 
                className="topic-btn wellness"
                onClick={() => handleTopicSelect('Wellness')}
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
                value={customTopic}
                onChange={handleTopicInput}
            />
            <button 
                ref={generateButtonRef} 
                className="generate-btn" 
                onClick={handleGenerateQuiz} 
                disabled={isButtonDisabled}
            >
                {isLoading ? 'Loading...' : 'Generate Quiz'}
            </button>
          </div>
        </div>
      </main>

      <button className="night-mode-toggle" onClick={toggleDarkMode}>
        <span style={{ fontSize: '24px' }}>{isDarkMode ? '☀️' : '🌙'}</span>
      </button>
    </div>
  );
};

export default HomeScreen;