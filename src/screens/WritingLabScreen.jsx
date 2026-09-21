import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  submitWriting,
  getCompletedWritingTopics,
  addCompletedWritingTopic
} from "../services/storageService";
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  Award,
  Check,
  Flame,
  FileText,
  AlignLeft,
  Sliders,
  History
} from "lucide-react";

// Curated pool of thought-provoking writing topics across various disciplines
const INITIAL_TOPIC_POOL = [
  {
    id: "ai-society",
    category: "Technology & Society",
    topic: "How Artificial Intelligence is Changing the Way Humans Learn and Work",
    starter_prompt: "Discuss whether AI tools enhance or hinder critical thinking, and describe your vision of the future workplace."
  },
  {
    id: "digital-detox",
    category: "Modern Life & Wellness",
    topic: "The Value of Solitude and Stepping Away from Social Media",
    starter_prompt: "Reflect on how constant connectivity affects our mental clarity and relationships with others."
  },
  {
    id: "climate-stewardship",
    category: "Environment & Future",
    topic: "Individual Responsibility versus Corporate Action in Combating Climate Change",
    starter_prompt: "Share your perspective on whether daily lifestyle changes matter more than legislative regulations."
  },
  {
    id: "reading-books",
    category: "Culture & Philosophy",
    topic: "Why Reading Long-Form Literature Still Matters in the Age of Short Videos",
    starter_prompt: "Explore how novels and detailed books build empathy, patience, and complex comprehension."
  },
  {
    id: "failure-growth",
    category: "Personal Growth",
    topic: "A Valuable Lesson Learned from an Unplanned Setback or Mistake",
    starter_prompt: "Describe a challenge you faced, how you adapted, and what it taught you about your resilience."
  },
  {
    id: "urban-architecture",
    category: "Society & Urban Life",
    topic: "How City Architecture and Public Spaces Shape Human Happiness",
    starter_prompt: "Discuss the importance of green parks, walkability, and communal spaces in urban living."
  },
  {
    id: "remote-collaboration",
    category: "Work & Economics",
    topic: "The Long-Term Consequences of Remote Work on Team Culture",
    starter_prompt: "Consider the balance between personal freedom and collaborative camaraderie in distributed companies."
  },
  {
    id: "art-expression",
    category: "Arts & Creativity",
    topic: "Can Art and Music Bridge Political and Cultural Divides?",
    starter_prompt: "Explain how creative expression allows people of different backgrounds to understand each other."
  },
  {
    id: "curiosity-science",
    category: "Science & Exploration",
    topic: "Why Deep Scientific Curiosity is the Engine of Human Progress",
    starter_prompt: "Discuss an invention, discovery, or scientific field that fascinates you most and why."
  },
  {
    id: "daily-habits",
    category: "Mindset & Daily Habits",
    topic: "The Compound Power of Small Daily Habits Over Decades",
    starter_prompt: "Analyze how small, consistent routines shape our health, intellect, and character over time."
  }
];

export default function WritingLabScreen({
  userProfile,
  onUpdateProfile,
  onNavigate
}) {
  // Screen views: "setup" (topic & goal choice) | "notebook" (writing workspace) | "report" (Spraivo AI report card)
  const [viewState, setViewState] = useState("setup");

  // Topic Mode: "custom" | "ai"
  const [topicMode, setTopicMode] = useState("ai");
  const [customTopicInput, setCustomTopicInput] = useState("");
  const [currentAITopic, setCurrentAITopic] = useState(null);

  // Completed Topics (Non-repeating topics tracking)
  const [completedTopics, setCompletedTopics] = useState([]);

  // Word goal preference (Purely optional guideline, no restrictive rejection)
  const [selectedWordGoal, setSelectedWordGoal] = useState("freeform"); // "freeform" | 100 | 250 | 500 | "custom"
  const [customWordGoalNumber, setCustomWordGoalNumber] = useState(150);

  // Active essay state
  const [activeTopicTitle, setActiveTopicTitle] = useState("");
  const [essayContent, setEssayContent] = useState("");

  // Analysis & Submission state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const [reportCard, setReportCard] = useState(null);

  useEffect(() => {
    const list = getCompletedWritingTopics();
    setCompletedTopics(list);
    pickFreshAITopic(list);
  }, []);

  // Pick a fresh AI topic that the user has never written on before
  const pickFreshAITopic = (alreadyCompleted = completedTopics) => {
    const completedSet = new Set(alreadyCompleted.map((t) => t.toLowerCase().trim()));
    const uncompleted = INITIAL_TOPIC_POOL.filter(
      (item) => !completedSet.has(item.topic.toLowerCase().trim())
    );

    if (uncompleted.length > 0) {
      const random = uncompleted[Math.floor(Math.random() * uncompleted.length)];
      setCurrentAITopic(random);
    } else {
      // If all 10 standard topics completed, generate unique dynamic topic
      const dynamicTopic = {
        id: "custom-ai-" + Date.now(),
        category: "Spraivo AI Special Topic",
        topic: "The Greatest Technological or Philosophical Question Facing Our Generation",
        starter_prompt: "Explore an emerging dilemma that humanity must solve in the coming decades."
      };
      setCurrentAITopic(dynamicTopic);
    }
  };

  const handleStartWriting = () => {
    let finalTitle = "";
    if (topicMode === "custom") {
      finalTitle = customTopicInput.trim();
      if (!finalTitle) {
        alert("Please enter a topic title for your writing session.");
        return;
      }
    } else {
      finalTitle = currentAITopic?.topic || "My Reflections";
    }

    setActiveTopicTitle(finalTitle);
    setEssayContent("");
    setAnalysisError("");
    setReportCard(null);
    setViewState("notebook");
  };

  const textareaRef = useRef(null);

  const handleEssayChange = (e) => {
    setEssayContent(e.target.value);
    if (analysisError) setAnalysisError("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(520, textareaRef.current.scrollHeight)}px`;
    }
  };

  const currentDateStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  // Live word and character stats
  const wordCount = essayContent.trim()
    ? essayContent.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = essayContent.length;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 180));

  // Word goal display label
  const effectiveWordGoal =
    selectedWordGoal === "freeform"
      ? null
      : selectedWordGoal === "custom"
      ? customWordGoalNumber
      : selectedWordGoal;

  const handleSubmitForAnalysis = async () => {
    if (wordCount < 15) {
      setAnalysisError("Please compose at least 15 words so Spraivo AI can provide a meaningful structural analysis.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError("");

    try {
      const result = await submitWriting({
        writing_type: "notebook_essay",
        prompt_text: activeTopicTitle,
        submitted_text: essayContent.trim()
      });

      setReportCard(result.feedback);
      addCompletedWritingTopic(activeTopicTitle);
      setCompletedTopics((prev) => [activeTopicTitle, ...prev]);

      if (result.updatedProfile && onUpdateProfile) {
        onUpdateProfile(result.updatedProfile);
      }

      if (result.feedback?.overall_score >= 75) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }

      setViewState("report");
    } catch (err) {
      console.error("Analysis submission error:", err);
      setAnalysisError(err.message || "Failed to analyze your writing. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: "960px", paddingBottom: "60px" }}>
      {/* ========================================================================= */}
      {/* 1. TOPIC SETUP & SELECTION VIEW                                           */}
      {/* ========================================================================= */}
      {viewState === "setup" && (
        <div>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="badge badge-primary" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <PenTool size={13} />
                <span>Spraivo Writing Lab</span>
              </span>
              <span className="badge badge-gray">Distraction-Free Notebook</span>
            </div>
            <h1 style={{ fontSize: "2.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Expressive Writing Lab
            </h1>
            <p style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "1rem" }}>
              Choose your topic or let Spraivo AI suggest an unrepeated prompt. Write without rigid limits, and receive a comprehensive grammatical and semantic report card.
            </p>
          </div>

          {/* Topic Mode Selector Cards */}
          <div className="grid-2" style={{ gap: "20px", marginBottom: "32px" }}>
            {/* Card 1: Spraivo AI Suggestion */}
            <div
              className={`card card-interactive ${topicMode === "ai" ? "card-selected" : ""}`}
              onClick={() => setTopicMode("ai")}
              style={{
                padding: "26px",
                border: topicMode === "ai" ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                background: topicMode === "ai" ? "rgba(37, 99, 235, 0.08)" : "var(--bg-card)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span className="badge badge-primary">Spraivo AI Topic Generator</span>
                  <span className="badge badge-gray">Non-Repeating</span>
                </div>

                <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "8px" }}>
                  {currentAITopic ? currentAITopic.topic : "Generating inspiring prompt..."}
                </h3>

                {currentAITopic?.category && (
                  <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600, marginBottom: "8px" }}>
                    Category: {currentAITopic.category}
                  </div>
                )}

                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  {currentAITopic?.starter_prompt}
                </p>
              </div>

              <div style={{ marginTop: "18px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    pickFreshAITopic();
                  }}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <RefreshCw size={14} />
                  <span>Suggest Another Topic</span>
                </button>
              </div>
            </div>

            {/* Card 2: Write on My Own Topic */}
            <div
              className={`card card-interactive ${topicMode === "custom" ? "card-selected" : ""}`}
              onClick={() => setTopicMode("custom")}
              style={{
                padding: "26px",
                border: topicMode === "custom" ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                background: topicMode === "custom" ? "rgba(37, 99, 235, 0.08)" : "var(--bg-card)",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="badge badge-gray">Custom Theme</span>
                <span className="badge badge-gray">Your Own Subject</span>
              </div>

              <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "8px" }}>
                Write on My Own Topic
              </h3>

              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.5" }}>
                Have an essay assignment, personal thought, or specific debate in mind? Type your topic title below.
              </p>

              <input
                type="text"
                className="input"
                value={customTopicInput}
                onChange={(e) => {
                  setCustomTopicInput(e.target.value);
                  setTopicMode("custom");
                }}
                placeholder="e.g., Why Learning a New Language Rewires the Brain..."
                style={{
                  width: "100%",
                  color: "var(--text-primary)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.92rem",
                  padding: "10px 14px"
                }}
              />
            </div>
          </div>

          {/* Word Goal Preference (Optional Guidelines, No Limit Blocking) */}
          <div
            className="card"
            style={{
              padding: "24px",
              marginBottom: "32px",
              background: "var(--bg-subtle)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Sliders size={16} color="var(--primary)" />
              <h4 style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 700 }}>
                Set a Target Word Count (Optional Guideline)
              </h4>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Choose a target goal for your practice. There are no strict cutoffs or rejections—write as much or as little as you desire!
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              {[
                { id: "freeform", label: "No Limit (Freeform)" },
                { id: 100, label: "100-150 Words (Quick)" },
                { id: 250, label: "250-300 Words (Standard Essay)" },
                { id: 500, label: "500+ Words (Deep Dive)" }
              ].map((chip) => {
                const isSelected = selectedWordGoal === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setSelectedWordGoal(chip.id)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "var(--radius-sm)",
                      border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                      background: isSelected ? "rgba(99, 102, 241, 0.15)" : "var(--bg-card)",
                      color: isSelected ? "var(--primary)" : "var(--text-primary)",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      cursor: "pointer"
                    }}
                  >
                    {chip.label}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setSelectedWordGoal("custom")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  border: selectedWordGoal === "custom" ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                  background: selectedWordGoal === "custom" ? "rgba(99, 102, 241, 0.15)" : "var(--bg-card)",
                  color: selectedWordGoal === "custom" ? "var(--primary)" : "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  cursor: "pointer"
                }}
              >
                Custom Target
              </button>

              {selectedWordGoal === "custom" && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input
                    type="number"
                    min={20}
                    max={2000}
                    value={customWordGoalNumber}
                    onChange={(e) => setCustomWordGoalNumber(Math.max(10, parseInt(e.target.value) || 100))}
                    style={{
                      width: "80px",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-card)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      textAlign: "center"
                    }}
                  />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>words</span>
                </div>
              )}
            </div>
          </div>

          {/* Launch Button */}
          <div style={{ textAlign: "center" }}>
            <button
              id="open-notebook-btn"
              type="button"
              className="btn btn-primary"
              onClick={handleStartWriting}
              style={{ padding: "14px 36px", fontSize: "1.05rem", fontWeight: 700 }}
            >
              <PenTool size={18} />
              <span>Open Notebook & Start Writing</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. NOTEBOOK WRITING WORKSPACE VIEW                                        */}
      {/* ========================================================================= */}
      {viewState === "notebook" && (
        <div>
          {/* Header Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
            <button
              id="back-to-setup-btn"
              className="btn btn-secondary btn-sm"
              onClick={() => setViewState("setup")}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeft size={16} />
              <span>Change Topic</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Coaching by <strong style={{ color: "var(--primary)" }}>Spraivo AI</strong>
              </span>
              <button
                id="submit-notebook-top-btn"
                className="btn btn-primary btn-sm"
                onClick={handleSubmitForAnalysis}
                disabled={isAnalyzing || wordCount < 15}
              >
                <span>{isAnalyzing ? "Analyzing..." : "Analyze & Get Report"}</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Authentic Real Notebook Paper Interface */}
          <div className="real-notebook-sheet">
            {/* Spiral / Binder punch holes along the left margin */}
            <div className="notebook-binder-strip" aria-hidden="true">
              <div className="notebook-punch-hole" />
              <div className="notebook-punch-hole" />
              <div className="notebook-punch-hole" />
            </div>

            {/* Classic Red Vertical Margin Line */}
            <div className="notebook-margin-line" aria-hidden="true" />

            {/* Classic Printed Notebook Header Bar */}
            <div className="notebook-sheet-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <div className="notebook-header-field">
                  <span className="notebook-field-label">SUBJECT:</span>
                  <span className="notebook-field-value">{activeTopicTitle}</span>
                </div>
              </div>

              <div className="notebook-header-meta">
                <div className="notebook-header-field">
                  <span className="notebook-field-label">DATE:</span>
                  <span className="notebook-field-value">{currentDateStr}</span>
                </div>
                <div className="notebook-header-field">
                  <span className="notebook-field-label">PAGE:</span>
                  <span className="notebook-field-value">01</span>
                </div>

                {/* Live Metric Badges */}
                <div style={{ display: "flex", gap: "6px", alignItems: "center", marginLeft: "8px" }}>
                  <span className="badge badge-gray" style={{ fontSize: "0.78rem", padding: "4px 10px" }}>
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                    {effectiveWordGoal ? ` / ${effectiveWordGoal} goal` : ""}
                  </span>
                  <span className="badge badge-gray" style={{ fontSize: "0.78rem", padding: "4px 10px" }}>
                    {charCount} chars
                  </span>
                </div>
              </div>
            </div>

            {/* Error banner if any */}
            {analysisError && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.12)",
                  borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
                  padding: "10px 24px 10px 84px",
                  color: "#fca5a5",
                  fontSize: "0.9rem",
                  fontWeight: 600
                }}
              >
                {analysisError}
              </div>
            )}

            {/* Real Ruled Notebook Textarea */}
            <textarea
              ref={textareaRef}
              id="notebook-essay-textarea"
              className="real-notebook-textarea"
              value={essayContent}
              onChange={handleEssayChange}
              placeholder="Begin writing here on the notebook lines... Your paragraphs will sit directly on each line. As you write, the notebook automatically expands with more lined paper..."
              autoFocus
            />
          </div>

          {/* Action Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Tip: Aim to develop your arguments clearly with transition words and descriptive vocabulary.
            </div>

            <button
              id="submit-notebook-btn"
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitForAnalysis}
              disabled={isAnalyzing || wordCount < 15}
              style={{ padding: "12px 28px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}
            >
              {isAnalyzing ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderTopColor: "#fff",
                      animation: "spin 0.8s linear infinite"
                    }}
                  />
                  <span>Spraivo AI is Generating Your Report Card...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Analyze & Generate Report Card</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. COMPREHENSIVE SPRAIVO AI REPORT CARD VIEW                              */}
      {/* ========================================================================= */}
      {viewState === "report" && reportCard && (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Back Action */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setViewState("notebook")}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeft size={16} />
              <span>Revise in Notebook</span>
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => setViewState("setup")}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <PenTool size={15} />
              <span>Write a New Topic</span>
            </button>
          </div>

          {/* Main Report Card Container */}
          <div className="card" style={{ padding: "36px", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Award size={20} color="var(--primary)" />
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Spraivo AI Diagnostic Report Card
              </span>
            </div>

            <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "4px" }}>
              {activeTopicTitle}
            </h2>
            <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "24px" }}>
              Evaluated {wordCount} words on {new Date().toLocaleDateString()}
            </div>

            {/* Overall Score Banner */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "16px",
                padding: "20px",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                marginBottom: "28px"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Overall Score
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "2.8rem", fontWeight: 800, color: "var(--primary)" }}>
                  {reportCard.overall_score || 85}%
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Grammar
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "2.4rem", fontWeight: 700, color: "#10b981" }}>
                  {reportCard.grammar_score || 88}%
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Vocabulary
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "2.4rem", fontWeight: 700, color: "#38bdf8" }}>
                  {reportCard.vocabulary_score || 82}%
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Coherence
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "2.4rem", fontWeight: 700, color: "#a855f7" }}>
                  {reportCard.coherence_score || 86}%
                </div>
              </div>
            </div>

            {/* Summary Feedback */}
            {reportCard.summary_feedback && (
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(6, 182, 212, 0.06))",
                  borderLeft: "4px solid var(--primary)",
                  padding: "16px 20px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "28px"
                }}
              >
                <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: "4px" }}>
                  Spraivo AI Mentor Assessment:
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.5" }}>
                  {reportCard.summary_feedback}
                </p>
              </div>
            )}

            {/* Sentence-by-Sentence Detailed Analysis */}
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                Sentence-by-Sentence Polish & Improvements ({reportCard.corrections?.length || 0})
              </h3>

              {reportCard.corrections && reportCard.corrections.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {reportCard.corrections.map((corr, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "18px 20px",
                        background: "var(--bg-subtle)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-subtle)"
                      }}
                    >
                      <div style={{ marginBottom: "8px" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                          Original Sentence
                        </span>
                        <div style={{ color: "#fca5a5", fontSize: "0.95rem", marginTop: "2px", fontStyle: "italic" }}>
                          "{corr.original_sentence}"
                        </div>
                      </div>

                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                          Polished Variation
                        </span>
                        <div style={{ color: "#6ee7b7", fontSize: "0.95rem", marginTop: "2px", fontWeight: 600 }}>
                          "{corr.corrected_sentence}"
                        </div>
                      </div>

                      <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.45" }}>
                        <strong style={{ color: "var(--primary)" }}>Teaching Reason: </strong>
                        {corr.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: "20px",
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    borderRadius: "var(--radius-md)",
                    color: "#6ee7b7",
                    fontSize: "0.95rem",
                    textAlign: "center"
                  }}
                >
                  🎉 Flawless work! Every sentence in your submission demonstrated clean grammar, proper syntax, and natural flow.
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setViewState("notebook")}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <RotateCcw size={16} />
                <span>Revise Draft</span>
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setViewState("setup")}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <PenTool size={16} />
                <span>Write Next Topic</span>
              </button>

              {onNavigate && (
                <button
                  className="btn btn-secondary"
                  onClick={() => onNavigate("history")}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <History size={16} />
                  <span>View in History</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
