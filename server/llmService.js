// LLM Service for AI Mentor Chat, Writing Lab Feedback, and Live Content Generation
// Powered by the official Google Generative AI SDK (@google/generative-ai)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load server/.env file (kept strictly on server, never exposed to client)
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config(); // Also check root if present

const MENTOR_SYSTEM_PROMPT =
  "You are a patient, encouraging English tutor. Explain grammar simply, use everyday examples, correct mistakes gently, and ask follow-up questions to keep the learner practicing. Avoid technical linguistics jargon — explain rules in plain words that any beginner or intermediate learner can understand. Always explain the 'why.'";

const WRITING_SYSTEM_PROMPT = `You are grading English writing in plain, friendly language. Return ONLY valid JSON matching this exact schema:
{
  "overall_score": number (0-100),
  "grammar_score": number (0-100),
  "vocabulary_score": number (0-100),
  "coherence_score": number (0-100),
  "corrections": [
    {
      "original_sentence": string,
      "corrected_sentence": string,
      "explanation": string
    }
  ],
  "summary_feedback": string
}
Rules:
1. Return ONLY the raw JSON object, no Markdown code fences, no introductory or concluding text.
2. Every item in corrections must cite an actual sentence from the submitted text.
3. The explanation must explain the grammar or vocabulary rule in simple, everyday English without academic jargon.
4. The summary_feedback must be 2-3 sentences, plain language, encouraging and practical.`;

// Directly target gemini-3.5-flash first to eliminate unnecessary fallback latency
const CANDIDATE_MODELS = [
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
  "gemini-2.5-flash"
];

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in server/.env");
  }
  return new GoogleGenerativeAI(apiKey);
}

// -------------------------------------------------------------
// Helper: Clean JSON response from Gemini
// -------------------------------------------------------------
function cleanJsonResponse(rawText) {
  let text = rawText.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(json)?\s*/i, "").replace(/```$/i, "").trim();
  }
  return JSON.parse(text);
}

// -------------------------------------------------------------
// 1. AI MENTOR CHAT
// -------------------------------------------------------------
export async function handleMentorChat(history = [], newMessage) {
  const genAI = getGenAI();

  const formattedHistory = [];
  for (const msg of history.slice(-10)) {
    formattedHistory.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    });
  }

  let lastError = null;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: MENTOR_SYSTEM_PROMPT
      });

      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      });

      const result = await chat.sendMessage(newMessage);
      const response = await result.response;
      const text = response.text();

      if (text && text.trim()) {
        return text.trim();
      }
    } catch (err) {
      console.warn(`Mentor chat attempt with ${modelName} failed:`, err.message);
      lastError = err;
      continue;
    }
  }

  throw new Error(`AI Mentor failed to respond: ${lastError?.message || "Please check your network and API key."}`);
}

// -------------------------------------------------------------
// 2. WRITING LAB FEEDBACK
// -------------------------------------------------------------
export async function handleWritingFeedback(submittedText, writingType = "general", promptText = "") {
  const genAI = getGenAI();
  const userPrompt = `Writing Type: ${writingType}\nPrompt Topic: ${promptText}\n\nSubmitted Text:\n"""\n${submittedText}\n"""\n\nAnalyze and evaluate this English writing submission and return ONLY valid JSON matching the schema.`;

  let lastError = null;

  for (const modelName of CANDIDATE_MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: WRITING_SYSTEM_PROMPT,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        });

        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const parsed = cleanJsonResponse(response.text());

        if (validateWritingFeedback(parsed)) {
          return parsed;
        }
      } catch (err) {
        console.warn(`Writing evaluation attempt ${attempt} with ${modelName} failed:`, err.message);
        lastError = err;
        if (err.message && err.message.includes("404")) break;
      }
    }
  }

  throw new Error(`Writing feedback evaluation failed: ${lastError?.message || "Invalid response format. Please retry."}`);
}

function validateWritingFeedback(data) {
  if (!data || typeof data !== "object") return false;
  return (
    typeof data.overall_score === "number" &&
    typeof data.grammar_score === "number" &&
    typeof data.vocabulary_score === "number" &&
    typeof data.coherence_score === "number" &&
    Array.isArray(data.corrections) &&
    typeof data.summary_feedback === "string"
  );
}

// -------------------------------------------------------------
// 3. DYNAMIC ASSESSMENT GENERATION (Goal-Tailored Level Check)
// -------------------------------------------------------------
export async function generateAssessment({ learning_reason, focus_areas = [], exam_target = null }) {
  const genAI = getGenAI();

  const prompt = `You are designing a personalized English proficiency check (6 to 8 questions) for a learner.
Learner Profile:
- Why they want to learn: "${learning_reason || "General improvement"}"
- Skills they most want to improve: ${focus_areas.length ? focus_areas.join(", ") : "Grammar, Vocabulary, Conversations"}
- Target Exam: ${exam_target || "None (General English)"}

Create a balanced 6-to-8 question diagnostic assessment tailored directly to their goals.
Rules:
1. Cover their chosen focus areas (e.g. if they chose Writing, include grammar and sentence structuring; if IELTS/TOEFL, include academic vocabulary and reading nuances; if Speaking/Conversations, include natural idioms and situational dialogue).
2. Questions should span varied difficulties (from elementary to intermediate/advanced) to accurately determine their CEFR level (A1 to C1).
3. Return ONLY valid JSON matching this exact schema:
{
  "title": "Personalized English Level Check",
  "questions": [
    {
      "question_id": string (e.g. "diag_1"),
      "section": "grammar" | "vocabulary" | "reading" | "writing",
      "question_text": string,
      "question_type": "multiple_choice" | "fill_in_blank",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": string (exact match to one of options or fill answer),
      "explanation": string (plain language explaining why the answer is correct)
    }
  ]
}`;

  let lastError = null;
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3
        }
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const parsed = cleanJsonResponse(response.text());

      if (parsed && Array.isArray(parsed.questions) && parsed.questions.length >= 5) {
        return parsed;
      }
    } catch (err) {
      console.warn(`generateAssessment attempt with ${modelName} failed:`, err.message);
      lastError = err;
      if (err.message && err.message.includes("404")) continue;
    }
  }

  throw new Error(`Assessment generation failed: ${lastError?.message || "Please retry in a moment."}`);
}

// -------------------------------------------------------------
// 4. DYNAMIC LESSON GENERATION
// -------------------------------------------------------------
export async function generateLesson({ topic, level = "B1", skill = "grammar" }) {
  const genAI = getGenAI();

  const prompt = `You are writing a friendly, plain-English English lesson on the topic: "${topic}" for a student at the ${level} CEFR level.
Skill Category: ${skill}.

Requirements:
1. "lesson_text": 2 to 3 clearly written paragraphs in everyday language. Never use confusing linguistics jargon. Explain how and when to use this in real life.
2. "example_sentences": Exactly 4 clear example sentences with a short helpful note in parentheses explaining the grammar/vocab choice.
3. "common_mistakes": Exactly 2 to 3 common mistakes learners make with this topic, explaining how to fix them in plain words.

Return ONLY valid JSON matching this schema:
{
  "topic": "${topic}",
  "level": "${level}",
  "lesson_text": string,
  "example_sentences": [string, string, string, string],
  "common_mistakes": [string, string, string]
}`;

  let lastError = null;
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3
        }
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const parsed = cleanJsonResponse(response.text());

      if (parsed && parsed.lesson_text && Array.isArray(parsed.example_sentences)) {
        return parsed;
      }
    } catch (err) {
      console.warn(`generateLesson attempt with ${modelName} failed:`, err.message);
      lastError = err;
      if (err.message && err.message.includes("404")) continue;
    }
  }

  throw new Error(`Lesson generation failed: ${lastError?.message || "Please retry in a moment."}`);
}

// -------------------------------------------------------------
// 5. DYNAMIC QUIZ GENERATION
// -------------------------------------------------------------
export async function generateQuiz({ topic, level = "B1", skill = "grammar" }) {
  const genAI = getGenAI();

  const prompt = `You are creating a focused, high-quality 5-to-6 question quiz on the topic: "${topic}" for a learner at the ${level} CEFR level.
Skill Category: ${skill}.

Requirements:
1. Exactly 5 or 6 questions testing different aspects of "${topic}".
2. Primarily multiple choice with 4 clear, plausible options, plus 1 fill-in-the-blank question if appropriate.
3. Provide an encouraging, plain-English explanation for every question.

Return ONLY valid JSON matching this schema:
{
  "topic": "${topic}",
  "level": "${level}",
  "questions": [
    {
      "question_id": string (e.g. "q_1"),
      "question_text": string,
      "question_type": "multiple_choice" | "fill_in_blank",
      "options": ["A", "B", "C", "D"],
      "correct_answer": string (must match the correct option verbatim),
      "explanation": string
    }
  ]
}`;

  let lastError = null;
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3
        }
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const parsed = cleanJsonResponse(response.text());

      if (parsed && Array.isArray(parsed.questions) && parsed.questions.length >= 4) {
        return parsed;
      }
    } catch (err) {
      console.warn(`generateQuiz attempt with ${modelName} failed:`, err.message);
      lastError = err;
      if (err.message && err.message.includes("404")) continue;
    }
  }

  throw new Error(`Quiz generation failed: ${lastError?.message || "Please retry in a moment."}`);
}

export default {
  handleMentorChat,
  handleWritingFeedback,
  generateAssessment,
  generateLesson,
  generateQuiz
};
