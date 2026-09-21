import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, Check, X } from "lucide-react";

export default function QuestionCard({
  question,
  currentIndex = 0,
  totalQuestions = 1,
  onAnswerSubmit,
  onNext,
  isLast = false
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userSubmission, setUserSubmission] = useState("");

  const handleMultipleChoiceSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setUserSubmission(option);

    const correct = option.trim().toLowerCase() === question.correct_answer.trim().toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);

    if (onAnswerSubmit) {
      onAnswerSubmit({
        question_id: question.question_id,
        question_text: question.question_text,
        user_answer: option,
        correct_answer: question.correct_answer,
        explanation: question.explanation,
        is_correct: correct
      });
    }
  };

  const handleFillSubmit = (e) => {
    e.preventDefault();
    if (isAnswered || !fillAnswer.trim()) return;

    const trimmed = fillAnswer.trim();
    setUserSubmission(trimmed);

    const correct = trimmed.toLowerCase() === question.correct_answer.trim().toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);

    if (onAnswerSubmit) {
      onAnswerSubmit({
        question_id: question.question_id,
        question_text: question.question_text,
        user_answer: trimmed,
        correct_answer: question.correct_answer,
        explanation: question.explanation,
        is_correct: correct
      });
    }
  };

  const handleNextClick = () => {
    // Reset state for next question
    setSelectedOption(null);
    setFillAnswer("");
    setIsAnswered(false);
    setIsCorrect(false);
    setUserSubmission("");
    if (onNext) onNext();
  };

  return (
    <div className="card" style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Progress header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <span className="badge badge-primary">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
          {question.question_type === "multiple_choice" ? "Multiple Choice" : "Fill in the Blank"}
        </span>
      </div>

      {/* Question Prompt */}
      <h3 style={{ fontSize: "1.18rem", lineHeight: "1.5", marginBottom: "24px", color: "var(--text-primary)" }}>
        {question.question_text}
      </h3>

      {/* Question Form / Options */}
      {question.question_type === "multiple_choice" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {question.options.map((option, idx) => {
            let stateClass = "";
            if (isAnswered) {
              if (option.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()) {
                stateClass = "correct";
              } else if (option === selectedOption) {
                stateClass = "incorrect";
              }
            } else if (option === selectedOption) {
              stateClass = "selected";
            }

            return (
              <button
                key={idx}
                id={`option-${idx}`}
                className={`option-btn ${stateClass}`}
                disabled={isAnswered}
                onClick={() => handleMultipleChoiceSelect(option)}
              >
                <span>{option}</span>
                {isAnswered && (
                  <span>
                    {option.trim().toLowerCase() === question.correct_answer.trim().toLowerCase() ? (
                      <Check size={18} color="#10b981" />
                    ) : option === selectedOption ? (
                      <X size={18} color="#ef4444" />
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <form onSubmit={handleFillSubmit}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <input
              id="fill-in-blank-input"
              type="text"
              className="fill-input"
              placeholder="Type your answer here..."
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              disabled={isAnswered}
              autoFocus
            />
            {!isAnswered && (
              <button
                id="submit-blank-btn"
                type="submit"
                className="btn btn-primary"
                disabled={!fillAnswer.trim()}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      )}

      {/* Mandatory Pedagogical Feedback Box */}
      {isAnswered && (
        <div className={`feedback-box ${isCorrect ? "correct" : "incorrect"}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            {isCorrect ? (
              <>
                <CheckCircle2 size={20} color="#10b981" />
                <strong style={{ color: "#6ee7b7", fontSize: "1rem" }}>Excellent! Correct Answer</strong>
              </>
            ) : (
              <>
                <XCircle size={20} color="#ef4444" />
                <strong style={{ color: "#fca5a5", fontSize: "1rem" }}>Needs Review</strong>
              </>
            )}
          </div>

          {!isCorrect && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "10px 0 14px 0" }}>
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid rgba(239, 68, 68, 0.3)"
                }}
              >
                <div style={{ fontSize: "0.78rem", color: "#fca5a5", textTransform: "uppercase", fontWeight: 700 }}>
                  Your Answer
                </div>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, marginTop: "2px" }}>
                  {userSubmission || "(None)"}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid rgba(16, 185, 129, 0.3)"
                }}
              >
                <div style={{ fontSize: "0.78rem", color: "#6ee7b7", textTransform: "uppercase", fontWeight: 700 }}>
                  Correct Answer
                </div>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, marginTop: "2px" }}>
                  {question.correct_answer}
                </div>
              </div>
            </div>
          )}

          {/* Explanation citing specific grammatical / lexical rule */}
          <div style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.55" }}>
            <strong style={{ color: "var(--text-primary)" }}>Rule Explanation: </strong>
            {question.explanation}
          </div>

          {/* Next / Continue button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "18px" }}>
            <button id="next-question-btn" className="btn btn-primary" onClick={handleNextClick}>
              <span>{isLast ? "Complete Activity" : "Next Question"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
