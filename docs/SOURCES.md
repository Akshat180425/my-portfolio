# Content and asset sources

Professional biography, education, skills, experience, campus responsibilities, and the NTSE achievement come from the supplied Semester 7 résumé.
Project descriptions and screenshots come only from these three project repositories:

- https://github.com/Akshat180425/Convo
- https://github.com/Akshat180425/Ledgerly
- https://github.com/Akshat180425/TradeScope

Current source was checked where the résumé and README differed. TradeScope uses SQLite, not MongoDB. Its prices and funds are simulated. Convo uses keyword retrieval over curated app knowledge; no vector database claim is made.

Author, philosophy, and artist interests were supplied by Akshat. All 26 artist favourites and five all-time favourites were supplied by Akshat. Specific reading history and personal essays have not been invented.
Favourite-song links were checked against Spotify track metadata. “Tere Liye” uses the Prince recording, “Aadat” uses the Kalyug recording, and “FXCK UP THE WORLD” uses the album version featuring Future. The displayed “Tere Vaastey” spelling reflects Akshat’s subsequent edit.

Radiohead’s artist profile and Let Down, Creep, and Paranoid Android links were verified against Spotify. The supplied [My Songs playlist](https://open.spotify.com/playlist/1UistN5vmQ7dtyVOB7Xh4Q) confirms the linked versions of Perfect (Ed Sheeran), My Way (Frank Sinatra, 2008 remaster), Creep, Let Down, and Winning Speech. Counting Stars uses OneRepublic’s standard 4:17 recording, verified in the official artist embed; Paranoid Android uses the 6:27 OK Computer album recording. All new track and artist URLs also passed Spotify oEmbed title checks.

On October 14, Akshat replaced Winning Speech in the permanent all-time selection with [Vanjhali Vaja by Amrinder Gill](https://open.spotify.com/track/1o4LauuyjZXLIL5srdqBqr), verified against Spotify's Angrej soundtrack listing. Winning Speech remains among Karan Aujla's artist-specific favourites.
Library notes contain twelve selected quotations and six original reflection questions. Akshat supplied the wording for Camus, Kierkegaard, Dante, Kafka, Plath, Shakespeare, and Martin; that wording and punctuation are preserved. Sources are linked underneath each quote. Kierkegaard’s familiar wording is identified as a paraphrase of the 1843 journal entry, and Dante’s as an English rendering of Inferno, Canto V. Plath’s source uses commas where Akshat selected full stops. The mythology category was removed at Akshat’s request. The decorative MYTHOLOGIES book remains on the shelf, as clarified by Akshat.
Marginalia now features Akshat’s own poems instead of the blank notebook and Hamlet quotation.

## Original poetry

All ten poems in `D:\My Poetries\PDF Files` were supplied by Akshat: **Aaj Aur Kal**, **Ek Dafaa**, **Hijr**, **Kaash**, **Karan**, **Lost**, **Musafir**, **Roobaroo**, **Rooh**, and **To You**. Their PDFs are copied without modification into `public/assets/poetry/`.

Lost and To You were checked against PDF text extraction and rendered pages. The Hindi poems use legacy AnmolHindi text and were transcribed into Unicode Devanagari, with visual review of all source pages. Original wording, stanza breaks and English closing passages were retained; paper page breaks are omitted from continuous web reading. Original title spellings are retained, with no invented dates or translations.

Akshat confirmed “इत्तलाह” in Kaash and approved changing the visibly malformed “सफ़ाइ! धे कर” in Karan to “सफ़ाई दे कर” in the web text. The downloadable PDFs remain the unmodified originals. Other unusual source wording and spellings remain as supplied.

## Project studies and experience pages · October 2026

The detailed studies are original explanations based on implementation review, rather than copied README descriptions. Public source baselines:

- Convo: `ca9200a4a0c3f7ca86c43ec1813fc4783174d991`.
- Ledgerly: `98d30cdf2348bd4c029bcbb158aff3fb3060d70a`.
- TradeScope: `58b1a0d7d1a1a057205bbc3a376f2164cb708ea0`.

Each study links selected files at its baseline commit. “Engineering challenges” describes problems addressed by the implementation; it does not invent personal debugging stories or unmeasured impact. Next steps are editorial engineering suggestions. Uncommitted changes in the project checkouts were excluded. No project test suite was run as part of writing these studies; linked test definitions are supporting implementation references, not fresh pass claims.

The AWaDH page uses Akshat's original `Theory Basics/PDF Files/PDF - 01.pdf` and `Theory Basics/Python Codes/Closest Pair Algorithm.py`. Both are copied byte for byte. The preview is a rendering of the PDF's first page. A small native SVG explains the cross-boundary closest-pair case; it is an illustration, not a computed output. The page distinguishes the original teaching script from the standard O(n log n) algorithm, with a [Princeton reference](https://algs4.cs.princeton.edu/code/javadoc/edu/princeton/cs/algs4/ClosestPair.html). The PDF's June 12, 2024 date is its printed date.

Akshat identified Unilic as the team product at Evizen AI. Product availability and the brief academic-platform description were verified in the official [App Store listing](https://apps.apple.com/in/app/unilic/id6787115546) and [Google Play listing](https://play.google.com/store/apps/details?id=com.evizenai.unilic). His specific QA, regression, stress-testing, and release contributions come from the supplied résumé. Team product capabilities are separated from his role; no adoption or business-impact metrics are claimed.

## Lines that linger

All 23 short pieces were supplied directly by Akshat. Their wording and punctuation remain intact in `src/data/fragments.mjs`, including his correction from “who” to “whom” in “If life ever asks…”. The collection name and theme filters are editorial additions for browsing. Individual titles remain absent; category labels were restored at Akshat's request with muted colour accents. The Library now features exactly the four requested pieces beginning “Walk through the fire…”, “Love may explain…”, “I am not yet brave enough…”, and “You waited for the moon…”, all attributed to Akshat. Both writing collections retain six entries per page. The landing page chooses a short piece randomly per visit, with a manual next-line control and no timed changes.

## Draft interpretations · October 14, 2026

Akshat explicitly requested clearly labelled draft interpretations for review. `src/data/reflections.mjs` contains 18 drafts for Library personalities and 23 for his original short pieces. “In conversation with the words” separates these proposed readings from the source text. First-person wording is proposed copy, not a claim that Akshat has approved a belief or described a personal experience. No author biography or private intention is asserted.

At Akshat's subsequent request, the public editorial labels were removed; the interpretation text and poem excerpts are unchanged.

The Kafka discussion was checked against [Before the Law](https://web.mit.edu/norvin/www/somethingelse/kafka2.html). The Shakespeare discussion distinguishes Caesar's speech from authorial instruction, with context checked in [Julius Caesar, Act 2, Scene 2](https://www.folger.edu/explore/shakespeares-works/julius-caesar/read/2/2/). Other drafts offer readings of the displayed passage or editorial question. Nearby excerpts from Lost and Hijr select exact lines from the existing poem data and link to the full poem; no poem wording was changed.

The decorative MYTHOLOGIES title now occupies the final tilted book. Shelf labels and ornaments were checked for separation across desktop, tablet, and mobile widths.

## Literary context · October 14, 2026

At Akshat's request, all 18 Library interpretations now place the quotation or question beside its literary or philosophical context. `src/data/library-contexts.mjs` stores the work, concise original summaries, and visible source links. “Within the work” provides context; “My reading” provides a personal interpretation. The original quotations and questions remain unchanged. The six questions are connected to relevant works without being attributed to their authors as direct quotations. Akshat's 23 original short pieces and their interpretations were not rewritten in this revision.

The contextual readings use:

- Shankara: the introduction on superimposition in the Brahma Sutra commentary, as discussed in the [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/shankara/), §3.4.
- Camus: the closing Sisyphus image and lucid revolt in The Myth of Sisyphus, checked against [Stanford's discussion](https://plato.stanford.edu/entries/camus/), §3.4.
- Buddha: [Dhammapada, chapter 12](https://accesstoinsight.org/tipitaka/kn/dhp/dhp.12.budd.html), including the surrounding verses on conduct and practice.
- Dante: Francesca's speech in [Inferno, Canto V](https://www.gutenberg.org/cache/epub/1001/pg1001-images.html).
- Kafka: the waiting and final revelation in [Before the Law](https://web.mit.edu/norvin/www/somethingelse/kafka2.html).
- Nietzsche: the dancing star beside the last man in [Zarathustra's Prologue, §5](https://www.gutenberg.org/files/1998/1998-h/1998-h.htm).
- Dostoevsky: the invented, self-contradictory narrator of [Notes from Underground](https://www.gutenberg.org/files/600/600-h/600-h.htm).
- Martin: Bran's introduction to judgement in the [publisher's opening-chapter excerpt](https://www.penguinrandomhouseretail.com/book/?isbn=9780553381689). The remembered exchange about courage also appears in [these educational excerpts](https://www.handbook4rspreaders.org/files/handbook-stories/Slovacka/radni_materijali/A_game_of_throne.pdf), p. 5. No additional dialogue is quoted on the portfolio.
- Homer: Penelope's recognition through the bed in [Odyssey XXIII](https://www.theoi.com/Text/HomerOdyssey23.html).
- Tolstoy: Ivan's conventional life in [chapter II](https://en.wikisource.org/wiki/The_Death_of_Ivan_Ilych/II) and Gerasim's care in [chapter VII](https://en.wikisource.org/wiki/The_Death_of_Ivan_Ilych/VII) of The Death of Ivan Ilych.
- Marcus Aurelius: the inward retreat and judgement in [Meditations IV.3](https://www.gutenberg.org/files/6920/6920-h/6920-h.htm).
- Cervantes: the windmills and subsequent explanation in [Don Quixote I.8](https://www.gutenberg.org/cache/epub/996/pg996-images.html).
- Wilde: Lord Darlington's social conversation in [Lady Windermere's Fan, Act III](https://www.gutenberg.org/cache/epub/790/pg790-images.html).
- Plato and Socrates: the penalty discussion in [Apology 38a](https://www.gutenberg.org/files/1656/1656-h/1656-h.htm).
- Batalvi: the sensory presence and departure in [Shikra](https://folkpunjab.org/poetry/shiv-kumar-batalvi/shikra/), also checked in [Suman Kashyap's translations at APNA](https://apnaorg.com/wp/shiv-kumar-batalvi-suman-kashyap/). The poem's speaker is not treated as biographical evidence about the poet.
- Kierkegaard: the longer journal entry JJ:167, commonly cited as IV A 164, reproduced with its critical-edition reference [here](https://etxt.dk/kierkegaard/citat/). The selected English wording remains identified as a paraphrase.
- Plath: Esther's heartbeat at Joan's funeral and the uncertainty before her hospital interview in [The Bell Jar, chapter 20](https://www.gutenberg.ca/ebooks/plaths-belljar/plaths-belljar-00-h.html).
- Shakespeare: Caesar, Calphurnia, and Decius in [Julius Caesar II.2](https://www.folger.edu/explore/shakespeares-works/julius-caesar/read/2/2/).

These contexts identify speakers and scenes rather than treating every character's speech as its author's settled position. Personal responses are interpretive connections, not biographical claims. No new passages from these works are reproduced verbatim.

## Assets

The homepage uses a typographic composition with no hero image. The earlier generated `docs/archive/evening-room.webp` is retained as an unused asset and is no longer referenced by the page or social preview metadata.
Project screenshots: `public/assets/images/convo.png`, `ledgerly.png`, and `tradescope.png`, from the respective public repositories.
Fonts: Cormorant Garamond and Manrope, stored locally with their OFL licences in `public/assets/fonts/`. Hindi poetry uses Noto Serif Devanagari from the [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/notoserifdevanagari), also stored locally with its OFL licence. AnmolHindi itself is not redistributed as a web font.
Record and book illustrations are native CSS, with no extra image downloads.

Archived prompt for the unused first-version image:

> Use case: photorealistic-natural. Asset type: atmospheric hero image for a refined personal portfolio called An Evening Listening Room. Create a cinematic editorial still life in a quiet study at night. A walnut sideboard, a vintage black turntable with a black vinyl record, a small warm ivory pleated-shade brass table lamp, three worn clothbound literary books in oxblood and dark olive with no readable text, an open cream-paper book in the foreground. A very small classical plaster sculpture fragment partly in shadow in the rear, dark brown plaster wall, sheer dark curtains barely visible. No people. Balanced uncluttered arrangement, plausible tactile objects, low amber lamplight, deep warm shadows, subtle analog film grain. Camera straight-on slightly above tabletop, landscape 3:2 composition. Restrained rich palette: tobacco, oxblood, warm charcoal, aged brass and parchment. Quiet, thoughtful, lived-in, not luxury hotel or fantasy library. Main lamp and still life on center-right; dark negative space at left. Fine art photography with chiaroscuro, realistic detail. No text, lettering, labels, watermark or borders. Output a single landscape image.

## Validation

All nine routes were checked in Microsoft Edge at 1440 px desktop and at 390 px and 320 px mobile widths. Checks covered successful image loading, one main heading per page, internal links and project anchors, horizontal overflow, Library search/filter/empty/reset states, keyboard-operable Library notes, searching within notes, all seven artist selections and direct Spotify profile destinations, the Alankar anchor, expandable project details, clipboard copying, Index navigation and Escape focus restoration, and reduced-motion support. No browser JavaScript errors were observed. See `docs/validation.json` for the latest results.

External live project applications and third-party services are outside this site’s deployment and may have their own availability limits.

The reflection revision was checked in Chrome at 1440, 900, 768, 390, and 320 px under the GitHub Pages project path. Checks covered all 41 draft panels, keyboard and no-JavaScript reading, search within reflections, exact original writing, six-entry pagination, four Library selections, featured-line randomisation and links, category labels, the song replacement, shelf geometry, and horizontal overflow. No browser JavaScript errors were observed. See `reflectionsAndFeaturedWriting` in `docs/validation.json`.

The Buddha quotation was updated to wording supplied by Akshat, with a reference to [Dhammapada, verse 165](https://accesstoinsight.org/tipitaka/kn/dhp/dhp.12.budd.html). Its attribution says “English rendering” because English translations vary.

The subsequent Listening Room revision was checked at 1440, 1150, 900, 768, 650, 390, and 320 px. Every artist’s supplied song list and direct track URLs were checked, along with artist text fitting inside the record label, separation between the disc and caption, and absence of horizontal overflow or browser errors. These targeted results are recorded under `listeningRoomRevision` in `docs/validation.json`.

The poetry collection and both poem pages were checked in Chrome at 1440, 768, 390 and 320 px. Checks covered stanza and line preservation, exact Lost text against PDF extraction, the actual Devanagari font used by Chrome, English closing stanza language tags, keyboard-operable language filters, navigation, unique canonical URLs, sitemap entries, no-JavaScript reading, and absence of horizontal overflow or browser errors. Downloaded PDFs matched the originals byte for byte. Screenshots were reviewed on desktop and mobile. See `poetryRevision` in `docs/validation.json`.

The complete ten-poem collection and music additions were checked at the GitHub Pages project path in Chrome at 1440, 390 and 320 px. All 19 routes, 38 distinct internal destinations/assets, ten original PDF hashes, eight artist selections, five permanent favourites, playlist link, language filters, canonical URLs and sitemap passed. The record label and caption remained separate for every artist. No browser errors or horizontal overflow were observed. See `completeCollectionAndGitHubPages` in `docs/validation.json`.

The subsequent navigation and ordering revision was checked in Chrome at 1440, 390 and 320 px. Both Home experience links land on and highlight their matching entries. Footer and Contact email links open a new Gmail compose tab with the recipient filled in; those external destinations were intercepted during testing, without accessing an inbox. Clipboard copying, alphabetical collections, exact Buddha wording, and preservation of every poem stanza passed. All 19 routes and ten PDF downloads were also rechecked against repository assets. See `navigationAndCollections` in `docs/validation.json`.

The project and writing expansion was checked in Chrome under `/my-portfolio/`: all 33 content pages at 1440, 390, and 320 px, with targeted navigation/layout checks at 768 and 900 px. The 57 distinct internal page/asset URLs and all canonical URLs passed. Checks covered paginated search across the complete collections, language/theme filters, empty/reset states, browser history, reloads, stable fragment links, no-JavaScript pagination, exact rendering of all 23 short pieces, original lecture download hashes, the AWaDH entry-to-detail path, and preservation of the mythology shelf and Buddha wording. Desktop/mobile screenshots were reviewed. No browser errors or horizontal overflow were observed. See `projectStudiesAndWritingCollections` in `docs/validation.json`.
