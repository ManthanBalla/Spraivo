import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { VOCABULARY_SETS } from "../data/vocabularyData";
import {
  generateLesson,
  generateQuiz,
  gradeQuiz
} from "../services/storageService";
import Flashcard from "../components/Flashcard";
import QuestionCard from "../components/QuestionCard";
import {
  Layers,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  List,
  ChevronRight,
  RefreshCw
} from "lucide-react";

export default function VocabularyScreen({
  userProfile,
  onUpdateProfile,
  initialSetId = null,
  onNavigate
}) {
  const [selectedSet, setSelectedSet] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" | "flashcard" | "wordlist" | "quiz" | "summary"

  // Dynamic content states
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonData, setLessonData] = useState(null);
  const [lessonError, setLessonError] = useState("");

  const [quizLoading, setQuizLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizError, setQuizError] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [attemptAnswers, setAttemptAnswers] = useState([]);
  const [isGrading, setIsGrading] = useState(false);
  const [lastAttemptSummary, setLastAttemptSummary] = useState(null);

  useEffect(() => {
    if (initialSetId) {
      const found = VOCABULARY_SETS.find((s) => s.set_id === initialSetId);
      if (found) {
        handleSelectSet(found);
      }
    }
  }, [initialSetId]);

  const handleSelectSet = async (setObj) => {
    setSelectedSet(setObj);
    setViewMode("flashcard");
    setLessonLoading(true);
    setLessonError("");
    setLessonData(null);
    setQuizData(null);
    setAttemptAnswers([]);
    setLastAttemptSummary(null);

    try {
      const userLevel = userProfile?.english_level || "B1";
      const lesson = await generateLesson(setObj.title, userLevel, "vocabulary");
      setLessonData(lesson);
    } catch (err) {
      console.error("Failed to load vocab lesson:", err);
      setLessonError(err.message || "Failed to load vocabulary set. Please retry.");
    } finally {
      setLessonLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    if (!selectedSet) return;
    setQuizLoading(true);
    setQuizError("");
    setQuizData(null);
    setQuizIndex(0);
    setAttemptAnswers([]);
    setLastAttemptSummary(null);
    setViewMode("quiz");

    try {
      const userLevel = userProfile?.english_level || "B1";
      const quiz = await generateQuiz(selectedSet.title, userLevel, "vocabulary");
      if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        throw new Error("No questions returned for vocabulary quiz. Please retry.");
      }
      setQuizData(quiz);
    } catch (err) {
      console.error("Failed to generate vocab quiz:", err);
      setQuizError(err.message || "Failed to generate vocabulary quiz. Please retry.");
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

  const handleNextQuizQuestion = () => {
    if (!quizData || !quizData.questions) return;
    if (quizIndex < quizData.questions.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      finishVocabQuiz();
    }
  };

  const finishVocabQuiz = async () => {
    if (!selectedSet || !quizData) return;
    setIsGrading(true);

    try {
      const res = await gradeQuiz({
        topic_id: selectedSet.set_id,
        topic_title: selectedSet.title,
        skill: "vocabulary",
        answers: attemptAnswers,
        questions: quizData.questions
      });

      if (res && res.updatedProfile && onUpdateProfile) {
        onUpdateProfile(res.updatedProfile);
      }

      setLastAttemptSummary(res);
      setViewMode("summary");

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
      console.error("Failed to grade vocab quiz:", err);
      alert(err.message || "Evaluation failed. Please try again.");
    } finally {
      setIsGrading(false);
    }
  };

  // Build words list from lessonData examples or fallback to selectedSet.words
  const wordsToDisplay = selectedSet?.words || [];

  return (
    <div className="app-container">
      {/* 1. VOCABULARY SETS LIST */}
      {viewMode === "list" && (
        <div>
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="badge badge-primary">Vocabulary Expansion</span>
              <span className="badge badge-gray">Live-Generated Lexicon</span>
            </div>
            <h1>Vocabulary Mastery</h1>
            <p style={{ marginTop: "6px", color: "var(--text-secondary)" }}>
              Accelerate lexical retention with active-recall flashcards, pronunciation guides, and live-generated quizzes.
            </p>
          </div>

          <div className="grid-3">
            {VOCABULARY_SETS.map((setObj) => {
              const score = userProfile?.vocabulary_set_scores?.[setObj.set_id];
              const hasScore = score !== undefined && score !== null;

              return (
                <div
                  key={setObj.set_id}
                  id={`vocab-set-card-${setObj.set_id}`}
                  className="card card-interactive"
                  onClick={() => handleSelectSet(setObj)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "24px"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span className="badge badge-gray">{userProfile?.english_level || setObj.level} Level</span>
                      {hasScore ? (
                        <span className={`badge ${score >= 75 ? "badge-success" : score >= 50 ? "badge-warning" : "badge-danger"}`}>
                          Score: {score}%
                        </span>
                      ) : (
                        <span className="badge badge-gray">Not started</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "1.35rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                      {setObj.title}
                    </h3>

                    <p style={{ fontSize: "0.88rem", lineHeight: "1.5", color: "var(--text-secondary)", marginBottom: "16px" }}>
                      {setObj.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {setObj.words.length} Key Words • Quiz
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem" }}>
                      <span>Study Cards</span>
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. FLASHCARD ACTIVE RECALL VIEW */}
      {viewMode === "flashcard" && selectedSet && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <button
              id="back-to-vocab-list-btn"
              className="btn btn-secondary btn-sm"
              onClick={() => setViewMode("list")}
            >
              <ArrowLeft size={16} />
              <span>All Vocab Sets</span>
            </button>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                id="toggle-wordlist-btn"
                className="btn btn-secondary btn-sm"
                onClick={() => setViewMode("wordlist")}
              >
                <List size={15} />
                <span>Word List</span>
              </button>

              <button
                id="start-vocab-quiz-btn"
                className="btn btn-primary btn-sm"
                onClick={handleStartQuiz}
              >
                <Sparkles size={15} />
                <span>Take the Test</span>
              </button>
            </div>
          </div>

          {lessonLoading ? (
            <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "3px solid rgba(6, 182, 212, 0.2)",
                  borderTopColor: "#06b6d4",
                  margin: "0 auto 16px",
                  animation: "spin 0.8s linear infinite"
                }}
              />
              <h2 style={{ fontSize: "1.4rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                Loading Vocabulary for {selectedSet.title}...
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                Preparing active recall cards and examples tailored to {userProfile?.english_level || "B1"} level.
              </p>
            </div>
          ) : lessonError ? (
            <div className="card" style={{ padding: "36px", textAlign: "center" }}>
              <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "1.05rem" }}>{lessonError}</div>
              <button className="btn btn-primary" onClick={() => handleSelectSet(selectedSet)}>
                <RefreshCw size={16} />
                <span>Retry</span>
              </button>
            </div>
          ) : (
            <>
              {lessonData?.explanation && (
                <div
                  className="card"
                  style={{
                    marginBottom: "20px",
                    padding: "18px 22px",
                    background: "var(--bg-subtle)",
                    borderLeft: "4px solid #06b6d4"
                  }}
                >
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                    Context & Usage Guide
                  </div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.5" }}>
                    {lessonData.explanation}
                  </div>
                </div>
              )}

              <Flashcard
                words={wordsToDisplay}
                setTitle={selectedSet.title}
                onComplete={() => {}}
              />
            </>
          )}
        </div>
      )}

      {/* 3. WORD LIST BROWSE VIEW */}
      {viewMode === "wordlist" && selectedSet && (
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setViewMode("flashcard")}
            >
              <ArrowLeft size={16} />
              <span>Back to Flashcards</span>
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={handleStartQuiz}
            >
              <Sparkles size={15} />
              <span>Take the Test</span>
            </button>
          </div>

          <div className="card" style={{ padding: "32px" }}>
            <h2 style={{ marginBottom: "6px", color: "var(--text-primary)" }}>{selectedSet.title} — Reference List</h2>
            <p style={{ marginBottom: "24px", color: "var(--text-secondary)" }}>
              Browse definitions, pronunciations, example sentences, and synonyms.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {wordsToDisplay.map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "16px 20px",
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--primary)" }}>
                        {w.word}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                        {w.pronunciation}
                      </span>
                    </div>
                    <span className="badge badge-gray">{w.part_of_speech}</span>
                  </div>

                  <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: "8px" }}>
                    {w.meaning}
                  </p>

                  <div style={{ fontSize: "0.88rem", fontStyle: "italic", color: "var(--text-secondary)", marginBottom: "8px" }}>
                    "{w.example_sentence}"
                  </div>

                  {w.synonyms && (
                    <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Synonyms:</span>
                      {w.synonyms.map((s, sIdx) => (
                        <span key={sIdx} className="badge badge-gray" style={{ fontSize: "0.75rem", textTransform: "none" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. VOCABULARY QUIZ VIEW */}
      {viewMode === "quiz" && selectedSet && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setViewMode("flashcard")}
            >
              <ArrowLeft size={15} />
              <span>Exit to Flashcards</span>
            </button>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
              {selectedSet.title} Quiz
            </span>
          </div>

          {quizLoading ? (
            <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "3px solid rgba(6, 182, 212, 0.2)",
                  borderTopColor: "#06b6d4",
                  margin: "0 auto 16px",
                  animation: "spin 0.8s linear infinite"
                }}
              />
              <h2 style={{ fontSize: "1.4rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                Generating Quiz on {selectedSet.title}...
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                Gemini is assembling fresh vocabulary questions tailored to {userProfile?.english_level || "B1"} level.
              </p>
            </div>
          ) : quizError ? (
            <div className="card" style={{ padding: "36px", textAlign: "center" }}>
              <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "1.05rem" }}>{quizError}</div>
              <button className="btn btn-primary" onClick={handleStartQuiz}>
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
                Evaluating Vocabulary Quiz...
              </h2>
            </div>
          ) : quizData?.questions?.length ? (
            <>
              <div className="progress-bar-container" style={{ marginBottom: "24px" }}>
                <div
                  className="progress-bar-fill fill-vocab"
                  style={{ width: `${((quizIndex + 1) / quizData.questions.length) * 100}%` }}
                />
              </div>

              <QuestionCard
                key={quizData.questions[quizIndex].question_id || quizIndex}
                question={quizData.questions[quizIndex]}
                currentIndex={quizIndex}
                totalQuestions={quizData.questions.length}
                onAnswerSubmit={handleAnswerSubmit}
                onNext={handleNextQuizQuestion}
                isLast={quizIndex === quizData.questions.length - 1}
              />
            </>
          ) : null}
        </div>
      )}

      {/* 5. SUMMARY VIEW */}
      {viewMode === "summary" && lastAttemptSummary && selectedSet && (
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
          <p style={{ marginTop: "4px", color: "var(--text-secondary)" }}>Set: {selectedSet.title}</p>

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
              Vocabulary Score
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: 800, color: "#06b6d4" }}>
              {lastAttemptSummary.score}%
            </div>
            <div style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
              {lastAttemptSummary.questions_correct} of {lastAttemptSummary.questions_total} correct
            </div>
          </div>

          {/* Mistakes review */}
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
              🎉 Outstanding! You mastered every vocabulary item in this quiz.
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
            <button
              id="retake-vocab-quiz-btn"
              className="btn btn-secondary"
              onClick={handleStartQuiz}
            >
              <RotateCcw size={16} />
              <span>Practice Again</span>
            </button>
            <button
              id="return-vocab-sets-btn"
              className="btn btn-primary"
              onClick={() => setViewMode("list")}
            >
              <span>Back to Vocabulary Sets</span>
              <ChevronRight size={16} />
            </button>
            <button
              id="go-dash-after-vocab-btn"
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
