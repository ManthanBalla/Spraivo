import React, { useState } from "react";
import { initializeUserProfile } from "../services/storageService";
import { Target, Sparkles, ArrowRight, Check, Compass, Award } from "lucide-react";

export default function OnboardingScreen({ currentUser, onComplete }) {
  const [learningReason, setLearningReason] = useState("");
  const [selectedFocusAreas, setSelectedFocusAreas] = useState(["Conversations", "Grammar"]);
  const [examChoice, setExamChoice] = useState("None");
  const [customExam, setCustomExam] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasonSuggestions = [
    "Get better at conversations",
    "Prepare for an exam",
    "Improve my writing",
    "Sound more fluent",
    "Career / work opportunities"
  ];

  const focusAreaOptions = [
    "Speaking",
    "Writing",
    "Fluency",
    "Grammar",
    "Vocabulary",
    "Reading",
    "Listening"
  ];

  const toggleFocusArea = (area) => {
    if (selectedFocusAreas.includes(area)) {
      if (selectedFocusAreas.length > 1) {
        setSelectedFocusAreas(selectedFocusAreas.filter((a) => a !== area));
      }
    } else {
      setSelectedFocusAreas([...selectedFocusAreas, area]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalReason = learningReason.trim() || "Get better at conversations";
    const finalExam = examChoice === "Other" ? (customExam.trim() || "Other Exam") : examChoice === "None" ? null : examChoice;

    try {
      const profile = await initializeUserProfile({
        name: currentUser?.name || "Learner",
        goal: selectedFocusAreas.includes("Conversations") ? "conversations" : "general",
        learning_reason: finalReason,
        focus_areas: selectedFocusAreas,
        exam_target: finalExam,
        level_check_completed: false
      });

      onComplete(profile);
    } catch (err) {
      console.error("Failed to initialize profile:", err);
      alert(err.message || "Failed to save your preferences. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: "760px", padding: "24px 16px" }}>
      <div className="card" style={{ padding: "36px 28px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "var(--primary-gradient)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 18px rgba(37, 99, 235, 0.3)",
              marginBottom: "16px"
            }}
          >
            <Compass size={28} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--text-primary)", marginBottom: "8px" }}>
            Welcome, {currentUser?.name || "Learner"}!
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "540px", margin: "0 auto" }}>
            Let's customize your English learning experience. Tell us a little about your goals so your lessons and exercises fit you perfectly.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Question 1: Why do you want to learn English? */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px"
              }}
            >
              1. Why do you want to learn English?
            </label>
            <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", marginBottom: "12px" }}>
              Pick a suggestion below or type your own goal.
            </p>

            {/* Suggestion Chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
              {reasonSuggestions.map((suggestion) => {
                const isSelected = learningReason === suggestion;
                return (
                  <button
                    key={suggestion}
                    type="button"
                    className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setLearningReason(suggestion)}
                    style={{ fontSize: "0.86rem" }}
                  >
                    <span>{suggestion}</span>
                  </button>
                );
              })}
            </div>

            <input
              id="goal-reason-input"
              type="text"
              className="fill-input"
              placeholder="Or type your goal (e.g. Preparing for medical conferences abroad)..."
              value={learningReason}
              onChange={(e) => setLearningReason(e.target.value)}
              style={{ height: "46px" }}
            />
          </div>

          {/* Question 2: What do you most want to improve? */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px"
              }}
            >
              2. What skills do you most want to improve?
            </label>
            <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", marginBottom: "12px" }}>
              Select all that apply to you.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                gap: "10px"
              }}
            >
              {focusAreaOptions.map((area) => {
                const isSelected = selectedFocusAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleFocusArea(area)}
                    className="card card-interactive"
                    style={{
                      padding: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                      background: isSelected ? "rgba(37, 99, 235, 0.12)" : "var(--bg-subtle)",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                      {area}
                    </span>
                    {isSelected && <Check size={16} color="var(--primary)" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Preparing for a specific exam? */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px"
              }}
            >
              3. Are you preparing for a specific exam?
            </label>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
              {[
                { id: "None", label: "None (Everyday English)" },
                { id: "IELTS", label: "IELTS" },
                { id: "TOEFL", label: "TOEFL" },
                { id: "Other", label: "Other Exam" }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`btn ${examChoice === item.id ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setExamChoice(item.id)}
                  style={{ flex: "1 1 120px", height: "46px" }}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {examChoice === "Other" && (
              <input
                id="custom-exam-input"
                type="text"
                className="fill-input"
                placeholder="Enter exam name (e.g. Duolingo English Test, Cambridge C1, TOEIC)..."
                value={customExam}
                onChange={(e) => setCustomExam(e.target.value)}
                style={{ height: "46px" }}
                autoFocus
              />
            )}
          </div>

          {/* Submit Action */}
          <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
            <button
              id="submit-goal-btn"
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
              style={{ width: "100%", height: "50px" }}
            >
              <span>{isSubmitting ? "Saving Preferences..." : "Save My Goals & Go to Dashboard"}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
