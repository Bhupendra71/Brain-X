// src/components/LoadingScreen.js
import React from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-container">
      <header className="loading-header">
        <div className="loading-logo">AIQ</div>
        {/* The settings icon div that was here is now removed */}
      </header>
      <div className="loading-content">
        <div className="brain-animation">
          <span role="img" aria-label="brain">🧠</span>
        </div>
        <h1>Generating Your Quiz...</h1>
        <p>Please wait a moment while our AI creates 5 unique questions for you.</p>
        <div className="progress-bar">
          <div className="progress-bar-inner"></div>
        </div>
      </div>
      <footer className="loading-footer">
        <span>Powered by Google Gemini</span>
      </footer>
    </div>
  );
}

export default LoadingScreen;