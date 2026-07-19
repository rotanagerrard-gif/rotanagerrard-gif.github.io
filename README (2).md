# 📐 MathLearn — Premium Mathematics Learning Platform

A complete, production-ready, responsive mathematics learning website built with **HTML5, CSS3, and vanilla JavaScript (ES6+)**. No frameworks, no build step, no dependencies — just open and run.

> Learn Arithmetic → Probability across 13 topics with interactive lessons, step-by-step solutions, timed quizzes, XP & levels, achievements, leaderboards, and a full admin dashboard.

---

## ✨ Features

### Learning
- **Interactive Lessons** for 13 math topics with theory, worked examples, and step-by-step solutions.
- **Practice Exercises** with instant feedback and explanations.
- **Random Quiz Generator** with a per-question timer.
- **Daily Challenges** that refresh every day.
- **Search & Bookmark** any lesson.

### Gamification
- **XP & Level System** — earn XP for every correct answer.
- **Achievement Badges** — unlock badges as you progress.
- **Streak Tracking** — keep your daily streak alive.
- **Leaderboard** — compete with simulated learners + your own score.

### Experience
- **Dark / Light Mode** with system preference detection.
- **Glassmorphism UI** with smooth animations and transitions.
- **Loading Animation** on navigation.
- **Sound Effects** (toggleable) for correct/wrong answers and clicks.
- **Fully Responsive** layout (mobile → desktop).
- **Accessibility** — semantic HTML, ARIA labels, keyboard focus styles, reduced-motion support.

### Admin Dashboard
- Manage Lessons, Questions, and Users.
- Analytics overview (XP distribution, topic completion).
- Edit content live (stored in `localStorage`).
- Upload lesson images (Base64).

---

## 📁 Folder Structure

```
mathlearn/
├── index.html                # Home
├── lessons.html              # Lessons catalog + detail view
├── exercises.html            # Practice exercises
├── quizzes.html              # Random quiz generator
├── leaderboard.html          # Global leaderboard
├── progress.html             # Personal progress tracker
├── profile.html              # User profile + badges
├── settings.html             # Preferences
├── login.html                # Login
├── register.html             # Register
├── about.html                # About
├── contact.html             # Contact
├── 404.html                  # Not found
├── admin/
│   ├── index.html            # Admin dashboard (analytics)
│   ├── lessons.html          # Manage lessons
│   ├── questions.html        # Manage questions
│   └── users.html            # Manage users
├── css/
│   ├── variables.css         # Design tokens (colors, spacing, type)
│   ├── base.css              # Reset, typography, layout primitives
│   ├── components.css        # Buttons, cards, nav, modals, toasts
│   ├── animations.css        # Keyframes & animation utilities
│   └── responsive.css        # Media queries & responsive helpers
├── js/
│   ├── data/
│   │   ├── topics.js         # 13 math topic definitions
│   │   ├── lessons.js        # Full lesson content
│   │   ├── questions.js      # Question bank (all topics)
│   │   ├── achievements.js   # Badge definitions
│   │   └── leaderboard.js    # Simulated competitors
│   ├── lib/
│   │   ├── storage.js        # localStorage wrapper
│   │   ├── auth.js           # Auth & user session
│   │   ├── theme.js          # Dark/light mode
│   │   ├── sound.js          # Sound effects engine (WebAudio)
│   │   ├── ui.js             # Toasts, modals, loaders, helpers
│   │   ├── gamify.js         # XP, levels, streaks, badges
│   │   └── nav.js            # Shared navbar + footer injection
│   └── pages/
│       ├── home.js
│       ├── lessons.js
│       ├── exercises.js
│       ├── quizzes.js
│       ├── leaderboard.js
│       ├── progress.js
│       ├── profile.js
│       ├── settings.js
│       ├── auth.js
│       ├── contact.js
│       └── admin.js
└── assets/
    ├── img/                  # SVG illustrations & logo
    ├── icons/                # Favicon & topic icons (SVG)
    └── sounds/               # (generated at runtime via WebAudio)
```

---

## 🚀 Installation & Running

### Option 1 — Open directly
Double-click `index.html`. Everything runs in the browser.

### Option 2 — Local server (recommended)
Using the data files (loaded via `<script>`) requires no server, but a local server gives clean URLs and avoids file:// quirks:

```bash
# Python 3
cd mathlearn
python3 -m http.server 8000
# visit http://localhost:8000

# or Node
npx serve mathlearn
```

No `npm install` needed — there are **zero dependencies**.

---

## 🧭 Usage Guide

1. **Register** an account (stored locally — no backend) or **Login**.
2. Browse **Lessons**, read theory, open the step-by-step solver.
3. Practice in **Exercises**; take a **Quiz** for XP and streaks.
4. Check the **Leaderboard** and your **Profile** for badges.
5. Toggle **Dark Mode** and **Sound** in **Settings**.
6. Open **Admin Dashboard** (`/admin/index.html`) to manage content.
   - The default admin account: **`admin@mathlearn.io`** / **`admin123`** (auto-seeded on first load).

---

## 🧮 Math Topics Covered

Arithmetic · Fractions · Decimals · Percentages · Algebra · Equations · Inequalities · Factoring · Expanding Expressions · Coordinate Geometry · Geometry · Statistics · Probability

---

## 🔒 Notes on Data
- All user data (accounts, XP, bookmarks, settings) is stored in `localStorage`.
- The leaderboard mixes simulated competitors with your real score.
- There is **no backend** — this is a self-contained front-end project. Clearing browser storage resets progress.

---

## 🌐 Browser Support
Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses ES6 modules, CSS custom properties, and the WebAudio API.

---

## 📄 License
MIT — free to use, modify, and distribute.

Built with care for learners everywhere. Happy calculating! ➗
