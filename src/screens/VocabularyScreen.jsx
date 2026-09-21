import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  VOCABULARY_CATEGORIES,
  ALL_VOCABULARY_WORDS,
  findWordInDictionary
} from "../data/vocabularyData";
import {
  evaluateVocabSentence,
  lookupDictionaryWord,
  generateVocabWords,
  getStarredWords,
  toggleStarredWord,
  saveVocabSessionHistory
} from "../services/storageService";
import Flashcard from "../components/Flashcard";
import {
  Layers,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  List,
  ChevronRight,
  RefreshCw,
  Search,
  Volume2,
  PenTool,
  Send,
  PlusCircle,
  HelpCircle,
  Clock,
  Compass,
  Check,
  X,
  Star
} from "lucide-react";

export default function VocabularyScreen({
  userProfile,
  onUpdateProfile,
  initialSetId = null,
  onNavigate
}) {
  // Navigation & view states: "list" | "flashcard" | "writing_challenge" | "wordlist" | "summary"
  const [viewMode, setViewMode] = useState("list");
  const [activeCategory, setActiveCategory] = useState(null);
  const [sessionWords, setSessionWords] = useState([]);
  const [sessionTitle, setSessionTitle] = useState("");

  // Daily Word Goal Prompt
  const [dailyGoalCount, setDailyGoalCount] = useState(10);
  const [isCustomCount, setIsCustomCount] = useState(false);
  const [customCountValue, setCustomCountValue] = useState(7);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Track studied words to ensure non-repeating words across sessions
  const [studiedWordsHistory, setStudiedWordsHistory] = useState(() => {
    const fromProfile = userProfile?.vocabulary_mastered_words || [];
    return new Set(fromProfile.map((w) => w.toLowerCase()));
  });

  // Dynamic Word Generator ("never ending words")
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [categoryWordBanks, setCategoryWordBanks] = useState(() => {
    const map = {};
    VOCABULARY_CATEGORIES.forEach((cat) => {
      map[cat.set_id] = [...cat.words];
    });
    return map;
  });

  // Starred Words Map for fast lookup { [wordLower]: true }
  const [starredMap, setStarredMap] = useState({});

  const refreshStarredMap = () => {
    const list = getStarredWords();
    const map = {};
    list.forEach((w) => {
      if (w.word) map[w.word.trim().toLowerCase()] = true;
    });
    setStarredMap(map);
  };

  useEffect(() => {
    refreshStarredMap();
  }, []);

  const handleToggleStarWord = (wordObj) => {
    toggleStarredWord(wordObj);
    refreshStarredMap();
  };

  // Universal Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchingWord, setIsSearchingWord] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Sentence Writing Challenge State
  const [writingAnswers, setWritingAnswers] = useState({}); // { [word]: userSentence }
  const [writingFeedbacks, setWritingFeedbacks] = useState({}); // { [word]: { is_correct, score, feedback, improvement_tip, corrected_sentence } }
  const [evaluatingWord, setEvaluatingWord] = useState(null);
  const [writingSubmitted, setWritingSubmitted] = useState(false);

  // Handle deep-linked initialSetId
  useEffect(() => {
    if (initialSetId) {
      const found = VOCABULARY_CATEGORIES.find((s) => s.set_id === initialSetId);
      if (found) {
        handleStartCategorySession(found);
      }
    }
  }, [initialSetId]);

  // Pronunciation audio helper
  const handleSpeakWord = (wordText) => {
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

  // 1. Daily Session Launcher — Non-repeating words logic
  const handleStartDailySession = async (
    count = isCustomCount ? customCountValue : dailyGoalCount,
    catId = selectedCategoryFilter
  ) => {
    const targetCount = Math.max(1, count);
    let pool = [];
    if (catId === "all") {
      pool = Object.values(categoryWordBanks).flat();
    } else {
      pool = categoryWordBanks[catId] || [];
    }

    if (pool.length === 0) {
      pool = ALL_VOCABULARY_WORDS;
    }

    // Step A: Filter out words already studied to guarantee non-repeating sessions
    let unlearned = pool.filter((w) => !studiedWordsHistory.has(w.word.toLowerCase()));

    // Step B: If unlearned pool is smaller than requested count, generate fresh words on the fly via Spraivo AI
    if (unlearned.length < targetCount) {
      const needed = targetCount - unlearned.length;
      try {
        const catTitle =
          catId === "all"
            ? "General Lexicon"
            : VOCABULARY_CATEGORIES.find((c) => c.set_id === catId)?.title || "General";

        const generated = await generateVocabWords(
          catTitle,
          Math.max(needed, 5),
          Array.from(studiedWordsHistory)
        );

        if (generated && Array.isArray(generated) && generated.length > 0) {
          unlearned = [...unlearned, ...generated];
          if (catId !== "all") {
            setCategoryWordBanks((prev) => ({
              ...prev,
              [catId]: [...(prev[catId] || []), ...generated]
            }));
          }
        }
      } catch (err) {
        console.warn("Could not generate supplemental words:", err);
      }
    }

    // If user has studied literally everything in the local bank and AI is offline, recycle gracefully
    if (unlearned.length === 0) {
      unlearned = [...pool];
    }

    // Shuffle and slice requested amount
    const shuffled = [...unlearned].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, Math.min(targetCount, shuffled.length));

    // Update studied words history
    setStudiedWordsHistory((prev) => {
      const updated = new Set(prev);
      picked.forEach((w) => updated.add(w.word.toLowerCase()));
      return updated;
    });

    setSessionWords(picked);
    setSessionTitle(
      catId === "all"
        ? `Daily Lexicon Sprint (${picked.length} New Words)`
        : `${VOCABULARY_CATEGORIES.find((c) => c.set_id === catId)?.title || "Vocabulary"} (${picked.length} Words)`
    );

    // Reset writing challenge
    const initialInputs = {};
    picked.forEach((w) => {
      initialInputs[w.word] = "";
    });
    setWritingAnswers(initialInputs);
    setWritingFeedbacks({});
    setWritingSubmitted(false);

    setViewMode("flashcard");
  };

  // 2. Start specific category session
  const handleStartCategorySession = (cat) => {
    setActiveCategory(cat);
    const words = categoryWordBanks[cat.set_id] || cat.words;
    setSessionWords(words);
    setSessionTitle(cat.title);

    const initialInputs = {};
    words.forEach((w) => {
      initialInputs[w.word] = "";
    });
    setWritingAnswers(initialInputs);
    setWritingFeedbacks({});
    setWritingSubmitted(false);

    setViewMode("flashcard");
  };

  // 3. Endless Word Generator: Generate more words for the current category
  const handleGenerateMoreWords = async (catId) => {
    setIsGeneratingMore(true);
    try {
      const targetCat =
        VOCABULARY_CATEGORIES.find((c) => c.set_id === catId) || VOCABULARY_CATEGORIES[0];
      const existing = (categoryWordBanks[catId] || []).map((w) => w.word);

      const res = await generateVocabWords(targetCat.title, 5, existing);
      if (res && res.length > 0) {
        setCategoryWordBanks((prev) => ({
          ...prev,
          [catId]: [...(prev[catId] || []), ...res]
        }));
        setSessionWords((prev) => [...prev, ...res]);
      }
    } catch (err) {
      console.error("Failed to generate more vocabulary words:", err);
      alert("Could not generate more words right now. Please try again.");
    } finally {
      setIsGeneratingMore(false);
    }
  };

  // 4. Universal Word Search
  const handleExecuteSearch = async (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // First check local dictionary
    const localMatch = findWordInDictionary(query);
    if (localMatch) {
      setSearchResult({
        word: localMatch.word,
        pronunciation: localMatch.pronunciation,
        part_of_speech: localMatch.part_of_speech,
        meaning: localMatch.meaning,
        example_sentence: localMatch.example_sentence,
        synonyms: localMatch.synonyms || [],
        memory_tip: localMatch.memory_tip || "",
        source: "Spraivo Local Lexicon"
      });
      setShowSearchModal(true);
      return;
    }

    // If not local, search Spraivo AI Dictionary API
    setIsSearchingWord(true);
    setSearchError("");
    setSearchResult(null);
    setShowSearchModal(true);

    try {
      const result = await lookupDictionaryWord(query);
      if (!result || !result.meaning) {
        throw new Error(`No definition found for "${query}".`);
      }
      setSearchResult(result);
    } catch (err) {
      console.error("Dictionary lookup error:", err);
      setSearchError(err.message || "Failed to find word explanation. Please check the spelling.");
    } finally {
      setIsSearchingWord(false);
    }
  };

  // 5. Evaluate single sentence in Writing Challenge
  const handleEvaluateSingleSentence = async (wordObj) => {
    const userText = writingAnswers[wordObj.word]?.trim();
    if (!userText) {
      alert(`Please write a sentence using the word "${wordObj.word}" first.`);
      return;
    }

    setEvaluatingWord(wordObj.word);
    try {
      const res = await evaluateVocabSentence(wordObj.word, wordObj.meaning, userText);
      const evaluation = res.evaluation || res;
      setWritingFeedbacks((prev) => ({
        ...prev,
        [wordObj.word]: evaluation
      }));
    } catch (err) {
      console.error("Sentence evaluation failed:", err);
      alert("Could not evaluate sentence. Please try again.");
    } finally {
      setEvaluatingWord(null);
    }
  };

  // 6. Finish entire writing challenge and upgrade progress
  const handleFinishWritingChallenge = () => {
    setWritingSubmitted(true);

    const feedbacks = Object.values(writingFeedbacks);
    const correctCount = feedbacks.filter((f) => f.is_correct).length;
    const totalWords = sessionWords.length;
    const scorePct = totalWords > 0 ? Math.round((correctCount / totalWords) * 100) : 100;

    // Save to Vocab Session History
    saveVocabSessionHistory({
      topic_title: sessionTitle,
      words_count: totalWords,
      score: scorePct,
      accuracy: `${correctCount}/${totalWords}`,
      words: sessionWords.map((w) => w.word)
    });

    // Upgrade progress in profile
    if (onUpdateProfile && userProfile) {
      const currentMastered = userProfile.vocabulary_mastered_words || [];
      const newMastered = sessionWords
        .filter((w) => writingFeedbacks[w.word]?.is_correct)
        .map((w) => w.word);

      const combinedMastered = Array.from(new Set([...currentMastered, ...newMastered]));
      const activeScores = { ...(userProfile.vocabulary_set_scores || {}) };

      if (activeCategory) {
        activeScores[activeCategory.set_id] = Math.max(
          activeScores[activeCategory.set_id] || 0,
          scorePct
        );
      }

      onUpdateProfile({
        ...userProfile,
        vocabulary_mastered_words: combinedMastered,
        vocabulary_set_scores: activeScores,
        total_quizzes_completed: (userProfile.total_quizzes_completed || 0) + 1,
        last_active_date: new Date().toISOString()
      });
    }

    if (scorePct >= 70) {
      try {
        confetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    setViewMode("summary");
  };

  return (
    <div className="app-container" style={{ paddingBottom: "60px" }}>
      {/* ========================================================================= */}
      {/* 1. MAIN OVERVIEW / LIST VIEW                                              */}
      {/* ========================================================================= */}
      {viewMode === "list" && (
        <div>
          {/* Header Banner */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="badge badge-primary">Vocabulary Expansion</span>
              <span className="badge badge-gray">Spraivo Endless Lexicon</span>
            </div>
            <h1 style={{ fontSize: "2.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Vocabulary Mastery
            </h1>
            <p style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "720px" }}>
              Expand your active lexicon infinitely. Learn non-repeating words through sensory flashcards, practice your own sentences, and receive real-time coaching from Spraivo AI.
            </p>
          </div>

          {/* Universal Word Search Bar with Guaranteed White Text */}
          <div
            className="card"
            style={{
              padding: "20px 24px",
              marginBottom: "32px",
              background: "linear-gradient(135deg, rgba(14, 165, 233, 0.07), rgba(99, 102, 241, 0.05))",
              border: "1px solid rgba(56, 189, 248, 0.25)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Search size={18} color="#38bdf8" />
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
                Spraivo AI Universal Word Search
              </span>
              <span className="badge badge-gray" style={{ fontSize: "0.72rem" }}>Instant Dictionary</span>
            </div>

            <form
              onSubmit={handleExecuteSearch}
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
              }}
            >
              <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
                <input
                  id="vocab-universal-search-input"
                  type="text"
                  className="input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Look up any English word (e.g., reluctant, ubiquitous, eloquent, nuance)..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: "0.95rem",
                    background: "var(--bg-card)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                    caretColor: "var(--primary)"
                  }}
                />
              </div>

              <button
                id="vocab-universal-search-btn"
                type="submit"
                className="btn btn-primary"
                disabled={isSearchingWord || !searchQuery.trim()}
                style={{ padding: "10px 22px", display: "flex", alignItems: "center", gap: "8px" }}
              >
                {isSearchingWord ? (
                  <>
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderTopColor: "#fff",
                        animation: "spin 0.8s linear infinite"
                      }}
                    />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Explain Word</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Daily Word Learning Sprint (Non-Repeating Words with Custom Count) */}
          {/* Daily Word Learning Sprint (Non-Repeating Words with Custom Count) */}
          <div
            className="card"
            style={{
              padding: "28px",
              marginBottom: "36px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div style={{ maxWidth: "700px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Clock size={16} color="var(--primary)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Daily Vocabulary Session
                </span>
                <span className="badge badge-gray" style={{ fontSize: "0.72rem" }}>
                  Non-Repeating Lexicon
                </span>
              </div>

              <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                How many new words do you want to learn today?
              </h2>

              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
                Select your daily target or enter a custom amount. Each session brings fresh, non-repeated words. Master them with audio flashcards and test them in your own sentences!
              </p>

              {/* Goal count selector chips with Custom Count */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
                {[
                  { count: 5, label: "5 Words", sub: "Quick Sprint" },
                  { count: 10, label: "10 Words", sub: "Recommended" },
                  { count: 15, label: "15 Words", sub: "Deep Focus" },
                  { count: 20, label: "20 Words", sub: "Mastery" }
                ].map((item) => {
                  const isSelected = !isCustomCount && dailyGoalCount === item.count;
                  return (
                    <button
                      key={item.count}
                      type="button"
                      id={`goal-count-btn-${item.count}`}
                      onClick={() => {
                        setIsCustomCount(false);
                        setDailyGoalCount(item.count);
                      }}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "var(--radius-md)",
                        border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                        background: isSelected ? "rgba(99, 102, 241, 0.14)" : "var(--bg-subtle)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <span style={{ fontWeight: 700, color: isSelected ? "var(--primary)" : "var(--text-primary)", fontSize: "1rem" }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: isSelected ? "var(--primary)" : "var(--text-secondary)", opacity: 0.85 }}>
                        {item.sub}
                      </span>
                    </button>
                  );
                })}

                {/* Custom Number of Words Chip */}
                <button
                  type="button"
                  id="goal-count-btn-custom"
                  onClick={() => setIsCustomCount(true)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "var(--radius-md)",
                    border: isCustomCount ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                    background: isCustomCount ? "rgba(99, 102, 241, 0.14)" : "var(--bg-subtle)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span style={{ fontWeight: 700, color: isCustomCount ? "var(--primary)" : "var(--text-primary)", fontSize: "1rem" }}>
                    Custom
                  </span>
                  <span style={{ fontSize: "0.75rem", color: isCustomCount ? "var(--primary)" : "var(--text-secondary)", opacity: 0.85 }}>
                    Enter any amount
                  </span>
                </button>
              </div>

              {/* Custom Number Input when Custom is selected */}
              {isCustomCount && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                    padding: "12px 16px",
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                    maxWidth: "340px"
                  }}
                >
                  <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                    Number of words:
                  </span>
                  <input
                    id="custom-word-count-input"
                    type="number"
                    min={1}
                    max={50}
                    value={customCountValue}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(50, parseInt(e.target.value) || 1));
                      setCustomCountValue(val);
                    }}
                    style={{
                      width: "80px",
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-card)",
                      color: "var(--text-primary)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      textAlign: "center"
                    }}
                  />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>words</span>
                </div>
              )}

              {/* Optional Category Filter & Launch */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", marginTop: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Topic:</span>
                  <select
                    id="daily-vocab-topic-select"
                    className="input"
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    style={{
                      padding: "8px 14px",
                      fontSize: "0.88rem",
                      background: "var(--bg-card)",
                      borderColor: "var(--border-subtle)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--text-primary)"
                    }}
                  >
                    <option value="all">Mix of All Topics (Randomized)</option>
                    {VOCABULARY_CATEGORIES.map((cat) => (
                      <option key={cat.set_id} value={cat.set_id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  id="start-daily-vocab-session-btn"
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleStartDailySession(
                      isCustomCount ? customCountValue : dailyGoalCount,
                      selectedCategoryFilter
                    )
                  }
                  style={{
                    padding: "12px 24px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Sparkles size={16} />
                  <span>
                    Start Learning {isCustomCount ? customCountValue : dailyGoalCount} New Words
                  </span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Section: Browse All Categories (12+ Specialized Sets, No Level Badges) */}
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Explore Specialized Categories ({VOCABULARY_CATEGORIES.length})
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                Select any topic to study words progressing naturally from foundational to advanced.
              </p>
            </div>
          </div>

          <div className="grid-3" style={{ gap: "20px" }}>
            {VOCABULARY_CATEGORIES.map((cat) => {
              const currentWords = categoryWordBanks[cat.set_id] || cat.words;
              const score = userProfile?.vocabulary_set_scores?.[cat.set_id];
              const hasScore = score !== undefined && score !== null;

              return (
                <div
                  key={cat.set_id}
                  id={`vocab-cat-card-${cat.set_id}`}
                  className="card card-interactive"
                  onClick={() => handleStartCategorySession(cat)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "24px",
                    borderTop: `3px solid ${cat.color || "var(--primary)"}`,
                    cursor: "pointer"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span
                        className="badge"
                        style={{
                          background: `${cat.color}18` || "rgba(6, 182, 212, 0.12)",
                          color: cat.color || "var(--primary)",
                          border: `1px solid ${cat.color}30`
                        }}
                      >
                        {cat.badge || "Vocabulary"}
                      </span>

                      {hasScore ? (
                        <span className={`badge ${score >= 75 ? "badge-success" : score >= 50 ? "badge-warning" : "badge-danger"}`}>
                          Mastery: {score}%
                        </span>
                      ) : (
                        <span className="badge badge-gray">Not Started</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "1.22rem", marginBottom: "4px", color: "var(--text-primary)" }}>
                      {cat.title}
                    </h3>

                    <div style={{ fontSize: "0.8rem", color: cat.color || "var(--primary)", fontWeight: 600, marginBottom: "10px" }}>
                      {cat.tagline}
                    </div>

                    <p style={{ fontSize: "0.86rem", lineHeight: "1.5", color: "var(--text-secondary)", marginBottom: "16px" }}>
                      {cat.description}
                    </p>
                  </div>

                  <div>
                    {/* Sample preview words */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                      {currentWords.slice(0, 3).map((w, wIdx) => (
                        <span
                          key={wIdx}
                          style={{
                            fontSize: "0.75rem",
                            background: "var(--bg-subtle)",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border-subtle)"
                          }}
                        >
                          {w.word}
                        </span>
                      ))}
                      {currentWords.length > 3 && (
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", padding: "3px 4px" }}>
                          +{currentWords.length - 3} more
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--border-subtle)"
                      }}
                    >
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {currentWords.length} Key Words
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", color: cat.color || "var(--primary)", fontWeight: 600, fontSize: "0.88rem" }}>
                        <span>Study Cards</span>
                        <ChevronRight size={15} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLASHCARD ACTIVE RECALL VIEW                                           */}
      {/* ========================================================================= */}
      {viewMode === "flashcard" && sessionWords.length > 0 && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <button
              id="back-to-vocab-list-btn"
              className="btn btn-secondary btn-sm"
              onClick={() => setViewMode("list")}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeft size={16} />
              <span>Back to Vocabulary</span>
            </button>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                id="toggle-wordlist-btn"
                className="btn btn-secondary btn-sm"
                onClick={() => setViewMode("wordlist")}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <List size={15} />
                <span>Reference List</span>
              </button>

              {/* Endless word generator button */}
              {activeCategory && (
                <button
                  id="generate-more-words-btn"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleGenerateMoreWords(activeCategory.set_id)}
                  disabled={isGeneratingMore}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <PlusCircle size={15} color="var(--primary)" />
                  <span>{isGeneratingMore ? "Adding Words..." : "Add More Words"}</span>
                </button>
              )}

              <button
                id="start-writing-challenge-btn"
                className="btn btn-primary btn-sm"
                onClick={() => setViewMode("writing_challenge")}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <PenTool size={15} />
                <span>Write Sentences</span>
              </button>
            </div>
          </div>

          <Flashcard
            words={sessionWords}
            setTitle={sessionTitle}
            starredWordMap={starredMap}
            onToggleStar={handleToggleStarWord}
            onProceedToWriting={() => setViewMode("writing_challenge")}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SENTENCE WRITING CHALLENGE (ACTIVE PRODUCTION & SPRAIVO AI COACHING)  */}
      {/* ========================================================================= */}
      {viewMode === "writing_challenge" && sessionWords.length > 0 && (
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <button
              id="back-to-flashcard-btn"
              className="btn btn-secondary btn-sm"
              onClick={() => setViewMode("flashcard")}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeft size={16} />
              <span>Back to Flashcards</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                Verified by <strong style={{ color: "var(--primary)" }}>Spraivo AI</strong>
              </span>
              <button
                id="finish-writing-challenge-top-btn"
                className="btn btn-primary btn-sm"
                onClick={handleFinishWritingChallenge}
              >
                <span>Complete & Update Progress</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Mission Explanation Banner */}
          <div
            className="card"
            style={{
              padding: "24px",
              marginBottom: "28px",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(6, 182, 212, 0.06))",
              border: "1px solid rgba(99, 102, 241, 0.25)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <PenTool size={18} color="var(--primary)" />
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Sentence Writing & Usage Challenge
              </h2>
            </div>
            <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
              Write your own natural sentence using each word studied today. Spraivo AI examines your sentence for accurate context, meaning, and grammar. If there are mistakes, it will explain where to improve and teach you natural English phrasing!
            </p>
          </div>

          {/* Words List with Inputs and AI Feedback */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {sessionWords.map((wordObj, idx) => {
              const currentInput = writingAnswers[wordObj.word] || "";
              const feedback = writingFeedbacks[wordObj.word];
              const isGradingThis = evaluatingWord === wordObj.word;
              const isStarred = Boolean(starredMap[wordObj.word.toLowerCase()]);

              return (
                <div
                  key={idx}
                  id={`vocab-writing-card-${wordObj.word}`}
                  className="card"
                  style={{
                    padding: "24px",
                    borderLeft: feedback
                      ? feedback.is_correct
                        ? "4px solid var(--success)"
                        : "4px solid #ef4444"
                      : "4px solid var(--border-subtle)"
                  }}
                >
                  {/* Word Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                      gap: "8px"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
                          {idx + 1}. {wordObj.word}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSpeakWord(wordObj.word)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--text-muted)",
                            padding: "2px"
                          }}
                          title="Hear Word"
                        >
                          <Volume2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStarWord(wordObj)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: isStarred ? "#fbbf24" : "var(--text-muted)",
                            padding: "2px"
                          }}
                          title={isStarred ? "Starred word" : "Star word"}
                        >
                          <Star size={16} fill={isStarred ? "#fbbf24" : "none"} />
                        </button>
                        <span className="badge badge-gray" style={{ fontSize: "0.75rem" }}>
                          {wordObj.part_of_speech}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "3px" }}>
                        <strong style={{ color: "var(--text-primary)" }}>Meaning: </strong>
                        {wordObj.meaning}
                      </div>
                    </div>

                    {feedback && (
                      <span
                        className={`badge ${feedback.is_correct ? "badge-success" : "badge-danger"}`}
                        style={{ display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        {feedback.is_correct ? <Check size={14} /> : <X size={14} />}
                        <span>{feedback.is_correct ? "Accurate Usage" : "Needs Refinement"}</span>
                      </span>
                    )}
                  </div>

                  {/* Reference Example (Collapsible / Subtle) */}
                  <div
                    style={{
                      fontSize: "0.84rem",
                      color: "var(--text-muted)",
                      background: "var(--bg-subtle)",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      marginBottom: "14px",
                      fontStyle: "italic"
                    }}
                  >
                    Reference: "{wordObj.example_sentence}"
                  </div>

                  {/* Input Box */}
                  <div style={{ marginBottom: "12px" }}>
                    <textarea
                      id={`sentence-input-${wordObj.word}`}
                      className="input"
                      rows={2}
                      value={currentInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setWritingAnswers((prev) => ({
                          ...prev,
                          [wordObj.word]: val
                        }));
                      }}
                      placeholder={`Compose a sentence using the word "${wordObj.word}"...`}
                      style={{
                        width: "100%",
                        resize: "vertical",
                        fontSize: "0.95rem",
                        padding: "10px 14px",
                        lineHeight: "1.4",
                        color: "var(--text-primary)",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)"
                      }}
                    />
                  </div>

                  {/* Verify Action Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      id={`verify-sentence-btn-${wordObj.word}`}
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleEvaluateSingleSentence(wordObj)}
                      disabled={isGradingThis || !currentInput.trim()}
                      style={{ display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      {isGradingThis ? (
                        <>
                          <div
                            style={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "#fff",
                              animation: "spin 0.8s linear infinite"
                            }}
                          />
                          <span>Spraivo AI Checking...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} color="var(--primary)" />
                          <span>Verify with Spraivo AI</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Spraivo AI Feedback Card */}
                  {feedback && (
                    <div
                      style={{
                        marginTop: "14px",
                        padding: "14px 16px",
                        borderRadius: "var(--radius-sm)",
                        background: feedback.is_correct
                          ? "rgba(16, 185, 129, 0.08)"
                          : "rgba(239, 68, 68, 0.08)",
                        border: feedback.is_correct
                          ? "1px solid rgba(16, 185, 129, 0.25)"
                          : "1px solid rgba(239, 68, 68, 0.25)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.85rem", color: feedback.is_correct ? "var(--success)" : "#f87171" }}>
                          Spraivo AI Feedback:
                        </span>
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", marginBottom: "8px", lineHeight: "1.4" }}>
                        {feedback.feedback}
                      </p>

                      {feedback.improvement_tip && (
                        <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                          <strong style={{ color: "#fbbf24" }}>Teaching Tip: </strong>
                          {feedback.improvement_tip}
                        </div>
                      )}

                      {feedback.corrected_sentence && (
                        <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>
                          <strong style={{ color: "var(--primary)" }}>Polished Variation: </strong>
                          <span style={{ fontStyle: "italic" }}>"{feedback.corrected_sentence}"</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action Bar */}
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <button
              id="finish-writing-challenge-btn"
              type="button"
              className="btn btn-primary"
              onClick={handleFinishWritingChallenge}
              style={{ padding: "14px 32px", fontSize: "1rem", fontWeight: 700 }}
            >
              <span>Submit & Finalize Session</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. REFERENCE WORD LIST BROWSE VIEW                                        */}
      {/* ========================================================================= */}
      {viewMode === "wordlist" && (
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setViewMode("flashcard")}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeft size={16} />
              <span>Back to Flashcards</span>
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => setViewMode("writing_challenge")}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <PenTool size={15} />
              <span>Write Sentences</span>
            </button>
          </div>

          <div className="card" style={{ padding: "32px" }}>
            <h2 style={{ marginBottom: "6px", color: "var(--text-primary)" }}>
              {sessionTitle} — Reference Lexicon
            </h2>
            <p style={{ marginBottom: "24px", color: "var(--text-secondary)", fontSize: "0.92rem" }}>
              Explore comprehensive definitions, pronunciations, context examples, and synonyms for each key word.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {sessionWords.map((w, idx) => {
                const isStarred = Boolean(starredMap[w.word.toLowerCase()]);
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "16px 20px",
                      background: "var(--bg-subtle)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-subtle)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--primary)" }}>
                          {w.word}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSpeakWord(w.word)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--text-muted)",
                            padding: "2px"
                          }}
                          title="Hear Pronunciation"
                        >
                          <Volume2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStarWord(w)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: isStarred ? "#fbbf24" : "var(--text-muted)",
                            padding: "2px"
                          }}
                          title={isStarred ? "Starred word" : "Star word"}
                        >
                          <Star size={15} fill={isStarred ? "#fbbf24" : "none"} />
                        </button>
                        {w.pronunciation && (
                          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                            /{w.pronunciation}/
                          </span>
                        )}
                      </div>
                      <span className="badge badge-gray">{w.part_of_speech}</span>
                    </div>

                    <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: "8px" }}>
                      {w.meaning}
                    </p>

                    <div style={{ fontSize: "0.88rem", fontStyle: "italic", color: "var(--text-secondary)", marginBottom: "8px" }}>
                      "{w.example_sentence}"
                    </div>

                    {w.memory_tip && (
                      <div style={{ fontSize: "0.82rem", color: "#fbbf24", marginBottom: "8px" }}>
                        <strong>Memory Cue: </strong> {w.memory_tip}
                      </div>
                    )}

                    {w.synonyms && w.synonyms.length > 0 && (
                      <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Synonyms:</span>
                        {w.synonyms.map((s, sIdx) => (
                          <span key={sIdx} className="badge badge-gray" style={{ fontSize: "0.75rem", textTransform: "none" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SUMMARY VIEW                                                           */}
      {/* ========================================================================= */}
      {viewMode === "summary" && (
        <div className="card" style={{ maxWidth: "740px", margin: "0 auto", padding: "40px", textAlign: "center" }}>
          {(() => {
            const feedbacks = Object.values(writingFeedbacks);
            const correctCount = feedbacks.filter((f) => f.is_correct).length;
            const totalWords = sessionWords.length;
            const scorePct = totalWords > 0 ? Math.round((correctCount / totalWords) * 100) : 100;
            const isHigh = scorePct >= 70;

            return (
              <>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: isHigh ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                    border: `2px solid ${isHigh ? "var(--success)" : "#f59e0b"}`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px"
                  }}
                >
                  {isHigh ? <CheckCircle2 size={36} color="#10b981" /> : <AlertTriangle size={36} color="#f59e0b" />}
                </div>

                <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", fontWeight: 800 }}>
                  Vocabulary Session Completed!
                </h2>
                <p style={{ marginTop: "4px", color: "var(--text-secondary)" }}>
                  Topic: {sessionTitle}
                </p>

                <div
                  style={{
                    display: "inline-block",
                    margin: "24px auto",
                    padding: "20px 48px",
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-subtle)"
                  }}
                >
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>
                    Session Accuracy Score
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "3.2rem", fontWeight: 800, color: "var(--primary)" }}>
                    {scorePct}%
                  </div>
                  <div style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                    {correctCount} of {totalWords} sentences verified accurately
                  </div>
                </div>

                {/* Coaching & Mistakes Review */}
                {sessionWords.some((w) => writingFeedbacks[w.word] && !writingFeedbacks[w.word].is_correct) && (
                  <div style={{ textAlign: "left", marginTop: "24px", marginBottom: "28px" }}>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", color: "#fca5a5" }}>
                      Spraivo AI Improvement Tips
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {sessionWords
                        .filter((w) => writingFeedbacks[w.word] && !writingFeedbacks[w.word].is_correct)
                        .map((w, idx) => {
                          const fb = writingFeedbacks[w.word];
                          return (
                            <div
                              key={idx}
                              style={{
                                background: "rgba(239, 68, 68, 0.08)",
                                border: "1px solid rgba(239, 68, 68, 0.25)",
                                borderRadius: "var(--radius-md)",
                                padding: "16px"
                              }}
                            >
                              <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                                Word: {w.word}
                              </div>
                              <div style={{ fontSize: "0.85rem", color: "#fca5a5", marginBottom: "6px" }}>
                                Your Sentence: <em>"{writingAnswers[w.word]}"</em>
                              </div>
                              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                                <strong style={{ color: "#fbbf24" }}>Advice: </strong> {fb.feedback}
                              </div>
                              {fb.corrected_sentence && (
                                <div style={{ fontSize: "0.85rem", color: "var(--success)" }}>
                                  <strong>Suggested Revision: </strong> "{fb.corrected_sentence}"
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "24px" }}>
                  <button
                    id="retry-writing-btn"
                    className="btn btn-secondary"
                    onClick={() => setViewMode("writing_challenge")}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <RotateCcw size={16} />
                    <span>Review Sentences</span>
                  </button>

                  <button
                    id="back-to-categories-btn"
                    className="btn btn-primary"
                    onClick={() => setViewMode("list")}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <span>Explore More Words</span>
                    <ChevronRight size={16} />
                  </button>

                  {onNavigate && (
                    <button
                      id="go-dashboard-btn"
                      className="btn btn-secondary"
                      onClick={() => onNavigate("dashboard")}
                    >
                      <span>Dashboard</span>
                    </button>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. UNIVERSAL WORD SEARCH MODAL                                            */}
      {/* ========================================================================= */}
      {showSearchModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: "600px",
              width: "100%",
              padding: "28px",
              position: "relative",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowSearchModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                padding: "4px"
              }}
            >
              <X size={20} />
            </button>

            {isSearchingWord ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "3px solid rgba(6, 182, 212, 0.2)",
                    borderTopColor: "var(--primary)",
                    margin: "0 auto 16px",
                    animation: "spin 0.8s linear infinite"
                  }}
                />
                <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>
                  Looking up "{searchQuery}" with Spraivo AI...
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: "4px" }}>
                  Generating definition, phonetic transcription, nuances, and context examples.
                </p>
              </div>
            ) : searchError ? (
              <div style={{ textAlign: "center", padding: "30px 20px" }}>
                <AlertTriangle size={40} color="#f59e0b" style={{ margin: "0 auto 14px" }} />
                <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "8px" }}>
                  Word Not Found
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "20px" }}>
                  {searchError}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSearchModal(false)}
                >
                  Close
                </button>
              </div>
            ) : searchResult ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span className="badge badge-primary">Spraivo Dictionary</span>
                  {searchResult.source && (
                    <span className="badge badge-gray" style={{ fontSize: "0.72rem" }}>
                      {searchResult.source}
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)", margin: 0, textTransform: "lowercase" }}>
                      {searchResult.word}
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleSpeakWord(searchResult.word)}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "var(--text-secondary)"
                      }}
                      title="Pronounce"
                    >
                      <Volume2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleStarWord(searchResult)}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: starredMap[searchResult.word.toLowerCase()] ? "#fbbf24" : "var(--text-secondary)"
                      }}
                      title={starredMap[searchResult.word.toLowerCase()] ? "Remove from Starred" : "Star Word"}
                    >
                      <Star
                        size={15}
                        fill={starredMap[searchResult.word.toLowerCase()] ? "#fbbf24" : "none"}
                        color={starredMap[searchResult.word.toLowerCase()] ? "#fbbf24" : "currentColor"}
                      />
                    </button>
                  </div>
                  <span className="badge badge-gray">{searchResult.part_of_speech}</span>
                </div>

                {searchResult.pronunciation && (
                  <div style={{ color: "var(--text-secondary)", fontFamily: "monospace", fontSize: "0.92rem", marginBottom: "16px" }}>
                    /{searchResult.pronunciation}/
                  </div>
                )}

                {/* Definition */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Definition
                  </div>
                  <div style={{ color: "var(--text-primary)", fontSize: "1.05rem", marginTop: "2px", lineHeight: "1.5" }}>
                    {searchResult.meaning}
                  </div>
                </div>

                {/* Example sentence */}
                {searchResult.example_sentence && (
                  <div
                    style={{
                      background: "var(--bg-subtle)",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-sm)",
                      borderLeft: "3px solid var(--primary)",
                      marginBottom: "16px"
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                      Example in Context
                    </div>
                    <div style={{ color: "var(--text-primary)", fontStyle: "italic", fontSize: "0.92rem", marginTop: "3px" }}>
                      "{searchResult.example_sentence}"
                    </div>
                  </div>
                )}

                {/* Memory Cue */}
                {searchResult.memory_tip && (
                  <div
                    style={{
                      background: "rgba(234, 179, 8, 0.08)",
                      border: "1px solid rgba(234, 179, 8, 0.2)",
                      borderRadius: "var(--radius-sm)",
                      padding: "10px 14px",
                      marginBottom: "16px",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)"
                    }}
                  >
                    <strong style={{ color: "#fef08a" }}>Memory Cue: </strong>
                    {searchResult.memory_tip}
                  </div>
                )}

                {/* Synonyms */}
                {searchResult.synonyms && searchResult.synonyms.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, marginBottom: "6px" }}>
                      Synonyms
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {searchResult.synonyms.map((syn, idx) => (
                        <span key={idx} className="badge badge-gray" style={{ fontSize: "0.8rem", textTransform: "none" }}>
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action button: Practice in Flashcard */}
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setShowSearchModal(false);
                      setSessionWords([searchResult]);
                      setSessionTitle(`Word Deep Dive: ${searchResult.word}`);
                      const inputs = {};
                      inputs[searchResult.word] = "";
                      setWritingAnswers(inputs);
                      setWritingFeedbacks({});
                      setViewMode("flashcard");
                    }}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <Sparkles size={14} />
                    <span>Study in Flashcard</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
