// Canonical URL includes the project path on GitHub Pages.
export const origin = (process.env.SITE_ORIGIN || 'https://akshat180425.github.io/my-portfolio').replace(/\/$/, '');
// Local builds use root URLs; GitHub Pages builds set /my-portfolio.
export const basePath = (process.env.SITE_BASE_PATH || '').replace(/\/$/, '');
if (basePath && !/^(\/[a-zA-Z0-9._~-]+)+$/.test(basePath)) {
  throw new Error('SITE_BASE_PATH must be a URL path such as /my-portfolio.');
}

export const pages = [
  ['home','Home','An open door.'], ['about','About','A little context.'], ['experience','Experience','Learning in practice.'],
  ['projects','Projects','Things I’ve built.'], ['library','Library','Books, ideas & old worlds.'],
  ['listening-room','Listening Room','A different kind of language.'], ['marginalia','Marginalia','Notes from the margins.'],
  ['now','Now','The present chapter.'], ['contact','Contact','A conversation, perhaps.'],
];
export const route = id => id==='home' ? '/' : `/${id}/`;
