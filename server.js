const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Serve the frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// ── Gemini proxy route ──────────────────────────────────────────
// The frontend calls POST /api/chat
// This function forwards it to Google and returns the reply
// The GEMINI_API_KEY env var is set on Render — never in the browser
app.post('/api/chat', async (req, res) => {
  const { messages, context } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid messages array' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not set. Add it in Render → Environment Variables.'
    });
  }

  // Inject context as a priming exchange
  // (system_instruction not supported in REST v1beta)
  const primerExchange = context ? [
    { role: 'user',  parts: [{ text: 'Who are you and what can you help me with?' }] },
    { role: 'model', parts: [{ text: context }] }
  ] : [];

  const contents = [
    ...primerExchange,
    ...messages.map(m => ({
      role:  m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }))
  ];

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ contents })
      }
    );

    const data = await geminiRes.json();

    if (data.error) {
      return res.status(geminiRes.status).json({ error: data.error.message });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Catch-all — serve index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Moonlight Tracker running on port ${PORT}`);
});
