# Spraivo

An AI-powered English learning platform that replaces rigid placement tests and static worksheets with dynamic, goal-driven practice.

Spraivo calibrates to your level on the fly using Google Gemini (`gemini-3.5-flash`), generates tailored lessons and quizzes for your specific focus areas, and caches content for lightning-fast repeat access.

---

## What Makes Spraivo Different

Most English learning apps force every learner through the exact same 20-question placement quiz and hardcoded grammar lists. Spraivo takes a different approach:

- **Goal-First Onboarding**: Tell the app why you're learning (conversations, career, writing, or exams like IELTS/TOEFL) and what skills you want to prioritize. No 19-question roadblock upfront.
- **Tailored Level Check**: Once inside, take a 2–3 minute diagnostic generated live by Gemini around your chosen focus areas to calibrate your starting CEFR level (A1 to C2).
- **Live Content Generation**: Grammar explanations, real-world examples, common pitfalls, and quizzes are generated fresh for your level instead of pulled from static data files.
- **24-Hour Database Caching**: Lessons and quizzes are cached in SQLite by `topic + level`. The first generation calls Gemini, and subsequent requests return in **4ms**, keeping the app snappy and API usage lean.
- **Safe Goal Adjustments**: Change your focus areas or target exam anytime from the navigation bar — your practice history and scores stay completely intact.

---

## Features

### 🤖 AI English Mentor
A 1-on-1 conversational chat partner powered by Gemini. Ask why a grammar rule works, request natural phrasing alternatives, or practice everyday conversation without judgement.

### ✍️ Writing Lab
Submit responses to real-world or exam-style prompts. Receive instant, sentence-by-sentence feedback:
- Overall, grammar, vocabulary, and coherence scores (0–100)
- Specific corrections showing *what was written* vs *how to phrase it better*
- Plain-English guidance on how to improve

### 📖 Grammar Modules
Pick any topic (Articles, Tenses, Modals, Conditionals, Passive Voice, etc.):
1. Read a fresh, level-tailored lesson with clear rules, examples, and common traps.
2. Click **Take the Test** to generate a 5–6 question quiz.
3. Submit for instant answer breakdown, explanations, and automatic score updates.

### 🗂️ Vocabulary Vault
Study curated word sets with interactive 3D flashcards (definitions, pronunciations, context sentences, and synonyms), followed by live-generated quizzes.

### 🎯 Practice Hub & Progress Tracking
- Filter across Grammar, Vocabulary, and Reading comprehension passages.
- View your learning streak, time spent practicing, and skill breakdown bars.
- Receive smart recommendations targeting your weakest areas.

### 🌓 Thoughtful Light & Dark Modes
- **Dark Mode**: Cool slate and deep gray palette with clean elevation shadows (no neon glow or harsh outlines).
- **Light Mode**: High-contrast, clean typography where all prompts and cards are crisp and readable.
- **Buttons**: Cohesive cool blue/slate gradients across both themes.

---

## Tech Stack

- **Frontend**: React 19, Vite, Vanilla CSS (custom design system), Lucide React, Canvas Confetti
- **Backend**: Node.js, Express, SQLite (`better-sqlite3`)
- **AI Integration**: Google Generative AI SDK (`gemini-3.5-flash`)
- **Security**: JWT session cookies, bcrypt password hashing, `express-rate-limit`

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- A Google Gemini API key ([get one here](https://aistudio.google.com/))

### 1. Clone & Install
```bash
git clone https://github.com/ManthanBalla/Spraivo.git
cd Spraivo
npm install
```

### 2. Configure Environment
Create a `.env` file inside the `server/` directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
JWT_SECRET=your_jwt_secret_key_here
```

*(Note: Never commit your `.env` file — it is already included in `.gitignore`)*

### 3. Run the App
To start both the backend server and Vite frontend concurrently:
```bash
npm start
```

Or run them individually in separate terminals:
```bash
# Terminal 1 (Backend - Port 3001)
node server/server.js

# Terminal 2 (Frontend - Port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```text
├── public/                 # Static assets & favicons
├── server/
│   ├── auth.js             # JWT verification & token generation
│   ├── db.js               # SQLite database, schema, and 24h content cache
│   ├── llmService.js       # Gemini prompts, schemas, and generation logic
│   └── server.js           # Express API endpoints & rate limiters
├── src/
│   ├── components/         # QuestionCard, Flashcard, Navbar, GoalModal
│   ├── data/               # Topic definitions & prompts metadata
│   ├── screens/            # Dashboard, Grammar, Vocab, WritingLab, Mentor, etc.
│   ├── services/           # Client API sync & storage helpers
│   ├── App.jsx             # Main router & theme state
│   └── index.css           # Design tokens, themes & responsive styles
├── package.json
└── vite.config.js
```
