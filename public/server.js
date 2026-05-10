const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve all frontend files from the /public folder
app.use(express.static('public'));

// ── AI Chat Route ──────────────────────────────────────────────
// The browser calls /api/chat — this server forwards the request
// to Google Gemini using the secret API key, then returns the response.
// The key never reaches the browser.
app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }
  try {
    const { system, messages } = req.body;

    // Build Gemini-compatible contents array
    // Gemini uses 'user' and 'model' roles (not 'assistant')
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: system || 'You are Moonlight AI, a friendly Python tutor.' }]
          },
          contents,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7
          }
        })
      }
    );

    const data = await response.json();

    // Extract the text from Gemini's response format
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Stars cloudy — try again! 🌙';

    // Return in a format the frontend already understands
    res.json({ content: [{ type: 'text', text }] });

  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to reach AI service.' });
  }
});

// ── Catch-all: serve index.html for any unknown route ──────────
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌙 Moonlight Tracker server running on port ${PORT}`);
});
