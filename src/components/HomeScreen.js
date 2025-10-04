import React, { useState, useEffect, useRef } from 'react'; // <-- IMPORT useRef
import './HomeScreen.css';

const HomeScreen = ({ onStartQuiz, isLoading }) => {
  const [isNightMode, setIsNightMode] = useState(false);
  // State for the custom topic input field (This will hold the topic text)
  const [customTopic, setCustomTopic] = useState('');
  
  // Ref to directly access the Generate Quiz button DOM element
  const generateButtonRef = useRef(null);

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

  // HANDLER: Function for the main "Generate Quiz" button (Manual Click)
  const handleGenerateClick = () => {
    const topicToUse = customTopic.trim();

    if (topicToUse) {
      // Calls the prop function to start the quiz, passing the topic
      onStartQuiz(topicToUse);
    } else {
      // Using a simple alert, as per the existing code pattern
      alert("Please enter a topic to generate the quiz!");
    }
  };

  // REVISED HANDLER: Function for topic buttons 
  // ONLY sets the state, DOES NOT call onStartQuiz directly.
  const handleTopicSelect = (topic) => {
      // 1. Write the topic into the search bar (for visual confirmation)
      setCustomTopic(topic); 
      
      // 2. STOP: Do NOT call onStartQuiz here. The user must now click the 'Generate Quiz' button.
  };

  // HANDLER: Function to handle the text input change
  const handleCustomTopicChange = (e) => {
      // Allow users to type, but the topic is always what's in the input field
      setCustomTopic(e.target.value);
  };

  // Determine if the 'Generate Quiz' button should be disabled
  const isGenerateDisabled = isLoading || !customTopic.trim();


  return (
    <div className="home-screen-container">
      <header className="header">
        <div className="logo"> Brain-X</div>
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
            {/* Generate button: Attach the ref and the handler */}
            <button 
                ref={generateButtonRef} 
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
