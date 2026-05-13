# 🌙 Moonlight Tracker

> *Study together, shine brighter.*

Moonlight Tracker is a Progressive Web App (PWA) built for friend groups learning Python together. It keeps everyone accountable with real-time streaks, shared challenges, topic tracking, a leaderboard, and an AI-powered Python tutor — all wrapped in a beautiful dark, starry interface.

---

## ✨ Features

### 📚 Topic Tracking
Toggle what you are studying each day from 16 built-in Python topics or add your own custom ones. Your active topics show on your posts, friend cards, and streak page so the whole crew knows what everyone is working on.

Built-in topics include:
- Variables & Types, Loops, Functions, Lists & Tuples
- Dictionaries, OOP / Classes, Error Handling, File I/O
- Modules & Packages, Testing, APIs / Requests, Databases
- Recursion, Decorators, Async / Await, Data Analysis

### 🔥 Streaks & Streak Pets
Every member has their own personal study streak that grows each day they share a challenge. A dedicated **Streaks page** shows every friend's individual streak count and active topics sorted from highest to lowest. Choose a streak companion that levels up with you:
- 🦉 Cosmo the Owl
- 🐱 Luna the Cat
- 🐉 Pydragon
- 🐺 CodeWolf
- 🦊 Bitfox

### 👥 Real-Time Friends & Invite Links
Invite friends by generating a personal invite link, QR code, or sharing directly via WhatsApp, Email, or Twitter. When your friend clicks the link and signs up, **Firebase automatically connects you both as friends instantly** — no manual approval needed. Friend lists, streaks, and the challenge feed update in real time for everyone.

### 🏆 Leaderboard
A full podium and ranked list showing your crew's standings. Filter rankings by:
- 🔥 Streak (days studied)
- ⭐ Challenges solved
- 📚 Topics covered

### 💬 Daily Challenge Share
Toggle on to share your challenge of the day with the crew. Attach a photo of your problem with the snap button. Your active topics are automatically tagged on every post. The feed updates live for all crew members.

### 🤖 Moonlight AI — Python Tutor
An AI-powered chatbot that answers Python questions in a warm, encouraging tone. It knows what topics you are currently studying and gives context-aware answers. Powered by **Google Gemini 1.5 Flash**.

### 🔔 Daily Reminders
A popup notification reminds you and your crew to study every day and keep the streak alive.

### 📱 PWA — Install on Any Device
Moonlight Tracker is fully installable as a Progressive Web App:
- **Android** — Chrome shows an *Add to Home Screen* banner automatically
- **iPhone** — tap Share → Add to Home Screen
- Works offline for all features except the AI chatbot and live feed
- Displays a moon icon on your home screen like a native app

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Backend | Node.js + Express |
| Database & Auth | Firebase (Firestore + Authentication) |
| AI Chatbot | Google Gemini 1.5 Flash API |
| PWA | Web App Manifest + Service Worker |
| Hosting | Render |

---

## 📁 Project Structure

```
moonlight-tracker/
├── 📄 server.js            ← Node.js backend (holds API key securely)
├── 📄 package.json         ← project dependencies
├── 📄 .env.example         ← environment variable template
├── 📄 .gitignore           ← keeps .env off GitHub
├── 📄 README.md            ← this file
├── 📄 FIREBASE_SETUP.md    ← step-by-step Firebase setup guide
└── 📁 public/
    ├── 📄 index.html       ← the full frontend app
    ├── 📄 manifest.json    ← PWA manifest
    ├── 📄 sw.js            ← service worker (offline support)
    ├── 🖼️ icon-192.png     ← app icon (small)
    └── 🖼️ icon-512.png     ← app icon (large)
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/moonlight-tracker.git
cd moonlight-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase
Follow the step-by-step instructions in **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** to:
- Create a free Firebase project
- Enable Email/Password Authentication
- Create a Firestore database
- Paste your Firebase config into `public/index.html`

### 4. Set up environment variables
```bash
cp .env.example .env
```
Open `.env` and add your Google Gemini API key:
```
GOOGLE_API_KEY=AIzaSy-your-key-here
```
Get a free key at **aistudio.google.com**

### 5. Run locally
```bash
node server.js
```
Open **http://localhost:3000** in your browser.

---

## 🌐 Deploying to Render

1. Push your repo to GitHub (`.env` is blocked by `.gitignore`)
2. Go to **render.com** → New → Web Service
3. Connect your GitHub repository
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variable:
   - Key: `GOOGLE_API_KEY`
   - Value: your API key
6. Click **Create Web Service**
7. Your app is live at `https://moonlight-tracker.onrender.com`

---

## 🔑 Environment Variables

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `GOOGLE_API_KEY` | Google Gemini API key for the AI chatbot | [aistudio.google.com](https://aistudio.google.com) |

Firebase config goes directly inside `public/index.html` — see `FIREBASE_SETUP.md` for details.

---

## 📱 Installing the App on Your Device

**Android:**
1. Open the app URL in Chrome
2. Tap the install banner that appears automatically
3. Or tap the browser menu → *Add to Home Screen*

**iPhone / iPad:**
1. Open the app URL in Safari
2. Tap the **Share** button
3. Tap **Add to Home Screen**
4. Tap **Add**

---

## 🤝 How to Use with Your Study Group

1. Deploy the app and copy your Render URL
2. Sign up and log in
3. Go to the **Friends** tab
4. Enter your friend's name and click **Generate Invite Link**
5. Share the link via WhatsApp, Email, Twitter, or QR code
6. Friend clicks the link → signs up → you are both instantly connected
7. Every day, toggle your topics, share your challenge, and watch the streaks grow 🔥

---

## 🔥 Firebase Free Tier

No credit card required. The free Spark plan covers:

| Resource | Free Limit |
|----------|-----------|
| Auth users | 10,000/month |
| Firestore reads | 50,000/day |
| Firestore writes | 20,000/day |
| Hosting | 10 GB/month |

More than enough for a study group.

---

## 📄 License

MIT License — free to use, share, and modify.

---

*Built with ♥ for Python learners who study better together.*
