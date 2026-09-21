import React, { useState, useEffect } from "react";
import {
  getWritingSubmissions,
  getVocabSessionHistory,
  getPracticeAttempts
} from "../services/storageService";
import {
  History,
  FileText,
  Layers,
  Award,
  Calendar,
  Clock,
  ChevronRight,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  BookOpen,
  ArrowRight
} from "lucide-react";

export default function HistoryScreen({
  userProfile,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'writing' | 'vocabulary' | 'quizzes'
  const [searchQuery, setSearchQuery] = useState("");

  const [writingHistory, setWritingHistory] = useState([]);
  const [vocabHistory, setVocabHistory] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);

  // Selected report card modal for full view
  const [selectedReportSubmission, setSelectedReportSubmission] = useState(null);

  useEffect(() => {
    loadAllHistory();
  }, []);

  const loadAllHistory = async () => {
    try {
      const writings = await getWritingSubmissions();
      setWritingHistory(writings || []);
    } catch (e) {}

    try {
      const vocabs = getVocabSessionHistory();
      setVocabHistory(vocabs || []);
    } catch (e) {}

    try {
      const quizzes = await getPracticeAttempts();
      setQuizHistory(quizzes || []);
    } catch (e) {}
  };

  // Build unified chronological timeline
  const unifiedList = [
    ...writingHistory.map((item) => ({
      type: "writing",
      id: item.submission_id || item.id || Math.random().toString(),
      title: item.prompt_text || "Custom Writing",
      timestamp: item.timestamp,
      score: item.feedback?.overall_score || 80,
      details: `${item.word_count || 0} words written`,
      data: item
    })),
    ...vocabHistory.map((item) => ({
      type: "vocabulary",
      id: item.id || Math.random().toString(),
      title: item.topic_title || "Vocabulary Sprint",
      timestamp: item.timestamp,
      score: item.score || 100,
      details: `${item.words_count || 0} words mastered (${item.accuracy || "100%"})`,
      data: item
    })),
    ...quizHistory.map((item) => ({
      type: "quiz",
      id: item.attempt_id || Math.random().toString(),
      title: item.topic_id_or_set_id || "Quiz Assessment",
      timestamp: item.timestamp,
      score: item.score || 0,
      details: `${item.questions_correct || 0} of ${item.questions_total || 0} questions correct`,
      data: item
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const filteredUnified = unifiedList.filter((item) => {
    if (activeTab !== "all" && item.type !== activeTab) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q)
    );
  });

  return (
    <div className="app-container" style={{ paddingBottom: "60px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span className="badge badge-primary" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <History size={13} />
            <span>Learning Timeline</span>
          </span>
          <span className="badge badge-gray">{unifiedList.length} Total Activities</span>
        </div>
        <h1 style={{ fontSize: "2.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
          My Learning History
        </h1>
        <p style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "1rem" }}>
          Track your complete journey. Review past writing report cards, sentence corrections, vocabulary sprints, and quiz results.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          marginBottom: "28px"
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Activities" },
            { id: "writing", label: "Writing Lab" },
            { id: "vocabulary", label: "Vocabulary" },
            { id: "quiz", label: "Quizzes" }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`history-tab-${tab.id}`}
                className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: "380px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: searchQuery ? "var(--primary)" : "var(--text-muted)",
              transition: "color 0.2s ease",
              pointerEvents: "none"
            }}
          />
          <input
            id="history-search-input"
            type="text"
            className="history-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities, essays, words..."
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px"
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* History Timeline Cards */}
      {filteredUnified.length === 0 ? (
        <div
          className="card"
          style={{
            padding: "60px 24px",
            textAlign: "center",
            border: "1px dashed var(--border-subtle)"
          }}
        >
          <History size={40} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: "1.3rem", color: "var(--text-primary)", marginBottom: "8px" }}>
            No History Found
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "440px", margin: "0 auto 20px" }}>
            {searchQuery
              ? `No activities matched "${searchQuery}".`
              : "Complete your first writing session, vocabulary sprint, or grammar quiz to build your learning timeline!"}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onNavigate && onNavigate("writing")}
            >
              Start Writing Lab
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate && onNavigate("vocabulary")}
            >
              Start Vocabulary
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredUnified.map((item, idx) => {
            const isWriting = item.type === "writing";
            const isVocab = item.type === "vocabulary";
            const isQuiz = item.type === "quiz";

            const dateStr = item.timestamp
              ? new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })
              : "Recent";

            const scoreBadgeClass =
              item.score >= 75 ? "badge-success" : item.score >= 50 ? "badge-warning" : "badge-danger";

            return (
              <div
                key={item.id || idx}
                className="card"
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                  borderLeft: isWriting
                    ? "4px solid #ec4899"
                    : isVocab
                    ? "4px solid #06b6d4"
                    : "4px solid #6366f1"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: isWriting
                        ? "rgba(236, 72, 153, 0.12)"
                        : isVocab
                        ? "rgba(6, 182, 212, 0.12)"
                        : "rgba(99, 102, 241, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {isWriting ? (
                      <FileText size={22} color="#ec4899" />
                    ) : isVocab ? (
                      <Layers size={22} color="#06b6d4" />
                    ) : (
                      <Award size={22} color="#818cf8" />
                    )}
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span className="badge badge-gray" style={{ fontSize: "0.72rem" }}>
                        {isWriting ? "Writing Lab" : isVocab ? "Vocabulary" : "Quiz"}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {dateStr}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                      {item.title}
                    </h3>

                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "3px" }}>
                      {item.details}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span className={`badge ${scoreBadgeClass}`} style={{ fontSize: "0.9rem", padding: "6px 14px", fontWeight: 700 }}>
                    Score: {item.score}%
                  </span>

                  {isWriting && item.data?.feedback && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedReportSubmission(item.data)}
                      style={{ fontSize: "0.82rem", gap: "4px" }}
                    >
                      <span>View Report Card</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Report Card Modal */}
      {selectedReportSubmission && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.78)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
          onClick={() => setSelectedReportSubmission(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: "780px",
              width: "100%",
              padding: "32px",
              position: "relative",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedReportSubmission(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                padding: "4px"
              }}
            >
              <X size={22} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="badge badge-primary">Spraivo AI Stored Report</span>
              <span className="badge badge-gray">
                {selectedReportSubmission.timestamp ? new Date(selectedReportSubmission.timestamp).toLocaleDateString() : ""}
              </span>
            </div>

            <h2 style={{ fontSize: "1.6rem", color: "var(--text-primary)", marginBottom: "4px" }}>
              {selectedReportSubmission.prompt_text}
            </h2>
            <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "20px" }}>
              {selectedReportSubmission.word_count} words submitted
            </div>

            {/* Scores Overview */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "12px",
                padding: "16px",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                textAlign: "center"
              }}
            >
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Overall
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>
                  {selectedReportSubmission.feedback?.overall_score || 80}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Grammar
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#10b981" }}>
                  {selectedReportSubmission.feedback?.grammar_score || 85}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Vocabulary
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#38bdf8" }}>
                  {selectedReportSubmission.feedback?.vocabulary_score || 80}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Coherence
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#a855f7" }}>
                  {selectedReportSubmission.feedback?.coherence_score || 80}%
                </div>
              </div>
            </div>

            {/* Submitted text */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "6px" }}>
                Submitted Essay Text
              </div>
              <div
                style={{
                  background: "var(--bg-subtle)",
                  padding: "16px 18px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.92rem",
                  color: "var(--text-primary)",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap"
                }}
              >
                {selectedReportSubmission.submitted_text}
              </div>
            </div>

            {/* AI Summary Feedback */}
            {selectedReportSubmission.feedback?.summary_feedback && (
              <div
                style={{
                  background: "rgba(37, 99, 235, 0.08)",
                  borderLeft: "3px solid var(--primary)",
                  padding: "14px 18px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "24px",
                  fontSize: "0.9rem",
                  color: "var(--text-primary)",
                  lineHeight: "1.5"
                }}
              >
                <strong>Spraivo AI Feedback: </strong>
                {selectedReportSubmission.feedback.summary_feedback}
              </div>
            )}

            {/* Sentence Corrections */}
            {selectedReportSubmission.feedback?.corrections &&
              selectedReportSubmission.feedback.corrections.length > 0 && (
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
                    Sentence Analysis ({selectedReportSubmission.feedback.corrections.length})
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {selectedReportSubmission.feedback.corrections.map((corr, cIdx) => (
                      <div
                        key={cIdx}
                        style={{
                          padding: "14px 16px",
                          background: "var(--bg-subtle)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-subtle)"
                        }}
                      >
                        <div style={{ fontSize: "0.88rem", color: "#fca5a5", marginBottom: "4px" }}>
                          <em>"{corr.original_sentence}"</em>
                        </div>
                        <div style={{ fontSize: "0.88rem", color: "#6ee7b7", fontWeight: 600, marginBottom: "6px" }}>
                          → "{corr.corrected_sentence}"
                        </div>
                        <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                          <strong>Tip: </strong>
                          {corr.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
