import home from './home.mjs';
import about from './about.mjs';
import experiencePage from './experience.mjs';
import projectsPage from './projects.mjs';
import libraryPage from './library.mjs';
import listeningPage from './listening-room.mjs';
import marginaliaPage from './marginalia.mjs';
import nowPage from './now.mjs';
import contactPage from './contact.mjs';

export const pageRenderers = {
  'home': home,
  'about': about,
  'experience': experiencePage,
  'projects': projectsPage,
  'library': libraryPage,
  'listening-room': listeningPage,
  'marginalia': marginaliaPage,
  'now': nowPage,
  'contact': contactPage,
};
