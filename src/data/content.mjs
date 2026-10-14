// Edit the content here, then run: npm run build
import { compareText, compareBy } from '../utils/sort.mjs';

export const profile = {
  name: 'Akshat Bawa',
  email: 'akshatbawa130806@gmail.com',
  github: 'https://github.com/Akshat180425',
  linkedin: 'https://www.linkedin.com/in/akshat180425/',
  university: 'Indian Institute of Technology, Ropar',
  degree: 'B.Tech. in Mathematics and Computing',
  years: '2023–2027',
  updated: 'October 2026',
  seeking: ['Data analysis', 'Quantitative analysis', 'AI engineering', 'Software development'],
  // Place your chosen public résumé in public/assets/, then set its /assets/ URL.
  resume: '/assets/Resume.pdf',
};

export const projects = [
  {
    id: 'convo', name: 'Convo', category: 'Connection, in real time.',
    date: '2025 — ongoing', image: 'convo.png',
    intro: 'A full-stack messaging application that brings conversations, shared media, and contextual AI into one place.',
    stack: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    github: 'https://github.com/Akshat180425/Convo', demo: 'https://convo-153s.onrender.com',
    details: [
      ['The experience', 'Private and group conversations, online presence, read receipts, replies, forwarding, search, and media sharing.'],
      ['Under the surface', 'Real-time events with Socket.IO; JWT authentication, email verification, and Google sign-in; Cloudinary media storage.'],
      ['A little intelligence', 'A contextual assistant and message suggestions, with retrieval over curated app knowledge to ground help about Convo.'],
    ],
  },
  {
    id: 'ledgerly', name: 'Ledgerly', category: 'Making sense of the everyday.',
    date: '2025', image: 'ledgerly.png',
    intro: 'A personal finance workspace for understanding spending, planning budgets, and making progress toward savings goals.',
    stack: ['React', 'Express', 'MongoDB', 'Recharts'],
    github: 'https://github.com/Akshat180425/Ledgerly', demo: 'https://ledgerly-five.vercel.app',
    details: [
      ['The experience', 'Track income and expenses, organise recurring transactions, set budgets, and follow savings goals in one workspace.'],
      ['From records to patterns', 'Interactive charts explore cash flow, spending categories, savings rate, and income-versus-expense trends.'],
      ['Practical details', 'Protected accounts, Google sign-in, filtering, CSV and Excel exports, and a responsive interface.'],
    ],
  },
  {
    id: 'tradescope', name: 'TradeScope', category: 'A window into market mechanics.',
    date: '2026 — ongoing', image: 'tradescope.png',
    intro: 'An educational paper-trading workspace for exploring simulated markets, order execution, and portfolio analytics.',
    stack: ['React', 'Node.js', 'SQLite', 'Recharts'],
    github: 'https://github.com/Akshat180425/TradeScope', demo: null,
    details: [
      ['The experience', 'Trade simulated equities, futures, and options with virtual funds, private accounts, and personal portfolios.'],
      ['The mechanics', 'Market, limit, and stop orders; partial fills; price-time priority; self-trade prevention; and theoretical option pricing.'],
      ['The accounting', 'Transactional SQLite persistence, an auditable cash ledger, realised and unrealised P&L, returns, and drawdown.'],
    ],
    note: 'An educational simulation using virtual money and synthetic prices. No brokerage connection or real-money trading.',
  },
];

export const experience = [
  {
    id: 'evizen-ai', company: 'Evizen AI', fullName: 'Evizen AI Private Limited', role: 'Software Development Engineer Intern',
    date: 'May — July 2026', place: 'IIT Ropar', label: 'Quality, under pressure.',
    summary: 'Part of the team working on Unilic, a smart academic platform available on Android and iOS. My contribution focused on quality assurance and release testing.',
    points: ['Tested Android and iOS builds through functional and regression testing across successive releases.', 'Stress-tested attendance and verification workflows under concurrent classroom-scale usage and degraded conditions.', 'Tracked defects through resolution, verified fixes, and supported release readiness for the pilot launch.'],
    tags: ['Quality assurance', 'Stress testing', 'Android & iOS', 'Release readiness'],
  },
  {
    id: 'awadh', company: 'AWaDH', fullName: 'AWaDH · AI Vicharana Shala', role: 'Teaching Assistant',
    date: 'May — July 2024', place: 'IIT Ropar', label: 'Learning, by helping others learn.',
    summary: 'Supported participants working through machine learning, mathematics, and programming.',
    points: ['Delivered sessions and helped participants understand machine learning, linear algebra, and programming concepts.', 'Contributed front-end updates to the programme’s website.', 'Created structured learning notes in LaTeX for participants.'],
    tags: ['Machine learning', 'Python', 'Linear algebra', 'LaTeX'],
  },
];

export const community = [
  { id: 'alankar', role: 'Event Coordinator', organisation: 'Alankar · The Music Club', date: 'June 2024 — May 2025' },
  { role: 'Mentor', organisation: 'Institute Student Mentorship Program', date: 'May 2024 — July 2027' },
  { role: 'Event Co-Head', organisation: 'Zeitgeist · The Cultural Fest', date: 'October 2024' },
];

export const skills = [
  ['Languages', 'C++', 'Python', 'JavaScript', 'HTML', 'CSS'],
  ['Frameworks & libraries', 'React', 'Node.js', 'Express', 'Socket.IO', 'Tailwind CSS', 'DaisyUI', 'Recharts', 'Axios'],
  ['Tools & platforms', 'Git', 'GitHub', 'LaTeX', 'MongoDB Atlas', 'Render', 'Cloudinary'],
  ['Foundations', 'Data structures & algorithms', 'Machine learning', 'REST APIs', 'Retrieval-augmented generation'],
];

export const courses = [
  ['Mathematics and Quant', 'Linear Algebra', 'Probability', 'Optimization', 'Numerical Analysis', 'Financial Risk Management'],
  ['Computing', 'Data Structures & Algorithms', 'Machine Learning', 'Theory of Computation', 'Distributed Algorithms'],
  ['Across disciplines', 'Differential Equations', 'Discrete Mathematical Structures', 'Signals & Systems', 'Economics'],
];

// These are interests supplied by Akshat, not a claim that every work has been read.
export const library = [
  { category: 'Philosophy', title: 'Questions that stay.', description: 'Voices I’m drawn to, across traditions and centuries.', entries: ['Plato & Socrates', 'Friedrich Nietzsche', 'Albert Camus', 'Adi Shankara', 'Buddha', 'Søren Kierkegaard', 'Marcus Aurelius'] },
  { category: 'Literature', title: 'Other lives, on the page.', description: 'Poetry, fiction, and worlds that invite a longer look.', entries: ['Dante Alighieri', 'Homer', 'Fyodor Dostoevsky', 'Franz Kafka', 'Shiv Kumar Batalvi', 'Sylvia Plath', 'William Shakespeare', 'Leo Tolstoy', 'Miguel de Cervantes', 'Oscar Wilde', 'George R. R. Martin'] },
];

// Selected quotations and original reflection prompts. User-selected wording
// is preserved; attribution notes identify paraphrases or translation variants.
// Set type: 'note' for personal prose; use type: 'quote' with a source URL for quotations.
export const libraryNotes = {
  'Plato & Socrates': { type: 'quote', text: 'the unexamined life is not worth living', attribution: 'Socrates in Plato’s Apology · 38a · translated by Benjamin Jowett', source: 'https://www.gutenberg.org/files/1656/1656-h/1656-h.htm' },
  'Friedrich Nietzsche': { type: 'quote', text: 'one must still have chaos in one, to give birth to a dancing star.', attribution: 'Thus Spake Zarathustra · Prologue, §5 · translated by Thomas Common', source: 'https://www.gutenberg.org/files/1998/1998-h/1998-h.htm' },
  'Albert Camus': { type: 'quote', text: 'One must imagine Sisyphus happy.', attribution: 'The Myth of Sisyphus', source: 'https://plato.stanford.edu/entries/hope/' },
  'Adi Shankara': { type: 'question', text: 'What remains of the self when its changing descriptions fall away?' },
  'Buddha': { type: 'quote', text: 'By oneself is evil done; by oneself is one defiled. By oneself is evil left undone; by oneself is one purified.', attribution: 'Dhammapada · verse 165 · English rendering', source: 'https://accesstoinsight.org/tipitaka/kn/dhp/dhp.12.budd.html' },
  'Søren Kierkegaard': { type: 'quote', text: 'Life can only be understood backwards; but it must be lived forwards.', attribution: 'Journals · 1843 · commonly quoted paraphrase', source: 'https://wist.info/kierkegaard-soren/35849/' },
  'Marcus Aurelius': { type: 'quote', text: 'The universe is transformation: life is opinion.', attribution: 'Meditations · IV.3 · translated by George Long', source: 'https://www.gutenberg.org/files/6920/6920-h/6920-h.htm' },
  'Dante Alighieri': { type: 'quote', text: 'There is no greater sorrow than to recall happiness in times of misery.', attribution: 'Inferno · Canto V · English rendering', source: 'https://digitaldante.columbia.edu/dante/divine-comedy/inferno/inferno-5/inferno-05/' },
  'Homer': { type: 'question', text: 'Is coming home a return to a place, or to a version of ourselves?' },
  'Fyodor Dostoevsky': { type: 'question', text: 'How much of a person can be understood through their contradictions?' },
  'Franz Kafka': { type: 'quote', text: 'Before the Law stands a doorkeeper.', attribution: 'Before the Law', source: 'https://web.mit.edu/norvin/www/somethingelse/kafka2.html' },
  'Shiv Kumar Batalvi': { type: 'question', text: 'How can language make absence feel so present?' },
  'Sylvia Plath': { type: 'quote', text: 'I am. I am. I am.', attribution: 'The Bell Jar', source: 'https://www.gutenberg.ca/ebooks/plaths-belljar/plaths-belljar-00-h.html' },
  'William Shakespeare': { type: 'quote', text: 'Cowards die many times before their deaths; the valiant never taste of death but once.', attribution: 'Julius Caesar · Act II, Scene II', source: 'https://www.folger.edu/explore/shakespeares-works/julius-caesar/read/2/2/' },
  'Leo Tolstoy': { type: 'question', text: 'Which small, ordinary choices quietly become the shape of a life?' },
  'Miguel de Cervantes': { type: 'question', text: 'When does imagination help us see, and when does it keep us from seeing?' },
  'Oscar Wilde': { type: 'quote', text: 'we are all in the gutter, but some of us are looking at the stars.', attribution: 'Lord Darlington in Lady Windermere’s Fan · Act III', source: 'https://www.gutenberg.org/cache/epub/790/pg790-images.html' },
  'George R. R. Martin': { type: 'quote', text: "Can a man still be brave if he's afraid?", attribution: 'A Game of Thrones · Bran I', source: 'https://openlibrary.org/books/OL31979920M/A_Game_of_Thrones' },
};

// Favourite songs supplied by Akshat.
// Each favourites array can contain any number of songs:
// { title: 'Song name', url: 'https://open.spotify.com/track/...', note: 'Optional personal line.' }
export const artists = [
  { id: 'arijit-singh', name: 'Arijit Singh', spotify: 'https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw', favourites: [
    {
        "title": "Gehra Hua",
        "url": "https://open.spotify.com/track/5Yoyh88KElCaz253bSjp5T"
    },
    {
        "title": "Tum Hi Ho",
        "url": "https://open.spotify.com/track/56zZ48jdyY2oDXHVnwg5Di"
    },
    {
        "title": "Ishq Mubarak",
        "url": "https://open.spotify.com/track/10GrNnfAHtXWIvDEDBRDvM"
    },
    {
        "title": "Shayad",
        "url": "https://open.spotify.com/track/5nsgEWDLWxqNdipxBD6Gi0"
    }
] },
  { id: 'blackpink', name: 'BLACKPINK', spotify: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', favourites: [
    {
        "title": "Kill This Love",
        "url": "https://open.spotify.com/track/6hvczQ05jc1yGlp9zhb95V"
    },
    {
        "title": "How You Like That",
        "url": "https://open.spotify.com/track/4SFknyjLcyTLJFPKD2m96o"
    }
] },
  { id: 'satinder-sartaaj', name: 'Satinder Sartaaj', spotify: 'https://open.spotify.com/artist/4rgw8A5vcYinpZLDKHrEdV', favourites: [
    {
        "title": "Hazaarey Wala Munda",
        "url": "https://open.spotify.com/track/7uIrPPb9S4YdAXEyYpiXDo"
    },
    {
        "title": "Udaarian",
        "url": "https://open.spotify.com/track/3K3mo4LoxPKk18oqIC3hQC"
    },
    {
        "title": "Sai",
        "url": "https://open.spotify.com/track/4hp8Tl66nvHTC43oYNHGAB"
    },
    {
        "title": "Tere Vaastey",
        "url": "https://open.spotify.com/track/6CPStPrCzQaNxRHP9gid67"
    }
] },
  { id: 'eminem', name: 'Eminem', spotify: 'https://open.spotify.com/artist/7dGJo4pcD2V6oG8kP0tJRR', favourites: [
    {
        "title": "Mockingbird",
        "url": "https://open.spotify.com/track/561jH07mF1jHuk7KlaeF0s"
    },
    {
        "title": "Sing For The Moment",
        "url": "https://open.spotify.com/track/2Si43OSoa3MW5mmc0mBs36"
    },
    {
        "title": "Stan",
        "url": "https://open.spotify.com/track/3UmaczJpikHgJFyBTAJVoz"
    }
] },
  { id: 'karan-aujla', name: 'Karan Aujla', spotify: 'https://open.spotify.com/artist/6DARBhWbfcS9E4yJzcliqQ', favourites: [
    {
        "title": "Winning Speech",
        "url": "https://open.spotify.com/track/3FqtduiaqnFYvBgKuc6QWQ"
    },
    {
        "title": "Don't Look",
        "url": "https://open.spotify.com/track/5f3PgI4zW2oErM3j3MWTWW"
    },
    {
        "title": "Softly",
        "url": "https://open.spotify.com/track/0YQJoDL6f46J0n1rOVkpxJ"
    }
] },
  { id: 'atif-aslam', name: 'Atif Aslam', spotify: 'https://open.spotify.com/artist/2oSONSC9zQ4UonDKnLqksx', favourites: [
    {
        "title": "Tajdar-e-Haram",
        "url": "https://open.spotify.com/track/5euB7CZQXxjqe2s2Bb8KWl"
    },
    {
        "title": "Aadat",
        "url": "https://open.spotify.com/track/2YbKtL9lJBzrjFo4Krld7R"
    },
    {
        "title": "Tere Liye",
        "url": "https://open.spotify.com/track/0xlWd9o8yjKpJ02WJy79kZ"
    }
] },
  { id: 'lisa', name: 'Lisa', spotify: 'https://open.spotify.com/artist/5L1lO4eRHmJ7a0Q6csE5cT', favourites: [
    {
        "title": "SaWaDiKa",
        "url": "https://open.spotify.com/track/1VWiDyYTrqQhhmnWANWkFa"
    },
    {
        "title": "FXCK UP THE WORLD",
        "url": "https://open.spotify.com/track/4rBRRLgdB9DYJhqA9uVcWt"
    },
    {
        "title": "Money",
        "url": "https://open.spotify.com/track/7hU3IHwjX150XLoTVmjD0q"
    },
    {
        "title": "Rockstar",
        "url": "https://open.spotify.com/track/6vvPecFTmWxDfEJ6cYT1wa"
    }
] },
  { id: 'radiohead', name: 'Radiohead', spotify: 'https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb', favourites: [
    { title: 'Let Down', url: 'https://open.spotify.com/track/2fuYa3Lx06QQJAm0MjztKr' },
    { title: 'Creep', url: 'https://open.spotify.com/track/70LcF31zb1H0PyJoS1Sx1r' },
    { title: 'Paranoid Android', url: 'https://open.spotify.com/track/6LgJvl0Xdtc73RJ1mmpotq' },
  ] },
];

export const allTimeFavourites = [
  { title: 'Perfect', artist: 'Ed Sheeran', url: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v' },
  { title: 'My Way', artist: 'Frank Sinatra', url: 'https://open.spotify.com/track/2YkIDPL5lGhRhomCq4S2RO' },
  { title: 'Creep', artist: 'Radiohead', url: 'https://open.spotify.com/track/70LcF31zb1H0PyJoS1Sx1r' },
  { title: 'Counting Stars', artist: 'OneRepublic', url: 'https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1' },
  { title: 'Winning Speech', artist: 'Karan Aujla', url: 'https://open.spotify.com/track/3FqtduiaqnFYvBgKuc6QWQ' },
];

// Add original writing when ready. Keep [] to show only the poetry collection.
// Each note: { title, category, date, body: ['Paragraph one.', 'Paragraph two.'] }
export const notes = [];

export const personal = {
  about: 'Mathematics, coding, and researching are where I spend much of my time. Music, philosophy, and literature are other ways I connect with the world. This is a place for all of those interests to meet.',
  currentReading: 'The Brothers Karamazov',
  currentListening: 'DAMN.',
  playlistUrl: 'https://open.spotify.com/playlist/1UistN5vmQ7dtyVOB7Xh4Q?si=bab2c23a5d754bf8',
};

// Keep collections alphabetical wherever they are displayed. New entries can
// be added above without manually maintaining their position on every page.
profile.seeking.sort(compareText);
projects.sort(compareBy('name'));
experience.sort(compareBy('company'));
community.sort(compareBy('organisation'));
for (const groups of [skills, courses]) {
  groups.sort(compareBy(0));
  for (const group of groups) group.splice(1, group.length - 1, ...group.slice(1).sort(compareText));
}
library.sort(compareBy('category'));
for (const group of library) group.entries.sort(compareText);
artists.sort(compareBy('name'));
for (const artist of artists) artist.favourites.sort(compareBy('title'));
allTimeFavourites.sort(compareBy('title'));
notes.sort(compareBy('title'));
