import React, { useState } from "react";
import confetti from "canvas-confetti";
import { GRAMMAR_TOPICS } from "../data/grammarData";
import { VOCABULARY_SETS } from "../data/vocabularyData";
import { READING_PASSAGES } from "../data/readingData";
import { logPracticeAttempt } from "../services/storageService";
import QuestionCard from "../components/QuestionCard";
import {
  Target,
  BookOpen,
  Layers,
  FileText,
  Search,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from "lucide-react";

export default function PracticeCenterScreen({
  userProfile,
  onUpdateProfile,
  onOpenGrammarTopic,
  onOpenVocabSet,
  onNavigate
}) {
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "grammar" | "vocabulary" | "reading"
  const [searchQuery, setSearchQuery] = useState("");

  // Reading practice state
  const [activeReadingPassage, setActiveReadingPassage] = useState(null);
  const [readingQuestionIdx, setReadingQuestionIdx] = useState(0);
  const [attemptAnswers, setAttemptAnswers] = useState([]);
  const [readingSummary, setReadingSummary] = useState(null);

  // Compile all items
  const allItems = [
    ...GRAMMAR_TOPICS.map((g) => ({
      id: g.topic_id,
      title: g.title,
      skill: "grammar",
      level: g.level,
      meta: "6 Questions • Theory & Pitfalls",
      score: userProfile?.grammar_topic_scores?.[g.topic_id],
      data: g
    })),
    ...VOCABULARY_SETS.map((v) => ({
      id: v.set_id,
      title: v.title,
      skill: "vocabulary",
      level: v.level,
      meta: `${v.words.length} Words • 3D Flashcards & Quiz`,
      score: userProfile?.vocabulary_set_scores?.[v.set_id],
      data: v
    })),
    ...READING_PASSAGES.map((r) => ({
      id: r.passage_id,
      title: r.title,
      skill: "reading",
      level: r.level,
      meta: `${r.questions.length} Questions • Contextual Passage`,
      score: userProfile?.reading_passage_scores?.[r.passage_id],
      data: r
    }))
  ];

  // Filter items
  const filteredItems = allItems.filter((item) => {
    const matchesSkill = activeFilter === "all" || item.skill === activeFilter;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSkill && matchesQuery;
  });

  const handleStartItem = (item) => {
    if (item.skill === "grammar") {
      onOpenGrammarTopic(item.id);
    } else if (item.skill === "vocabulary") {
      onOpenVocabSet(item.id);
    } else if (item.skill === "reading") {
      setActiveReadingPassage(item.data);
      setReadingQuestionIdx(0);
      setAttemptAnswers([]);
      setReadingSummary(null);
    }
  };

  const handleReadingAnswerSubmit = (submission) => {
    setAttemptAnswers((prev) => [...prev, submission]);
  };

  const handleNextReadingQuestion = () => {
    if (!activeReadingPassage) return;
    if (readingQuestionIdx < activeReadingPassage.questions.length - 1) {
      setReadingQuestionIdx((prev) => prev + 1);
    } else {
      finishReadingPassage();
    }
  };

  const finishReadingPassage = () => {
    if (!activeReadingPassage) return;

    const total = activeReadingPassage.questions.length;
    const correctCount = attemptAnswers.filter((a) => a.is_correct).length;
    const score = Math.round((correctCount / total) * 100);

    const mistakes = attemptAnswers
      .filter((a) => !a.is_correct)
      .map((a) => ({
        question_text: a.question_text,
        user_answer: a.user_answer,
        correct_answer: a.correct_answer,
        explanation: a.explanation
      }));

    const result = logPracticeAttempt({
      skill: "reading",
      topic_id_or_set_id: activeReadingPassage.passage_id,
      score,
      questions_correct: correctCount,
      questions_total: total,
      mistakes,
      duration_minutes: 8
    });

    if (result && result.updatedProfile) {
      onUpdateProfile(result.updatedProfile);
    }

    setReadingSummary({
      score,
      correctCount,
      total,
      mistakes
    });

    if (score >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  return (
    <div className="app-container">
      {/* If reading passage is open, run Reading Practice Mode */}
      {activeReadingPassage ? (
        <div>
          <button
            id="back-to-practice-catalog-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveReadingPassage(null)}
            style={{ marginBottom: "20px" }}
          >
            <ArrowLeft size={16} />
            <span>Exit to Practice Catalog</span>
          </button>

          {!readingSummary ? (
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "24px", alignItems: "start" }}>
              {/* Passage Text Column */}
              <div
                className="card"
                style={{
                  position: "sticky",
                  top: "90px",
                  maxHeight: "calc(100vh - 120px)",
                  overflowY: "auto",
                  padding: "28px",
                  background: "var(--bg-elevated)",
                  borderLeft: "4px solid #10b981"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span className="badge badge-success">Reading Comprehension</span>
                  <span className="badge badge-gray">{activeReadingPassage.level}</span>
                </div>
                <h2 style={{ marginBottom: "16px", color: "var(--text-primary)" }}>{activeReadingPassage.title}</h2>
                <div style={{ fontSize: "1rem", lineHeight: "1.75", color: "var(--text-secondary)", whiteSpace: "pre-line" }}>
                  {activeReadingPassage.text}
                </div>
              </div>

              {/* Questions Runner Column */}
              <div>
                <div className="progress-bar-container" style={{ marginBottom: "18px" }}>
                  <div
                    className="progress-bar-fill fill-reading"
                    style={{ width: `${((readingQuestionIdx + 1) / activeReadingPassage.questions.length) * 100}%` }}
                  />
                </div>

                <QuestionCard
                  key={activeReadingPassage.questions[readingQuestionIdx].question_id}
                  question={activeReadingPassage.questions[readingQuestionIdx]}
                  currentIndex={readingQuestionIdx}
                  totalQuestions={activeReadingPassage.questions.length}
                  onAnswerSubmit={handleReadingAnswerSubmit}
                  onNext={handleNextReadingQuestion}
                  isLast={readingQuestionIdx === activeReadingPassage.questions.length - 1}
                />
              </div>
            </div>
          ) : (
            <div className="card" style={{ maxWidth: "720px", margin: "0 auto", padding: "36px", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: readingSummary.score >= 70 ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                  border: `2px solid ${readingSummary.score >= 70 ? "#10b981" : "#f59e0b"}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px"
                }}
              >
                {readingSummary.score >= 70 ? (
                  <CheckCircle2 size={32} color="#10b981" />
                ) : (
                  <AlertTriangle size={32} color="#f59e0b" />
                )}
              </div>

              <h2 style={{ color: "var(--text-primary)" }}>Reading Practice Complete!</h2>
              <p style={{ marginTop: "4px", color: "var(--text-secondary)" }}>Passage: {activeReadingPassage.title}</p>

              <div
                style={{
                  display: "inline-block",
                  margin: "24px auto",
                  padding: "16px 36px",
                  background: "var(--bg-subtle)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Comprehension Score
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: 800, color: "#10b981" }}>
                  {readingSummary.score}%
                </div>
                <div style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                  {readingSummary.correctCount} of {readingSummary.total} correct
                </div>
              </div>

              {/* Mistakes review */}
              {readingSummary.mistakes.length > 0 ? (
                <div style={{ textAlign: "left", marginTop: "24px", marginBottom: "28px" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", color: "#fca5a5" }}>
                    Review Mistakes ({readingSummary.mistakes.length})
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {readingSummary.mistakes.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "rgba(239, 68, 68, 0.08)",
                          border: "1px solid rgba(239, 68, 68, 0.25)",
                          borderRadius: "var(--radius-md)",
                          padding: "16px"
                        }}
                      >
                        <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                          {m.question_text}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "8px" }}>
                          <div style={{ fontSize: "0.85rem", color: "#fca5a5" }}>
                            Your answer: <strong>{m.user_answer || "(None)"}</strong>
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "#6ee7b7" }}>
                            Correct answer: <strong>{m.correct_answer}</strong>
                          </div>
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                          <strong style={{ color: "var(--text-primary)" }}>Explanation: </strong>
                          {m.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ margin: "20px 0", color: "#6ee7b7", fontWeight: 600 }}>
                  🎉 Exceptional reading comprehension! 100% accuracy.
                </div>
              )}

              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setReadingQuestionIdx(0);
                    setAttemptAnswers([]);
                    setReadingSummary(null);
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Re-read & Retake</span>
                </button>
                <button
                  id="exit-reading-summary-btn"
                  className="btn btn-primary"
                  onClick={() => setActiveReadingPassage(null)}
                >
                  <span>Back to Practice Center</span>
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => onNavigate("dashboard")}
                >
                  <span>Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* CATALOG VIEW */
        <div>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="badge badge-primary">Practice Hub</span>
              <span className="badge badge-gray">{allItems.length} Total Learning Modules</span>
            </div>
            <h1>Practice Center</h1>
            <p style={{ marginTop: "6px" }}>
              Filter across Grammar topics, Vocabulary sets, and Reading comprehension passages to strengthen your skills.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
              flexWrap: "wrap"
            }}
          >
            {/* Filter Pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { id: "all", label: "All Modules", count: allItems.length },
                { id: "grammar", label: "Grammar", count: 10 },
                { id: "vocabulary", label: "Vocabulary", count: 3 },
                { id: "reading", label: "Reading", count: 3 }
              ].map((f) => (
                <button
                  key={f.id}
                  id={`filter-btn-${f.id}`}
                  className={`btn btn-sm ${activeFilter === f.id ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  <span>{f.label}</span>
                  <span
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      padding: "2px 6px",
                      borderRadius: "999px",
                      fontSize: "0.75rem"
                    }}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                id="practice-search-input"
                type="text"
                className="fill-input"
                placeholder="Search topics or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: "36px", fontSize: "0.9rem" }}
              />
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid-2">
            {filteredItems.map((item) => {
              const hasScore = item.score !== undefined && item.score !== null;

              return (
                <div
                  key={item.id}
                  id={`practice-item-${item.id}`}
                  className="card card-interactive"
                  onClick={() => handleStartItem(item)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "22px"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {item.skill === "grammar" && <BookOpen size={16} color="#818cf8" />}
                        {item.skill === "vocabulary" && <Layers size={16} color="#38bdf8" />}
                        {item.skill === "reading" && <FileText size={16} color="#34d399" />}
                        <span
                          className={`badge ${
                            item.skill === "grammar"
                              ? "badge-primary"
                              : item.skill === "vocabulary"
                              ? "badge-warning"
                              : "badge-success"
                          }`}
                        >
                          {item.skill}
                        </span>
                        <span className="badge badge-gray">{item.level}</span>
                      </div>

                      {hasScore ? (
                        <span className={`badge ${item.score >= 75 ? "badge-success" : item.score >= 50 ? "badge-warning" : "badge-danger"}`}>
                          {item.score}%
                        </span>
                      ) : (
                        <span className="badge badge-gray">Not started</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {item.meta}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "14px", marginTop: "14px", borderTop: "1px solid var(--border-subtle)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem" }}>
                      <span>Start Practice</span>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
