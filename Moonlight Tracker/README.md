# 📚 Moonlight Tracker

A premium study session tracker for you and your friends. Track study sessions, collaborate via group chat, share notes, and get AI-powered study insights — all in one app.

---

## Features

- **Dashboard** — Study stats, streak tracker, activity heatmap, and weekly bar chart
- **Session Logger** — Log subjects, duration, goals, deadlines, scores, and notes
- **Calendar** — Visual calendar with study day highlights
- **Group Chat** — Real-time chat across 4 subject rooms (General, Maths, Science, Humanities)
- **Shared Notes** — Post and share study notes with friends
- **AI Study Assistant** — Powered by Google Gemini, knows your study history
- **Streaks** — Tracks your consecutive study days with a heatmap
- **Avatars** — Auto-generated unique gradient avatars per user
- **Dark / Light mode** — Toggle in the top nav
- **Cookie consent** — GDPR-style consent on first login

---

## Project Structure

```
moonlight-vercel/
├── api/
│   └── chat.js        ← Vercel serverless function (Gemini proxy)
├── public/
│   └── index.html     ← Full frontend app
└── vercel.json        ← Routing configuration
```

---

## Deploying to Vercel

### 1. Push to GitHub

Unzip the project and push the folder to a new GitHub repository.

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/moonlight-tracker.git
git push -u origin main
```

### 2. Import to Vercel

- Go to [vercel.com](https://vercel.com) and sign in
- Click **New Project** → Import your GitHub repo
- Leave all settings as default

### 3. Add your Gemini API Key

In Vercel → **Project Settings** → **Environment Variables**, add:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | Your key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

### 4. Deploy

Click **Deploy**. Vercel will give you a free public URL like:
```
https://moonlight-tracker.vercel.app
```

Share that link with your friends — the app is live!

---

## Testing Locally (Before Deploying)

Install the Vercel CLI and run a local dev server that mirrors the production environment exactly.

```bash
# Install Vercel CLI
npm install -g vercel

# Create a .env file in the project root
echo "GEMINI_API_KEY=your_key_here" > .env

# Start local dev server
vercel dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How the AI Works

The AI assistant uses a **Vercel serverless proxy** (`api/chat.js`) to call Google Gemini on the server side. This means:

- Your Gemini API key is **never exposed to the browser**
- No CORS errors — the request goes server → Google, not browser → Google
- All your friends can use the AI without needing their own key

---

## Data Storage

All user data (accounts, sessions, chat, notes) is stored in the **browser's localStorage** — there is no external database. This means:

- Data is private to each browser/device
- No backend server required beyond the AI proxy
- Friends on different devices share chat and notes via the same localStorage key structure

> **Note:** For true multi-device sync, you would need to add a database like Supabase or Firebase in the future.

---

## Custom Domain (Optional)

Vercel gives you a free `yourapp.vercel.app` subdomain. To use a custom domain:

1. Buy a domain from [Namecheap](https://namecheap.com), [Cloudflare](https://cloudflare.com), or similar (~$10–15/year)
2. Go to Vercel → Project → **Domains** → Add your domain
3. Follow Vercel's DNS instructions — usually takes under 5 minutes

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Fonts | Sora + DM Serif Display (Google Fonts) |
| Backend proxy | Vercel Serverless Functions (Node.js) |
| AI | Google Gemini 2.0 Flash |
| Hosting | Vercel (free tier) |
| Storage | Browser localStorage |

---

## Getting a Gemini API Key

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the key (starts with `AIza…`)
5. Add it to Vercel environment variables as `GEMINI_API_KEY`

The free tier includes generous quota — more than enough for a small group of friends.
