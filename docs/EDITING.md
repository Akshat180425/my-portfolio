# Editing your portfolio

- Résumé: the chosen public file is `public/assets/Resume.pdf`, linked through `profile.resume`. Replace this file or update the root-relative URL when changing it.
- Poems: edit `src/data/poems.mjs`. See the poetry instructions below.
- Short writing: edit `src/data/fragments.mjs`. Each entry contains a stable slug, theme, and original text. These appear untitled in **Lines that linger**. The saved order is shuffled rather than alphabetical; preserve the author's exact wording when rearranging entries.
- Project studies: edit `src/data/case-studies.mjs`. The three pages share `src/pages/project.mjs`, with separate introductions, product journeys, architecture, engineering challenges, next questions, and pinned source references.
- Teaching and internship: edit `src/pages/teaching.mjs` and `src/pages/internship.mjs`. The original lecture files live under `public/assets/teaching/`.
- Current reading and listening: update `personal.currentReading` and `personal.currentListening`.
- Playlist: update `personal.playlistUrl`. It becomes a link on the Listening Room page.
- Personal introduction: update `personal.about`.
- Library: edit `libraryNotes`, using the exact entry name as its key. Use `{ type: 'quote', text, attribution, source }` for a sourced quotation, `{ type: 'question', text }` for a reflection question, or `{ type: 'note', text }` for your own prose. Every entry opens under “What stayed with me”; search includes these notes.
- Favourite songs: add any number of `{ title, url, note }` objects to each artist’s `favourites` array. Use the song’s direct Spotify track URL; `note` is optional. An empty array displays a space reserved for your choices.
- All-time favourites: edit `allTimeFavourites`, using `{ title, artist, url }`. These appear in “Songs I come back to” and remain visible independently of the artist selector.

The artist selector links directly to the selected artist’s Spotify profile and switches their “My favourites” song list. It does not play audio. The Alankar link goes directly to that campus role on Experience. There is no contact-form service; email links open Gmail compose, and Copy email copies the address.


## Adding poems

Add an entry to `poems` in `src/data/poems.mjs`. Copy one of the existing entries as a starting point:

```js
{
  slug: 'poem-title', // Unique lowercase URL, using hyphens for spaces.
  title: 'Poem title',
  language: 'English', // Or 'Hindi'.
  lang: 'en', // Use 'hi' for Hindi.
  pdf: '/assets/poetry/poem-title.pdf',
  excerpt: ['A short line from the poem.'],
  stanzas: [
    { lines: ['First line.', 'Second line.'] },
    { lines: ['A new stanza.'] },
  ],
}
```

Each `lines` item represents an intentional verse line. Stanzas remain separate; long lines wrap naturally on small screens with an indented continuation. An individual stanza can use `lang: 'en'` in a Hindi poem, and `coda: true` gives a closing stanza the italic brass treatment. A differently worded excerpt is not generated automatically; select exact lines from your poem. If the excerpt language differs from the poem language, set `excerptLang`.

Copy the original PDF into `public/assets/poetry/`, matching its `pdf` URL. Rebuild; the reading page, collection entry, language filter and sitemap entry are generated automatically. Poem URLs follow `/marginalia/poem-title/`. No manual navigation change is needed.

## Browsing a growing collection

Marginalia's landing page features Hijr, Lost, and one selected short piece. The full collections are `/marginalia/poems/` and `/marginalia/fragments/`. They generate six entries per page, with further routes such as `/marginalia/poems/page/2/`. All entries remain reachable through ordinary links without JavaScript.

Search and theme/language filters search the entire collection, including poem body text. They update the URL, preserve filtered pagination on reload, and support browser Back/Forward. `collectionSize` in `fragments.mjs` controls page size; the browser reads it from the generated markup. `fragmentPath()` calculates links to a piece's current page in the saved shuffled order. Keep slugs stable when rearranging pieces. Poem titles remain alphabetical. Old pagination links are preserved by aliases in the build script.

The Library selects two fragments by slug in `src/pages/library.mjs`; they are clearly attributed to Akshat and remain separate from the authors and philosophers. Change those selected slugs to feature different pieces. The cards share the source text rather than duplicating it.

Collection markup is in `src/pages/collection.mjs` and `src/components/writing.mjs`. The browser controller is `src/scripts/collections.js`. Full card templates make filtering immediate; search queries are treated as text, never HTML. For a very large archive, a separate search index could replace the embedded collection data.

Use Unicode Devanagari for Hindi text. AnmolHindi stores letters using legacy character mappings, so pasting directly from that font produces Latin characters and symbols. Hijr was transcribed to Unicode from the supplied text and visually checked against both PDF pages. The original PDF remains unchanged. The Hindi web font is Noto Serif Devanagari, bundled with its OFL licence.

## Page layouts and appearance

Reference collections are displayed alphabetically: artists and their songs, all-time favourites, Library categories and names, poems, projects, skills, and courses. Short writing uses a saved shuffled order, without individual titles. Professional experience and campus roles use reverse chronology, ordered by `endDate` and then `startDate` (ISO year-month values); the latest roles come first. The shared comparison is in `src/utils/sort.mjs`; sorting happens when the content modules are loaded. Poem stanzas, prose, and the site's chapter navigation keep their authored order.

Experience entries have stable `id` values. Home links still open the corresponding entry, for example `/experience/#awadh`. Each entry links to its detailed page, `/experience/awadh/` or `/experience/evizen-ai/`. Preserve existing IDs and paths so shared links keep working.

Email actions open a Gmail compose window in a new tab, with `profile.email` filled in. Visitors can also copy the address on the Contact page. The URL helper lives in `src/components/ui.mjs`.

Each page has its own template in `src/pages/`. Shared navigation, footer, and page metadata live in `src/components/layout.mjs`; small reusable elements live in `src/components/ui.mjs`.

Edit `src/styles/style.css` for the original colours, spacing, responsive layouts, and motion. Marginalia and poem styles live in `src/styles/poetry.css`, which also declares the Hindi font and loads only on these pages. New detail pages, writing collections, and the mobile navigation row use `src/styles/chapters.css`. Edit `src/styles/fonts.css` for shared font declarations. General browser interactions live in `src/scripts/app.js`.

Every page's primary menu contains Projects, Experience, Marginalia, and Resume. The Resume destination uses `profile.resume`; the Index keeps the other main pages discoverable.

Use `src/config/site.mjs` for the navigation list and canonical site URL. GitHub Pages deploys from `.github/workflows/deploy-pages.yml`; its `SITE_ORIGIN` and `SITE_BASE_PATH` environment variables select the public domain and project path. Templates and content should continue using root-relative local links; the build adds the deployment prefix automatically. If the domain changes later, update the config and workflow, then rebuild.

## Images, fonts, and downloads

- Project screenshots belong in `public/assets/images/`.
- Font files and their licences belong in `public/assets/fonts/`.
- The favicon is `public/favicon.svg`.
- Place downloads such as your public résumé under `public/assets/`. A file at `public/assets/resume.pdf` is served at `/assets/resume.pdf`.
- The unused first-version room illustration is preserved in `docs/archive/`; it is excluded from the generated website.

The build copies everything from `public/` into the website root. Only place files intended for visitors there.

## See your changes

Run `npm start` to build and serve the website. To rebuild while the server is already running, run `npm run build` in a second terminal, then refresh Chrome. There is no automatic file watcher.

Always edit `src/` or `public/`: the next build replaces `dist/`.

See [SOURCES.md](SOURCES.md) for content provenance, asset sources, and earlier verification records.
