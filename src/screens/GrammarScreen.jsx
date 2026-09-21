import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { GRAMMAR_TOPICS, GRAMMAR_CATEGORIES } from "../data/grammarData";
import {
  generateQuiz,
  gradeQuiz
} from "../services/storageService";
import QuestionCard from "../components/QuestionCard";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  RefreshCw,
  Search,
  BookOpen,
  Layers,
  HelpCircle,
  Award
} from "lucide-react";

export default function GrammarScreen({
  userProfile,
  onUpdateProfile,
  initialTopicId = null,
  onNavigate
}) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [viewState, setViewState] = useState("list"); // "list" | "detail" | "practice" | "summary"
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLessonTab, setActiveLessonTab] = useState("all"); // "all" | "basic" | "intermediate" | "advanced" | "types" | "mistakes"

  // Quiz states
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizError, setQuizError] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [attemptAnswers, setAttemptAnswers] = useState([]);
  const [isGrading, setIsGrading] = useState(false);
  const [lastAttemptSummary, setLastAttemptSummary] = useState(null);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setActiveLessonTab("all");
    setViewState("detail");
    setQuizData(null);
    setAttemptAnswers([]);
    setLastAttemptSummary(null);
    setQuizError("");
  };

  // If initialTopicId was passed (e.g. from Recommendation card click), open it directly
  useEffect(() => {
    if (initialTopicId) {
      const topic = GRAMMAR_TOPICS.find((t) => t.topic_id === initialTopicId);
      if (topic) {
        handleSelectTopic(topic);
      }
    }
  }, [initialTopicId]);

  const handleStartPractice = (useAI = false) => {
    if (!selectedTopic) return;

    if (useAI) {
      // Generate live questions from Gemini
      setQuizLoading(true);
      setQuizError("");
      setQuizData(null);
      setQuestionIndex(0);
      setAttemptAnswers([]);
      setLastAttemptSummary(null);
      setViewState("practice");

      const userLevel = userProfile?.english_level || "B1";
      generateQuiz(selectedTopic.title, userLevel, "grammar")
        .then((quiz) => {
          if (!quiz || !quiz.questions || quiz.questions.length === 0) {
            throw new Error("No quiz questions were returned. Loading standard quiz.");
          }
          setQuizData(quiz);
        })
        .catch((err) => {
          console.warn("AI Quiz generation failed, falling back to pre-authored questions:", err);
          // Fallback to built-in high quality questions
          setQuizData({
            title: `${selectedTopic.title} Practice Quiz`,
            questions: selectedTopic.questions || []
          });
        })
        .finally(() => {
          setQuizLoading(false);
        });
    } else {
      // Instant load of high-quality verified questions
      setQuizData({
        title: `${selectedTopic.title} Comprehensive Practice`,
        questions: selectedTopic.questions || []
      });
      setQuestionIndex(0);
      setAttemptAnswers([]);
      setLastAttemptSummary(null);
      setViewState("practice");
    }
  };

  const handleAnswerSubmit = (submission) => {
    setAttemptAnswers((prev) => {
      const filtered = prev.filter((a) => a.question_id !== submission.question_id);
      return [...filtered, submission];
    });
  };

  const handleNextQuestion = () => {
    if (!quizData || !quizData.questions) return;
    if (questionIndex < quizData.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      finishPractice();
    }
  };

  const finishPractice = async () => {
    if (!selectedTopic || !quizData) return;
    setIsGrading(true);

    try {
      const res = await gradeQuiz({
        topic_id: selectedTopic.topic_id,
        topic_title: selectedTopic.title,
        skill: "grammar",
        answers: attemptAnswers,
        questions: quizData.questions
      });

      if (res && res.updatedProfile && onUpdateProfile) {
        onUpdateProfile(res.updatedProfile);
      }

      setLastAttemptSummary(res);
      setViewState("summary");

      if (res.score >= 70) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore confetti animation error if canvas is not ready
        }
      }
    } catch (err) {
      console.error("Failed to grade quiz:", err);
      alert(err.message || "Evaluation failed. Please try submitting again.");
    } finally {
      setIsGrading(false);
    }
  };

  // Filter topics based on category tab & search query
  const filteredTopics = GRAMMAR_TOPICS.filter((t) => {
    const matchesCategory = activeCategory === "All Topics" || t.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.quick_summary && t.quick_summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* ========================================================================= */}
      {/* 1. TOPICS LIST VIEW */}
      {/* ========================================================================= */}
      {viewState === "list" && (
        <div>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
              <span className="badge badge-primary">Comprehensive Curriculum</span>
              <span className="badge badge-gray">Basic to Advanced</span>
              <span className="badge badge-gray">{GRAMMAR_TOPICS.length} Complete Modules</span>
            </div>
            <h1>English Grammar Master Curriculum</h1>
            <p style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "840px" }}>
              Explore comprehensive explanations from basic foundations to advanced mastery across all 27 core grammatical topics. Every module explains definitions, full taxonomy types, structural rules, real-world examples, and common traps.
            </p>
          </div>

          {/* Search Bar & Category Filters */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                position: "relative",
                marginBottom: "16px",
                maxWidth: "600px"
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)"
                }}
              />
              <input
                type="text"
                id="grammar-search-input"
                placeholder="Search any grammar topic, rule, or concept (e.g., Verbs, Tenses, Modals)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem"
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {GRAMMAR_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  id={`grammar-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  className={`btn btn-sm ${activeCategory === cat ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    borderRadius: "20px",
                    padding: "6px 14px",
                    fontSize: "0.85rem"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Cards Grid */}
          <div className="grid-2">
            {filteredTopics.map((topic, idx) => {
              const score = userProfile?.grammar_topic_scores?.[topic.topic_id];
              const hasScore = score !== undefined && score !== null;

              return (
                <div
                  key={topic.topic_id}
                  id={`grammar-topic-card-${topic.topic_id}`}
                  className="card card-interactive"
                  onClick={() => handleSelectTopic(topic)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "24px"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "6px" }}>
                      <span className="badge badge-gray" style={{ fontSize: "0.75rem" }}>
                        {topic.category}
                      </span>
                      <span className="badge badge-primary" style={{ fontSize: "0.75rem" }}>
                        Basic ➔ Advanced
                      </span>
                      {hasScore ? (
                        <span className={`badge ${score >= 75 ? "badge-success" : score >= 50 ? "badge-warning" : "badge-danger"}`} style={{ fontSize: "0.75rem" }}>
                          Score: {score}%
                        </span>
                      ) : (
                        <span className="badge badge-gray" style={{ fontSize: "0.75rem" }}>
                          Not started
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "1.35rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                      {idx + 1}. {topic.title}
                    </h3>

                    <p style={{ fontSize: "0.88rem", lineHeight: "1.5", color: "var(--text-secondary)", marginBottom: "16px" }}>
                      {topic.quick_summary || (topic.lesson_text ? topic.lesson_text.substring(0, 115) + "..." : `Master foundational rules and usage for ${topic.title}.`)}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {topic.taxonomy_types ? `${topic.taxonomy_types.length} Types Included` : "5–6 Practice Questions"}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem" }}>
                      <span>Read Guide & Practice</span>
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTopics.length === 0 && (
            <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
              <BookOpen size={40} style={{ color: "var(--text-muted)", margin: "0 auto 12px" }} />
              <h3 style={{ marginBottom: "6px" }}>No grammar topics found</h3>
              <p style={{ color: "var(--text-secondary)" }}>Try searching for a different keyword or selecting "All Topics".</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TOPIC DETAIL VIEW (Comprehensive Multi-Level Lesson) */}
      {/* ========================================================================= */}
      {viewState === "detail" && selectedTopic && (
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          {/* Back Button */}
          <button
            id="back-to-grammar-list-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => setViewState("list")}
            style={{ marginBottom: "20px" }}
          >
            <ArrowLeft size={16} />
            <span>All Grammar Topics ({GRAMMAR_TOPICS.length})</span>
          </button>

          <div className="card" style={{ padding: "32px" }}>
            {/* Header Badges */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <span className="badge badge-gray">{selectedTopic.category}</span>
                <span className="badge badge-primary">Comprehensive Guide: Basic to Advanced</span>
              </div>
              {userProfile?.grammar_topic_scores?.[selectedTopic.topic_id] !== undefined ? (
                <span className="badge badge-success">
                  Your Best Score: {userProfile.grammar_topic_scores[selectedTopic.topic_id]}%
                </span>
              ) : (
                <span className="badge badge-gray">Not yet practiced</span>
              )}
            </div>

            {/* Title & Quick Summary */}
            <h1 style={{ fontSize: "2.1rem", marginBottom: "10px", color: "var(--text-primary)" }}>
              {selectedTopic.title}
            </h1>
            {selectedTopic.quick_summary && (
              <div
                style={{
                  background: "var(--bg-subtle)",
                  borderLeft: "3px solid var(--primary)",
                  padding: "12px 18px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "24px",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem"
                }}
              >
                {selectedTopic.quick_summary}
              </div>
            )}

            {/* Stage / Section Navigator Tabs */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "8px",
                marginBottom: "28px",
                borderBottom: "1px solid var(--border-subtle)"
              }}
            >
              {[
                { id: "all", label: "📚 Complete Guide" },
                { id: "basic", label: "🟢 Basic (Foundations)" },
                { id: "types", label: `🔍 Types (${selectedTopic.taxonomy_types?.length || 0})` },
                { id: "intermediate", label: "🟡 Intermediate (Usage)" },
                { id: "advanced", label: "🟣 Advanced (Mastery)" },
                { id: "mistakes", label: "⚠️ Mistakes to Avoid" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`lesson-tab-${tab.id}`}
                  className={`btn btn-sm ${activeLessonTab === tab.id ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setActiveLessonTab(tab.id)}
                  style={{
                    borderRadius: "18px",
                    padding: "6px 14px",
                    fontSize: "0.82rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ============================================================= */}
            {/* STAGE 1: BASIC LEVEL (Foundations) */}
            {/* ============================================================= */}
            {(activeLessonTab === "all" || activeLessonTab === "basic") && selectedTopic.progressive_levels?.basic && (
              <div style={{ marginBottom: "32px", padding: "20px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "1.2rem" }}>🟢</span>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>
                    {selectedTopic.progressive_levels.basic.heading || "Foundational Concept (Basic Level)"}
                  </h3>
                </div>
                <p style={{ fontSize: "0.96rem", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "14px" }}>
                  {selectedTopic.progressive_levels.basic.concept}
                </p>

                {selectedTopic.progressive_levels.basic.key_points && (
                  <div style={{ marginBottom: "14px" }}>
                    <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px", fontWeight: 700 }}>
                      Key Foundation Rules:
                    </h4>
                    <ul style={{ paddingLeft: "20px", color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                      {selectedTopic.progressive_levels.basic.key_points.map((pt, idx) => (
                        <li key={idx} style={{ marginBottom: "6px" }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTopic.progressive_levels.basic.examples && (
                  <div>
                    <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "#38bdf8", marginBottom: "8px", fontWeight: 700 }}>
                      Foundational Examples:
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {selectedTopic.progressive_levels.basic.examples.map((ex, idx) => (
                        <div key={idx} style={{ background: "var(--bg-card)", padding: "10px 14px", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", color: "var(--text-primary)", borderLeft: "3px solid #38bdf8" }}>
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* FULL TAXONOMY & TYPES DEEP DIVE */}
            {/* ============================================================= */}
            {(activeLessonTab === "all" || activeLessonTab === "types") && selectedTopic.taxonomy_types && selectedTopic.taxonomy_types.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                  <Layers size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>
                    Complete Types & Categories of {selectedTopic.title}
                  </h3>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "16px" }}>
                  A complete breakdown of every distinct classification, subtype, and usage pattern for this grammar topic:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "14px" }}>
                  {selectedTopic.taxonomy_types.map((typeItem, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-md)",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: "1rem", color: "var(--primary)", marginBottom: "6px" }}>
                          {typeItem.name}
                        </h4>
                        <p style={{ fontSize: "0.88rem", lineHeight: "1.5", color: "var(--text-secondary)", marginBottom: "12px" }}>
                          {typeItem.description}
                        </p>
                      </div>

                      {typeItem.examples && typeItem.examples.length > 0 && (
                        <div style={{ background: "var(--bg-subtle)", padding: "8px 12px", borderRadius: "var(--radius-sm)", fontSize: "0.84rem" }}>
                          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Examples: </span>
                          <span style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
                            {typeItem.examples.join("; ")}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* STAGE 2: INTERMEDIATE LEVEL */}
            {/* ============================================================= */}
            {(activeLessonTab === "all" || activeLessonTab === "intermediate") && selectedTopic.progressive_levels?.intermediate && (
              <div style={{ marginBottom: "32px", padding: "20px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "1.2rem" }}>🟡</span>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>
                    {selectedTopic.progressive_levels.intermediate.heading || "Practical Usage & Rules (Intermediate Level)"}
                  </h3>
                </div>
                <p style={{ fontSize: "0.96rem", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "14px" }}>
                  {selectedTopic.progressive_levels.intermediate.concept}
                </p>

                {selectedTopic.progressive_levels.intermediate.rules_and_formulas && (
                  <div style={{ marginBottom: "14px" }}>
                    <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "#f59e0b", marginBottom: "8px", fontWeight: 700 }}>
                      Structural Rules & Formulas:
                    </h4>
                    <ul style={{ paddingLeft: "20px", color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                      {selectedTopic.progressive_levels.intermediate.rules_and_formulas.map((rule, idx) => (
                        <li key={idx} style={{ marginBottom: "6px" }}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTopic.progressive_levels.intermediate.examples && (
                  <div>
                    <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "#38bdf8", marginBottom: "8px", fontWeight: 700 }}>
                      Real-World Usage Examples:
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {selectedTopic.progressive_levels.intermediate.examples.map((ex, idx) => (
                        <div key={idx} style={{ background: "var(--bg-card)", padding: "10px 14px", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", color: "var(--text-primary)", borderLeft: "3px solid #f59e0b" }}>
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* STAGE 3: ADVANCED LEVEL */}
            {/* ============================================================= */}
            {(activeLessonTab === "all" || activeLessonTab === "advanced") && selectedTopic.progressive_levels?.advanced && (
              <div style={{ marginBottom: "32px", padding: "20px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "1.2rem" }}>🟣</span>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>
                    {selectedTopic.progressive_levels.advanced.heading || "Mastery, Nuance & Edge Cases (Advanced Level)"}
                  </h3>
                </div>
                <p style={{ fontSize: "0.96rem", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "14px" }}>
                  {selectedTopic.progressive_levels.advanced.concept}
                </p>

                {selectedTopic.progressive_levels.advanced.nuances_and_exceptions && (
                  <div style={{ marginBottom: "14px" }}>
                    <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "#c084fc", marginBottom: "8px", fontWeight: 700 }}>
                      Subtle Distinctions & Exceptions:
                    </h4>
                    <ul style={{ paddingLeft: "20px", color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6" }}>
                      {selectedTopic.progressive_levels.advanced.nuances_and_exceptions.map((nuance, idx) => (
                        <li key={idx} style={{ marginBottom: "6px" }}>{nuance}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTopic.progressive_levels.advanced.examples && (
                  <div>
                    <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "#38bdf8", marginBottom: "8px", fontWeight: 700 }}>
                      Advanced Nuance Examples:
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {selectedTopic.progressive_levels.advanced.examples.map((ex, idx) => (
                        <div key={idx} style={{ background: "var(--bg-card)", padding: "10px 14px", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", color: "var(--text-primary)", borderLeft: "3px solid #c084fc" }}>
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================= */}
            {/* RULES SUMMARY TABLE */}
            {/* ============================================================= */}
            {(activeLessonTab === "all" || activeLessonTab === "intermediate") && selectedTopic.rules_summary && selectedTopic.rules_summary.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "14px", color: "var(--primary)" }}>
                  Key Rule Reference Guide
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedTopic.rules_summary.map((r, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "var(--bg-subtle)",
                        padding: "14px 18px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-subtle)"
                      }}
                    >
                      <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
                        {r.rule_name}
                      </div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "6px" }}>
                        {r.explanation}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#38bdf8" }}>
                        <span style={{ fontWeight: 600 }}>Example: </span>{r.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* GENERAL EXAMPLE SENTENCES */}
            {/* ============================================================= */}
            {activeLessonTab === "all" && selectedTopic.example_sentences && selectedTopic.example_sentences.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "12px", color: "#38bdf8" }}>
                  Real-World Sentences in Action
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedTopic.example_sentences.map((ex, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "var(--bg-subtle)",
                        borderLeft: "3px solid #38bdf8",
                        padding: "12px 16px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.95rem",
                        color: "var(--text-primary)"
                      }}
                    >
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* COMMON MISTAKES TO AVOID */}
            {/* ============================================================= */}
            {(activeLessonTab === "all" || activeLessonTab === "mistakes") && selectedTopic.common_mistakes && selectedTopic.common_mistakes.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "12px", color: "#f59e0b", display: "flex", alignItems: "center", gap: "8px" }}>
                  <AlertTriangle size={18} />
                  <span>Common Mistakes & Traps to Avoid</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedTopic.common_mistakes.map((mistake, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "rgba(245, 158, 11, 0.08)",
                        border: "1px solid rgba(245, 158, 11, 0.25)",
                        padding: "14px 18px",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.92rem",
                        color: "var(--text-primary)",
                        lineHeight: "1.6"
                      }}
                    >
                      {mistake}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* PRACTICE QUIZ ACTION BUTTONS */}
            {/* ============================================================= */}
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "24px", marginTop: "12px" }}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  id="start-grammar-quiz-btn"
                  className="btn btn-primary btn-lg"
                  onClick={() => handleStartPractice(false)}
                  style={{ flex: "1 1 280px", justifyContent: "center" }}
                >
                  <Award size={18} />
                  <span>Take Topic Test (5–6 Questions)</span>
                </button>

                <button
                  id="start-ai-quiz-btn"
                  className="btn btn-secondary btn-lg"
                  onClick={() => handleStartPractice(true)}
                  style={{ flex: "1 1 200px", justifyContent: "center" }}
                >
                  <Sparkles size={16} color="var(--primary)" />
                  <span>Generate Extra AI Quiz</span>
                </button>
              </div>

              {onNavigate && (
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onNavigate("mentor")}
                    style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
                  >
                    <HelpCircle size={14} />
                    <span>Have questions? Ask AI English Mentor about {selectedTopic.title}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PRACTICE QUIZ VIEW */}
      {/* ========================================================================= */}
      {viewState === "practice" && selectedTopic && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setViewState("detail")}
            >
              <ArrowLeft size={15} />
              <span>Exit to Lesson</span>
            </button>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
              {selectedTopic.title} Practice
            </span>
          </div>

          {quizLoading ? (
            <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "3px solid rgba(59, 130, 246, 0.2)",
                  borderTopColor: "var(--primary)",
                  margin: "0 auto 16px",
                  animation: "spin 0.8s linear infinite"
                }}
              />
              <h2 style={{ fontSize: "1.4rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                Generating Quiz on {selectedTopic.title}...
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                AI is crafting custom practice questions with detailed pedagogical explanations.
              </p>
            </div>
          ) : quizError ? (
            <div className="card" style={{ padding: "36px", textAlign: "center" }}>
              <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "1.05rem" }}>{quizError}</div>
              <button className="btn btn-primary" onClick={() => handleStartPractice(false)}>
                <RefreshCw size={16} />
                <span>Use Standard Practice Questions</span>
              </button>
            </div>
          ) : isGrading ? (
            <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "3px solid rgba(16, 185, 129, 0.2)",
                  borderTopColor: "var(--success)",
                  margin: "0 auto 16px",
                  animation: "spin 0.8s linear infinite"
                }}
              />
              <h2 style={{ fontSize: "1.4rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                Grading Quiz & Updating Progress...
              </h2>
            </div>
          ) : quizData?.questions?.length ? (
            <>
              <div className="progress-bar-container" style={{ marginBottom: "24px" }}>
                <div
                  className="progress-bar-fill fill-grammar"
                  style={{ width: `${((questionIndex + 1) / quizData.questions.length) * 100}%` }}
                />
              </div>

              <QuestionCard
                key={quizData.questions[questionIndex].question_id || questionIndex}
                question={quizData.questions[questionIndex]}
                currentIndex={questionIndex}
                totalQuestions={quizData.questions.length}
                onAnswerSubmit={handleAnswerSubmit}
                onNext={handleNextQuestion}
                isLast={questionIndex === quizData.questions.length - 1}
              />
            </>
          ) : null}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUMMARY VIEW */}
      {/* ========================================================================= */}
      {viewState === "summary" && lastAttemptSummary && selectedTopic && (
        <div className="card" style={{ maxWidth: "720px", margin: "0 auto", padding: "36px", textAlign: "center" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: lastAttemptSummary.score >= 70 ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
              border: `2px solid ${lastAttemptSummary.score >= 70 ? "#10b981" : "#f59e0b"}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}
          >
            {lastAttemptSummary.score >= 70 ? (
              <CheckCircle2 size={32} color="#10b981" />
            ) : (
              <AlertTriangle size={32} color="#f59e0b" />
            )}
          </div>

          <h2 style={{ color: "var(--text-primary)" }}>Quiz Completed!</h2>
          <p style={{ marginTop: "4px", color: "var(--text-secondary)" }}>Topic: {selectedTopic.title}</p>

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
              Attempt Score
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: 800, color: "#38bdf8" }}>
              {lastAttemptSummary.score}%
            </div>
            <div style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
              {lastAttemptSummary.questions_correct} of {lastAttemptSummary.questions_total} correct
            </div>
          </div>

          {/* Review Mistakes Section */}
          {lastAttemptSummary.mistakes && lastAttemptSummary.mistakes.length > 0 ? (
            <div style={{ textAlign: "left", marginTop: "24px", marginBottom: "28px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", color: "#fca5a5" }}>
                Review Mistakes ({lastAttemptSummary.mistakes.length})
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {lastAttemptSummary.mistakes.map((m, idx) => (
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
              🎉 Flawless performance! You answered every question correctly.
            </div>
          )}

          {/* Navigation Action Buttons */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
            <button
              id="retake-grammar-quiz-btn"
              className="btn btn-secondary"
              onClick={() => handleStartPractice(false)}
            >
              <RotateCcw size={16} />
              <span>Practice Again</span>
            </button>
            <button
              id="return-topics-btn"
              className="btn btn-primary"
              onClick={() => setViewState("list")}
            >
              <span>Back to Topics</span>
              <ChevronRight size={16} />
            </button>
            {onNavigate && (
              <button
                id="go-dash-after-grammar-btn"
                className="btn btn-secondary"
                onClick={() => onNavigate("dashboard")}
              >
                <span>Dashboard</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
