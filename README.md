# Spraivo 🚀

An AI-powered English learning ecosystem that replaces rigid worksheets and repetitive tests with dynamic, adaptive, and goal-driven practice.

Spraivo calibrates to your level in real time using Google Gemini, generates tailored lessons, writing prompts, and quizzes for your specific focus areas, and caches content for lightning-fast repeat access.

---

## 🌟 What Makes Spraivo Unique

- **Goal-First Onboarding**: State your motivation (daily conversations, career advancement, academic writing, or exams like IELTS/TOEFL) and target skills. Jump straight into learning without a 20-question roadblock.
- **Tailored Level Check**: Take a 2–3 minute diagnostic generated live by Gemini around your chosen focus areas to calibrate your CEFR level (A1 to C2).
- **Non-Repeating Vocabulary Engine**: Choose your daily word count (5, 10, 15, 20, or a custom amount) or randomize topics. Spraivo tracks mastered words so every session presents fresh, non-repeated vocabulary.
- **Real-Notebook Writing Lab**: An authentic digital notebook with punch holes, red margin lines, and ruled line spacing that evaluates essays sentence-by-sentence with actionable feedback.
- **Universal AI Dictionary**: Instant search for any English term with definitions, IPA pronunciations, example sentences, memory tips, and synonyms.
- **Personal Starred Lexicon**: Bookmark challenging words from flashcards or search into a dedicated collection for quick review and listening practice.
- **Learning Timeline & Report Cards**: Complete history of your writing submissions, vocabulary sprints, and grammar quizzes with an integrated report card viewer.
- **24-Hour Database Caching**: Lessons and quizzes are cached in SQLite by `topic + level`. The first generation calls Gemini, and subsequent requests return in **4ms**, keeping the app snappy and API usage lean.

---

## 🎨 Design & Aesthetic

Built around a curated **Modern AI/EdTech** palette:
- **Indigo & Cyan Accents**: `#4F46E5` / `#06B6D4` (Light) and `#6366F1` / `#22D3EE` (Dark).
- **Light Mode**: Ultra-clean `#F8FAFC` background with pure white `#FFFFFF` cards, dark slate `#0F172A` text, and crisp borders.
- **Dark Mode**: Deep `#0B1120` canvas with `#111827` elevated surfaces and clear contrast.
- **Responsive Architecture**: Fully optimized across desktop, tablet, and mobile screens (down to 280px–300px narrow devices) with a slide-out mobile drawer and compact header stats.

---

## 🚀 Key Features

### 🤖 Spraivo AI Mentor
A 1-on-1 conversational partner powered by Gemini. Delivers structured, pedagogical responses with markdown tables, bullet points, and practical examples instead of dense paragraphs. Includes quick starter prompts and full context memory.

### ✍️ Writing Lab (Ruled Notebook)
An authentic digital lined notebook designed for immersion:
- Visual binder punch holes, red vertical margin line, and ruled lines aligned to the text line-height.
- Real-time word count, target length bar, and estimated reading time.
- Instant AI evaluation with scores for **Overall**, **Grammar**, **Vocabulary**, and **Coherence** (0–100).
- Detailed breakdown highlighting what was written versus suggested improvements, plus paragraph-by-paragraph coaching.

### 🗂️ Dynamic Vocabulary System
- **Daily Sessions**: Choose 5, 10, 15, 20, or any custom number of words.
- **Non-Repeating Lexicon**: Automatically filters out previously seen words to ensure continuous learning.
- **Interactive 3D Flashcards**: Flip cards to view pronunciations, meanings, contextual examples, memory tips, and synonyms, with built-in text-to-speech audio pronunciation.
- **Active Sentence Practice**: Practice writing original sentences using the newly learned words and receive live AI grading on accuracy and natural usage.

### 🔍 Spraivo AI Universal Word Search
Instant live dictionary lookup for any English word or expression:
- Returns phonetic spelling, part of speech, definition, contextual sentences, memory cues, and synonyms.
- One-click star button to save any searched word directly into your personal lexicon.

### ⭐ Starred Words (Personal Lexicon)
- Bookmark words anytime from flashcard sessions or universal word search.
- Filter, search, listen to pronunciations, and review memory cues in a dedicated review hub.

### 📖 Comprehensive Grammar Hub
Structured modules from foundational rules to advanced nuances:
- Covers Tenses, Modals, Passive Voice, Conditionals, Relative Clauses, Reported Speech, Gerunds & Infinitives, Prepositions, Phrasal Verbs, and Subject-Verb Agreement.
- Clear structural formulas, illustrative examples, common pitfalls, and live-generated practice tests with instant explanations.

### 📜 Learning Timeline & History
- Unified chronological log of all learning activities (Writing Lab essays, Vocabulary sprints, and Grammar tests).
- Filter by activity type or search with the real-time glassmorphic search bar.
- Interactive modal to review past essay report cards and feedback.

### 🎯 Practice Hub & Progress Analytics
- Skill breakdown bars across Grammar, Vocabulary, and Reading.
- CEFR level progression, learning streaks, and diagnostic level check tools.
- Quick goal adjustments from the navigation bar without losing saved practice history.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Vanilla CSS (modular design tokens & responsive media queries), Lucide React, Canvas Confetti
- **Backend**: Node.js, Express, SQLite (`better-sqlite3`)
- **AI Integration**: Google Generative AI SDK (`gemini-2.5-flash` / `gemini-1.5-flash`)
- **Security & Storage**: JWT session cookies, bcrypt password hashing, `express-rate-limit`

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- Google Gemini API key ([Get an API key from Google AI Studio](https://aistudio.google.com/))

### 1. Clone & Install
```bash
git clone https://github.com/ManthanBalla/Spraivo.git
cd Spraivo
npm install
```

### 2. Configure Environment
Create a `.env` file in the `server/` directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
JWT_SECRET=your_jwt_secret_key_here
```

*(Note: Never commit your `.env` file — it is pre-configured in `.gitignore`)*

### 3. Run the Application
To start both the backend server and Vite frontend concurrently:
```bash
npm start
```

Or run them in separate terminals:
```bash
# Terminal 1: Backend Server (Port 3001)
node server/server.js

# Terminal 2: Vite Frontend (Port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```text
├── public/                 # Static assets & favicons
├── server/
│   ├── auth.js             # JWT authentication & session handling
│   ├── db.js               # SQLite schema, tables & 24-hour cache
│   ├── llmService.js       # Gemini API prompts, schemas & evaluation
│   └── server.js           # Express endpoints & rate limiters
├── src/
│   ├── components/
│   │   ├── Flashcard.jsx       # 3D interactive flashcard with TTS audio
│   │   ├── GoalModal.jsx       # Learning goal adjustment dialog
│   │   ├── Navbar.jsx          # Responsive desktop bar & mobile drawer
│   │   └── QuestionCard.jsx    # Multiple-choice quiz component
│   ├── data/
│   │   ├── grammarData.js      # Comprehensive grammar definitions
│   │   └── vocabularyData.js   # Lexicon topics & curated sets
│   ├── screens/
│   │   ├── AuthScreen.jsx           # Sign in & sign up screen
│   │   ├── DashboardScreen.jsx      # Recommended lessons & level test
│   │   ├── GrammarScreen.jsx        # Grammar lessons & interactive tests
│   │   ├── HistoryScreen.jsx        # Learning timeline & report card modal
│   │   ├── MentorScreen.jsx         # Spraivo AI structured chat partner
│   │   ├── OnboardingScreen.jsx     # Goal-first diagnostic onboarding
│   │   ├── PracticeCenterScreen.jsx # Categorized exercises & challenges
│   │   ├── ProgressScreen.jsx       # Visual analytics & CEFR progress
│   │   ├── StarredWordsScreen.jsx   # Personal bookmarked lexicon hub
│   │   ├── VocabularyScreen.jsx     # Sessions, search, cards & practice
│   │   └── WritingLabScreen.jsx     # Authentic lined notebook essay lab
│   ├── services/
│   │   └── storageService.js        # API client & local data persistence
│   ├── App.jsx                      # App root, routing & theme manager
│   └── index.css                    # Design tokens, themes & responsive breakpoints
├── package.json
└── vite.config.js
```

---

## 📄 License
This project is open-source and available under the standard MIT License.
