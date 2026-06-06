export default async function handler(req, res) {
  // CORS headers so the frontend can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, context } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid messages array' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set in Vercel environment variables' });
  }

  // Inject context as a priming exchange (system_instruction not supported in REST v1beta)
  const primerExchange = context ? [
    { role: 'user', parts: [{ text: 'Who are you and what can you help me with?' }] },
    { role: 'model', parts: [{ text: context }] }
  ] : [];

  const contents = [
    ...primerExchange,
    ...messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }))
  ];

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
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
}
