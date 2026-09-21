import React, { useState, useEffect } from "react";
import {
  getStarredWords,
  toggleStarredWord
} from "../services/storageService";
import Flashcard from "../components/Flashcard";
import {
  Star,
  Search,
  Volume2,
  Trash2,
  Sparkles,
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Lightbulb
} from "lucide-react";

export default function StarredWordsScreen({
  userProfile,
  onNavigate,
  onStartVocabSession
}) {
  const [starredWords, setStarredWords] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [studyMode, setStudyMode] = useState(false);

  useEffect(() => {
    loadStarred();
  }, []);

  const loadStarred = () => {
    setStarredWords(getStarredWords());
  };

  const handleSpeak = (wordText) => {
    if (!window.speechSynthesis || !wordText) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
    }
  };

  const handleRemove = (wordObj) => {
    toggleStarredWord(wordObj);
    loadStarred();
  };

  const filtered = starredWords.filter((w) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase().trim();
    return (
      w.word.toLowerCase().includes(q) ||
      (w.meaning && w.meaning.toLowerCase().includes(q))
    );
  });

  // Map for flashcard star toggle
  const starredMap = {};
  starredWords.forEach((w) => {
    starredMap[w.word.toLowerCase()] = true;
  });

  return (
    <div className="app-container" style={{ paddingBottom: "60px" }}>
      {studyMode && starredWords.length > 0 ? (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setStudyMode(false)}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeft size={16} />
              <span>Back to Starred List</span>
            </button>
            <span className="badge badge-primary">
              Practicing {starredWords.length} Starred Words
            </span>
          </div>

          <Flashcard
            words={starredWords}
            setTitle="Starred Words Recall"
            starredWordMap={starredMap}
            onToggleStar={(w) => {
              handleRemove(w);
            }}
          />
        </div>
      ) : (
        <div>
          {/* Header */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="badge badge-primary" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Star size={13} fill="#fbbf24" color="#fbbf24" />
                <span>Personal Lexicon</span>
              </span>
              <span className="badge badge-gray">{starredWords.length} Words Saved</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h1 style={{ fontSize: "2.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Starred Words
                </h1>
                <p style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "1rem" }}>
                  Your hand-picked collection of words to review, listen to, and lock into active memory.
                </p>
              </div>

              {starredWords.length > 0 && (
                <button
                  id="study-starred-flashcards-btn"
                  className="btn btn-primary"
                  onClick={() => setStudyMode(true)}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Sparkles size={16} />
                  <span>Practice in Flashcards</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Search Filter */}
          {starredWords.length > 0 && (
            <div style={{ marginBottom: "24px", position: "relative", maxWidth: "340px", width: "100%" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: filterQuery ? "var(--primary)" : "var(--text-muted)",
                  transition: "color 0.2s ease",
                  pointerEvents: "none"
                }}
              />
              <input
                type="text"
                className="history-search-input"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter your starred words..."
                style={{
                  paddingLeft: "38px",
                  paddingRight: filterQuery ? "34px" : "14px"
                }}
              />
              {filterQuery && (
                <button
                  type="button"
                  onClick={() => setFilterQuery("")}
                  aria-label="Clear filter"
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
                    padding: "2px"
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* Empty State */}
          {starredWords.length === 0 ? (
            <div
              className="card"
              style={{
                padding: "60px 24px",
                textAlign: "center",
                background: "var(--bg-card)",
                border: "1px dashed var(--border-subtle)"
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(251, 191, 36, 0.1)",
                  border: "1px solid rgba(251, 191, 36, 0.25)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px"
                }}
              >
                <Star size={32} color="#fbbf24" fill="#fbbf24" />
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
                No Starred Words Yet
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto 24px" }}>
                When learning new words in flashcards or looking up terms in the Universal Search bar, click the star icon to bookmark them for easy review here.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => onNavigate && onNavigate("vocabulary")}
              >
                <span>Explore Vocabulary</span>
                <ChevronRight size={16} />
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="card" style={{ padding: "40px", textAlign: "center" }}>
              <p style={{ color: "var(--text-secondary)" }}>
                No starred words matched "{filterQuery}".
              </p>
            </div>
          ) : (
            /* Starred Words Grid */
            <div className="grid-2" style={{ gap: "20px" }}>
              {filtered.map((w, idx) => (
                <div
                  key={idx}
                  id={`starred-word-${w.word}`}
                  className="card"
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                            {w.word}
                          </h3>
                          <button
                            type="button"
                            onClick={() => handleSpeak(w.word)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "var(--text-muted)",
                              padding: "2px"
                            }}
                            title="Hear Pronunciation"
                          >
                            <Volume2 size={16} />
                          </button>
                          <span className="badge badge-gray" style={{ fontSize: "0.75rem" }}>
                            {w.part_of_speech}
                          </span>
                        </div>
                        {w.pronunciation && (
                          <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontFamily: "monospace", marginTop: "2px" }}>
                            /{w.pronunciation}/
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(w)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#fbbf24",
                          padding: "4px"
                        }}
                        title="Remove from Starred"
                      >
                        <Star size={18} fill="#fbbf24" />
                      </button>
                    </div>

                    {/* Definition */}
                    <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "12px", lineHeight: "1.45" }}>
                      {w.meaning}
                    </p>

                    {/* Example */}
                    {w.example_sentence && (
                      <div
                        style={{
                          background: "var(--bg-subtle)",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          borderLeft: "3px solid var(--primary)",
                          marginBottom: "12px",
                          fontSize: "0.88rem",
                          fontStyle: "italic",
                          color: "var(--text-secondary)"
                        }}
                      >
                        "{w.example_sentence}"
                      </div>
                    )}

                    {/* Memory Cue */}
                    {w.memory_tip && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          fontSize: "0.82rem",
                          color: "var(--text-secondary)",
                          marginBottom: "12px"
                        }}
                      >
                        <Lightbulb size={14} color="#eab308" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <div>
                          <strong style={{ color: "var(--primary)" }}>Memory Cue: </strong>
                          {w.memory_tip}
                        </div>
                      </div>
                    )}

                    {/* Synonyms */}
                    {w.synonyms && w.synonyms.length > 0 && (
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Synonyms:</span>
                        {w.synonyms.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="badge badge-gray"
                            style={{ fontSize: "0.75rem", textTransform: "none" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleRemove(w)}
                      style={{ fontSize: "0.8rem", color: "var(--danger)", gap: "4px" }}
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
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
