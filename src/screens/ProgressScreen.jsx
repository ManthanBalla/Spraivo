import React, { useState } from "react";
import { getPracticeAttempts } from "../services/storageService";
import { GRAMMAR_TOPICS } from "../data/grammarData";
import { findTopicMeta } from "../services/recommendationService";
import {
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Filter,
  X
} from "lucide-react";

export default function ProgressScreen({
  userProfile,
  onOpenGrammarTopic
}) {
  const [selectedAttemptForReview, setSelectedAttemptForReview] = useState(null);

  const attempts = getPracticeAttempts();

  // 1. Table: All 10 Grammar Topic scores sorted lowest to highest (weakest first)
  const sortedGrammarTopics = [...GRAMMAR_TOPICS].map((topic) => {
    const rawScore = userProfile?.grammar_topic_scores?.[topic.topic_id];
    const score = rawScore !== undefined && rawScore !== null ? rawScore : -1; // -1 for not started
    return {
      ...topic,
      score,
      status:
        score === -1
          ? "Not Started"
          : score >= 80
          ? "Mastered"
          : score >= 60
          ? "Proficient"
          : "Needs Practice"
    };
  });

  // Sort lowest to highest (-1 or lowest score first)
  sortedGrammarTopics.sort((a, b) => a.score - b.score);

  // 2. Line Chart Data: skill_scores over time grouped by date
  const attemptsByDate = {};

  if (userProfile?.created_at) {
    const initDate = userProfile.created_at.split("T")[0];
    attemptsByDate[initDate] = {
      date: initDate,
      grammar: [userProfile.skill_scores.grammar],
      vocabulary: [userProfile.skill_scores.vocabulary],
      reading: [userProfile.skill_scores.reading]
    };
  }

  for (const att of attempts) {
    const d = att.timestamp ? att.timestamp.split("T")[0] : "Today";
    if (!attemptsByDate[d]) {
      attemptsByDate[d] = {
        date: d,
        grammar: [],
        vocabulary: [],
        reading: []
      };
    }
    if (att.skill === "grammar") attemptsByDate[d].grammar.push(att.score);
    if (att.skill === "vocabulary") attemptsByDate[d].vocabulary.push(att.score);
    if (att.skill === "reading") attemptsByDate[d].reading.push(att.score);
  }

  const timelineDates = Object.keys(attemptsByDate).sort();
  let lastG = userProfile?.skill_scores?.grammar || 50;
  let lastV = userProfile?.skill_scores?.vocabulary || 50;
  let lastR = userProfile?.skill_scores?.reading || 50;

  const chartPoints = timelineDates.map((dateKey) => {
    const entry = attemptsByDate[dateKey];
    if (entry.grammar.length > 0) {
      lastG = Math.round(entry.grammar.reduce((a, b) => a + b, 0) / entry.grammar.length);
    }
    if (entry.vocabulary.length > 0) {
      lastV = Math.round(entry.vocabulary.reduce((a, b) => a + b, 0) / entry.vocabulary.length);
    }
    if (entry.reading.length > 0) {
      lastR = Math.round(entry.reading.reduce((a, b) => a + b, 0) / entry.reading.length);
    }

    return {
      date: dateKey,
      grammar: lastG,
      vocabulary: lastV,
      reading: lastR
    };
  });

  const renderPoints =
    chartPoints.length === 1
      ? [
          {
            date: "Start",
            grammar: Math.max(0, chartPoints[0].grammar - 10),
            vocabulary: Math.max(0, chartPoints[0].vocabulary - 8),
            reading: Math.max(0, chartPoints[0].reading - 5)
          },
          chartPoints[0]
        ]
      : chartPoints;

  // SVG Chart Geometry
  const svgWidth = 680;
  const svgHeight = 220;
  const paddingX = 50;
  const paddingY = 30;
  const plotWidth = svgWidth - paddingX * 2;
  const plotHeight = svgHeight - paddingY * 2;

  const getCoordinates = (index, value) => {
    const x = paddingX + (index / (renderPoints.length - 1)) * plotWidth;
    const y = paddingY + plotHeight - (value / 100) * plotHeight;
    return { x, y };
  };

  const grammarPath = renderPoints
    .map((pt, i) => {
      const { x, y } = getCoordinates(i, pt.grammar);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const vocabPath = renderPoints
    .map((pt, i) => {
      const { x, y } = getCoordinates(i, pt.vocabulary);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const readingPath = renderPoints
    .map((pt, i) => {
      const { x, y } = getCoordinates(i, pt.reading);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="app-container">
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span className="badge badge-primary">Learning Progress</span>
          <span className="badge badge-gray">{attempts.length} Total Exercises</span>
        </div>
        <h1>Your Learning Progress</h1>
        <p style={{ marginTop: "4px" }}>
          Track your skill growth, review areas that need practice, and inspect your quiz history.
        </p>
      </div>

      {/* 1. Skill Progress Over Time */}
      <div className="card" style={{ marginBottom: "32px", padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2>How Your Skills Are Growing Over Time</h2>
            <p style={{ fontSize: "0.88rem" }}>Estimated skill scores across your lessons and quizzes.</p>
          </div>

          <div style={{ display: "flex", gap: "16px", fontSize: "0.82rem", fontWeight: 600 }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#818cf8" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#6366f1" }} />
              Grammar
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#06b6d4" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#06b6d4" }} />
              Vocabulary
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
              Reading
            </span>
          </div>
        </div>

        {/* SVG Chart Container */}
        <div className="chart-container">
          <svg className="chart-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            {/* Grid lines */}
            {[20, 40, 60, 80, 100].map((val) => {
              const y = paddingY + plotHeight - (val / 100) * plotHeight;
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="var(--border-subtle)"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 4}
                    fill="var(--text-muted)"
                    fontSize="11"
                    textAnchor="end"
                  >
                    {val}%
                  </text>
                </g>
              );
            })}

            {/* Date labels on X axis */}
            {renderPoints.map((pt, i) => {
              const { x } = getCoordinates(i, 0);
              return (
                <text
                  key={i}
                  x={x}
                  y={svgHeight - 8}
                  fill="var(--text-muted)"
                  fontSize="11"
                  textAnchor="middle"
                >
                  {pt.date.length > 10 ? pt.date.slice(5) : pt.date}
                </text>
              );
            })}

            {/* Grammar Line */}
            <path d={grammarPath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
            {renderPoints.map((pt, i) => {
              const { x, y } = getCoordinates(i, pt.grammar);
              return <circle key={`g-${i}`} cx={x} cy={y} r="5" fill="#6366f1" stroke="#ffffff" strokeWidth="1.5" />;
            })}

            {/* Vocab Line */}
            <path d={vocabPath} fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
            {renderPoints.map((pt, i) => {
              const { x, y } = getCoordinates(i, pt.vocabulary);
              return <circle key={`v-${i}`} cx={x} cy={y} r="5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />;
            })}

            {/* Reading Line */}
            <path d={readingPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            {renderPoints.map((pt, i) => {
              const { x, y } = getCoordinates(i, pt.reading);
              return <circle key={`r-${i}`} cx={x} cy={y} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />;
            })}
          </svg>
        </div>
      </div>

      {/* 2. Grammar Topic Ranking Table */}
      <div className="card" style={{ marginBottom: "32px", padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2>Grammar Topics to Practice (Weakest First)</h2>
            <p style={{ fontSize: "0.88rem" }}>
              Topics prioritized by lowest score. Practice the top rows to level up fastest.
            </p>
          </div>
          <span className="badge badge-warning">Focus Order</span>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>Priority</th>
                <th>Grammar Topic</th>
                <th>Level</th>
                <th>Score</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedGrammarTopics.map((topic, index) => (
                <tr key={topic.topic_id} id={`progress-topic-row-${topic.topic_id}`}>
                  <td style={{ fontWeight: 700, color: index < 3 ? "#f59e0b" : "var(--text-muted)" }}>
                    #{index + 1}
                  </td>
                  <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {topic.title}
                  </td>
                  <td>
                    <span className="badge badge-gray">{topic.level}</span>
                  </td>
                  <td>
                    {topic.score === -1 ? (
                      <span className="badge badge-gray">Not started</span>
                    ) : (
                      <span
                        className={`badge ${
                          topic.score >= 80
                            ? "badge-success"
                            : topic.score >= 60
                            ? "badge-warning"
                            : "badge-danger"
                        }`}
                      >
                        {topic.score}%
                      </span>
                    )}
                  </td>
                  <td>
                    {topic.status === "Needs Practice" && (
                      <span style={{ color: "var(--danger)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "4px" }}>
                        <AlertTriangle size={14} /> Needs Practice
                      </span>
                    )}
                    {topic.status === "Proficient" && (
                      <span style={{ color: "var(--warning)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "4px" }}>
                        Proficient
                      </span>
                    )}
                    {topic.status === "Mastered" && (
                      <span style={{ color: "var(--success)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "4px" }}>
                        <CheckCircle2 size={14} /> Mastered
                      </span>
                    )}
                    {topic.status === "Not Started" && (
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        Ready to learn
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      id={`practice-grammar-btn-${topic.topic_id}`}
                      className="btn btn-secondary btn-sm"
                      onClick={() => onOpenGrammarTopic(topic.topic_id)}
                      style={{ fontSize: "0.82rem", padding: "6px 12px" }}
                    >
                      <span>Study</span>
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Recent Activity History */}
      <div className="card" style={{ padding: "28px" }}>
        <h2 style={{ marginBottom: "16px" }}>Recent Activity History</h2>
        {attempts.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>
            No practice attempts logged yet. Complete a lesson or quiz to see your history here.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[...attempts].reverse().slice(0, 8).map((att) => {
              const meta = findTopicMeta(att.topic_id_or_set_id);
              const formattedDate = new Date(att.timestamp).toLocaleString();

              return (
                <div
                  key={att.attempt_id}
                  style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span
                        className={`badge ${
                          att.skill === "grammar"
                            ? "badge-primary"
                            : att.skill === "vocabulary"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {att.skill}
                      </span>
                      <strong style={{ color: "var(--text-primary)", fontSize: "1.05rem" }}>{meta.title}</strong>
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <span>{formattedDate}</span>
                      <span>•</span>
                      <span>
                        {att.questions_correct} of {att.questions_total} correct
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: att.score >= 70 ? "var(--success)" : att.score >= 50 ? "var(--warning)" : "var(--danger)"
                      }}
                    >
                      {att.score}%
                    </div>

                    {att.mistakes && att.mistakes.length > 0 && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedAttemptForReview(att)}
                        style={{ fontSize: "0.8rem", padding: "6px 10px" }}
                      >
                        Review {att.mistakes.length} Mistakes
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mistakes Modal */}
      {selectedAttemptForReview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 300
          }}
          onClick={() => setSelectedAttemptForReview(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: "680px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "28px",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3>Mistakes Review — {findTopicMeta(selectedAttemptForReview.topic_id_or_set_id).title}</h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedAttemptForReview(null)}
                style={{ padding: "6px" }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {selectedAttemptForReview.mistakes.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "var(--danger-bg)",
                    border: "1px solid var(--danger-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "16px"
                  }}
                >
                  <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                    {idx + 1}. {m.prompt}
                  </p>
                  <div style={{ fontSize: "0.88rem", marginBottom: "4px" }}>
                    <span style={{ color: "var(--danger)" }}>Your Answer: </span>
                    <span style={{ textDecoration: "line-through", color: "var(--danger)" }}>{m.user_answer}</span>
                  </div>
                  <div style={{ fontSize: "0.88rem", marginBottom: "8px" }}>
                    <span style={{ color: "var(--success)" }}>Correct Answer: </span>
                    <strong style={{ color: "var(--success)" }}>{m.correct_answer}</strong>
                  </div>
                  <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", borderTop: "1px solid var(--danger-border)", paddingTop: "8px" }}>
                    <strong>Why: </strong>{m.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
