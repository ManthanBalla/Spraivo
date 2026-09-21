import React, { useState } from "react";
import { RotateCw, ChevronLeft, ChevronRight, Volume2, Sparkles } from "lucide-react";

export default function Flashcard({
  words = [],
  onStartQuiz
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!words || words.length === 0) {
    return <div>No words available in this set.</div>;
  }

  const currentWord = words[currentIndex];

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
    setIsFlipped(!isFlipped);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Progress & counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "540px",
          marginBottom: "16px"
        }}
      >
        <span className="badge badge-primary">
          Flashcard {currentIndex + 1} of {words.length}
        </span>
        <button
          id="flip-toggle-btn"
          className="btn btn-secondary btn-sm"
          onClick={toggleFlip}
          style={{ gap: "6px" }}
        >
          <RotateCw size={14} />
          <span>{isFlipped ? "Show Word" : "Reveal Details"}</span>
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div className="flashcard-wrapper" onClick={toggleFlip}>
        <div className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
          {/* Front Face */}
          <div className="flashcard-face flashcard-front">
            <span
              className="badge badge-gray"
              style={{ position: "absolute", top: "20px", left: "24px" }}
            >
              {currentWord.part_of_speech}
            </span>

            <h2
              style={{
                fontSize: "2.8rem",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "12px",
                textTransform: "lowercase"
              }}
            >
              {currentWord.word}
            </h2>

            <div
              style={{
                fontSize: "0.88rem",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <RotateCw size={14} />
              <span>Tap anywhere to flip card</span>
            </div>
          </div>

          {/* Back Face */}
          <div className="flashcard-face flashcard-back">
            <div style={{ width: "100%", textAlign: "left" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px"
                }}
              >
                <h3 style={{ fontSize: "1.8rem", color: "var(--primary)", textTransform: "lowercase" }}>
                  {currentWord.word}
                </h3>
                <span className="badge badge-primary">{currentWord.part_of_speech}</span>
              </div>

              {/* Phonetic Pronunciation */}
              <div
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  fontFamily: "monospace",
                  marginBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Volume2 size={16} color="var(--primary)" />
                <span>/{currentWord.pronunciation}/</span>
              </div>

              {/* Meaning */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Definition
                </div>
                <div style={{ color: "var(--text-primary)", fontSize: "1.05rem", fontWeight: 500, marginTop: "2px" }}>
                  {currentWord.meaning}
                </div>
              </div>

              {/* Example Sentence */}
              <div
                style={{
                  background: "var(--bg-subtle)",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-sm)",
                  borderLeft: "3px solid var(--primary)",
                  marginBottom: "14px"
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Context Example
                </div>
                <div style={{ color: "var(--text-primary)", fontStyle: "italic", fontSize: "0.92rem", marginTop: "2px" }}>
                  "{currentWord.example_sentence}"
                </div>
              </div>

              {/* Synonyms */}
              {currentWord.synonyms && currentWord.synonyms.length > 0 && (
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>
                    Synonyms
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {currentWord.synonyms.map((syn, idx) => (
                      <span key={idx} className="badge badge-gray" style={{ fontSize: "0.8rem", textTransform: "none" }}>
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

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "540px",
          marginTop: "24px"
        }}
      >
        <button
          id="prev-word-btn"
          className="btn btn-secondary"
          onClick={handlePrev}
          style={{ gap: "6px" }}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <button
          id="start-vocab-quiz-btn"
          className="btn btn-primary"
          onClick={onStartQuiz}
          style={{ gap: "8px" }}
        >
          <Sparkles size={16} />
          <span>Take Set Quiz (5 Qs)</span>
        </button>

        <button
          id="next-word-btn"
          className="btn btn-secondary"
          onClick={handleNext}
          style={{ gap: "6px" }}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
