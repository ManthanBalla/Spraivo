// Express Backend Server for LinguaPath (ES Module)
// Handles authentication, multi-user data isolation, rate limiting, 24h content caching, and AI services
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import * as db from "./db.js";
import * as llm from "./llmService.js";
import { requireAuth, optionalAuth, generateToken } from "./auth.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for rate limiting behind Vite proxy / reverse proxies
app.set("trust proxy", 1);

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// -------------------------------------------------------------
// Rate Limiters (Security)
// -------------------------------------------------------------
// Auth rate limiter: 25 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many sign-in or registration attempts. Please try again in 15 minutes." }
});

// AI endpoints rate limiter: 40 requests per 15 minutes per IP to preserve quota
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "AI tutor request limit reached. Please take a short break and try again in 15 minutes." }
});

// -------------------------------------------------------------
// Authentication Endpoints (Public with Rate Limiting)
// -------------------------------------------------------------

// POST /api/register
app.post("/api/register", authLimiter, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Please enter your name." });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = db.findUserByEmail(normalizedEmail);
    if (existing) {
      return res.status(400).json({ error: "An account with this email address already exists. Please sign in." });
    }

    // Hash password with bcrypt
    const password_hash = await bcrypt.hash(password, 10);
    const user_id = "usr_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 7);

    const newUser = db.createUser({
      user_id,
      email: normalizedEmail,
      password_hash,
      name: name.trim()
    });

    // Default rememberMe for newly created accounts
    const token = generateToken({ user_id: newUser.user_id, email: newUser.email, name: newUser.name }, true);

    // Set 30-day httpOnly cookie
    res.cookie("lp_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      user: { user_id: newUser.user_id, email: newUser.email, name: newUser.name },
      token,
      profile: null // Brand-new user needs to complete the quick goal questionnaire
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed. Please try again.", details: err.message });
  }
});

// POST /api/login
app.post("/api/login", authLimiter, async (req, res) => {
  try {
    const { email, password, rememberMe = false } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide both email and password." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = db.findUserByEmail(normalizedEmail);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password. Please try again." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password. Please try again." });
    }

    const token = generateToken(
      { user_id: user.user_id, email: user.email, name: user.name },
      Boolean(rememberMe)
    );

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      path: "/"
    };

    if (rememberMe) {
      cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000;
    }

    res.cookie("lp_token", token, cookieOptions);

    const userProfile = db.getProfile(user.user_id);

    res.json({
      user: { user_id: user.user_id, email: user.email, name: user.name },
      token,
      profile: userProfile
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Sign in failed. Please try again.", details: err.message });
  }
});

// POST /api/logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("lp_token", { path: "/" });
  res.json({ success: true, message: "Signed out successfully." });
});

// GET /api/me — Session check
app.get("/api/me", requireAuth, (req, res) => {
  try {
    const profile = db.getProfile(req.user.user_id);
    res.json({
      user: req.user,
      profile
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to verify session", details: err.message });
  }
});

// -------------------------------------------------------------
// Goal Management (Navbar & Onboarding)
// -------------------------------------------------------------
app.post("/api/update-goal", requireAuth, (req, res) => {
  try {
    const { learning_reason, focus_areas, exam_target } = req.body;
    const updated = db.updateUserGoal(req.user.user_id, {
      learning_reason,
      focus_areas,
      exam_target
    });
    res.json({ profile: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update learning goal", details: err.message });
  }
});

// -------------------------------------------------------------
// Dynamic Assessment Generation & Grading (Dashboard Level Check)
// -------------------------------------------------------------

// POST /api/generate-assessment — Live generated level check based on user's goal
app.post("/api/generate-assessment", requireAuth, aiLimiter, async (req, res) => {
  try {
    const profile = db.getProfile(req.user.user_id) || {};
    const assessment = await llm.generateAssessment({
      learning_reason: profile.learning_reason || req.body.learning_reason || "General English",
      focus_areas: profile.focus_areas || req.body.focus_areas || ["Conversations", "Grammar"],
      exam_target: profile.exam_target || req.body.exam_target || null
    });
    res.json({ assessment });
  } catch (err) {
    console.error("Error in /api/generate-assessment:", err);
    res.status(500).json({ error: "Failed to generate level check. Please retry.", details: err.message });
  }
});

// POST /api/grade-assessment — Grades submitted diagnostic answers & unlocks Dashboard
app.post("/api/grade-assessment", requireAuth, (req, res) => {
  try {
    const { answers = [], questions = [] } = req.body;
    if (!answers.length) {
      return res.status(400).json({ error: "No answers submitted" });
    }

    // Tally scores per section
    const sectionTotals = {};
    const sectionCorrect = {};

    answers.forEach((ans) => {
      const sec = ans.section || "grammar";
      sectionTotals[sec] = (sectionTotals[sec] || 0) + 1;
      if (ans.is_correct) {
        sectionCorrect[sec] = (sectionCorrect[sec] || 0) + 1;
      }
    });

    const grammarScore = sectionTotals.grammar ? Math.round((sectionCorrect.grammar / sectionTotals.grammar) * 100) : 60;
    const vocabScore = sectionTotals.vocabulary ? Math.round((sectionCorrect.vocabulary / sectionTotals.vocabulary) * 100) : 60;
    const readingScore = sectionTotals.reading ? Math.round((sectionCorrect.reading / sectionTotals.reading) * 100) : 60;
    const writingScore = sectionTotals.writing ? Math.round((sectionCorrect.writing / sectionTotals.writing) * 100) : 55;

    const overallScore = Math.round((grammarScore + vocabScore + readingScore + writingScore) / 4);

    let englishLevel = "A1";
    if (overallScore >= 90) englishLevel = "C2";
    else if (overallScore >= 80) englishLevel = "C1";
    else if (overallScore >= 65) englishLevel = "B2";
    else if (overallScore >= 45) englishLevel = "B1";
    else if (overallScore >= 25) englishLevel = "A2";

    // Update profile
    const profile = db.getProfile(req.user.user_id) || {
      user_id: req.user.user_id,
      name: req.user.name || "Learner"
    };

    profile.english_level = englishLevel;
    profile.overall_score = overallScore;
    profile.skill_scores = {
      grammar: grammarScore,
      vocabulary: vocabScore,
      reading: readingScore,
      writing: writingScore
    };
    profile.level_check_completed = true;
    profile.streak_days = profile.streak_days || 1;
    profile.total_learning_minutes = (profile.total_learning_minutes || 0) + 10;
    profile.total_questions_answered = (profile.total_questions_answered || 0) + answers.length;

    db.saveProfile(req.user.user_id, profile);

    res.json({
      profile,
      overall_score: overallScore,
      english_level: englishLevel,
      skill_scores: profile.skill_scores
    });
  } catch (err) {
    console.error("Error in /api/grade-assessment:", err);
    res.status(500).json({ error: "Grading failed", details: err.message });
  }
});

// -------------------------------------------------------------
// Dynamic Lesson & Quiz Generation with 24-Hour SQLite Caching
// -------------------------------------------------------------

// POST /api/generate-lesson
app.post("/api/generate-lesson", requireAuth, async (req, res) => {
  try {
    const { topic, level = "B1", skill = "grammar" } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: "Topic name is required" });
    }

    const cleanTopic = topic.trim();
    const cleanLevel = (level || "B1").trim().toUpperCase();
    const cleanSkill = (skill || "grammar").trim().toLowerCase();

    // Cache key is topic+level+skill (safe across users, contains no personal data)
    const cacheKey = `lesson:${cleanSkill}:${cleanTopic.toLowerCase()}:${cleanLevel.toLowerCase()}`;

    const cached = db.getCachedContent(cacheKey);
    if (cached) {
      return res.json({ lesson: cached, cached: true });
    }

    // Rate-limit live Gemini calls
    const lesson = await llm.generateLesson({
      topic: cleanTopic,
      level: cleanLevel,
      skill: cleanSkill
    });

    db.setCachedContent(cacheKey, "lesson", cleanTopic, cleanLevel, lesson);

    res.json({ lesson, cached: false });
  } catch (err) {
    console.error("Error in /api/generate-lesson:", err);
    res.status(500).json({ error: "Lesson generation failed. Please try again.", details: err.message });
  }
});

// POST /api/generate-quiz
app.post("/api/generate-quiz", requireAuth, async (req, res) => {
  try {
    const { topic, level = "B1", skill = "grammar" } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: "Topic name is required" });
    }

    const cleanTopic = topic.trim();
    const cleanLevel = (level || "B1").trim().toUpperCase();
    const cleanSkill = (skill || "grammar").trim().toLowerCase();

    const cacheKey = `quiz:${cleanSkill}:${cleanTopic.toLowerCase()}:${cleanLevel.toLowerCase()}`;

    const cached = db.getCachedContent(cacheKey);
    if (cached) {
      return res.json({ quiz: cached, cached: true });
    }

    const quiz = await llm.generateQuiz({
      topic: cleanTopic,
      level: cleanLevel,
      skill: cleanSkill
    });

    db.setCachedContent(cacheKey, "quiz", cleanTopic, cleanLevel, quiz);

    res.json({ quiz, cached: false });
  } catch (err) {
    console.error("Error in /api/generate-quiz:", err);
    res.status(500).json({ error: "Quiz generation failed. Please try again.", details: err.message });
  }
});

// POST /api/grade-quiz — Grades answers against generated quiz and logs PracticeAttempt
app.post("/api/grade-quiz", requireAuth, (req, res) => {
  try {
    const {
      topic_id,
      topic_title,
      skill = "grammar",
      answers = [],
      questions = [],
      duration_minutes = 5
    } = req.body;

    if (!answers.length) {
      return res.status(400).json({ error: "No answers provided" });
    }

    const total = answers.length;
    let correctCount = 0;
    const mistakes = [];

    answers.forEach((ans) => {
      const q = questions.find((item) => item.question_id === ans.question_id) || {};
      const expected = (q.correct_answer || ans.correct_answer || "").trim().toLowerCase();
      const actual = (ans.user_answer || "").trim().toLowerCase();
      const isCorrect = actual === expected;

      if (isCorrect) {
        correctCount++;
      } else {
        mistakes.push({
          question_text: q.question_text || ans.question_text || "Question",
          user_answer: ans.user_answer,
          correct_answer: q.correct_answer || ans.correct_answer,
          explanation: q.explanation || ans.explanation || "Review this topic for more practice."
        });
      }
    });

    const score = Math.round((correctCount / total) * 100);
    const attempt_id = "att_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6);

    const attempt = {
      attempt_id,
      user_id: req.user.user_id,
      skill,
      topic_id_or_set_id: topic_id || "general",
      score,
      questions_correct: correctCount,
      questions_total: total,
      mistakes,
      timestamp: new Date().toISOString()
    };

    db.saveAttempt(req.user.user_id, attempt);

    // Update Profile topic score & overall
    const profile = db.getProfile(req.user.user_id);
    if (profile) {
      if (skill === "grammar") {
        profile.grammar_topic_scores = profile.grammar_topic_scores || {};
        profile.grammar_topic_scores[topic_id] = score;
        const vals = Object.values(profile.grammar_topic_scores);
        profile.skill_scores.grammar = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      } else if (skill === "vocabulary") {
        profile.vocabulary_set_scores = profile.vocabulary_set_scores || {};
        profile.vocabulary_set_scores[topic_id] = score;
        const vals = Object.values(profile.vocabulary_set_scores);
        profile.skill_scores.vocabulary = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      } else if (skill === "reading") {
        profile.reading_passage_scores = profile.reading_passage_scores || {};
        profile.reading_passage_scores[topic_id] = score;
        const vals = Object.values(profile.reading_passage_scores);
        profile.skill_scores.reading = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      }

      // Recompute overall
      const g = profile.skill_scores.grammar || 0;
      const v = profile.skill_scores.vocabulary || 0;
      const r = profile.skill_scores.reading || 0;
      const w = profile.skill_scores.writing || 0;
      profile.overall_score = w > 0 ? Math.round((g + v + r + w) / 4) : Math.round((g + v + r) / 3);

      if (profile.overall_score >= 90) profile.english_level = "C2";
      else if (profile.overall_score >= 80) profile.english_level = "C1";
      else if (profile.overall_score >= 65) profile.english_level = "B2";
      else if (profile.overall_score >= 45) profile.english_level = "B1";
      else if (profile.overall_score >= 25) profile.english_level = "A2";
      else profile.english_level = "A1";

      profile.total_learning_minutes = (profile.total_learning_minutes || 0) + duration_minutes;
      profile.total_questions_answered = (profile.total_questions_answered || 0) + total;

      db.saveProfile(req.user.user_id, profile);
    }

    res.json({
      attempt,
      updatedProfile: profile,
      score,
      questions_correct: correctCount,
      questions_total: total,
      mistakes
    });
  } catch (err) {
    console.error("Error in /api/grade-quiz:", err);
    res.status(500).json({ error: "Failed to grade quiz", details: err.message });
  }
});

// -------------------------------------------------------------
// Interactive Vocabulary Sentence Evaluation & Universal Dictionary
// -------------------------------------------------------------

// POST /api/evaluate-vocab-sentence — Evaluates a sentence written by the user using a vocabulary word
app.post("/api/evaluate-vocab-sentence", optionalAuth, async (req, res) => {
  try {
    const { word, definition, sentence } = req.body;
    if (!word || !sentence || !sentence.trim()) {
      return res.status(400).json({ error: "Word and sentence are required" });
    }

    const evaluation = await llm.evaluateVocabSentence({
      word: word.trim(),
      definition: (definition || "").trim(),
      user_sentence: sentence.trim()
    });

    // Update profile progress if user is authenticated and sentence is valid
    let profile = null;
    if (req.user && req.user.user_id) {
      profile = db.getProfile(req.user.user_id);
      if (profile) {
        profile.words_practiced = profile.words_practiced || {};
        profile.words_practiced[word.toLowerCase()] = {
          practiced_at: new Date().toISOString(),
          score: evaluation.score,
          sentence: sentence.trim()
        };

        profile.total_words_learned = Object.keys(profile.words_practiced).length;
        profile.total_learning_minutes = (profile.total_learning_minutes || 0) + 2;
        profile.total_questions_answered = (profile.total_questions_answered || 0) + 1;

        // Increment vocabulary skill score slightly on successful sentence practice
        if (evaluation.is_correct) {
          profile.skill_scores = profile.skill_scores || {};
          profile.skill_scores.vocabulary = Math.min(100, Math.max(50, (profile.skill_scores.vocabulary || 60) + 1));
        }

        db.saveProfile(req.user.user_id, profile);
      }
    }

    res.json({
      evaluation,
      updatedProfile: profile
    });
  } catch (err) {
    console.error("Error in /api/evaluate-vocab-sentence:", err);
    res.status(500).json({ error: "Sentence evaluation failed", details: err.message });
  }
});

// POST /api/lookup-word — Universal dictionary search for ANY English word with 24h caching
app.post("/api/lookup-word", optionalAuth, async (req, res) => {
  try {
    const { word } = req.body;
    if (!word || !word.trim()) {
      return res.status(400).json({ error: "Word is required" });
    }

    const cleanWord = word.trim().toLowerCase();
    const cacheKey = `dict:${cleanWord}`;

    // 1. Check database cache
    const cached = db.getCachedContent(cacheKey);
    if (cached) {
      return res.json({ wordData: cached, cached: true });
    }

    // 2. Fetch live definition from Gemini
    const wordData = await llm.lookupDictionaryWord(cleanWord);
    db.setCachedContent(cacheKey, "dictionary", cleanWord, "all", wordData);

    res.json({ wordData, cached: false });
  } catch (err) {
    console.error("Error in /api/lookup-word:", err);
    res.status(500).json({ error: "Word lookup failed", details: err.message });
  }
});

// POST /api/generate-vocab-words — Generate endless new words on demand
app.post("/api/generate-vocab-words", optionalAuth, async (req, res) => {
  try {
    const { category = "General", count = 8, existingWords = [] } = req.body;
    const wordsData = await llm.generateVocabWords({
      category: category.trim(),
      count: Math.min(20, Math.max(3, parseInt(count) || 8)),
      existingWords: Array.isArray(existingWords) ? existingWords : []
    });

    res.json({ words: wordsData.words || [] });
  } catch (err) {
    console.error("Error in /api/generate-vocab-words:", err);
    res.status(500).json({ error: "Word generation failed", details: err.message });
  }
});

// -------------------------------------------------------------
// Standard User Data Endpoints (Profile, Attempts, Chat, Writing, Reset)
// -------------------------------------------------------------

app.get("/api/profile", requireAuth, (req, res) => {
  try {
    const profile = db.getProfile(req.user.user_id);
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile", details: err.message });
  }
});

app.post("/api/profile", requireAuth, (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile) return res.status(400).json({ error: "Invalid profile data" });
    const saved = db.saveProfile(req.user.user_id, profile);
    res.json({ profile: saved });
  } catch (err) {
    res.status(500).json({ error: "Failed to save profile", details: err.message });
  }
});

app.get("/api/attempts", requireAuth, (req, res) => {
  try {
    const attempts = db.getAttempts(req.user.user_id);
    res.json({ attempts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attempts", details: err.message });
  }
});

app.post("/api/attempts", requireAuth, (req, res) => {
  try {
    const { attempt } = req.body;
    if (!attempt || !attempt.attempt_id) return res.status(400).json({ error: "Invalid attempt data" });
    const saved = db.saveAttempt(req.user.user_id, attempt);
    res.json({ attempt: saved });
  } catch (err) {
    res.status(500).json({ error: "Failed to save attempt", details: err.message });
  }
});

app.get("/api/chat-messages", optionalAuth, (req, res) => {
  try {
    const userId = req.user?.user_id || "guest";
    const messages = db.getChatMessages(userId);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat messages", details: err.message });
  }
});

app.post("/api/mentor-chat", optionalAuth, aiLimiter, async (req, res) => {
  try {
    const { history = [], message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const userId = req.user?.user_id || "guest";
    const trimmedMsg = message.trim();
    const userMsgId = "msg_u_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6);
    const userMsg = {
      message_id: userMsgId,
      user_id: userId,
      role: "user",
      content: trimmedMsg,
      timestamp: new Date().toISOString()
    };
    db.saveChatMessage(userId, userMsg);

    const aiReplyText = await llm.handleMentorChat(history, trimmedMsg);

    const assistantMsgId = "msg_a_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6);
    const assistantMsg = {
      message_id: assistantMsgId,
      user_id: userId,
      role: "assistant",
      content: aiReplyText,
      timestamp: new Date().toISOString()
    };
    db.saveChatMessage(userId, assistantMsg);

    const profile = req.user ? db.getProfile(req.user.user_id) : null;
    if (profile && req.user) {
      profile.mentor_messages_count = (profile.mentor_messages_count || 0) + 1;
      db.saveProfile(req.user.user_id, profile);
    }

    res.json({
      reply: aiReplyText,
      userMessage: userMsg,
      assistantMessage: assistantMsg,
      updatedProfile: profile
    });
  } catch (err) {
    console.error("Error in /api/mentor-chat:", err);
    res.status(500).json({ error: "Mentor response generation failed. Please retry.", details: err.message });
  }
});

app.get("/api/writing-submissions", requireAuth, (req, res) => {
  try {
    const submissions = db.getWritingSubmissions(req.user.user_id);
    res.json({ submissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch writing submissions", details: err.message });
  }
});

app.post("/api/writing-feedback", optionalAuth, aiLimiter, async (req, res) => {
  try {
    const { writing_type = "general", prompt_text = "", submitted_text = "" } = req.body;
    if (!submitted_text || !submitted_text.trim()) {
      return res.status(400).json({ error: "Submitted text cannot be empty" });
    }

    const trimmedText = submitted_text.trim();
    const wordCount = trimmedText.split(/\s+/).filter(Boolean).length;

    const feedback = await llm.handleWritingFeedback(trimmedText, writing_type, prompt_text);
    if (!feedback) {
      return res.status(500).json({ error: "Failed to generate structured feedback. Please retry." });
    }

    const submission_id = "sub_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6);
    const submission = {
      submission_id,
      user_id: req.user ? req.user.user_id : "guest",
      writing_type,
      prompt_text,
      submitted_text: trimmedText,
      word_count: wordCount,
      feedback,
      timestamp: new Date().toISOString()
    };

    let profile = null;
    if (req.user && req.user.user_id) {
      db.saveWritingSubmission(req.user.user_id, submission);

      profile = db.getProfile(req.user.user_id);
      if (profile) {
        const allSubs = db.getWritingSubmissions(req.user.user_id);
        const lastFive = allSubs.slice(0, 5);
        const avgWriting = Math.round(
          lastFive.reduce((acc, curr) => acc + (curr.feedback.overall_score || 0), 0) / lastFive.length
        );

        profile.skill_scores = profile.skill_scores || {};
        profile.skill_scores.writing = avgWriting;
        profile.writing_submissions_count = (profile.writing_submissions_count || 0) + 1;

        const g = profile.skill_scores.grammar || 0;
        const v = profile.skill_scores.vocabulary || 0;
        const r = profile.skill_scores.reading || 0;
        const w = profile.skill_scores.writing || 0;
        profile.overall_score = Math.round((g + v + r + w) / 4);

        if (profile.overall_score >= 90) profile.english_level = "C2";
        else if (profile.overall_score >= 80) profile.english_level = "C1";
        else if (profile.overall_score >= 65) profile.english_level = "B2";
        else if (profile.overall_score >= 45) profile.english_level = "B1";
        else if (profile.overall_score >= 25) profile.english_level = "A2";
        else profile.english_level = "A1";

        profile.total_learning_minutes = (profile.total_learning_minutes || 0) + 10;
        db.saveProfile(req.user.user_id, profile);
      }
    }

    res.json({
      submission,
      feedback,
      updatedProfile: profile
    });
  } catch (err) {
    console.error("Error in /api/writing-feedback:", err);
    res.status(500).json({ error: "Writing feedback evaluation failed. Please retry.", details: err.message });
  }
});

// POST /api/reset — Scoped data reset
app.post("/api/reset", requireAuth, (req, res) => {
  try {
    db.resetUserData(req.user.user_id);
    res.json({ success: true, message: "Your progress and practice attempts have been reset." });
  } catch (err) {
    res.status(500).json({ error: "Reset failed", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Spraivo Backend Server listening on http://localhost:${PORT}`);
});
