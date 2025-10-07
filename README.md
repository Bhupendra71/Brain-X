# Brain-X - AI-Powered Quiz Application

A quiz platform that uses Google's Gemini AI to generate personalized multiple-choice questions on any topic.

---

## Project Setup & Demo

### Live Demo

Deployed on Vercel: [Add your Vercel link here]

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

---

## Problem Understanding

The goal was to build an interactive quiz application that:

- Lets users choose or enter custom topics
- Uses AI to generate relevant multiple-choice questions
- Shows questions one at a time with navigation
- Provides AI-generated feedback based on performance

**Key assumptions I made:**

- Users want 5 questions per quiz (seemed like a good balance)
- Questions should have exactly 4 options each
- The AI might occasionally return malformed JSON, so error handling is critical
- Users appreciate a clean, distraction-free interface

---

## AI Integration Journey

### Initial Approach

Started with a simple prompt:

```
Generate 5 quiz questions about [topic] in JSON format
```

Issues encountered:

- Question count was inconsistent (sometimes 3, sometimes 7)
- Response included markdown formatting (```json blocks)
- Correct answer text didn't match option text exactly
- Some questions were too easy or too hard

### Final Solution

After testing different approaches, this prompt structure worked consistently:

```javascript
Create 5 multiple choice questions about "${topic}".

Requirements:
- Each question needs exactly 4 options
- Mix easy, medium, and hard difficulty
- Make sure options are realistic (not obviously wrong)
- Include different types: facts, concepts, and application questions

Return ONLY valid JSON array, no extra text or markdown.
```

I also added explicit JSON structure examples and validation checks in the code.

### Score Feedback

For feedback generation:

- Send score, total questions, and topic to AI
- Request 2-3 sentences based on performance percentage
- Different messaging for high scores vs lower scores

---

## Architecture & Code Structure

### Project Organization

```
src/
├── App.js                    # Main application logic and state
├── geminiService.js          # AI integration service
├── components/
│   ├── HomeScreen.js         # Topic selection interface
│   ├── LoadingScreen.js      # Loading state during generation
│   ├── QuizScreen.js         # Question display with navigation
│   ├── ResultScreen.js       # Score display and feedback
│   └── ReviewScreen.js       # Answer review functionality
```

### State Management

Used React hooks (useState) for managing:

- Current screen state
- Questions array
- User answers
- Score calculation
- AI feedback

App.js serves as the main state container and passes data through props to child components.

### AI Service Implementation

geminiService.js contains:

- fetchQuizQuestions() - handles question generation with validation
- fetchScoreFeedback() - generates personalized feedback
- JSON parsing and error handling

### Application Flow

```
Home Screen → Loading → Quiz → Results → Review
     ↑                            ↓
     └────────────────────────────┘
          (Restart Button)
```

---

## Screenshots

[Add screenshots of each screen here]

1. Home Screen - Topic selection interface
2. Loading Screen - Question generation in progress
3. Quiz Screen - Question display with progress bar
4. Results Screen - Score and AI feedback
5. Review Screen - Correct/incorrect answer highlighting

---

## Known Issues & Future Improvements

### Current Limitations

1. API response time varies (2-5 seconds) - could show estimated wait time
2. Questions aren't cached - every quiz requires new API call
3. No retry mechanism if AI request fails
4. Limited to MCQ format only

### Potential Enhancements

- Add difficulty level selection
- Implement quiz history and progress tracking
- Add timer for each question
- Support for different question types (true/false, fill-in-the-blank)
- Export quiz results
- Improve mobile touch gestures

---

## Additional Features Implemented

Beyond basic requirements:

- Dark mode toggle
- Progress bar visualization
- Animated loading state
- Color-coded answer review (green/red highlighting)
- Responsive design for different screen sizes
- Preset topic buttons for quick access

---

## Technology Stack

- React (v19.2.0)
- Google Gemini AI (gemini-2.0-flash model)
- CSS3 for styling
- Vercel for deployment

---

## Implementation Notes

### Challenge Areas

Getting consistent JSON output from AI was the most challenging part. Had to implement:

- Response cleaning (removing markdown formatting)
- Validation for question count and structure
- Error handling for malformed responses

### Learning Outcomes

- Prompt engineering techniques for structured AI outputs
- Managing async operations in React
- Error handling patterns for external APIs
- Component-based state management

---

## Setup Instructions

1. Clone the repository
2. Create .env file with your Gemini API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```
3. Install dependencies: `npm install`
4. Run development server: `npm start`

---

## Deployment

Application is deployed on Vercel. To deploy your own instance:

1. Push code to GitHub
2. Import repository in Vercel
3. Add REACT_APP_GEMINI_API_KEY environment variable
4. Deploy
