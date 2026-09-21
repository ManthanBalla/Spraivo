import React, { useState, useMemo } from "react";
import { computeRecommendations } from "../services/recommendationService";
import {
  getEnglishLevelTitle,
  generateAssessment,
  gradeAssessment
} from "../services/storageService";
import QuestionCard from "../components/QuestionCard";
import {
  Flame,
  Clock,
  CheckSquare,
  Award,
  BookOpen,
  Layers,
  FileText,
  PenTool,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Bot,
  Target,
  CheckCircle2,
  Zap,
  RotateCcw
} from "lucide-react";

export default function DashboardScreen({
  userProfile,
  onNavigate,
  onStartTopic,
  onUpdateProfile
}) {
  const [levelCheckState, setLevelCheckState] = useState("idle"); // "idle" | "loading" | "testing" | "grading" | "result"
  const [assessmentData, setAssessmentData] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [evalResult, setEvalResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const recommendations = useMemo(() => {
    return computeRecommendations();
  }, [userProfile]);

  if (!userProfile) {
    return <div className="app-container">Loading your dashboard...</div>;
  }

  const {
    overall_score = 0,
    english_level = "A1",
    skill_scores = { grammar: 0, vocabulary: 0, reading: 0, writing: 0 },
    streak_days = 1,
    total_learning_minutes = 0,
    total_questions_answered = 0,
    writing_submissions_count = 0,
    mentor_messages_count = 0,
    name = "Learner",
    learning_reason = "Get better at conversations",
    focus_areas = ["Conversations", "Grammar"],
    exam_target = null,
    level_check_completed = false
  } = userProfile;

  const handleStartLevelCheck = async () => {
    setErrorMsg("");
    setLevelCheckState("loading");
    try {
      const data = await generateAssessment();
      if (!data || !data.questions || !data.questions.length) {
        throw new Error("No questions were generated. Please check your connection and retry.");
      }
      setAssessmentData(data);
      setCurrentQIndex(0);
      setUserAnswers([]);
      setLevelCheckState("testing");
    } catch (err) {
      console.error("Failed to generate assessment:", err);
      setErrorMsg(err.message || "Failed to generate your personalized level check.");
      setLevelCheckState("idle");
    }
  };

  const handleAnswerSubmit = (answerPayload) => {
    setUserAnswers((prev) => {
      const filtered = prev.filter((a) => a.question_id !== answerPayload.question_id);
      return [...filtered, answerPayload];
    });
  };

  const handleNextQuestion = async () => {
    if (!assessmentData) return;
    if (currentQIndex < assessmentData.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Completed last question -> Grade!
      await handleGradeAssessment();
    }
  };

  const handleGradeAssessment = async () => {
    setLevelCheckState("grading");
    try {
      const res = await gradeAssessment({
        answers: userAnswers,
        questions: assessmentData.questions
      });
      setEvalResult(res);
      setLevelCheckState("result");
    } catch (err) {
      console.error("Failed to grade assessment:", err);
      setErrorMsg(err.message || "Evaluation failed. Please retry.");
      setLevelCheckState("testing");
    }
  };

  const handleFinishAndExplore = () => {
    if (evalResult && evalResult.profile && onUpdateProfile) {
      onUpdateProfile(evalResult.profile);
    }
    setLevelCheckState("idle");
  };

  // Plain-English score explanation
  const scoreExplanation =
    overall_score >= 80
      ? "You're doing fantastic! Keep challenging yourself with new topics."
      : overall_score >= 65
      ? "You're doing well — keep practicing your weak spots below."
      : overall_score >= 45
      ? "You're making steady progress — a few minutes of practice every day will pay off."
      : "You're off to a solid start — build confidence step by step with the recommendations below.";

  const levelName = getEnglishLevelTitle(english_level);

  if (levelCheckState === "loading") {
    return (
      <div className="app-container">
        <div className="card" style={{ maxWidth: "680px", margin: "40px auto", padding: "48px 24px", textAlign: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "3px solid rgba(99, 102, 241, 0.2)",
              borderTopColor: "var(--primary)",
              margin: "0 auto 20px",
              animation: "spin 0.8s linear infinite"
            }}
          />
          <h2 style={{ fontSize: "1.6rem", marginBottom: "12px", color: "var(--text-primary)" }}>
            Generating Your Personalized Level Check...
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto 20px", lineHeight: "1.5" }}>
            Gemini is analyzing your focus on <strong>{focus_areas.join(", ")}</strong> to generate 6–8 targeted questions.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
            {focus_areas.map((area) => (
              <span key={area} className="badge badge-primary">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (levelCheckState === "testing" && assessmentData?.questions) {
    return (
      <div className="app-container">
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span className="badge badge-primary">Dynamic Level Check</span>
                <span className="badge badge-gray">{learning_reason}</span>
              </div>
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)" }}>Find Your English Level</h2>
            </div>
            <button
              id="cancel-level-check-btn"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                if (window.confirm("Exit the level check? You can resume anytime.")) {
                  setLevelCheckState("idle");
                }
              }}
            >
              Exit Check
            </button>
          </div>

          {errorMsg && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                marginBottom: "20px"
              }}
            >
              {errorMsg}
            </div>
          )}

          <QuestionCard
            question={assessmentData.questions[currentQIndex]}
            currentIndex={currentQIndex}
            totalQuestions={assessmentData.questions.length}
            onAnswerSubmit={handleAnswerSubmit}
            onNext={handleNextQuestion}
            isLast={currentQIndex === assessmentData.questions.length - 1}
          />
        </div>
      </div>
    );
  }

  if (levelCheckState === "grading") {
    return (
      <div className="app-container">
        <div className="card" style={{ maxWidth: "680px", margin: "40px auto", padding: "48px 24px", textAlign: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "3px solid rgba(16, 185, 129, 0.2)",
              borderTopColor: "var(--success)",
              margin: "0 auto 20px",
              animation: "spin 0.8s linear infinite"
            }}
          />
          <h2 style={{ fontSize: "1.6rem", marginBottom: "12px", color: "var(--text-primary)" }}>
            Grading Your Responses...
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto", lineHeight: "1.5" }}>
            Evaluating accuracy across your chosen focus areas and calibrating your CEFR level.
          </p>
        </div>
      </div>
    );
  }

  if (levelCheckState === "result") {
    const finalLevel = evalResult?.english_level || evalResult?.profile?.english_level || "B1";
    const finalScore = evalResult?.overall_score || evalResult?.profile?.overall_score || 0;
    const finalScores = evalResult?.skill_scores || evalResult?.profile?.skill_scores || {};

    return (
      <div className="app-container">
        <div className="card" style={{ maxWidth: "740px", margin: "30px auto", padding: "40px 28px", textAlign: "center" }}>
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}
          >
            <CheckCircle2 size={38} color="#10b981" />
          </div>

          <span className="badge badge-success" style={{ marginBottom: "8px" }}>Level Check Complete</span>
          <h1 style={{ fontSize: "2rem", marginBottom: "8px", color: "var(--text-primary)" }}>
            Your Calibrated Starting Level
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "540px", margin: "0 auto 28px", lineHeight: "1.5" }}>
            Congratulations, {name}! Based on your responses focused on {focus_areas.join(", ")}, your English benchmark is set.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "32px" }}>
            <div
              style={{
                padding: "20px 28px",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                minWidth: "170px"
              }}
            >
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                CEFR Level
              </div>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--primary)", marginTop: "4px" }}>
                {finalLevel}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {getEnglishLevelTitle(finalLevel)}
              </div>
            </div>

            <div
              style={{
                padding: "20px 28px",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                minWidth: "170px"
              }}
            >
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                Overall Score
              </div>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#38bdf8", marginTop: "4px" }}>
                {finalScore}
                <span style={{ fontSize: "1.1rem", color: "var(--text-muted)", fontWeight: 400 }}>/100</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Level Check Score
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "12px",
              maxWidth: "580px",
              margin: "0 auto 32px",
              textAlign: "left"
            }}
          >
            <div style={{ background: "var(--bg-subtle)", padding: "12px 14px", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Grammar</div>
              <div style={{ fontWeight: 700, color: "#818cf8", fontSize: "1.1rem" }}>{finalScores.grammar || 0}%</div>
            </div>
            <div style={{ background: "var(--bg-subtle)", padding: "12px 14px", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Vocabulary</div>
              <div style={{ fontWeight: 700, color: "#06b6d4", fontSize: "1.1rem" }}>{finalScores.vocabulary || 0}%</div>
            </div>
            <div style={{ background: "var(--bg-subtle)", padding: "12px 14px", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Reading</div>
              <div style={{ fontWeight: 700, color: "#10b981", fontSize: "1.1rem" }}>{finalScores.reading || 0}%</div>
            </div>
            <div style={{ background: "var(--bg-subtle)", padding: "12px 14px", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Writing</div>
              <div style={{ fontWeight: 700, color: "#d946ef", fontSize: "1.1rem" }}>{finalScores.writing || 0}%</div>
            </div>
          </div>

          <button
            id="explore-dashboard-btn"
            className="btn btn-primary btn-lg"
            onClick={handleFinishAndExplore}
            style={{ minWidth: "240px", margin: "0 auto" }}
          >
            <span>Explore Your Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Unassessed state: User has not completed level check yet
  if (!level_check_completed) {
    return (
      <div className="app-container">
        {errorMsg && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#fca5a5",
              padding: "14px 18px",
              borderRadius: "var(--radius-md)",
              marginBottom: "24px"
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Prominent "Test Your English Level" Card */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.35)",
            padding: "36px 30px",
            marginBottom: "32px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ maxWidth: "780px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
              <span className="badge badge-primary" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Sparkles size={14} /> Recommended First Step
              </span>
              <span className="badge badge-gray">{learning_reason}</span>
              {exam_target && <span className="badge badge-warning">Target: {exam_target}</span>}
            </div>

            <h1 style={{ fontSize: "2.3rem", color: "#ffffff", marginBottom: "12px", lineHeight: "1.2" }}>
              Let's find out your English level
            </h1>

            <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "22px" }}>
              We'll generate a personalized level check tailored to what you want to improve:{" "}
              <strong style={{ color: "#ffffff" }}>{focus_areas.join(", ")}</strong>.
              It takes just 2–3 minutes and accurately calibrates lessons and quizzes to your current skills.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
                marginBottom: "28px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "0.9rem" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(99, 102, 241, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Target size={16} color="#818cf8" />
                </div>
                <span>Tailored to your stated goals</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "0.9rem" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock size={16} color="#10b981" />
                </div>
                <span>Quick check (6–8 questions)</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "0.9rem" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(56, 189, 248, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Award size={16} color="#38bdf8" />
                </div>
                <span>Sets CEFR score (A1 to C2)</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                id="start-level-check-btn"
                className="btn btn-primary btn-lg"
                onClick={handleStartLevelCheck}
                style={{ padding: "14px 28px", fontSize: "1.05rem" }}
              >
                <Sparkles size={18} />
                <span>Start My Level Check</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Explore Other Modules Card Grid */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--text-primary)" }}>
            Or explore LinguaPath right away:
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
            You can jump straight into any module below at any time.
          </p>

          <div className="grid-2">
            <div className="card card-interactive" onClick={() => onNavigate("mentor")} style={{ padding: "22px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bot size={22} color="#818cf8" />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem" }}>AI English Mentor</h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Ask grammar questions & practice conversations</div>
                </div>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                Chat 1-on-1 with an intelligent AI tutor ready to explain nuances and help you sound natural.
              </p>
            </div>

            <div className="card card-interactive" onClick={() => onNavigate("writing")} style={{ padding: "22px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(217, 70, 239, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PenTool size={22} color="#d946ef" />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem" }}>Writing Lab</h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>AI-graded essays & paragraph feedback</div>
                </div>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                Submit paragraphs on real-world and exam prompts to get instant grammar and vocabulary scoring.
              </p>
            </div>

            <div className="card card-interactive" onClick={() => onNavigate("grammar")} style={{ padding: "22px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BookOpen size={22} color="#818cf8" />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem" }}>Grammar Topics</h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Live-generated lessons & quizzes</div>
                </div>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                Learn Articles, Tenses, Modals and test your mastery with fresh 5–6 question quizzes.
              </p>
            </div>

            <div className="card card-interactive" onClick={() => onNavigate("vocabulary")} style={{ padding: "22px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(6, 182, 212, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Layers size={22} color="#06b6d4" />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.1rem" }}>Vocabulary Vault</h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Topic-specific word banks & tests</div>
                </div>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                Expand your lexical resource with everyday, business, and academic vocabulary.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal Assessed Dashboard View:
  return (
    <div className="app-container">
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.25)",
          marginBottom: "28px",
          padding: "30px 24px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ flex: "1 1 300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
              <span className="badge badge-primary">Personalized Plan</span>
              <span className="badge badge-gray">{learning_reason}</span>
              {exam_target && <span className="badge badge-warning">Target: {exam_target}</span>}
            </div>
            <h1 style={{ fontSize: "2rem", color: "#ffffff" }}>Welcome back, {name}!</h1>
            <p style={{ marginTop: "6px", maxWidth: "560px", fontSize: "0.95rem", color: "#cbd5e1" }}>
              Your progress updates automatically as you learn. Chat with your AI Mentor or practice writing in the Writing Lab to build fluency faster.
            </p>
          </div>

          {/* Prominent Level & Score Card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              background: "rgba(255, 255, 255, 0.04)",
              padding: "18px 24px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
              flexWrap: "wrap"
            }}
          >
            <div style={{ textAlign: "center", minWidth: "120px" }}>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                Your English Level
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#c7d2fe",
                  marginTop: "4px"
                }}
              >
                {levelName}
              </div>
            </div>

            <div style={{ width: "1px", height: "48px", background: "var(--border-subtle)", display: "none" }} />

            <div style={{ textAlign: "center", minWidth: "100px" }}>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                Overall Score
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2.4rem",
                  fontWeight: 800,
                  color: "#38bdf8",
                  lineHeight: "1.1"
                }}
              >
                {overall_score}
                <span style={{ fontSize: "1.1rem", color: "var(--text-muted)", fontWeight: 400 }}>/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Score plain English message */}
        <div
          style={{
            marginTop: "18px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: "0.9rem",
            color: "#94a3b8"
          }}
        >
          <div>
            💡 <strong>Summary: </strong>{scoreExplanation}
          </div>
          <button
            id="recalibrate-level-btn"
            className="btn btn-secondary btn-sm"
            onClick={handleStartLevelCheck}
            style={{ fontSize: "0.78rem", padding: "4px 10px", gap: "5px" }}
            title="Retake a fresh dynamic level check"
          >
            <RotateCcw size={13} />
            <span>Recalibrate Level</span>
          </button>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid-4" style={{ marginBottom: "28px" }}>
        <div className="card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "var(--warning-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <Flame size={24} color="#f59e0b" />
          </div>
          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Learning Streak
            </div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {streak_days} <span style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--text-secondary)" }}>days</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(99, 102, 241, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <Clock size={24} color="#818cf8" />
          </div>
          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Practice Time
            </div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {total_learning_minutes} <span style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--text-secondary)" }}>mins</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "var(--success-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <CheckSquare size={24} color="var(--success)" />
          </div>
          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Questions Answered
            </div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {total_questions_answered}
            </div>
          </div>
        </div>

        <div className="card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(217, 70, 239, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <PenTool size={24} color="#d946ef" />
          </div>
          <div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Writing Exercises
            </div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {writing_submissions_count}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Skill Score Progress Bars */}
      <div className="card" style={{ marginBottom: "32px", padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2>Your Skills Breakdown</h2>
            <p style={{ fontSize: "0.9rem" }}>See how your skills improve with every quiz and writing submission.</p>
          </div>
          <button
            id="view-detailed-progress-btn"
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate("progress")}
          >
            <TrendingUp size={15} />
            <span>View Full Progress</span>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Grammar Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <BookOpen size={18} color="#818cf8" />
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Grammar Accuracy</span>
              </div>
              <span style={{ fontWeight: 700, color: "#818cf8" }}>{skill_scores.grammar || 0}%</span>
            </div>
            <div className="progress-bar-container" style={{ height: "11px" }}>
              <div className="progress-bar-fill fill-grammar" style={{ width: `${skill_scores.grammar || 0}%` }} />
            </div>
          </div>

          {/* Vocabulary Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Layers size={18} color="#06b6d4" />
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Vocabulary & Word Choice</span>
              </div>
              <span style={{ fontWeight: 700, color: "#06b6d4" }}>{skill_scores.vocabulary || 0}%</span>
            </div>
            <div className="progress-bar-container" style={{ height: "11px" }}>
              <div className="progress-bar-fill fill-vocab" style={{ width: `${skill_scores.vocabulary || 0}%` }} />
            </div>
          </div>

          {/* Reading Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FileText size={18} color="#10b981" />
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Reading Comprehension</span>
              </div>
              <span style={{ fontWeight: 700, color: "#10b981" }}>{skill_scores.reading || 0}%</span>
            </div>
            <div className="progress-bar-container" style={{ height: "11px" }}>
              <div className="progress-bar-fill fill-reading" style={{ width: `${skill_scores.reading || 0}%` }} />
            </div>
          </div>

          {/* Writing Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <PenTool size={18} color="#d946ef" />
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Writing & Expression</span>
              </div>
              <span style={{ fontWeight: 700, color: "#d946ef" }}>
                {skill_scores.writing !== undefined && skill_scores.writing > 0 ? `${skill_scores.writing}%` : "Ready to try"}
              </span>
            </div>
            <div className="progress-bar-container" style={{ height: "11px" }}>
              <div
                className="progress-bar-fill"
                style={{
                  width: `${skill_scores.writing || 0}%`,
                  background: "linear-gradient(90deg, #d946ef, #f43f5e)"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended for You Section */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <Sparkles size={22} color="#818cf8" />
          <h2>Recommended for You</h2>
        </div>

        <p style={{ marginBottom: "18px", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
          Personalized practice based on the skills where you can make the biggest leap forward right now.
        </p>

        <div className="grid-2">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              id={`rec-card-${idx}`}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span
                    className={`badge ${
                      rec.skill === "grammar"
                        ? "badge-primary"
                        : rec.skill === "vocabulary"
                        ? "badge-warning"
                        : rec.skill === "writing"
                        ? "badge-primary"
                        : "badge-success"
                    }`}
                  >
                    {rec.skill}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={13} /> {rec.suggested_duration_minutes} mins
                  </span>
                </div>

                <h3 style={{ fontSize: "1.3rem", marginBottom: "10px", color: "var(--text-primary)" }}>
                  {rec.topic_title}
                </h3>

                <div
                  style={{
                    background: "var(--bg-subtle)",
                    padding: "12px 14px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.5",
                    marginBottom: "20px",
                    borderLeft: `3px solid ${rec.skill === "writing" ? "#d946ef" : "var(--primary)"}`
                  }}
                >
                  <strong style={{ color: "var(--text-primary)" }}>Why practice this: </strong>
                  {rec.reason}
                </div>
              </div>

              <button
                id={`start-rec-btn-${idx}`}
                className="btn btn-primary"
                onClick={() => onStartTopic(rec.topic_id, rec.skill)}
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span>Start Practice ({rec.suggested_duration_minutes} mins)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Activity Cards (AI Mentor & Writing Lab) */}
      <div className="grid-2" style={{ marginBottom: "32px" }}>
        {/* Recent AI Mentor Card */}
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(99, 102, 241, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Bot size={22} color="#818cf8" />
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem" }}>AI English Mentor</h4>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {mentor_messages_count} messages exchanged
                </div>
              </div>
            </div>
            <span className="badge badge-success">Online Tutor</span>
          </div>

          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
            Need grammar rules explained, an essay checked, or want to practice casual conversation? Your personal AI tutor is ready to help.
          </p>

          <button
            id="open-mentor-card-btn"
            className="btn btn-secondary"
            onClick={() => onNavigate("mentor")}
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <span>Chat with AI Mentor</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Recent Writing Feedback Card */}
        <div className="card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(217, 70, 239, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <PenTool size={22} color="#d946ef" />
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem" }}>Writing Lab</h4>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {writing_submissions_count} pieces graded
                </div>
              </div>
            </div>
            <span className="badge badge-primary">
              {skill_scores.writing > 0 ? `Avg ${skill_scores.writing}%` : "8 Prompts"}
            </span>
          </div>

          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "18px" }}>
            Write responses to everyday and exam prompts to receive sentence-by-sentence corrections, vocabulary upgrades, and advice.
          </p>

          <button
            id="open-writing-card-btn"
            className="btn btn-secondary"
            onClick={() => onNavigate("writing")}
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <span>Open Writing Lab</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
