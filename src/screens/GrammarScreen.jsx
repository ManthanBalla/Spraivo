import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { GRAMMAR_TOPICS } from "../data/grammarData";
import {
  generateLesson,
  generateQuiz,
  gradeQuiz
} from "../services/storageService";
import QuestionCard from "../components/QuestionCard";
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ChevronRight,
  RefreshCw
} from "lucide-react";

export default function GrammarScreen({
  userProfile,
  onUpdateProfile,
  initialTopicId = null,
  onNavigate
}) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [viewState, setViewState] = useState("list"); // "list" | "detail" | "practice" | "summary"

  // Dynamic Lesson & Quiz states
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonData, setLessonData] = useState(null);
  const [lessonError, setLessonError] = useState("");

  const [quizLoading, setQuizLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizError, setQuizError] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [attemptAnswers, setAttemptAnswers] = useState([]);
  const [isGrading, setIsGrading] = useState(false);
  const [lastAttemptSummary, setLastAttemptSummary] = useState(null);

  // If initialTopicId was passed (e.g. from Recommendation card click), open it directly
  useEffect(() => {
    if (initialTopicId) {
      const topic = GRAMMAR_TOPICS.find((t) => t.topic_id === initialTopicId);
      if (topic) {
        handleSelectTopic(topic);
      }
    }
  }, [initialTopicId]);

  const handleSelectTopic = async (topic) => {
    setSelectedTopic(topic);
    setViewState("detail");
    setLessonLoading(true);
    setLessonError("");
    setLessonData(null);
    setQuizData(null);
    setAttemptAnswers([]);
    setLastAttemptSummary(null);

    try {
      const userLevel = userProfile?.english_level || "B1";
      const lesson = await generateLesson(topic.title, userLevel, "grammar");
      setLessonData(lesson);
    } catch (err) {
      console.error("Failed to load lesson:", err);
      setLessonError(err.message || "Failed to load lesson. Please retry.");
    } finally {
      setLessonLoading(false);
    }
  };

  const handleStartPractice = async () => {
    if (!selectedTopic) return;
    setQuizLoading(true);
    setQuizError("");
    setQuizData(null);
    setQuestionIndex(0);
    setAttemptAnswers([]);
    setLastAttemptSummary(null);
    setViewState("practice");

    try {
      const userLevel = userProfile?.english_level || "B1";
      const quiz = await generateQuiz(selectedTopic.title, userLevel, "grammar");
      if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        throw new Error("No quiz questions were returned. Please retry.");
      }
      setQuizData(quiz);
    } catch (err) {
      console.error("Failed to load quiz:", err);
      setQuizError(err.message || "Failed to generate practice quiz. Please retry.");
    } finally {
      setQuizLoading(false);
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
        } catch (e) {}
      }
    } catch (err) {
      console.error("Failed to grade quiz:", err);
      alert(err.message || "Evaluation failed. Please try submitting again.");
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="app-container">
      {/* 1. TOPICS LIST VIEW */}
      {viewState === "list" && (
        <div>
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="badge badge-primary">Grammar Curriculum</span>
              <span className="badge badge-gray">Live-Generated Lessons</span>
            </div>
            <h1>Grammar Mastery Modules</h1>
            <p style={{ marginTop: "6px", color: "var(--text-secondary)" }}>
              Pick any topic below for a fresh, level-tailored lesson with real-world examples and interactive 5–6 question quizzes.
            </p>
          </div>

          <div className="grid-2">
            {GRAMMAR_TOPICS.map((topic, idx) => {
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span className="badge badge-gray">{userProfile?.english_level || topic.level} Level</span>
                      {hasScore ? (
                        <span className={`badge ${score >= 75 ? "badge-success" : score >= 50 ? "badge-warning" : "badge-danger"}`}>
                          Score: {score}%
                        </span>
                      ) : (
                        <span className="badge badge-gray">Not started</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "1.35rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                      {idx + 1}. {topic.title}
                    </h3>

                    <p style={{ fontSize: "0.88rem", lineHeight: "1.5", color: "var(--text-secondary)", marginBottom: "16px" }}>
                      {topic.lesson_text ? topic.lesson_text.substring(0, 115) + "..." : `Master foundational rules and usage for ${topic.title}.`}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      5–6 Practice Questions
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem" }}>
                      <span>Study & Practice</span>
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. TOPIC DETAIL VIEW (Live Generated Lesson) */}
      {viewState === "detail" && selectedTopic && (
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <button
            id="back-to-grammar-list-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => setViewState("list")}
            style={{ marginBottom: "20px" }}
          >
            <ArrowLeft size={16} />
            <span>All Grammar Topics</span>
          </button>

          {lessonLoading ? (
            <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "3px solid rgba(99, 102, 241, 0.2)",
                  borderTopColor: "var(--primary)",
                  margin: "0 auto 16px",
                  animation: "spin 0.8s linear infinite"
                }}
              />
              <h2 style={{ fontSize: "1.4rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                Generating Lesson for {selectedTopic.title}...
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                Creating a plain-English explanation, real-world examples, and common traps tailored to {userProfile?.english_level || "B1"} level.
              </p>
            </div>
          ) : lessonError ? (
            <div className="card" style={{ padding: "36px", textAlign: "center" }}>
              <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "1.05rem" }}>{lessonError}</div>
              <button className="btn btn-primary" onClick={() => handleSelectTopic(selectedTopic)}>
                <RefreshCw size={16} />
                <span>Retry Generation</span>
              </button>
            </div>
          ) : lessonData ? (
            <div className="card" style={{ padding: "36px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                <span className="badge badge-primary">{userProfile?.english_level || "B1"} Level</span>
                {userProfile?.grammar_topic_scores?.[selectedTopic.topic_id] !== undefined ? (
                  <span className="badge badge-success">
                    Current Score: {userProfile.grammar_topic_scores[selectedTopic.topic_id]}%
                  </span>
                ) : (
                  <span className="badge badge-gray">Not yet practiced</span>
                )}
              </div>

              <h1 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
                {lessonData.title || selectedTopic.title}
              </h1>

              {/* Lesson Text */}
              <div style={{ marginBottom: "28px" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--primary)" }}>Lesson Concept</h3>
                <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "var(--text-primary)" }}>
                  {lessonData.explanation || selectedTopic.lesson_text}
                </p>
              </div>

              {/* Example Sentences */}
              <div style={{ marginBottom: "28px" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "12px", color: "#38bdf8" }}>Example Sentences</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(lessonData.examples && lessonData.examples.length ? lessonData.examples : selectedTopic.example_sentences || []).map((ex, idx) => (
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

              {/* Common Mistakes */}
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "12px", color: "#f59e0b", display: "flex", alignItems: "center", gap: "6px" }}>
                  <AlertTriangle size={18} />
                  <span>Common Mistakes to Avoid</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(lessonData.common_mistakes && lessonData.common_mistakes.length ? lessonData.common_mistakes : selectedTopic.common_mistakes || []).map((mistake, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "rgba(245, 158, 11, 0.08)",
                        border: "1px solid rgba(245, 158, 11, 0.25)",
                        padding: "12px 16px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.92rem",
                        color: "var(--text-primary)"
                      }}
                    >
                      {mistake}
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Practice Button */}
              <button
                id="start-grammar-quiz-btn"
                className="btn btn-primary btn-lg"
                onClick={handleStartPractice}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Sparkles size={18} />
                <span>Take the Test (5–6 Questions)</span>
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* 3. PRACTICE QUIZ VIEW */}
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
                  border: "3px solid rgba(99, 102, 241, 0.2)",
                  borderTopColor: "var(--primary)",
                  margin: "0 auto 16px",
                  animation: "spin 0.8s linear infinite"
                }}
              />
              <h2 style={{ fontSize: "1.4rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                Generating Quiz on {selectedTopic.title}...
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                Gemini is crafting 5–6 level-appropriate questions with detailed pedagogical explanations.
              </p>
            </div>
          ) : quizError ? (
            <div className="card" style={{ padding: "36px", textAlign: "center" }}>
              <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "1.05rem" }}>{quizError}</div>
              <button className="btn btn-primary" onClick={handleStartPractice}>
                <RefreshCw size={16} />
                <span>Retry Generating Quiz</span>
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
                Grading Quiz & Updating Scores...
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

      {/* 4. SUMMARY VIEW */}
      {viewState === "summary" && lastAttemptSummary && selectedTopic && (
        <div className="card" style={{ maxWidth: "720px", margin: "0 auto", padding: "36px", textAlign: "center" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: lastAttemptSummary.score >= 70 ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
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
              onClick={handleStartPractice}
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
            <button
              id="go-dash-after-grammar-btn"
              className="btn btn-secondary"
              onClick={() => onNavigate("dashboard")}
            >
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
