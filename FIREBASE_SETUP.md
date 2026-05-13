# 🔥 Firebase Setup Guide for Moonlight Tracker

Follow these steps to connect Firebase so invite links, friend connections,
streaks, and the challenge feed all work in real time across all users.

---

## Step 1 — Create a Firebase Project

1. Go to **https://console.firebase.google.com**
2. Sign in with your Google account
3. Click **Add project**
4. Name it `moonlight-tracker`
5. Disable Google Analytics (not needed)
6. Click **Create project**

---

## Step 2 — Enable Authentication

1. In the left sidebar click **Build → Authentication**
2. Click **Get started**
3. Click the **Email/Password** provider
4. Toggle it **ON**
5. Click **Save**

---

## Step 3 — Create a Firestore Database

1. In the left sidebar click **Build → Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (you can tighten rules later)
4. Choose a location closest to you
5. Click **Enable**

---

## Step 4 — Set Firestore Rules

1. In Firestore, click the **Rules** tab
2. Replace everything with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read any profile, only write their own
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Challenges — any logged-in user can read/write
    match /challenges/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

---

## Step 5 — Get Your Firebase Config

1. In the left sidebar click the **gear icon ⚙️ → Project settings**
2. Scroll down to **Your apps**
3. Click the **Web** icon ( </> )
4. Register the app with nickname `moonlight-web`
5. Copy the `firebaseConfig` object — it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy-xxxxxxxxxxxx",
  authDomain: "moonlight-tracker-xxxxx.firebaseapp.com",
  projectId: "moonlight-tracker-xxxxx",
  storageBucket: "moonlight-tracker-xxxxx.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxxxx"
};
```

---

## Step 6 — Paste Config into index.html

1. Open `public/index.html` in any text editor
2. Press **Ctrl+F** (or Cmd+F on Mac) and search for:
   ```
   YOUR_API_KEY
   ```
3. Replace the entire `firebaseConfig` block (lines ~32–39) with your real config

---

## Step 7 — Deploy

Push to GitHub and Render will redeploy automatically.
Your invite links will now truly connect friends in real time! 🌙

---

## How the Invite System Works (after setup)

```
You → Friends tab → Enter name → Generate link
      ↓
Link contains your Firebase UID encoded in the URL hash
      ↓
Friend clicks link → Sees your name on signup screen
      ↓
Friend signs up → Firebase adds both of you as friends
      ↓
You both appear in each other's crew instantly ✅
```

---

## Firebase Free Tier Limits (Spark Plan)

| Resource | Free Limit | Enough for... |
|----------|-----------|---------------|
| Auth users | 10,000/month | ✅ More than enough |
| Firestore reads | 50,000/day | ✅ Fine for a small group |
| Firestore writes | 20,000/day | ✅ Fine for a small group |
| Storage | 1 GB | ✅ More than enough |

No credit card required for the free tier.
