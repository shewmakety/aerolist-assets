# AOG Alerts LinkedIn Publishing Studio

A browser-only page that builds branded AOG Alerts corporate LinkedIn images. It is for announcements, statistics, insights, aviation stories, and explainers. It is not for alert posts.

## Open Locally

From this folder, start a static server and open the page:

```sh
python3 -m http.server 8080
```

Then visit http://localhost:8080/. A local server is required so the canvas can export PNG files. Opening the HTML file directly will load the page, but the browser will block the download.

## How To Use

1. Pick a format. Each one loads its sample copy and layout.
2. Pick a size: 1200x628, 1080x1080, or 1080x1350.
3. Edit the series label, headline, and the fields for that format. Wrap one phrase in `*asterisks*` to paint it red.
4. Move the size sliders, Logo To Label Spacing, background, photo crop, and fade only where the format allows them.
5. Download PNG, or use Export All 3 Sizes. Filenames look like `aogalerts_announcement_1200x628_20261124.png`.
6. Save a named design in this browser, or export and import a JSON file. The caption box is for the LinkedIn post text. It has a 3,000 character counter and a copy button. Nothing is sent to a server.

Default photos need a photographer credit if you post them. See CREDITS.md. The statistic sample ships with an Example Data badge. Turn that off when the figure is real, and keep a source line. An empty source shows a warning.

## Logo To Label Spacing

The Layout section sets the distance, in pixels, from the bottom of the fixed logo to the top of the red series label. The logo does not move. The series label and the text under it (headline, supporting text, figure, cards) move together.

The control starts at the designed gap for the current format and size, so the sample layouts do not change until you move it. Each size stores its own pixel value. Download PNG uses the open size. Export all 3 sizes uses each size's own value, and a size you have not changed keeps its designed gap. One number scaled across sizes does not fit, because the designed gap is different on every format and size, and the aviation story and the tall announcement layouts are not a scale of the landscape gap.

The gap stays clear of the logo and will not push text past the signature or the red rail. Long lines still shrink, and the shrink warning still appears. Saved designs and the JSON file store the three sizes. A JSON file from before this control loads with the designed gaps. Restore sample copy clears the spacing too.

## Change Brand Tokens

Open `studio.js`. The commented SETTINGS block at the top holds the palette, type sizes, margins, logo rules, and sample copy. Change it there and reload. `worker.js`, `tests/verify.mjs`, and `scripts/make-logo-variants.py` each have their own SETTINGS block for the values they own.

Fonts are `fonts/Inter-Medium.woff2` and `fonts/Inter-ExtraBold.woff2`. Logos are in `logos/`.

## Deploy Later

This folder includes a Worker that serves the static files. It has no account id and no token. From this folder, with a Cloudflare API token in the environment:

```sh
npx wrangler deploy
```

Do not deploy until you mean to. The Worker name is `aogalerts-linkedin-studio`.

## Run The Checks

```sh
npm install
npm run check
```

The check opens the studio in headless Chrome, renders every format at all three sizes, and writes `samples/`.
