import React, { useState, useEffect } from "react";
import { WRITING_PROMPTS } from "../data/writingPromptsData";
import {
  submitWriting,
  getWritingSubmissions
} from "../services/storageService";
import {
  PenTool,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  History,
  BookOpen,
  Info,
  Clock,
  HelpCircle
} from "lucide-react";

export default function WritingLabScreen({
  userProfile,
  onUpdateProfile,
  initialPromptId,
  onNavigate
}) {
  const [viewState, setViewState] = useState("prompts"); // 'prompts' | 'write' | 'feedback' | 'history'
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [submittedText, setSubmittedText] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all' | 'general' | 'academic'

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentFeedback, setCurrentFeedback] = useState(null);

  // Past submissions archive
  const [pastSubmissions, setPastSubmissions] = useState([]);

  useEffect(() => {
    getWritingSubmissions().then((subs) => {
      setPastSubmissions(subs);
    });
  }, []);

  // Handle deep link / prompt selection from Dashboard recommendation
  useEffect(() => {
    if (initialPromptId) {
      const p = WRITING_PROMPTS.find((item) => item.prompt_id === initialPromptId);
      if (p) {
        setSelectedPrompt(p);
        setSubmittedText("");
        setViewState("write");
      }
    }
  }, [initialPromptId]);

  const filteredPrompts = WRITING_PROMPTS.filter((p) => {
    if (filterType === "all") return true;
    return p.writing_type === filterType;
  });

  const handleSelectPrompt = (prompt) => {
    setSelectedPrompt(prompt);
    setSubmittedText("");
    setErrorMessage("");
    setCurrentFeedback(null);
    setViewState("write");
  };

  const wordCount = submittedText.trim() ? submittedText.trim().split(/\s+/).filter(Boolean).length : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (wordCount < 10) {
      setErrorMessage("Please write at least 10 words before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const data = await submitWriting({
        writing_type: selectedPrompt.writing_type,
        prompt_text: selectedPrompt.prompt_text,
        submitted_text: submittedText.trim()
      });

      setCurrentFeedback(data.feedback);
      if (data.updatedProfile) {
        onUpdateProfile(data.updatedProfile);
      }
      // Refresh past submissions
      const updatedList = await getWritingSubmissions();
      setPastSubmissions(updatedList);
      setViewState("feedback");
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "Failed to evaluate your writing. Please check your internet and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevise = () => {
    setViewState("write");
  };

  return (
    <div className="app-container" style={{ maxWidth: "920px" }}>
      {/* 1. PROMPT SELECTION CATALOG */}
      {viewState === "prompts" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span className="badge badge-primary">Writing Lab</span>
                <span className="badge badge-gray">{WRITING_PROMPTS.length} Prompts Available</span>
              </div>
              <h1>Writing Practice Lab</h1>
              <p style={{ marginTop: "4px" }}>
                Practice everyday and academic writing with sentence-by-sentence feedback from your AI mentor.
              </p>
            </div>

            <button
              id="view-submissions-history-btn"
              className="btn btn-secondary btn-sm"
              onClick={() => setViewState("history")}
            >
              <History size={16} />
              <span>Past Submissions ({pastSubmissions.length})</span>
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Prompts" },
              { id: "general", label: "Everyday English" },
              { id: "academic", label: "Academic & Exam" }
            ].map((tab) => (
              <button
                key={tab.id}
                id={`writing-filter-${tab.id}`}
                className={`btn btn-sm ${filterType === tab.id ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setFilterType(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Prompts Grid */}
          <div className="grid-2">
            {filteredPrompts.map((p) => (
              <div
                key={p.prompt_id}
                id={`prompt-card-${p.prompt_id}`}
                className="card card-interactive"
                onClick={() => handleSelectPrompt(p)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "24px"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span className={`badge ${p.writing_type === "academic" ? "badge-primary" : "badge-warning"}`}>
                      {p.writing_type === "academic" ? "Academic" : "General"}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={13} /> {p.suggested_words}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                    {p.title}
                  </h3>

                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "16px" }}>
                    {p.prompt_text}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid var(--border-subtle)",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--primary)"
                  }}
                >
                  <span>Start Writing</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. WRITING SUBMISSION FORM */}
      {viewState === "write" && selectedPrompt && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <button
              id="back-to-prompts-btn"
              className="btn btn-secondary btn-sm"
              onClick={() => setViewState("prompts")}
            >
              ← Choose Different Prompt
            </button>
            <span className="badge badge-primary">{selectedPrompt.writing_type.toUpperCase()}</span>
          </div>

          <div className="card" style={{ marginBottom: "20px", padding: "24px" }}>
            <h2 style={{ fontSize: "1.45rem", marginBottom: "8px" }}>{selectedPrompt.title}</h2>
            <p style={{ fontSize: "1.05rem", color: "var(--text-primary)", lineHeight: "1.6" }}>
              {selectedPrompt.prompt_text}
            </p>
            <div style={{ marginTop: "12px", display: "flex", gap: "16px", fontSize: "0.86rem", color: "var(--text-muted)" }}>
              <span>Suggested Length: <strong>{selectedPrompt.suggested_words}</strong></span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  Your Response:
                </label>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: wordCount >= 10 ? "var(--success)" : "var(--warning)"
                  }}
                >
                  {wordCount} words
                </span>
              </div>

              <textarea
                id="writing-input-textarea"
                className="fill-input"
                rows={10}
                placeholder="Write your piece here. Express your ideas freely — your AI mentor will help you refine grammar and vocabulary..."
                value={submittedText}
                onChange={(e) => setSubmittedText(e.target.value)}
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  resize: "vertical",
                  lineHeight: "1.7",
                  fontSize: "1rem",
                  fontFamily: "var(--font-body)",
                  marginBottom: "16px"
                }}
              />

              {/* Explicit Word Count Hint / Tooltip */}
              {wordCount < 10 && (
                <div
                  style={{
                    background: "var(--warning-bg)",
                    border: "1px solid var(--warning-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "10px 14px",
                    color: "var(--warning)",
                    fontSize: "0.88rem",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Info size={16} style={{ flexShrink: 0 }} />
                  <span>
                    Write at least 10 words (aim for {selectedPrompt.suggested_words}) before submitting.
                  </span>
                </div>
              )}

              {errorMessage && (
                <div
                  style={{
                    background: "var(--danger-bg)",
                    border: "1px solid var(--danger-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "12px 16px",
                    color: "var(--danger)",
                    fontSize: "0.9rem",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  You will get instant sentence-by-sentence corrections and advice.
                </span>

                <button
                  id="submit-writing-btn"
                  type="submit"
                  className="btn btn-primary"
                  disabled={wordCount < 10 || isSubmitting}
                  title={wordCount < 10 ? "Write at least 10 words to submit" : "Submit your writing for feedback"}
                  style={{ minWidth: "220px", height: "46px" }}
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles size={16} />
                      <span>Grading Your Writing...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit for Feedback</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 3. STRUCTURED FEEDBACK VIEW */}
      {viewState === "feedback" && currentFeedback && selectedPrompt && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <button
              id="revise-submission-btn"
              className="btn btn-secondary btn-sm"
              onClick={handleRevise}
            >
              <RotateCcw size={15} />
              <span>Revise & Polish</span>
            </button>

            <button
              id="try-another-prompt-btn"
              className="btn btn-primary btn-sm"
              onClick={() => setViewState("prompts")}
            >
              <span>Try Another Prompt</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Scores Overview Card */}
          <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: "6px" }}>
                  Feedback Ready
                </span>
                <h2>Writing Results</h2>
                <p style={{ fontSize: "0.9rem" }}>
                  Prompt: <strong>{selectedPrompt.title}</strong>
                </p>
              </div>

              {/* Overall Score Badge */}
              <div
                style={{
                  textAlign: "center",
                  background: "var(--bg-subtle)",
                  padding: "16px 24px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Overall Score
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2.6rem",
                    fontWeight: 800,
                    color: currentFeedback.overall_score >= 75 ? "var(--success)" : currentFeedback.overall_score >= 55 ? "var(--warning)" : "var(--danger)"
                  }}
                >
                  {currentFeedback.overall_score}
                  <span style={{ fontSize: "1.1rem", color: "var(--text-muted)", fontWeight: 400 }}>/100</span>
                </div>
              </div>
            </div>

            {/* Plain English explanation of the score */}
            <div
              style={{
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 16px",
                marginBottom: "20px",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                borderLeft: "3px solid var(--primary)"
              }}
            >
              💡 {currentFeedback.overall_score >= 75
                ? "Well written! Your ideas are clear and engaging."
                : currentFeedback.overall_score >= 55
                ? "Good effort — review the sentence corrections below to sharpen your phrasing."
                : "Nice try — take a look at the corrections below to learn how to fix these sentences."}
            </div>

            {/* 3 Component Score Progress Bars with Jargon-Free Labels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Grammar Accuracy</span>
                  <span style={{ fontWeight: 700, color: "#818cf8" }}>{currentFeedback.grammar_score}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill fill-grammar" style={{ width: `${currentFeedback.grammar_score}%` }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Vocabulary & Word Choice</span>
                  <span style={{ fontWeight: 700, color: "#38bdf8" }}>{currentFeedback.vocabulary_score}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill fill-vocab" style={{ width: `${currentFeedback.vocabulary_score}%` }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>How well your ideas connect</span>
                  <span style={{ fontWeight: 700, color: "#34d399" }}>{currentFeedback.coherence_score}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill fill-reading" style={{ width: `${currentFeedback.coherence_score}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Sentence-Level Corrections Section */}
          <div className="card" style={{ padding: "28px", marginBottom: "24px" }}>
            <h3 style={{ marginBottom: "16px", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Sentence-by-Sentence Advice</span>
              <span className="badge badge-gray">{currentFeedback.corrections.length} Tips</span>
            </h3>

            {currentFeedback.corrections.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {currentFeedback.corrections.map((corr, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      padding: "18px"
                    }}
                  >
                    {/* What you wrote */}
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ fontSize: "0.76rem", color: "var(--danger)", textTransform: "uppercase", fontWeight: 700, marginBottom: "2px" }}>
                        What you wrote
                      </div>
                      <div style={{ color: "var(--danger)", textDecoration: "line-through", fontSize: "0.95rem" }}>
                        "{corr.original_sentence}"
                      </div>
                    </div>

                    {/* Suggested Correction */}
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ fontSize: "0.76rem", color: "var(--success)", textTransform: "uppercase", fontWeight: 700, marginBottom: "2px" }}>
                        Better way to say it
                      </div>
                      <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "1rem" }}>
                        "{corr.corrected_sentence}"
                      </div>
                    </div>

                    {/* Explanation */}
                    <div
                      style={{
                        background: "rgba(99, 102, 241, 0.08)",
                        padding: "10px 12px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.88rem",
                        color: "var(--text-secondary)",
                        lineHeight: "1.5"
                      }}
                    >
                      <strong style={{ color: "var(--primary)" }}>Why this helps: </strong>
                      {corr.explanation}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "24px", color: "var(--success)" }}>
                <CheckCircle2 size={32} style={{ margin: "0 auto 8px" }} />
                <p>Excellent grammar and word choice! No major sentence errors were found.</p>
              </div>
            )}
          </div>

          {/* Tutor Summary Note */}
          <div
            className="card"
            style={{
              padding: "24px",
              background: "rgba(99, 102, 241, 0.08)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              marginBottom: "32px"
            }}
          >
            <h4 style={{ color: "var(--primary)", marginBottom: "8px", fontSize: "1.05rem" }}>
              Tutor's Note
            </h4>
            <p style={{ color: "var(--text-primary)", lineHeight: "1.6", fontSize: "0.95rem" }}>
              {currentFeedback.summary_feedback}
            </p>
          </div>
        </div>
      )}

      {/* 4. PAST SUBMISSIONS ARCHIVE */}
      {viewState === "history" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <button
              id="back-from-history-btn"
              className="btn btn-secondary btn-sm"
              onClick={() => setViewState("prompts")}
            >
              ← Back to Prompts
            </button>
            <h2>Your Writing Archive</h2>
          </div>

          {pastSubmissions.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "40px" }}>
              <PenTool size={36} color="#d946ef" style={{ margin: "0 auto 12px" }} />
              <h3>No past submissions yet</h3>
              <p style={{ marginTop: "6px" }}>Pick a prompt from the catalog to get your first writing evaluation!</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setViewState("prompts")}
                style={{ marginTop: "16px" }}
              >
                Browse Prompts
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {pastSubmissions.map((sub) => (
                <div
                  key={sub.submission_id}
                  className="card"
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "14px"
                  }}
                >
                  <div style={{ flex: "1 1 260px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span className={`badge ${sub.writing_type === "academic" ? "badge-primary" : "badge-warning"}`}>
                        {sub.writing_type === "academic" ? "Academic" : "General"}
                      </span>
                      <strong style={{ color: "var(--text-primary)", fontSize: "1rem" }}>
                        {sub.prompt_text.length > 55 ? sub.prompt_text.slice(0, 55) + "..." : sub.prompt_text}
                      </strong>
                    </div>

                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <span>{new Date(sub.timestamp).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{sub.word_count} words</span>
                      <span>•</span>
                      <span>{sub.feedback?.corrections?.length || 0} corrections</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.6rem",
                        fontWeight: 800,
                        color: sub.feedback?.overall_score >= 75 ? "var(--success)" : "var(--warning)"
                      }}
                    >
                      {sub.feedback?.overall_score || 0}%
                    </div>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setSelectedPrompt({
                          title: "Archived Submission",
                          writing_type: sub.writing_type,
                          prompt_text: sub.prompt_text,
                          suggested_words: `${sub.word_count} words`
                        });
                        setCurrentFeedback(sub.feedback);
                        setSubmittedText(sub.submitted_text);
                        setViewState("feedback");
                      }}
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
