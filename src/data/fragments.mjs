// Original words supplied by Akshat, without editorial titles.
// This shuffled order is saved so pagination remains consistent.
export const fragments = [
  {
    "slug": "nothing-wasted",
    "category": "Becoming",
    "text": "I cannot call my wail a gift, but I can refuse to let it be wasted."
  },
  {
    "slug": "room-with-boundaries",
    "category": "Self-respect",
    "text": "My heart still makes room for you, but my principles do not make excuses for what you did."
  },
  {
    "slug": "when-nothing-happens",
    "category": "Love & longing",
    "text": "Sometimes, nothing happens at all, and that is precisely what brings everything back."
  },
  {
    "slug": "keep-walking",
    "category": "Becoming",
    "text": "Keep walking, not because the road promises an end, but because your purpose deserves the effort."
  },
  {
    "slug": "a-prayer-for-her",
    "category": "Love & longing",
    "text": "When my eyes filled with tears, my only prayer was that hers would never have to."
  },
  {
    "slug": "unlived-tomorrows",
    "category": "Love & longing",
    "text": "It was never hard to accept that our tomorrows may not be together, but it was hard to let go of the tomorrows I had imagined."
  },
  {
    "slug": "the-measure-of-integrity",
    "category": "Self-respect",
    "text": "Success measures what you achieved; integrity measures what you refused to become in pursuit of it."
  },
  {
    "slug": "beyond-the-darkness",
    "category": "Becoming",
    "text": "I am not yet brave enough to trust the light, but I have begun to believe that the darkness is not all there is."
  },
  {
    "slug": "familiar-roads",
    "category": "Love & longing",
    "text": "My feet still know the way to places my life no longer has a reason to visit."
  },
  {
    "slug": "hope-accompanied",
    "category": "Becoming",
    "text": "There is still hope in me, but it no longer arrives alone. Fear has learned to accompany it."
  },
  {
    "slug": "a-quiet-prayer",
    "category": "Love & longing",
    "text": "I have asked the heavens for no grand miracle, only for the courage in your heart to become a little louder than the fear in your silence."
  },
  {
    "slug": "choose-your-fire",
    "category": "Becoming",
    "text": "Walk through the fire if you must, but first make certain the destination is yours, for the war within is worth more than the war you are a part of."
  },
  {
    "slug": "an-inward-flame",
    "category": "Becoming",
    "text": "If you wait, demanding a sunrise, when the world goes dark, you will never ignite the flame within you."
  },
  {
    "slug": "what-i-found",
    "category": "Becoming",
    "text": "If life ever asks what I gained from loving you, and speaks of what I lost; I will tell it whom I found, within myself."
  },
  {
    "slug": "once-a-home",
    "category": "Love & longing",
    "text": "I can make peace with not being your destination without pretending you were never my home."
  },
  {
    "slug": "a-distance-i-can-survive",
    "category": "Self-respect",
    "text": "I have learnt how to love you from a distance that my dignity can survive."
  },
  {
    "slug": "one-impossible-second",
    "category": "Love & longing",
    "text": "She moved a strand of hair, and for one impossible second, even eternity seemed to forget what it was meant to do."
  },
  {
    "slug": "learning-to-see",
    "category": "Love & longing",
    "text": "Perhaps I would have spent my life chasing moonlight, had your presence not taught my eyes what they were truly searching for."
  },
  {
    "slug": "two-kinds-of-waiting",
    "category": "Love & longing",
    "text": "You waited for the moon to emerge from the clouds, while I waited for you to turn toward me."
  },
  {
    "slug": "love-and-the-right-decision",
    "category": "Self-respect",
    "text": "Love may explain why I stayed; it does not obligate me to call staying the right decision."
  }
];

export const collectionSize = 6;
export const collectionPath = (kind, page = 1) => `/marginalia/${kind}/${page > 1 ? `page/${page}/` : ''}`;
export function fragmentPath(fragment) {
  return `${collectionPath('fragments', Math.floor(fragments.indexOf(fragment) / collectionSize) + 1)}#${fragment.slug}`;
}
