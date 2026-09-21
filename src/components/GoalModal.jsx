import React, { useState, useEffect } from "react";
import { updateUserGoal } from "../services/storageService";
import { X, Target, Check, ArrowRight, Sparkles } from "lucide-react";

export default function GoalModal({ isOpen, onClose, userProfile, onUpdateProfile }) {
  if (!isOpen) return null;

  const [learningReason, setLearningReason] = useState(userProfile?.learning_reason || "");
  const [selectedFocusAreas, setSelectedFocusAreas] = useState(userProfile?.focus_areas || ["Conversations", "Grammar"]);
  const [examChoice, setExamChoice] = useState(() => {
    if (!userProfile?.exam_target) return "None";
    if (["IELTS", "TOEFL"].includes(userProfile.exam_target)) return userProfile.exam_target;
    return "Other";
  });
  const [customExam, setCustomExam] = useState(() => {
    if (userProfile?.exam_target && !["IELTS", "TOEFL"].includes(userProfile.exam_target)) {
      return userProfile.exam_target;
    }
    return "";
  });
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const finalReason = learningReason.trim() || "Get better at conversations";
      const finalExam = examChoice === "Other" ? (customExam.trim() || "Other Exam") : examChoice === "None" ? null : examChoice;

      const updated = await updateUserGoal({
        learning_reason: finalReason,
        focus_areas: selectedFocusAreas,
        exam_target: finalExam
      });

      if (onUpdateProfile) {
        onUpdateProfile(updated);
      }
      onClose();
    } catch (err) {
      alert(err.message || "Failed to update goal");
    } finally {
      setIsSaving(false);
    }
  };

  return (
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
        padding: "16px",
        zIndex: 400
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: "640px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "28px",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-lg)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "var(--primary-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Target size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.35rem", color: "var(--text-primary)" }}>Change My Learning Goal</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Your scores and progress will remain 100% safe.
              </p>
            </div>
          </div>

          <button
            id="close-goal-modal-btn"
            className="btn btn-secondary btn-sm"
            onClick={onClose}
            style={{ padding: "6px" }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          {/* Reason */}
          <div>
            <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
              Why are you learning English?
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
              {reasonSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className={`btn btn-sm ${learningReason === suggestion ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setLearningReason(suggestion)}
                  style={{ fontSize: "0.82rem" }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="fill-input"
              value={learningReason}
              onChange={(e) => setLearningReason(e.target.value)}
              placeholder="Or type custom goal..."
              style={{ height: "44px" }}
            />
          </div>

          {/* Focus Areas */}
          <div>
            <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
              What skills do you most want to improve?
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "8px" }}>
              {focusAreaOptions.map((area) => {
                const isSelected = selectedFocusAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleFocusArea(area)}
                    className="card card-interactive"
                    style={{
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                      background: isSelected ? "rgba(37, 99, 235, 0.12)" : "var(--bg-subtle)",
                      cursor: "pointer"
                    }}
                  >
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>{area}</span>
                    {isSelected && <Check size={15} color="var(--primary)" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exam */}
          <div>
            <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
              Are you preparing for an exam?
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
              {[
                { id: "None", label: "None" },
                { id: "IELTS", label: "IELTS" },
                { id: "TOEFL", label: "TOEFL" },
                { id: "Other", label: "Other" }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`btn btn-sm ${examChoice === item.id ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setExamChoice(item.id)}
                  style={{ flex: 1 }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {examChoice === "Other" && (
              <input
                type="text"
                className="fill-input"
                value={customExam}
                onChange={(e) => setCustomExam(e.target.value)}
                placeholder="Enter exam name..."
                style={{ height: "44px" }}
              />
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              id="save-goal-btn"
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
              style={{ minWidth: "140px" }}
            >
              {isSaving ? "Saving..." : "Update Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
