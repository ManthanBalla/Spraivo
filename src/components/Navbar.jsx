import React, { useState } from "react";
import GoalModal from "./GoalModal";
import {
  Compass,
  BookOpen,
  Layers,
  Award,
  Flame,
  RotateCcw,
  Sparkles,
  User,
  Target,
  Bot,
  PenTool,
  Sun,
  Moon,
  Menu,
  X,
  LogOut
} from "lucide-react";

export default function Navbar({
  activeTab,
  onNavigate,
  userProfile,
  onUpdateProfile,
  onResetProfile,
  onLogout,
  theme,
  onToggleTheme
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const handleTabClick = (tab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Compass },
    { id: "mentor", label: "AI Mentor", icon: Bot, special: "indigo" },
    { id: "writing", label: "Writing Lab", icon: PenTool, special: "magenta" },
    { id: "grammar", label: "Grammar", icon: BookOpen },
    { id: "vocabulary", label: "Vocabulary", icon: Layers },
    { id: "practice", label: "Practice Hub", icon: Target },
    { id: "progress", label: "Progress", icon: Award }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <a
          href="#dashboard"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            if (userProfile) {
              handleTabClick("dashboard");
            }
          }}
        >
          <div className="brand-icon">
            <Sparkles size={22} color="#ffffff" />
          </div>
          <span>
            Lingua<span className="brand-text-accent">Path</span>
          </span>
        </a>

        {/* Desktop Navigation Tabs */}
        {userProfile && (
          <div className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  className={`nav-link-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleTabClick(item.id)}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* User Stats, Theme Toggle, Profile & Mobile Hamburger */}
        <div className="nav-user-area">
          {/* Light / Dark Mode Toggle */}
          <button
            id="theme-toggle-btn"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} color="#6366f1" />}
          </button>

          {userProfile && (
            <>
              {/* Streak Counter */}
              <div className="streak-pill" title={`${userProfile.streak_days || 1} Day Learning Streak`}>
                <Flame size={16} fill="#f59e0b" color="#f59e0b" />
                <span>{userProfile.streak_days || 1}d</span>
              </div>

              {/* CEFR Level Pill */}
              <div className="cefr-badge" title={`Your English Level: ${userProfile.english_level || "A1"}`}>
                {userProfile.english_level || "A1"}
              </div>

              {/* Profile Dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  id="profile-dropdown-btn"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ padding: "8px 12px", gap: "6px" }}
                >
                  <User size={16} />
                  <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {userProfile.name || "Learner"}
                  </span>
                </button>

                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      marginTop: "8px",
                      width: "230px",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      padding: "10px",
                      boxShadow: "var(--shadow-lg)",
                      zIndex: 200
                    }}
                  >
                    <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--border-subtle)", marginBottom: "6px" }}>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.92rem" }}>
                        {userProfile.name || "Learner"}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "capitalize" }}>
                        Goal: {userProfile.goal || "General"} English
                      </div>
                    </div>

                    <button
                      id="change-goal-btn"
                      className="btn btn-secondary btn-sm"
                      style={{
                        width: "100%",
                        marginBottom: "6px",
                        justifyContent: "flex-start",
                        fontSize: "0.84rem"
                      }}
                      onClick={() => {
                        setShowDropdown(false);
                        setShowGoalModal(true);
                      }}
                    >
                      <Target size={14} color="var(--primary)" />
                      <span>Change My Goal</span>
                    </button>

                    <button
                      id="reset-profile-btn"
                      className="btn btn-secondary btn-sm"
                      style={{
                        width: "100%",
                        marginBottom: "6px",
                        justifyContent: "flex-start",
                        color: "var(--danger)",
                        fontSize: "0.84rem"
                      }}
                      onClick={() => {
                        setShowDropdown(false);
                        if (window.confirm("Reset your practice history and retake the initial level check?")) {
                          onResetProfile();
                        }
                      }}
                    >
                      <RotateCcw size={14} />
                      <span>Reset My Progress</span>
                    </button>

                    <button
                      id="logout-btn"
                      className="btn btn-secondary btn-sm"
                      style={{
                        width: "100%",
                        justifyContent: "flex-start",
                        color: "var(--text-secondary)",
                        fontSize: "0.84rem"
                      }}
                      onClick={() => {
                        setShowDropdown(false);
                        onLogout();
                      }}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Hamburger Toggle Button */}
          {userProfile && (
            <button
              id="mobile-menu-btn"
              className="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {userProfile && mobileMenuOpen && (
        <div className={`mobile-menu-drawer ${mobileMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                className={`mobile-nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleTabClick(item.id)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div style={{ marginTop: "10px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
            <button
              id="mobile-change-goal-btn"
              className="btn btn-secondary btn-sm"
              style={{ width: "100%", justifyContent: "center", marginBottom: "8px" }}
              onClick={() => {
                setMobileMenuOpen(false);
                setShowGoalModal(true);
              }}
            >
              <Target size={14} color="var(--primary)" />
              <span>Change My Goal</span>
            </button>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, color: "var(--danger)" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (window.confirm("Reset your practice history and retake the initial level check?")) {
                    onResetProfile();
                  }
                }}
              >
                <RotateCcw size={14} />
                <span>Reset Data</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Goal Modal */}
      <GoalModal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        userProfile={userProfile}
        onUpdateProfile={onUpdateProfile}
      />
    </nav>
  );
}
