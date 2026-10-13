import { link } from '../components/ui.mjs';

export default function notFoundPage() {
  return `<section class="page-head wrap"><p class="eyebrow">404 / A missing page</p><h1>A little<br><em>off the shelf.</em></h1><p class="page-intro">This page isn’t here. There are plenty of other places to begin.</p>${link('/','Back to the beginning','button button-light')}</section>`;
}
