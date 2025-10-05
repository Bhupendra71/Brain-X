// src/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

export async function fetchQuizQuestions(topic) {
  const prompt = `Create 5 multiple choice questions about "${topic}".

Requirements:
- Each question needs exactly 4 options
- Mix easy, medium, and hard difficulty
- Make sure options are realistic (not obviously wrong)
- Include different types: facts, concepts, and application questions

Return ONLY valid JSON array, no extra text or markdown.

Structure for each question:
{
  "question": "question text here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "exact text of correct option"
}

Example:
[
  {
    "question": "What is the capital of France?",
    "options": ["London", "Berlin", "Paris", "Madrid"],
    "correctAnswer": "Paris"
  }
]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // clean up the response
    const jsonText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const questions = JSON.parse(jsonText);
    
    // check if we got 5 questions
    if (!Array.isArray(questions) || questions.length !== 5) {
      throw new Error("Didn't get 5 questions");
    }
    
    // make sure each question is valid
    questions.forEach((q, index) => {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.correctAnswer) {
        throw new Error(`Question ${index} is missing something`);
      }
    });
    
    return questions;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return null;
  }
}

export async function fetchScoreFeedback(score, totalQuestions, topic) {
  const percentage = (score / totalQuestions) * 100;
  
  const prompt = `A student finished a quiz on "${topic}".
Their score: ${score} out of ${totalQuestions} (${percentage.toFixed(0)}%)

Write a short encouraging message (2-3 sentences):
- If 80%+: congratulate them
- If 50-79%: acknowledge effort, suggest review
- If below 50%: encourage them to try again

Just return the message text, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error fetching score feedback:", error);
    return "Good try! Review your answers and give it another shot to improve your score.";
  }
}