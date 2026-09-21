// SQLite Database Layer for LinguaPath using better-sqlite3 (ES Module)
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, "..", "server");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, "linguapath.db");
export const db = new Database(DB_PATH);

// Enable WAL mode for high performance and durability
db.pragma("journal_mode = WAL");

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS user_profile (
    user_id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS practice_attempts (
    attempt_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    skill TEXT NOT NULL,
    topic_id_or_set_id TEXT NOT NULL,
    score REAL NOT NULL,
    questions_correct INTEGER NOT NULL,
    questions_total INTEGER NOT NULL,
    mistakes TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS chat_messages (
    message_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS writing_submissions (
    submission_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    writing_type TEXT NOT NULL,
    prompt_text TEXT NOT NULL,
    submitted_text TEXT NOT NULL,
    word_count INTEGER NOT NULL,
    feedback TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS content_cache (
    cache_key TEXT PRIMARY KEY,
    content_type TEXT NOT NULL,
    topic TEXT NOT NULL,
    level TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

// -------------------------------------------------------------
// User Account Operations
// -------------------------------------------------------------
export function createUser({ user_id, email, password_hash, name }) {
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO users (user_id, email, password_hash, name, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(user_id, email.toLowerCase().trim(), password_hash, name.trim(), createdAt);
  return { user_id, email: email.toLowerCase().trim(), name: name.trim(), created_at: createdAt };
}

export function findUserByEmail(email) {
  if (!email) return null;
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase().trim());
}

export function findUserById(user_id) {
  if (!user_id) return null;
  return db.prepare("SELECT user_id, email, name, created_at FROM users WHERE user_id = ?").get(user_id);
}

// -------------------------------------------------------------
// User Profile Operations (Scoped to userId)
// -------------------------------------------------------------
export function getProfile(userId) {
  if (!userId) return null;
  const row = db.prepare("SELECT data FROM user_profile WHERE user_id = ?").get(userId);
  if (!row) return null;
  try {
    return JSON.parse(row.data);
  } catch (e) {
    return null;
  }
}

export function saveProfile(userId, profile) {
  if (!userId || !profile) return null;
  const now = new Date().toISOString();
  // Ensure the profile object has the authenticated user's ID
  const sanitizedProfile = { ...profile, user_id: userId };
  const dataStr = JSON.stringify(sanitizedProfile);
  const stmt = db.prepare(`
    INSERT INTO user_profile (user_id, data, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      data = excluded.data,
      updated_at = excluded.updated_at
  `);
  stmt.run(userId, dataStr, now);
  return sanitizedProfile;
}

export function updateUserGoal(userId, { learning_reason, focus_areas, exam_target }) {
  if (!userId) return null;
  const existing = getProfile(userId) || {
    user_id: userId,
    name: "Learner",
    english_level: "A1",
    overall_score: 0,
    skill_scores: { grammar: 0, vocabulary: 0, reading: 0, writing: 0 },
    streak_days: 1,
    level_check_completed: false
  };

  existing.learning_reason = learning_reason || existing.learning_reason || "General English";
  existing.focus_areas = Array.isArray(focus_areas) ? focus_areas : existing.focus_areas || ["Conversations", "Grammar"];
  existing.exam_target = exam_target !== undefined ? exam_target : existing.exam_target || null;

  return saveProfile(userId, existing);
}

// -------------------------------------------------------------
// Practice Attempts Operations (Scoped to userId)
// -------------------------------------------------------------
export function getAttempts(userId) {
  if (!userId) return [];
  const rows = db.prepare("SELECT * FROM practice_attempts WHERE user_id = ? ORDER BY timestamp ASC").all(userId);
  return rows.map((r) => ({
    attempt_id: r.attempt_id,
    user_id: r.user_id,
    skill: r.skill,
    topic_id_or_set_id: r.topic_id_or_set_id,
    score: r.score,
    questions_correct: r.questions_correct,
    questions_total: r.questions_total,
    mistakes: JSON.parse(r.mistakes || "[]"),
    timestamp: r.timestamp
  }));
}

export function saveAttempt(userId, attempt) {
  if (!userId || !attempt) return null;
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO practice_attempts
    (attempt_id, user_id, skill, topic_id_or_set_id, score, questions_correct, questions_total, mistakes, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    attempt.attempt_id,
    userId,
    attempt.skill,
    attempt.topic_id_or_set_id,
    attempt.score,
    attempt.questions_correct,
    attempt.questions_total,
    JSON.stringify(attempt.mistakes || []),
    attempt.timestamp || new Date().toISOString()
  );
  return { ...attempt, user_id: userId };
}

// -------------------------------------------------------------
// Chat Messages Operations (Scoped to userId)
// -------------------------------------------------------------
export function getChatMessages(userId) {
  if (!userId) return [];
  return db.prepare("SELECT * FROM chat_messages WHERE user_id = ? ORDER BY timestamp ASC").all(userId);
}

export function saveChatMessage(userId, msg) {
  if (!userId || !msg) return null;
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO chat_messages (message_id, user_id, role, content, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(
    msg.message_id,
    userId,
    msg.role,
    msg.content,
    msg.timestamp || new Date().toISOString()
  );
  return { ...msg, user_id: userId };
}

// -------------------------------------------------------------
// Writing Submissions Operations (Scoped to userId)
// -------------------------------------------------------------
export function getWritingSubmissions(userId) {
  if (!userId) return [];
  const rows = db.prepare("SELECT * FROM writing_submissions WHERE user_id = ? ORDER BY timestamp DESC").all(userId);
  return rows.map((r) => ({
    submission_id: r.submission_id,
    user_id: r.user_id,
    writing_type: r.writing_type,
    prompt_text: r.prompt_text,
    submitted_text: r.submitted_text,
    word_count: r.word_count,
    feedback: JSON.parse(r.feedback || "{}"),
    timestamp: r.timestamp
  }));
}

export function saveWritingSubmission(userId, sub) {
  if (!userId || !sub) return null;
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO writing_submissions
    (submission_id, user_id, writing_type, prompt_text, submitted_text, word_count, feedback, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    sub.submission_id,
    userId,
    sub.writing_type,
    sub.prompt_text,
    sub.submitted_text,
    sub.word_count,
    JSON.stringify(sub.feedback || {}),
    sub.timestamp || new Date().toISOString()
  );
  return { ...sub, user_id: userId };
}

// -------------------------------------------------------------
// 24-Hour Content Caching (topic + level)
// Safe to share across users; never contains personal user data
// -------------------------------------------------------------
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getCachedContent(cacheKey) {
  if (!cacheKey) return null;
  const row = db.prepare("SELECT data, created_at FROM content_cache WHERE cache_key = ?").get(cacheKey);
  if (!row) return null;
  if (Date.now() - row.created_at > CACHE_TTL_MS) {
    // Stale cache
    return null;
  }
  try {
    return JSON.parse(row.data);
  } catch (e) {
    return null;
  }
}

export function setCachedContent(cacheKey, contentType, topic, level, data) {
  if (!cacheKey || !data) return null;
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO content_cache (cache_key, content_type, topic, level, data, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    cacheKey,
    contentType || "general",
    topic || "general",
    level || "all",
    JSON.stringify(data),
    Date.now()
  );
  return data;
}

// -------------------------------------------------------------
// User-Scoped Data Reset (Never resets other users' data)
// -------------------------------------------------------------
export function resetUserData(userId) {
  if (!userId) return;
  const delProfile = db.prepare("DELETE FROM user_profile WHERE user_id = ?");
  const delAttempts = db.prepare("DELETE FROM practice_attempts WHERE user_id = ?");
  const delChat = db.prepare("DELETE FROM chat_messages WHERE user_id = ?");
  const delWriting = db.prepare("DELETE FROM writing_submissions WHERE user_id = ?");

  const runTx = db.transaction(() => {
    delProfile.run(userId);
    delAttempts.run(userId);
    delChat.run(userId);
    delWriting.run(userId);
  });
  runTx();
}

export default {
  db,
  createUser,
  findUserByEmail,
  findUserById,
  getProfile,
  saveProfile,
  updateUserGoal,
  getAttempts,
  saveAttempt,
  getChatMessages,
  saveChatMessage,
  getWritingSubmissions,
  saveWritingSubmission,
  getCachedContent,
  setCachedContent,
  resetUserData
};
