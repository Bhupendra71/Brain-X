// src/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

export async function fetchQuizQuestions(topic) {
  const prompt = `
    Generate 5 unique multiple-choice questions about the topic: ${topic}.
    Return the response as a valid JSON array. Do not include any text outside of the JSON.
    Each object in the array should have the following structure:
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "The correct option text"
    }
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean the response to ensure it's valid JSON
    const jsonText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return null; // Return null to indicate failure
  }
}

export async function fetchScoreFeedback(score, totalQuestions, topic) {
  const prompt = `
    A user has just completed a quiz on the topic "${topic}".
    Their score was ${score} out of ${totalQuestions}.
    Please generate a short, encouraging, and personalized feedback message for them in 1-2 sentences.
    For example, if the score is high, praise them. If the score is low, encourage them to review their answers or try again.
    Do not return JSON. Return only the plain text feedback message.
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error fetching score feedback:", error);
    // A fallback message in case the API fails
    return "Great effort! Review your answers to learn more or try another topic.";
  }
}