import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

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
    const rawText = response.text();
    
    // sometimes gemini wraps response in markdown code blocks, so removing that
    const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedQuestions = JSON.parse(cleanedText);
    
    // basic validation
    if (!Array.isArray(parsedQuestions) || parsedQuestions.length !== 5) {
      throw new Error("Invalid number of questions received");
    }
    
    // make sure each question has all required fields
    parsedQuestions.forEach((question, index) => {
      if (!question.question || !Array.isArray(question.options) || 
          question.options.length !== 4 || !question.correctAnswer) {
        throw new Error(`Question ${index + 1} is incomplete`);
      }
    });
    
    return parsedQuestions;
  } catch (err) {
    console.error("Failed to fetch quiz questions:", err);
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
  } catch (err) {
    console.error("Failed to generate feedback:", err);
    // fallback message if API fails
    return "Good try! Review your answers and give it another shot to improve your score.";
  }
}