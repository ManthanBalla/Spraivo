import React, { useState, useEffect, useRef } from "react";
import { getChatMessages, sendMentorMessage, getUserProfile } from "../services/storageService";
import {
  Sparkles,
  Send,
  RotateCcw,
  User,
  Bot,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Flame
} from "lucide-react";

function renderInlineSpans(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "var(--primary)", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} style={{ color: "var(--secondary)", fontStyle: "italic" }}>
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function renderFormattedAIContent(content) {
  if (!content) return null;
  const lines = content.split("\n");
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} style={{ margin: "8px 0 10px 18px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {currentList.map((item, i) => (
            <li key={i} style={{ color: "var(--text-primary)", fontSize: "0.93rem" }}>
              {renderInlineSpans(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Check for bullet items (•, -, *)
    if (trimmed.startsWith("•") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.replace(/^[•\-\*]\s*/, ""));
      return;
    }
    flushList();

    // Check for Section Header (🎯, 💡, 📝, ⚠️, 🚀, ###, ##)
    if (
      trimmed.startsWith("🎯") ||
      trimmed.startsWith("💡") ||
      trimmed.startsWith("📝") ||
      trimmed.startsWith("⚠️") ||
      trimmed.startsWith("🚀") ||
      trimmed.startsWith("###") ||
      trimmed.startsWith("##")
    ) {
      const cleanHeader = trimmed.replace(/^###?\s*/, "");
      elements.push(
        <div
          key={`header-${index}`}
          style={{
            fontWeight: 700,
            fontSize: "0.98rem",
            color: "var(--text-primary)",
            marginTop: index > 0 ? "14px" : "2px",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          {renderInlineSpans(cleanHeader)}
        </div>
      );
      return;
    }

    // Check for Good / Bad example lines
    if (trimmed.startsWith("✅") || trimmed.includes("✅")) {
      elements.push(
        <div
          key={`good-${index}`}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            margin: "5px 0",
            fontSize: "0.92rem",
            color: "var(--text-primary)"
          }}
        >
          {renderInlineSpans(trimmed)}
        </div>
      );
      return;
    }

    if (trimmed.startsWith("❌") || trimmed.includes("❌")) {
      elements.push(
        <div
          key={`bad-${index}`}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            margin: "5px 0",
            fontSize: "0.92rem",
            color: "var(--text-primary)"
          }}
        >
          {renderInlineSpans(trimmed)}
        </div>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${index}`} style={{ margin: "6px 0", color: "var(--text-primary)", fontSize: "0.94rem", lineHeight: "1.65" }}>
        {renderInlineSpans(trimmed)}
      </p>
    );
  });

  flushList();
  return elements;
}

export default function MentorScreen({ userProfile, onUpdateProfile }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    getChatMessages().then((msgs) => {
      setMessages(msgs);
      scrollToBottom();
    });
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = async (customText = null) => {
    const textToSend = (customText || inputVal).trim();
    if (!textToSend || isLoading) return;

    setInputVal("");
    setErrorMessage(null);
    setLastFailedMessage(null);

    const tempUserMsg = {
      message_id: "temp_u_" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...messages, tempUserMsg];
    setMessages(updatedHistory);
    setIsLoading(true);
    scrollToBottom();

    try {
      const result = await sendMentorMessage(messages, textToSend);

      if (result && result.assistantMessage) {
        setMessages((prev) => [...prev, result.assistantMessage]);
        if (result.updatedProfile) {
          onUpdateProfile(result.updatedProfile);
        }
      }
    } catch (err) {
      console.error("Mentor chat error:", err);
      setErrorMessage(err.message || "Failed to reach Spraivo AI. Please try again.");
      setLastFailedMessage(textToSend);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: "880px" }}>
      {/* Header */}
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          padding: "20px 24px",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "14px",
              background: "var(--primary-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
              flexShrink: 0
            }}
          >
            <Sparkles size={24} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ fontSize: "1.35rem" }}>Spraivo AI</h1>
              <span className="badge badge-success">Online Tutor</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>
              Ask grammar questions, request corrections, or practice speaking naturally.
            </p>
          </div>
        </div>

        <div style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
          {messages.length} messages
        </div>
      </div>

      {/* Chat Messages Log */}
      <div
        className="card"
        style={{
          minHeight: "420px",
          maxHeight: "58vh",
          overflowY: "auto",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "12px"
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              margin: "auto",
              textAlign: "center",
              maxWidth: "460px",
              padding: "20px",
              color: "var(--text-muted)"
            }}
          >
            <Bot size={40} color="#818cf8" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ fontSize: "1.15rem", marginBottom: "8px", color: "var(--text-primary)" }}>
              Hello, {userProfile?.name || "there"}!
            </h3>
            <p style={{ fontSize: "0.9rem" }}>
              I'm Spraivo AI, your personal English tutor. Ask me to explain a confusing grammar rule, check a sentence you wrote, or just practice conversation.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.message_id || idx}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  flexDirection: isUser ? "row-reverse" : "row"
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: isUser ? "rgba(99, 102, 241, 0.2)" : "rgba(6, 182, 212, 0.2)",
                    border: `1px solid ${isUser ? "rgba(99, 102, 241, 0.4)" : "rgba(6, 182, 212, 0.4)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  {isUser ? <User size={16} color="#818cf8" /> : <Bot size={16} color="#06b6d4" />}
                </div>

                {/* Message Bubble */}
                <div
                  style={{
                    background: isUser
                      ? "var(--primary-gradient)"
                      : "var(--bg-subtle)",
                    color: isUser ? "#ffffff" : "var(--text-primary)",
                    border: isUser ? "none" : "1px solid var(--border-subtle)",
                    borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "14px 18px",
                    lineHeight: "1.6",
                    fontSize: "0.95rem",
                    boxShadow: "var(--shadow-sm)",
                    wordBreak: "break-word"
                  }}
                >
                  {isUser ? msg.content : renderFormattedAIContent(msg.content)}
                </div>
              </div>
            );
          })
        )}

        {isLoading && (
          <div style={{ display: "flex", gap: "10px", alignSelf: "flex-start", alignItems: "center" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(6, 182, 212, 0.2)",
                border: "1px solid rgba(6, 182, 212, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Bot size={16} color="#06b6d4" />
            </div>
            <div
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--border-subtle)",
                padding: "10px 16px",
                borderRadius: "18px 18px 18px 4px",
                color: "var(--text-secondary)",
                fontSize: "0.88rem",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <Sparkles size={14} color="#06b6d4" />
              <span>Spraivo AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Error Callout with Retry */}
      {errorMessage && (
        <div
          style={{
            background: "var(--danger-bg)",
            border: "1px solid var(--danger-border)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--danger)", fontSize: "0.88rem" }}>
            <AlertCircle size={17} />
            <span>{errorMessage}</span>
          </div>
          {lastFailedMessage && (
            <button
              id="retry-mentor-msg-btn"
              className="btn btn-secondary btn-sm"
              onClick={handleRetry}
            >
              <RotateCcw size={14} />
              <span>Retry</span>
            </button>
          )}
        </div>
      )}


      {/* Input Form (Sticky for mobile screen keyboard usability) */}
      <div
        style={{
          position: "sticky",
          bottom: "10px",
          background: "var(--bg-main)",
          paddingTop: "6px"
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <input
            id="mentor-chat-input"
            type="text"
            className="fill-input"
            placeholder="Type your question or practice sentence..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isLoading}
            style={{ height: "46px" }}
          />
          <button
            id="send-mentor-chat-btn"
            type="submit"
            className="btn btn-primary"
            disabled={!inputVal.trim() || isLoading}
            style={{ minWidth: "48px", height: "46px", padding: "0 18px" }}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
