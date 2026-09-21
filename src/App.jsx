import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthScreen from "./screens/AuthScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import GrammarScreen from "./screens/GrammarScreen";
import VocabularyScreen from "./screens/VocabularyScreen";
import PracticeCenterScreen from "./screens/PracticeCenterScreen";
import ProgressScreen from "./screens/ProgressScreen";
import MentorScreen from "./screens/MentorScreen";
import WritingLabScreen from "./screens/WritingLabScreen";
import {
  checkAuthSession,
  logoutUser,
  resetUserProfile,
  getUserProfile
} from "./services/storageService";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Topic routing state
  const [targetGrammarTopicId, setTargetGrammarTopicId] = useState(null);
  const [targetVocabSetId, setTargetVocabSetId] = useState(null);
  const [targetWritingPromptId, setTargetWritingPromptId] = useState(null);

  // Light / Dark Theme State with system preference detection and localStorage persistence
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("linguapath_theme");
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    localStorage.setItem("linguapath_theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Initial Auth Check
  useEffect(() => {
    checkAuthSession()
      .then((data) => {
        if (data && data.user) {
          setCurrentUser(data.user);
          if (data.profile) {
            setUserProfile(data.profile);
            setActiveTab("dashboard");
          } else {
            // Logged in but needs onboarding diagnostic
            setUserProfile(null);
          }
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
      })
      .catch(() => {
        setCurrentUser(null);
        setUserProfile(null);
      })
      .finally(() => {
        setAuthChecking(false);
      });
  }, []);

  const handleAuthSuccess = ({ user, profile, isNewUser }) => {
    setCurrentUser(user);
    setUserProfile(profile);
    if (isNewUser || !profile) {
      // Send straight to onboarding placement assessment
      setActiveTab("dashboard"); // Root view handles !userProfile -> OnboardingScreen
    } else {
      setActiveTab("dashboard");
    }
  };

  const handleOnboardingComplete = (newProfile) => {
    setUserProfile(newProfile);
    setActiveTab("dashboard");
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setUserProfile(null);
    setActiveTab("dashboard");
    setTargetGrammarTopicId(null);
    setTargetVocabSetId(null);
    setTargetWritingPromptId(null);
  };

  const handleResetProfile = async () => {
    await resetUserProfile();
    setUserProfile(null);
    setActiveTab("dashboard");
    setTargetGrammarTopicId(null);
    setTargetVocabSetId(null);
    setTargetWritingPromptId(null);
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartTopic = (topicId, skill) => {
    if (skill === "grammar") {
      setTargetGrammarTopicId(topicId);
      setActiveTab("grammar");
    } else if (skill === "vocabulary") {
      setTargetVocabSetId(topicId);
      setActiveTab("vocabulary");
    } else if (skill === "writing") {
      setTargetWritingPromptId(topicId);
      setActiveTab("writing");
    } else if (skill === "reading") {
      setActiveTab("practice");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenGrammarTopic = (topicId) => {
    setTargetGrammarTopicId(topicId);
    setActiveTab("grammar");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenVocabSet = (setId) => {
    setTargetVocabSetId(setId);
    setActiveTab("vocabulary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (authChecking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          color: "var(--text-secondary)"
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "3px solid rgba(99, 102, 241, 0.2)",
            borderTopColor: "var(--primary)",
            animation: "spin 0.8s linear infinite"
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: "0.95rem" }}>Loading LinguaPath...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        userProfile={userProfile}
        onUpdateProfile={handleProfileUpdate}
        onResetProfile={handleResetProfile}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main style={{ flex: 1, paddingTop: "12px" }}>
        {!currentUser ? (
          /* 1. Unauthenticated Visitor -> Auth Screen (Login / Register) */
          <AuthScreen onAuthSuccess={handleAuthSuccess} />
        ) : !userProfile ? (
          /* 2. Authenticated New User -> Onboarding Placement Check */
          <OnboardingScreen
            currentUser={currentUser}
            onComplete={handleOnboardingComplete}
          />
        ) : (
          /* 3. Authenticated User with Profile -> Main Modules */
          <>
            {activeTab === "dashboard" && (
              <DashboardScreen
                userProfile={userProfile}
                onNavigate={handleNavigate}
                onStartTopic={handleStartTopic}
                onUpdateProfile={handleProfileUpdate}
              />
            )}

            {activeTab === "mentor" && (
              <MentorScreen
                userProfile={userProfile}
                onUpdateProfile={handleProfileUpdate}
              />
            )}

            {activeTab === "writing" && (
              <WritingLabScreen
                userProfile={userProfile}
                onUpdateProfile={handleProfileUpdate}
                initialPromptId={targetWritingPromptId}
                onNavigate={handleNavigate}
              />
            )}

            {activeTab === "grammar" && (
              <GrammarScreen
                userProfile={userProfile}
                onUpdateProfile={handleProfileUpdate}
                initialTopicId={targetGrammarTopicId}
                onNavigate={handleNavigate}
              />
            )}

            {activeTab === "vocabulary" && (
              <VocabularyScreen
                userProfile={userProfile}
                onUpdateProfile={handleProfileUpdate}
                initialSetId={targetVocabSetId}
                onNavigate={handleNavigate}
              />
            )}

            {activeTab === "practice" && (
              <PracticeCenterScreen
                userProfile={userProfile}
                onUpdateProfile={handleProfileUpdate}
                onOpenGrammarTopic={handleOpenGrammarTopic}
                onOpenVocabSet={handleOpenVocabSet}
                onNavigate={handleNavigate}
              />
            )}

            {activeTab === "progress" && (
              <ProgressScreen
                userProfile={userProfile}
                onOpenGrammarTopic={handleOpenGrammarTopic}
              />
            )}
          </>
        )}
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "20px 16px",
          textAlign: "center",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
          background: "var(--bg-main)"
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px"
          }}
        >
          <div>
            LinguaPath • Personalized English Learning Platform
          </div>
          <div>
            Grammar • Vocabulary • Reading • Writing • AI English Mentor
          </div>
        </div>
      </footer>
    </div>
  );
}
