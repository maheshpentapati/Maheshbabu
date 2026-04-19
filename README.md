# Mahesh Babu Pentapati — Portfolio (v5)

Terminal/hacker-aesthetic portfolio for a Senior SOC Analyst & Detection Engineer.

## What's in here

```
index.html        # main page — all 9 sections
styles.css        # full stylesheet (dark + green v5 theme)
script.js         # typing effect, interactive terminal, live clock, alert feed, gauge
assets/
  favicon.svg       # SVG favicon
  favicon.ico       # ICO fallback
  apple-touch-icon.png  # 180×180 iOS homescreen icon
  og-card.png       # 1200×630 social share image
  profile.jpg       # <-- YOU MUST ADD THIS (your photo, 4:5 aspect, ~800×1000)
  resume.pdf        # <-- YOU MUST ADD THIS (your resume PDF)
```

## Before deploying — two files you must add yourself

Neither of these exists in the repo yet. The site will render without them, but
the profile picture and resume download link will be broken until you add them:

1. `assets/profile.jpg` — your headshot. Portrait orientation (4:5 aspect works best).
   Recommended size 800×1000 px. Under 300KB ideally.
2. `assets/resume.pdf` — your resume as a single PDF.

## Deploying to GitHub Pages

Option A — replace your main site (`maheshpentapati.github.io`):

1. Clone the repo locally or use the GitHub web UI.
2. Delete the old `index.html` / any old `styles.css` / any old `script.js` at the repo root.
3. Upload these three files (`index.html`, `styles.css`, `script.js`) to the repo root.
4. Upload the `assets/` folder (with your added `profile.jpg` and `resume.pdf`).
5. Commit. GitHub Pages picks up changes within a minute or two.
6. Live at: `https://maheshpentapati.github.io/`

Option B — test it first in a staging repo:

1. Create a new repo called e.g. `portfolio-v5-test` (or reuse `portfolio-v3-test`).
2. Upload all files.
3. Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)` → Save.
4. Live at: `https://maheshpentapati.github.io/portfolio-v5-test/`
5. Once happy, copy files to your main `maheshpentapati.github.io` repo.

## What each section does

| # | Section | What it shows |
|---|---------|----------------|
| 01 | about | Background prose + `~/profile.yaml` card |
| 02 | stats | Honest counters (years, certs, level, coverage) |
| 03 | **operations** | **SOC console (demo) + hunt workflow** |
| 04 | work | 6 detection projects |
| 05 | sample | Actual FortiSIEM-style correlation rule pseudocode |
| 06 | career | git-log-style timeline |
| 07 | skills | tree-style toolkit + 2 certifications |
| 08 | shell | Interactive terminal (try `help`, `whoami`, `projects`) |
| 09 | contact | Email CTA + links |

## Section 03 — the SOC console

Top of section 03 has a simulated SOC dashboard styled after standard SIEM tools.
It is explicitly labeled `DEMO · SIMULATED DATA` in the console bar. The numbers
(`2,847 threats blocked`, `99.94% uptime`, `17 open alerts`, `security_score 87`,
`threat level 74 ELEVATED`) are **not** real client metrics — they are portfolio
showcase content.

The event-stream IP addresses are all RFC1918 private ranges (`10.x.x.x`,
`192.168.x.x`, `172.20.x.x`) and reserved documentation ranges (`203.0.x.x`
from TEST-NET-3, `198.51.x.x` from TEST-NET-2). None are routable.

If asked about this dashboard in an interview, the honest answer is:
*"That's a portfolio demo of the kind of SOC dashboard I work in. The real
numbers under NDA. The underneath-the-hood — detection pipeline, ATT&CK
coverage model, tool stack — those are accurate."*

## Editing later

- To change the brand/nav text: edit `index.html` (search for `mahesh@soc`).
- To change colors: edit the `:root` block at the top of `styles.css` (accent is `--accent: #4ade80`).
- To change event-stream entries: edit the `events` array in `script.js` (search for `P2`).
- To change KPI values: edit `data-count-to` attributes in `index.html`.
- To change threat-gauge value (currently 74/100): change `data-count-to="74"` in the `#tgVal` span AND change the `stroke-dasharray` animation in the `@keyframes gaugeReveal` rule in `styles.css`.

## Credits

Built collaboratively in April 2026.
Fonts: JetBrains Mono + Inter (Google Fonts).
No external JS libraries — vanilla ES5/ES6.
