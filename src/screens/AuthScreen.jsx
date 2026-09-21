import React, { useState } from "react";
import { loginUser, registerUser } from "../services/storageService";
import { Sparkles, Lock, Mail, User, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function AuthScreen({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setErrorMessage("Please enter your name.");
        return;
      }
      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match. Please double-check.");
        return;
      }
    }

    setIsLoading(true);
    try {
      if (isRegister) {
        const data = await registerUser(email, password, name);
        // Brand new user -> send into Onboarding
        onAuthSuccess({ user: data.user, profile: null, isNewUser: true });
      } else {
        const data = await loginUser(email, password, rememberMe);
        // Returning user -> skip Onboarding if profile exists
        onAuthSuccess({ user: data.user, profile: data.profile, isNewUser: false });
      }
    } catch (err) {
      setErrorMessage(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setErrorMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px"
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "36px 30px",
          boxShadow: "var(--shadow-lg)"
        }}
      >
        {/* Brand & Heading */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "var(--primary-gradient)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
              marginBottom: "14px"
            }}
          >
            <Sparkles size={28} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: "1.85rem", marginBottom: "6px" }}>
            {isRegister ? "Create Your Account" : "Welcome Back"}
          </h1>
          <p style={{ fontSize: "0.95rem" }}>
            {isRegister
              ? "Join LinguaPath to start your personalized English learning path."
              : "Sign in to resume your lessons and practice history."}
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div
            style={{
              background: "var(--danger-bg)",
              border: "1px solid var(--danger-border)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              color: "#fca5a5",
              fontSize: "0.9rem",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {isRegister && (
            <div>
              <label
                htmlFor="auth-name-input"
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "var(--text-primary)"
                }}
              >
                Your Name
              </label>
              <div style={{ position: "relative" }}>
                <User
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    pointerEvents: "none"
                  }}
                />
                <input
                  id="auth-name-input"
                  type="text"
                  className="fill-input"
                  placeholder="e.g. Alex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: "42px", height: "48px" }}
                  required={isRegister}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="auth-email-input"
              style={{
                display: "block",
                fontSize: "0.88rem",
                fontWeight: 600,
                marginBottom: "6px",
                color: "var(--text-primary)"
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none"
                }}
              />
              <input
                id="auth-email-input"
                type="email"
                className="fill-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "42px", height: "48px" }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="auth-password-input"
              style={{
                display: "block",
                fontSize: "0.88rem",
                fontWeight: 600,
                marginBottom: "6px",
                color: "var(--text-primary)"
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none"
                }}
              />
              <input
                id="auth-password-input"
                type="password"
                className="fill-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "42px", height: "48px" }}
                required
                autoComplete={isRegister ? "new-password" : "current-password"}
              />
            </div>
            {isRegister && (
              <span
                style={{
                  display: "block",
                  marginTop: "6px",
                  fontSize: "0.8rem",
                  color: password.length >= 8 ? "#10b981" : "var(--text-muted)"
                }}
              >
                Password must be at least 8 characters.
              </span>
            )}
          </div>

          {isRegister && (
            <div>
              <label
                htmlFor="auth-confirm-password-input"
                style={{
                  display: "block",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "var(--text-primary)"
                }}
              >
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    pointerEvents: "none"
                  }}
                />
                <input
                  id="auth-confirm-password-input"
                  type="password"
                  className="fill-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingLeft: "42px", height: "48px" }}
                  required={isRegister}
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          {!isRegister && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2px 0 8px" }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  userSelect: "none"
                }}
              >
                <input
                  id="remember-device-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "var(--primary)",
                    cursor: "pointer"
                  }}
                />
                <span>Remember this device</span>
              </label>
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isLoading}
            style={{ width: "100%", marginTop: "6px", height: "48px" }}
          >
            {isLoading ? (
              <span>Please wait...</span>
            ) : isRegister ? (
              <>
                <span>Create Account & Start</span>
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Switch Login / Register Toggle */}
        <div style={{ marginTop: "24px", textAlign: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "18px" }}>
          <p style={{ fontSize: "0.9rem" }}>
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  id="switch-to-login-btn"
                  type="button"
                  onClick={toggleMode}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: "4px 6px"
                  }}
                >
                  Sign in here
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  id="switch-to-register-btn"
                  type="button"
                  onClick={toggleMode}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: "4px 6px"
                  }}
                >
                  Register now
                </button>
              </>
            )}
          </p>
        </div>

        {/* Privacy / Security Notice */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginTop: "20px",
            fontSize: "0.78rem",
            color: "var(--text-muted)"
          }}
        >
          <ShieldCheck size={14} color="#10b981" />
          <span>Your passwords and progress are encrypted and isolated.</span>
        </div>
      </div>
    </div>
  );
}
