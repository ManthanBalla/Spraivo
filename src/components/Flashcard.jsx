import React, { useState, useEffect } from "react";
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  PenTool,
  Lightbulb,
  Sparkles,
  Star
} from "lucide-react";

export default function Flashcard({
  words = [],
  onStartQuiz,
  onProceedToWriting,
  setTitle = "",
  starredWordMap = {},
  onToggleStar
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleFlip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, words.length, isFlipped]);

  if (!words || words.length === 0) {
    return (
      <div className="card" style={{ padding: "32px", textAlign: "center" }}>
        No words available in this set.
      </div>
    );
  }

  const currentWord = words[currentIndex] || words[0];
  const isWordStarred = Boolean(
    starredWordMap[currentWord?.word?.toLowerCase()]
  );

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    }, 150);
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleSpeak = (e, textToSpeak) => {
    if (e) e.stopPropagation();
    if (!window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak || currentWord.word);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      setIsSpeaking(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Top Header & Progress */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "580px",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="badge badge-primary">
            Word {currentIndex + 1} of {words.length}
          </span>
          {setTitle && (
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 500 }}>
              {setTitle}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {onToggleStar && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onToggleStar(currentWord)}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
              title={isWordStarred ? "Starred word" : "Star word"}
            >
              <Star
                size={14}
                fill={isWordStarred ? "#fbbf24" : "none"}
                color={isWordStarred ? "#fbbf24" : "currentColor"}
              />
              <span style={{ color: isWordStarred ? "#fbbf24" : "inherit" }}>
                {isWordStarred ? "Starred" : "Star"}
              </span>
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={(e) => handleSpeak(e, currentWord.word)}
            title="Hear Pronunciation"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Volume2 size={14} color={isSpeaking ? "var(--primary)" : "currentColor"} />
            <span>Listen</span>
          </button>
          <button
            id="flip-toggle-btn"
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={toggleFlip}
            style={{ gap: "6px" }}
          >
            <RotateCw size={14} />
            <span>{isFlipped ? "Show Word" : "Reveal Meaning"}</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="flashcard-wrapper"
        onClick={toggleFlip}
        style={{ cursor: "pointer", maxWidth: "580px" }}
      >
        <div className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
          {/* Front Face */}
          <div className="flashcard-face flashcard-front">
            <span
              className="badge badge-gray"
              style={{ position: "absolute", top: "20px", left: "24px" }}
            >
              {currentWord.part_of_speech}
            </span>

            <div style={{ position: "absolute", top: "18px", right: "20px", display: "flex", gap: "8px" }}>
              {onToggleStar && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar(currentWord);
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: isWordStarred ? "#fbbf24" : "var(--text-secondary)"
                  }}
                  title={isWordStarred ? "Unstar word" : "Star this word to review later"}
                >
                  <Star
                    size={16}
                    fill={isWordStarred ? "#fbbf24" : "none"}
                    color={isWordStarred ? "#fbbf24" : "currentColor"}
                  />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => handleSpeak(e, currentWord.word)}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-secondary)"
                }}
                title="Hear Pronunciation"
              >
                <Volume2 size={16} />
              </button>
            </div>

            <h2
              style={{
                fontSize: "2.8rem",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "12px",
                textTransform: "lowercase",
                fontWeight: 700
              }}
            >
              {currentWord.word}
            </h2>

            {currentWord.pronunciation && (
              <div
                style={{
                  fontSize: "1rem",
                  color: "var(--primary)",
                  fontFamily: "monospace",
                  marginBottom: "16px"
                }}
              >
                /{currentWord.pronunciation}/
              </div>
            )}

            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <RotateCw size={13} />
              <span>Tap or press Space to reveal definition</span>
            </div>
          </div>

          {/* Back Face */}
          <div className="flashcard-face flashcard-back" style={{ overflowY: "auto" }}>
            <div style={{ width: "100%", textAlign: "left" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px"
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <h3
                    style={{
                      fontSize: "1.8rem",
                      color: "var(--primary)",
                      textTransform: "lowercase",
                      margin: 0
                    }}
                  >
                    {currentWord.word}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => handleSpeak(e, currentWord.word)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "2px",
                      cursor: "pointer",
                      color: "var(--text-muted)"
                    }}
                    title="Pronounce Word"
                  >
                    <Volume2 size={16} />
                  </button>
                  {onToggleStar && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(currentWord);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "2px",
                        cursor: "pointer",
                        color: isWordStarred ? "#fbbf24" : "var(--text-muted)"
                      }}
                      title={isWordStarred ? "Unstar word" : "Star this word to review later"}
                    >
                      <Star
                        size={16}
                        fill={isWordStarred ? "#fbbf24" : "none"}
                        color={isWordStarred ? "#fbbf24" : "currentColor"}
                      />
                    </button>
                  )}
                </div>
                <span className="badge badge-primary">{currentWord.part_of_speech}</span>
              </div>

              {/* Phonetic Pronunciation */}
              {currentWord.pronunciation && (
                <div
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    fontFamily: "monospace",
                    marginBottom: "12px"
                  }}
                >
                  /{currentWord.pronunciation}/
                </div>
              )}

              {/* Meaning */}
              <div style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    fontSize: "0.74rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.05em"
                  }}
                >
                  Definition
                </div>
                <div
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "1.02rem",
                    fontWeight: 500,
                    marginTop: "2px",
                    lineHeight: "1.45"
                  }}
                >
                  {currentWord.meaning}
                </div>
              </div>

              {/* Example Sentence */}
              {currentWord.example_sentence && (
                <div
                  style={{
                    background: "var(--bg-subtle)",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    borderLeft: "3px solid var(--primary)",
                    marginBottom: "12px"
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 700
                    }}
                  >
                    Context Example
                  </div>
                  <div
                    style={{
                      color: "var(--text-primary)",
                      fontStyle: "italic",
                      fontSize: "0.9rem",
                      marginTop: "2px",
                      lineHeight: "1.4"
                    }}
                  >
                    "{currentWord.example_sentence}"
                  </div>
                </div>
              )}

              {/* Memory Tip */}
              {currentWord.memory_tip && (
                <div
                  style={{
                    background: "rgba(234, 179, 8, 0.08)",
                    border: "1px solid rgba(234, 179, 8, 0.2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "8px 12px",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px"
                  }}
                >
                  <Lightbulb size={15} color="#eab308" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                    <strong style={{ color: "#fef08a" }}>Memory Cue: </strong>
                    {currentWord.memory_tip}
                  </div>
                </div>
              )}

              {/* Synonyms */}
              {currentWord.synonyms && currentWord.synonyms.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: "4px"
                    }}
                  >
                    Synonyms
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {currentWord.synonyms.map((syn, idx) => (
                      <span
                        key={idx}
                        className="badge badge-gray"
                        style={{ fontSize: "0.78rem", textTransform: "none" }}
                      >
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "580px",
          marginTop: "20px",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        <button
          id="prev-word-btn"
          type="button"
          className="btn btn-secondary"
          onClick={handlePrev}
          style={{ gap: "6px" }}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {onProceedToWriting && (
            <button
              id="proceed-writing-btn"
              type="button"
              className="btn btn-primary"
              onClick={onProceedToWriting}
              style={{ gap: "8px" }}
            >
              <PenTool size={16} />
              <span>Write Sentences</span>
            </button>
          )}

          {onStartQuiz && (
            <button
              id="start-vocab-quiz-btn"
              type="button"
              className="btn btn-secondary"
              onClick={onStartQuiz}
              style={{ gap: "8px" }}
            >
              <Sparkles size={16} />
              <span>Take Quiz</span>
            </button>
          )}
        </div>

        <button
          id="next-word-btn"
          type="button"
          className="btn btn-secondary"
          onClick={handleNext}
          style={{ gap: "6px" }}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Keyboard hints */}
      <div
        style={{
          marginTop: "14px",
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          display: "flex",
          gap: "12px"
        }}
      >
        <span>← / → Arrow keys: Navigate</span>
        <span>•</span>
        <span>Space: Flip Card</span>
      </div>
    </div>
  );
}
