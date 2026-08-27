let cachedToken = null;
let tokenExpiresAt = 0;

async function getAppAccessToken(clientId, clientSecret) {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 60_000) return cachedToken;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  });

  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  if (!response.ok) {
    throw new Error(`Twitch token request failed: ${response.status}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiresAt = now + (Number(data.expires_in || 0) * 1000);
  return cachedToken;
}

export default async function handler(req, res) {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      error: 'Missing Twitch environment variables',
      live: false
    });
  }

  try {
    const token = await getAppAccessToken(clientId, clientSecret);
    const response = await fetch('https://api.twitch.tv/helix/streams?user_login=zfxhad', {
      headers: {
        'Client-Id': clientId,
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Twitch streams request failed: ${response.status}`);
    }

    const payload = await response.json();
    const stream = payload?.data?.[0] || null;

    res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');

    if (!stream) {
      return res.status(200).json({ live: false, channel: 'zfxhad' });
    }

    return res.status(200).json({
      live: true,
      channel: 'zfxhad',
      title: stream.title || '',
      gameName: stream.game_name || '',
      viewers: stream.viewer_count || 0,
      startedAt: stream.started_at || null,
      thumbnailUrl: stream.thumbnail_url || null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not check Twitch status', live: false });
  }
}
