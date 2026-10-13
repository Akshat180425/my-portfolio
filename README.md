# Akshat Bawa — Work & Wonder

A personal portfolio with nine main pages and individual poetry pages, in a warm evening listening room theme. Built with HTML, CSS, browser JavaScript, and a small Node.js generator. No third-party runtime dependencies.

## Run locally

Requires Node.js 18 or newer. There is no `npm install` step.

```powershell
cd "D:\IIT\Miscellaneous\Projects\Portfolio"
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
│   ├── components/            Shared layout and reusable HTML helpers
│   ├── pages/                 One template per page, plus the 404 page
│   ├── styles/                Stylesheets and font declarations
│   └── scripts/app.js          Browser interactions
├── public/                    Files copied directly into the built site
│   ├── favicon.svg
│   └── assets/
│       ├── images/            Project screenshots
│       ├── fonts/             Local fonts and their licences
│       └── poetry/            Original poetry PDFs
├── .github/workflows/         Build and deploy GitHub Pages on main
├── scripts/
│   ├── build.mjs              Generates the complete dist/ folder
│   └── serve.mjs              Serves dist/ on localhost
├── docs/
│   ├── EDITING.md             How to update content and appearance
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

Begin with `src/data/content.mjs` for personal content. Each page's layout is in `src/pages/`; shared components, styles, and browser behaviour have their own folders. See [the editing guide](docs/EDITING.md).

Pages: Home, About, Experience, Projects, Library, Listening Room, Marginalia, Now, and Contact. The Projects page contains Convo, Ledgerly, and TradeScope.

Marginalia contains ten poems: **Hijr**, **Lost**, **Aaj Aur Kal**, **Ek Dafaa**, **Kaash**, **Karan**, **Musafir**, **Roobaroo**, **Rooh**, and **To You**. Each has a reading page and an original PDF download. Language filters help visitors browse eight Hindi and two English poems. The Hindi poems retain their original English closing passages where present. Add more poems in `src/data/poems.mjs`; the build generates their pages and sitemap entries automatically.

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
