// src/components/LoadingScreen.js
import React from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-container">
      <header className="loading-header">
        <div className="loading-logo"></div>
      </header>
      <div className="loading-content">
        {/* NEW LOADER: Bouncing Google Dots */}
        <div className="wrapper">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        {/* END NEW LOADER */}
        <h1>Generating Your Quiz...</h1>
        <p>Please wait a moment while our AI creates 5 unique questions for you.</p>
      </div>
      <footer className="loading-footer">
        <span>@Powered by Google Gemini</span>
      </footer>
    </div>
  );
}

export default LoadingScreen;