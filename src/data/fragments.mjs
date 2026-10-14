import { compareBy } from '../utils/sort.mjs';

// Original words supplied by Akshat. Titles organise the pieces; the text is unchanged.
export const fragments = [
  ['what-i-found', 'What I found', 'Becoming', 'If life ever asks what I gained from loving you, and speaks of what I lost; I will tell it who I found, within myself.'],
  ['unlived-tomorrows', 'Unlived tomorrows', 'Love & longing', 'It was never hard to accept that our tomorrows may not be together, but it was hard to let go of the tomorrows I had imagined.'],
  ['once-a-home', 'Once a home', 'Love & longing', 'I can make peace with not being your destination without pretending you were never my home.'],
  ['two-kinds-of-waiting', 'Two kinds of waiting', 'Love & longing', 'You waited for the moon to emerge from the clouds, while I waited for you to turn toward me.'],
  ['learning-to-see', 'Learning to see', 'Love & longing', 'Perhaps I would have spent my life chasing moonlight, had your presence not taught my eyes what they were truly searching for.'],
  ['a-quiet-prayer', 'A quiet prayer', 'Love & longing', 'I have asked the heavens for no grand miracle, only for the courage in your heart to become a little louder than the fear in your silence.'],
  ['peaceful-nights', 'Peaceful nights', 'Love & longing', 'I will make myself a stranger to your days if that is what it takes to keep your nights peaceful.'],
  ['hope-accompanied', 'Hope, accompanied', 'Becoming', 'There is still hope in me, but it no longer arrives alone. Fear has learned to accompany it.'],
  ['beyond-the-darkness', 'Beyond the darkness', 'Becoming', 'I am not yet brave enough to trust the light, but I have begun to believe that the darkness is not all there is.'],
  ['room-with-boundaries', 'Room, with boundaries', 'Self-respect', 'My heart still makes room for you, but my principles do not make excuses for what you did.'],
  ['a-distance-i-can-survive', 'A distance I can survive', 'Self-respect', 'I have learnt how to love you from a distance that my dignity can survive.'],
  ['love-and-the-right-decision', 'Love and the right decision', 'Self-respect', 'Love may explain why I stayed; it does not obligate me to call staying the right decision.'],
  ['the-cost-of-returning', 'The cost of returning', 'Self-respect', 'Let the world believe I lost you; I know what it cost me to stop losing myself.'],
  ['nothing-wasted', 'Nothing wasted', 'Becoming', 'I cannot call my wail a gift, but I can refuse to let it be wasted.'],
  ['when-nothing-happens', 'When nothing happens', 'Love & longing', 'Sometimes, nothing happens at all, and that is precisely what brings everything back.'],
  ['familiar-roads', 'Familiar roads', 'Love & longing', 'My feet still know the way to places my life no longer has a reason to visit.'],
  ['a-world-of-reminders', 'A world of reminders', 'Love & longing', 'I can distract my mind from missing you, but I cannot teach the world to stop reminding me that you were here.'],
  ['keep-walking', 'Keep walking', 'Becoming', 'Keep walking, not because the road promises an end, but because your purpose deserves the effort.'],
  ['choose-your-fire', 'Choose your fire', 'Becoming', 'Walk through the fire if you must, but first make certain the destination is yours, for the war within is worth more than the war you are a part of.'],
  ['an-inward-flame', 'An inward flame', 'Becoming', 'If you wait, demanding a sunrise, when the world goes dark, you will never ignite the flame within you.'],
  ['the-measure-of-integrity', 'The measure of integrity', 'Self-respect', 'Success measures what you achieved; integrity measures what you refused to become in pursuit of it.'],
  ['one-impossible-second', 'One impossible second', 'Love & longing', 'She moved a strand of hair, and for one impossible second, even eternity seemed to forget what it was meant to do.'],
  ['a-prayer-for-her', 'A prayer for her', 'Love & longing', 'When my eyes filled with tears, my only prayer was that hers would never have to.'],
].map(([slug, title, category, text]) => ({ slug, title, category, text })).sort(compareBy('title'));

export const collectionSize = 4;
export const collectionPath = (kind, page = 1) => `/marginalia/${kind}/${page > 1 ? `page/${page}/` : ''}`;
export function fragmentPath(fragment) {
  return `${collectionPath('fragments', Math.floor(fragments.indexOf(fragment) / collectionSize) + 1)}#${fragment.slug}`;
}
