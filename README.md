# zfxhad.com

Personal tech hub for zfxhad.

## Deploy

Recommended: connect this GitHub repository to Vercel.

The `/api/latest-youtube.js` function fetches the newest YouTube upload automatically, so GitHub Pages alone is not recommended for the live site.


## v14
All visible site typography (Arabic and English, including UI controls) now uses the provided Thmanyah Serif Display font.

- v15: Search shortcut changed from Ctrl+K to `/` for Chrome/Brave compatibility.

## Twitch live auto-switch
This version checks Twitch automatically through `/api/twitch-status`.

Required Vercel Environment Variables:
- `TWITCH_CLIENT_ID`
- `TWITCH_CLIENT_SECRET`

When `zfxhad` is live on Twitch, the site switches the media panel from the latest YouTube video to the Twitch player. When the stream ends, it returns to the latest YouTube video automatically.

After adding or changing Environment Variables in Vercel, redeploy the Production deployment.
