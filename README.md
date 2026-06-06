# 📚 Moonlight Tracker

A premium study session tracker for you and your friends. Track study sessions, collaborate via group chat, share notes, and get AI-powered study insights.

---

## Project Structure

```
moonlight-render/
├── public/
│   └── index.html   ← Full frontend app
├── server.js        ← Express server + Gemini proxy
├── package.json     ← Dependencies
└── README.md
```

---

## Deploying to Render

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/moonlight-tracker.git
git push -u origin main
```

### 2. Create a Web Service on Render

- Go to [render.com](https://render.com) and sign in
- Click **New → Web Service**
- Connect your GitHub repo
- Use these settings:

| Setting | Value |
|---------|-------|
| Environment | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

### 3. Add your Gemini API Key

In Render → your service → **Environment** tab, add:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | Your key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

### 4. Deploy

Click **Deploy**. Render will give you a free URL like:
```
https://moonlight-tracker.onrender.com
```

> ⚠️ **Note:** Render free tier services spin down after 15 minutes of inactivity and take ~30 seconds to wake up on the next visit. This is normal for the free plan.

---

## Testing Locally

```bash
# Install dependencies
npm install

# Create a .env file
echo "GEMINI_API_KEY=your_key_here" > .env

# Run the server (manually load .env or use dotenv)
GEMINI_API_KEY=your_key_here node server.js
```

Then open [http://localhost:3000](http://localhost:3000).

---

## How the AI Works

The frontend calls `POST /api/chat` on your own server. The Express server forwards the request to Google Gemini using the `GEMINI_API_KEY` environment variable. The key is **never sent to the browser** — no CORS issues, no key exposure.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| AI | Google Gemini 2.0 Flash |
| Hosting | Render (free tier) |
| Storage | Browser localStorage |
