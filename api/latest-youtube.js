export default async function handler(req, res) {
  const channelId = 'UCus7UfzkksGIMRZHAhii5VQ';
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  try {
    const response = await fetch(feedUrl, {
      headers: { 'User-Agent': 'zfxhad.com/latest-video' }
    });
    if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);
    const xml = await response.text();
    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/i)?.[1] || '';
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i)?.[1];
    const title = entry.match(/<title>([\s\S]*?)<\/title>/i)?.[1]
      ?.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const published = entry.match(/<published>([^<]+)<\/published>/i)?.[1] || null;
    if (!videoId) throw new Error('No video ID found in channel feed');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    res.status(200).json({ videoId, title: title || 'Latest from zfxhad', published });
  } catch (error) {
    res.status(500).json({ error: 'Could not load latest YouTube video' });
  }
}
