// Storage & API Sync Service for LinguaPath (ES Module)
// Communicates with Express + SQLite backend with httpOnly session cookies and credentials: 'include'

const LOCAL_PROFILE_KEY = "linguapath_active_profile";
const LOCAL_ATTEMPTS_KEY = "linguapath_active_attempts";
const LOCAL_MESSAGES_KEY = "linguapath_active_chat";
const LOCAL_WRITING_KEY = "linguapath_active_writing";
const LOCAL_STARRED_KEY = "spraivo_starred_words";
const LOCAL_COMPLETED_TOPICS_KEY = "spraivo_completed_writing_topics";
const LOCAL_VOCAB_HISTORY_KEY = "spraivo_vocab_history";

export function calculateEnglishLevel(overallScore) {
  if (overallScore >= 90) return "C2";
  if (overallScore >= 80) return "C1";
  if (overallScore >= 65) return "B2";
  if (overallScore >= 45) return "B1";
  if (overallScore >= 25) return "A2";
  return "A1";
}

export function getEnglishLevelTitle(level) {
  switch (level) {
    case "C2":
      return "Proficient / Mastery (C2)";
    case "C1":
      return "Advanced (C1)";
    case "B2":
      return "Upper-Intermediate (B2)";
    case "B1":
      return "Intermediate (B1)";
    case "A2":
      return "Elementary (A2)";
    case "A1":
    default:
      return "Beginner (A1)";
  }
}

function getTodayDateString() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

// -------------------------------------------------------------
// Authentication Services
// -------------------------------------------------------------

export async function checkAuthSession() {
  try {
    const res = await fetch("/api/me", {
      method: "GET",
      credentials: "include"
    });
    if (res.ok) {
      const data = await res.json();
      if (data.profile) {
        localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data.profile));
      }
      return data; // { user: { user_id, email, name }, profile: {...} | null }
    }
  } catch (err) {
    console.warn("Session check failed:", err.message);
  }
  return null;
}

export async function loginUser(email, password, rememberMe = false) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, rememberMe })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Sign in failed. Please check your credentials.");
  }

  clearLocalUserData();

  if (data.profile) {
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data.profile));
  }
  return data;
}

export async function registerUser(email, password, name) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, name })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Registration failed. Please try again.");
  }

  clearLocalUserData();
  return data;
}

export async function logoutUser() {
  try {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include"
    });
  } catch (e) {
    console.warn("Logout fetch failed:", e.message);
  }
  clearLocalUserData();
}

export function clearLocalUserData() {
  try {
    localStorage.removeItem(LOCAL_PROFILE_KEY);
    localStorage.removeItem(LOCAL_ATTEMPTS_KEY);
    localStorage.removeItem(LOCAL_MESSAGES_KEY);
    localStorage.removeItem(LOCAL_WRITING_KEY);
  } catch (e) {}
}

// -------------------------------------------------------------
// User Profile & Goal Management
// -------------------------------------------------------------

export function getUserProfile() {
  try {
    const raw = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!p.skill_scores) p.skill_scores = { grammar: 0, vocabulary: 0, reading: 0, writing: 0 };
    if (p.writing_submissions_count === undefined) p.writing_submissions_count = 0;
    if (p.mentor_messages_count === undefined) p.mentor_messages_count = 0;
    return p;
  } catch (err) {
    return null;
  }
}

export function saveUserProfile(profile) {
  if (!profile) return;
  try {
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {}

  fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ profile })
  }).catch((err) => {
    console.warn("Could not sync profile to server:", err.message);
  });
}

// Initialize Profile from Goal Questionnaire
export function initializeUserProfile({
  userId,
  name = "Learner",
  learning_reason = "Get better at conversations",
  focus_areas = ["Speaking", "Fluency", "Grammar"],
  exam_target = null
}) {
  const profile = {
    user_id: userId,
    name: name.trim() || "Learner",
    learning_reason,
    focus_areas,
    exam_target,
    level_check_completed: false,
    english_level: "A1",
    overall_score: 0,
    skill_scores: {
      grammar: 0,
      vocabulary: 0,
      reading: 0,
      writing: 0
    },
    grammar_topic_scores: {},
    vocabulary_set_scores: {},
    reading_passage_scores: {},
    writing_submissions_count: 0,
    mentor_messages_count: 0,
    streak_days: 1,
    last_active_date: getTodayDateString(),
    total_learning_minutes: 0,
    total_questions_answered: 0,
    created_at: new Date().toISOString()
  };

  saveUserProfile(profile);
  return profile;
}

// Update Goal without resetting scores or history
export async function updateUserGoal({ learning_reason, focus_areas, exam_target }) {
  const res = await fetch("/api/update-goal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ learning_reason, focus_areas, exam_target })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to update your learning goal");
  }

  const data = await res.json();
  if (data.profile) {
    saveUserProfile(data.profile);
    return data.profile;
  }
  return getUserProfile();
}

// -------------------------------------------------------------
// Live Assessment (Dashboard Level Check)
// -------------------------------------------------------------

export async function generateAssessment() {
  const res = await fetch("/api/generate-assessment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate level check. Please retry.");
  }

  const data = await res.json();
  return data.assessment;
}

export async function gradeAssessment({ answers, questions }) {
  const res = await fetch("/api/grade-assessment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ answers, questions })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Assessment evaluation failed. Please retry.");
  }

  const data = await res.json();
  if (data.profile) {
    saveUserProfile(data.profile);
  }
  return data;
}

// -------------------------------------------------------------
// Live Lesson & Quiz Generation (Grammar, Vocab, Reading)
// -------------------------------------------------------------

export async function generateLesson(topic, level = "B1", skill = "grammar") {
  const res = await fetch("/api/generate-lesson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ topic, level, skill })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Lesson loading failed. Please retry.");
  }

  const data = await res.json();
  return data.lesson;
}

export async function generateQuiz(topic, level = "B1", skill = "grammar") {
  const res = await fetch("/api/generate-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ topic, level, skill })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Quiz generation failed. Please retry.");
  }

  const data = await res.json();
  return data.quiz;
}

export async function gradeQuiz({ topic_id, topic_title, skill = "grammar", answers, questions }) {
  const res = await fetch("/api/grade-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ topic_id, topic_title, skill, answers, questions })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Quiz evaluation failed. Please retry.");
  }

  const data = await res.json();
  if (data.updatedProfile) {
    saveUserProfile(data.updatedProfile);
  }
  return data;
}

// -------------------------------------------------------------
// Practice Attempts
// -------------------------------------------------------------

export function logPracticeAttempt({
  skill,
  topic_id_or_set_id,
  score,
  questions_correct,
  questions_total,
  mistakes = [],
  duration_minutes = 5
}) {
  const profile = getUserProfile() || {};
  const attempts = getPracticeAttempts();

  const newAttempt = {
    attempt_id: "att_" + Date.now(),
    skill,
    topic_id_or_set_id,
    score,
    questions_correct,
    questions_total,
    mistakes,
    duration_minutes,
    timestamp: new Date().toISOString()
  };

  attempts.unshift(newAttempt);
  try {
    localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (e) {}

  // Also sync to server if authenticated
  fetch("/api/attempts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(newAttempt)
  }).catch(() => {});

  // Update profile
  profile.total_questions_answered = (profile.total_questions_answered || 0) + questions_total;
  profile.total_learning_minutes = (profile.total_learning_minutes || 0) + duration_minutes;

  if (!profile.skill_scores) {
    profile.skill_scores = { grammar: 0, vocabulary: 0, reading: 0, writing: 0 };
  }

  if (skill === "reading") {
    if (!profile.reading_passage_scores) profile.reading_passage_scores = {};
    profile.reading_passage_scores[topic_id_or_set_id] = score;
    const scores = Object.values(profile.reading_passage_scores);
    profile.skill_scores.reading = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  const s = profile.skill_scores;
  const overall = Math.round((s.grammar + s.vocabulary + s.reading + (s.writing || 0)) / 4);
  profile.overall_score = overall;
  profile.english_level = calculateEnglishLevel(overall);

  saveUserProfile(profile);

  return { newAttempt, updatedProfile: profile };
}

export function getPracticeAttempts() {
  try {
    const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export async function fetchPracticeAttemptsFromServer() {
  try {
    const res = await fetch("/api/attempts", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(data.attempts || []));
      return data.attempts || [];
    }
  } catch (err) {
    console.warn("Failed to fetch attempts from server:", err.message);
  }
  return getPracticeAttempts();
}

// -------------------------------------------------------------
// AI Mentor Chat
// -------------------------------------------------------------

export async function getChatMessages() {
  try {
    const res = await fetch("/api/chat-messages", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(data.messages || []));
      return data.messages || [];
    }
  } catch (e) {
    console.warn("Could not fetch messages from server:", e.message);
  }
  try {
    const raw = localStorage.getItem(LOCAL_MESSAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function sendMentorMessage(history, message) {
  const res = await fetch("/api/mentor-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      history,
      message
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to reach AI Mentor. Please retry.");
  }

  const data = await res.json();
  if (data.updatedProfile) {
    saveUserProfile(data.updatedProfile);
  }
  return data;
}

// -------------------------------------------------------------
// Writing Lab
// -------------------------------------------------------------

export async function getWritingSubmissions() {
  try {
    const res = await fetch("/api/writing-submissions", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(LOCAL_WRITING_KEY, JSON.stringify(data.submissions || []));
      return data.submissions || [];
    }
  } catch (e) {
    console.warn("Could not fetch writing submissions:", e.message);
  }
  try {
    const raw = localStorage.getItem(LOCAL_WRITING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function submitWriting({ writing_type, prompt_text, submitted_text }) {
  const res = await fetch("/api/writing-feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      writing_type,
      prompt_text,
      submitted_text
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Writing evaluation failed. Please retry.");
  }

  const data = await res.json();
  if (data.updatedProfile) {
    saveUserProfile(data.updatedProfile);
  }

  // Record completed topic so it is never repeated
  addCompletedWritingTopic(prompt_text);

  // Persist locally for instant offline/history access
  try {
    const localList = JSON.parse(localStorage.getItem(LOCAL_WRITING_KEY) || "[]");
    const newEntry = data.submission || {
      submission_id: "sub_local_" + Date.now().toString(36),
      writing_type,
      prompt_text,
      submitted_text,
      word_count: submitted_text.split(/\s+/).filter(Boolean).length,
      feedback: data.feedback,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_WRITING_KEY, JSON.stringify([newEntry, ...localList]));
  } catch (e) {}

  return data;
}

// -------------------------------------------------------------
// Vocabulary Interactive Learning & Universal Dictionary
// -------------------------------------------------------------

export async function evaluateVocabSentence(word, definition, sentence) {
  const res = await fetch("/api/evaluate-vocab-sentence", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ word, definition, sentence })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to evaluate sentence.");
  }

  const data = await res.json();
  if (data.updatedProfile) {
    saveUserProfile(data.updatedProfile);
  }
  return data;
}

export async function lookupDictionaryWord(word) {
  const res = await fetch("/api/lookup-word", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ word })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Word lookup failed.");
  }

  const data = await res.json();
  return data.wordData;
}

export async function generateVocabWords(category, count = 8, existingWords = []) {
  const res = await fetch("/api/generate-vocab-words", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ category, count, existingWords })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate new words.");
  }

  const data = await res.json();
  return data.words || [];
}

// -------------------------------------------------------------
// Reset
// -------------------------------------------------------------

export async function resetUserProfile() {
  clearLocalUserData();
  try {
    await fetch("/api/reset", {
      method: "POST",
      credentials: "include"
    });
  } catch (e) {}
}

// -------------------------------------------------------------
// Starred Words (Vocabulary Bookmarking)
// -------------------------------------------------------------

export function getStarredWords() {
  try {
    const raw = localStorage.getItem(LOCAL_STARRED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveStarredWords(wordsList) {
  try {
    localStorage.setItem(LOCAL_STARRED_KEY, JSON.stringify(wordsList || []));
  } catch (e) {
    console.warn("Failed to persist starred words:", e.message);
  }
}

export function toggleStarredWord(wordObj) {
  if (!wordObj || !wordObj.word) return false;
  const current = getStarredWords();
  const cleanTarget = wordObj.word.trim().toLowerCase();
  const existsIndex = current.findIndex((w) => w.word.trim().toLowerCase() === cleanTarget);

  let updated;
  let isNowStarred = false;
  if (existsIndex >= 0) {
    // Unstar
    updated = current.filter((_, idx) => idx !== existsIndex);
    isNowStarred = false;
  } else {
    // Star
    updated = [
      {
        word: wordObj.word,
        pronunciation: wordObj.pronunciation || "",
        part_of_speech: wordObj.part_of_speech || "word",
        meaning: wordObj.meaning || "",
        example_sentence: wordObj.example_sentence || "",
        memory_tip: wordObj.memory_tip || "",
        synonyms: wordObj.synonyms || [],
        starred_at: new Date().toISOString()
      },
      ...current
    ];
    isNowStarred = true;
  }

  saveStarredWords(updated);
  return isNowStarred;
}

export function isWordStarred(wordText) {
  if (!wordText) return false;
  const current = getStarredWords();
  const cleanTarget = wordText.trim().toLowerCase();
  return current.some((w) => w.word.trim().toLowerCase() === cleanTarget);
}

// -------------------------------------------------------------
// Non-Repeating Writing Topics & History
// -------------------------------------------------------------

export function getCompletedWritingTopics() {
  try {
    const raw = localStorage.getItem(LOCAL_COMPLETED_TOPICS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addCompletedWritingTopic(topicTitle) {
  if (!topicTitle || !topicTitle.trim()) return;
  const current = getCompletedWritingTopics();
  const clean = topicTitle.trim().toLowerCase();
  if (!current.map((t) => t.toLowerCase()).includes(clean)) {
    const updated = [topicTitle.trim(), ...current];
    try {
      localStorage.setItem(LOCAL_COMPLETED_TOPICS_KEY, JSON.stringify(updated));
    } catch (e) {}
  }
}

// -------------------------------------------------------------
// Vocabulary Session History
// -------------------------------------------------------------

export function getVocabSessionHistory() {
  try {
    const raw = localStorage.getItem(LOCAL_VOCAB_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveVocabSessionHistory(sessionData) {
  if (!sessionData) return;
  const current = getVocabSessionHistory();
  const entry = {
    id: "vsess_" + Date.now().toString(36),
    timestamp: new Date().toISOString(),
    ...sessionData
  };
  const updated = [entry, ...current].slice(0, 50); // Keep latest 50
  try {
    localStorage.setItem(LOCAL_VOCAB_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {}
  return entry;
}

