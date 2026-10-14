# Development guide

A personal portfolio with nine main pages, project studies, experience pages, and original writing, in a warm evening listening room theme. Built with HTML, CSS, browser JavaScript, and a small Node.js generator. No third-party runtime dependencies.

## Run locally

Requires Node.js 18 or newer. There is no `npm install` step.

```powershell
git clone https://github.com/Akshat180425/my-portfolio.git
cd my-portfolio
npm start
```

Open **http://localhost:4173** in Chrome. Keep the terminal open; press **Ctrl+C** to stop.

To launch Chrome from another PowerShell window:

```powershell
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:4173"
```

## Project structure

```text
Portfolio/
├── src/                       Editable source code
│   ├── config/site.mjs         Site URL and navigation
│   ├── data/content.mjs        Profile, projects, experience, books, songs
│   ├── data/poems.mjs          Original poems, stanzas, languages, PDF links
│   ├── data/fragments.mjs      Original short writing and collection paths
│   ├── data/reflections.mjs    Reviewable interpretations and poem selections
│   ├── data/library-contexts.mjs Work context and sources for Library entries
│   ├── data/case-studies.mjs   Detailed project narratives and references
│   ├── components/            Shared layout and reusable HTML helpers
│   ├── pages/                 One template per page, plus the 404 page
│   ├── styles/                Stylesheets and font declarations
│   ├── utils/                 Shared alphabetical sorting
│   └── scripts/               General interactions and collection browsing
├── public/                    Files copied directly into the built site
│   ├── favicon.svg
│   └── assets/
│       ├── images/            Project screenshots
│       ├── fonts/             Local fonts and their licences
│       ├── poetry/            Original poetry PDFs
│       └── teaching/          Original lecture PDF, Python code, PDF preview
├── .github/workflows/         Build and deploy GitHub Pages on main
├── scripts/
│   ├── build.mjs              Generates the complete dist/ folder
│   └── serve.mjs              Serves dist/ on localhost
├── docs/
│   ├── EDITING.md             How to update content and appearance
│   ├── DEVELOPMENT.md         Local setup, structure, and deployment
│   ├── SOURCES.md             Content and asset provenance
│   ├── validation.json        Verification records
│   └── archive/               Unused assets retained for reference
├── dist/                      Generated website; do not edit manually
├── .openai/hosting.json        Existing preview hosting configuration
├── .gitignore
├── package.json
└── README.md
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Rebuild the website and start the local server |
| `npm run build` | Generate a fresh `dist/` folder |
| `npm run preview` | Serve the existing build without rebuilding |
| `npm run generate` | Alias for the build command |

After editing while the server is running, run `npm run build` in another terminal and refresh the browser. The server does not watch source files.

## Editing

Begin with `src/data/content.mjs` for personal content. Each page's layout is in `src/pages/`; shared components, styles, and browser behaviour have their own folders. See [the editing guide](EDITING.md).

Main pages: Home, About, Experience, Projects, Library, Listening Room, Marginalia, Now, and Contact. Convo, Ledgerly, and TradeScope have individual studies under `/projects/`. AWaDH and Evizen AI have pages under `/experience/`. Primary navigation consistently offers Projects, Experience, Marginalia, and Resume; the Index provides the other chapters.

Marginalia contains ten poems: **Aaj Aur Kal**, **Ek Dafaa**, **Hijr**, **Kaash**, **Karan**, **Lost**, **Musafir**, **Roobaroo**, **Rooh**, and **To You**. Each has a reading page and an original PDF download. **Lines that linger** contains 23 original short pieces. Both collections are searchable, filterable, and paginated, with six entries visible per page. Poems are alphabetical; short pieces have a saved shuffled order and no individual titles. Static pagination works without JavaScript. The Hindi poems retain their original English closing passages where present. Add poems in `src/data/poems.mjs` and short writing in `src/data/fragments.mjs`; the build generates the required pages and sitemap entries automatically.

The current build generates 30 content pages, three legacy pagination aliases, and a 404 page. Canonical URLs and the sitemap include the detail and collection routes. The original ten poem URLs remain unchanged.

All 18 Library personalities and 23 original short pieces have “In conversation with the words” disclosures, rendered by `src/components/reflection.mjs`. Library disclosures have “Within the work” context with source links, followed by “My reading”. Editorial status is not displayed to visitors. Reflections and work context participate in search; optional poem passages read directly from the original poem data. Marginalia's featured line is selected once per visit by `app.js`, with a manual “Another line” control and a static no-JavaScript fallback.

The Listening Room has eight artists, including Radiohead, with 26 artist favourites. “Songs I come back to” is a separate, permanent selection of five all-time favourites. Akshat’s Spotify playlist is linked below.

## Building for deployment

Live portfolio: **https://akshat180425.github.io/my-portfolio/**.

Pushing to `main` runs `.github/workflows/deploy-pages.yml`: Node.js builds the site, and GitHub Actions deploys `dist/` to GitHub Pages. The repository’s Pages publishing source is GitHub Actions. `dist/` stays generated and ignored by Git; commit the source, public assets, documentation and build scripts.

The deployment sets `SITE_BASE_PATH=/my-portfolio` and `SITE_ORIGIN=https://akshat180425.github.io/my-portfolio`. Local `npm start` uses root-relative URLs, so the original localhost address still works. To check the production path locally in PowerShell:

```powershell
$env:SITE_BASE_PATH = "/my-portfolio"
npm start
```

Open `http://localhost:4173/my-portfolio/`. Remove the override with `Remove-Item Env:SITE_BASE_PATH` before returning to normal local builds.

The earlier private review site’s configuration is preserved in `.openai/hosting.json`. It is separate from GitHub Pages and is not updated by this workflow.

For a different domain, update `origin` in `src/config/site.mjs` (or set `SITE_ORIGIN`) and the workflow environment. The generator uses it for canonical links, social metadata, the sitemap, and robots.txt. A host at the domain root needs an empty `SITE_BASE_PATH`.
