import React, { useState, useEffect } from 'react'; // useRef is removed
import './HomeScreen.css';

const HomeScreen = ({ onStartQuiz, isLoading }) => {
  const [isNightMode, setIsNightMode] = useState(false);
  // State for the custom topic input field (This will hold the topic text)
  const [customTopic, setCustomTopic] = useState('');
  
  // NOTE: generateButtonRef is removed as it's no longer needed for programmatic clicking

  // --- Night Mode Logic (Correct) ---
  const toggleNightMode = () => {
    setIsNightMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isNightMode]);

  // --- Topic & Generate Logic ---

  // REVISED HANDLER: Function for topic buttons (ONLY writes to the search bar)
  const handleTopicSelect = (topic) => {
      // Set the topic into the search bar's state
      setCustomTopic(topic); 
      // The user must now manually click the "Generate Quiz" button.
  };

  // HANDLER: Function to handle the text input change
  const handleCustomTopicChange = (e) => {
      setCustomTopic(e.target.value);
  };

  // HANDLER: Function for the main "Generate Quiz" button
  const handleGenerateClick = () => {
    const topicToUse = customTopic.trim();

    if (topicToUse) {
      // Calls the prop function to start the quiz, passing the topic
      // This is the point where the app moves to the 'loading' tab
      onStartQuiz(topicToUse);
    } else {
      alert("Please enter a topic to generate the quiz!");
    }
  };

  // Determine if the 'Generate Quiz' button should be disabled
  const isGenerateDisabled = isLoading || !customTopic.trim();


  return (
    <div className="home-screen-container">
      <header className="header">
        <div className="logo">Brain-X</div>
      </header>

      <main className="main-content">
        <h1>Challenge Your Knowledge, Powered by AI</h1>
        <p className="subtitle">Select a topic or enter your own to start a custom quiz generated instantly.</p>
        
        <div className="topic-selector">
          <p className="choose-topic-label"><b>Choose a Topic</b></p>
          <div className="topic-buttons">
            
            {/* Topic Buttons now use the handleTopicSelect function */}
            <button 
                className={`topic-btn science`}
                onClick={() => handleTopicSelect('Science & Nature')}
            >
                Science & Nature
            </button>
            <button 
                className={`topic-btn history`}
                onClick={() => handleTopicSelect('History')}
            >
                History
            </button>
            <button 
                className={`topic-btn tech`}
                onClick={() => handleTopicSelect('Tech Trends')}
            >
                Tech Trends
            </button>
            <button 
                className={`topic-btn wellness`}
                onClick={() => handleTopicSelect('Wellness')}
            >
                Wellness
            </button>
          </div>
        </div>
        
        <div className="custom-topic-input">
          <span className="or-divider">Or</span>
          <div className="input-group">
            {/* Input field with value and onChange handler */}
            <input 
                type="text" 
                placeholder="type any topic here..." 
                value={customTopic}
                onChange={handleCustomTopicChange}
            />
            {/* Generate button: This is the only way to trigger the quiz now */}
            <button 
                className="generate-btn" 
                onClick={handleGenerateClick} 
                disabled={isGenerateDisabled}
            >
                {isLoading ? 'Loading...' : 'Generate Quiz'}
            </button>
          </div>
        </div>
      </main>

      <button className="night-mode-toggle" onClick={toggleNightMode}>
        <span style={{ fontSize: '24px' }}>{isNightMode ? '☀️' : '🌙'}</span>
      </button>
    </div>
  );
};

export default HomeScreen;