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


v17: fixed Twitch embed sizing so the live player fills the same 16:9 media card as YouTube. Offline fallback to latest YouTube remains unchanged.


## Adding another tweak later
1. Put the downloadable ZIP inside `downloads/`.
2. Put its transparent PNG logo inside `assets/`.
3. Add one object to `data/tweaks.json` using the existing Fahad Touch entry as the template.
4. Commit the changes to GitHub; Vercel will redeploy automatically.

The first downloadable tweak is `downloads/Fahad_Touch.zip` and is kept unchanged from the uploaded file.


## v19
- Things I use now includes Rufus, MSI Afterburner, OCCT, UNIGINE Benchmarks, CapFrameX, HWiNFO, and GPU-Z.
- Replaced `downloads/Fahad_Touch.zip` with the newly uploaded EXE-based Fahad Touch package.


## v20
- Replaced Fahad Touch download with the latest build.
- Clean download filename: `Fahad_Touch.zip`.
- Added “Up to +37% FPS” and “Better performance. Smoother gameplay.” to the tweak card.
- Expanded Tools layout to 4 columns on wide screens with responsive 3/2/1-column breakpoints.
