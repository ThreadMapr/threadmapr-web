// api/chat.js — secure Claude API proxy for ThreadMapr
// SETUP: Vercel → project → Settings → Environment Variables
// Add: ANTHROPIC_API_KEY = your key from console.anthropic.com

const ALLOWED_ORIGINS = [
  'https://threadmapr.com',
  'https://www.threadmapr.com',
  'https://threadmapr-web.vercel.app',
];

const ALLOWED_MODELS = [
  'claude-sonnet-4-20250514',
  'claude-haiku-4-5-20251001',
];

const MAX_TOKENS_LIMIT = 4000;

module.exports = async function handler(req, res) {
  // ── CORS ──
  const origin = req.headers.origin || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── API KEY ──
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY not configured',
      fix: 'Vercel → project Settings → Environment Variables'
    });
  }

  // ── INPUT VALIDATION ──
  const body = req.body || {};

  // Whitelist model
  const model = body.model;
  if (!model || !ALLOWED_MODELS.includes(model)) {
    return res.status(400).json({
      error: `Invalid model. Allowed: ${ALLOWED_MODELS.join(', ')}`
    });
  }

  // Cap max_tokens
  const maxTokens = Math.min(
    parseInt(body.max_tokens) || 2000,
    MAX_TOKENS_LIMIT
  );

  // Require messages
  if (!body.messages || !Array.isArray(body.messages) || !body.messages.length) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // Build clean request — only forward safe fields
  const claudeRequest = {
    model,
    max_tokens: maxTokens,
    messages: body.messages,
  };

  // Optional safe fields
  if (body.system) claudeRequest.system = String(body.system).slice(0, 2000);
  if (typeof body.temperature === 'number') {
    claudeRequest.temperature = Math.min(Math.max(body.temperature, 0), 1);
  }

  // ── CALL ANTHROPIC ──
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 28000); // 28s timeout

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(claudeRequest),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({
        error: 'Request timed out',
        details: 'Claude took too long to respond. Try again.'
      });
    }
    return res.status(500).json({
      error: 'Proxy failed',
      details: err.message
    });
  }
};
