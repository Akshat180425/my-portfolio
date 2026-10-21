import { compareText } from '../utils/sort.mjs';

// Reading history and plans supplied by Akshat. Empty groups are not displayed.
// The current book is shown only for its author; the Now page remains the overview.
export const readingShelf = {
  'Dante Alighieri': {
    read: ['The Divine Comedy'],
    horizon: ['The Banquet', 'On Monarchy'],
  },
  'Franz Kafka': {
    read: ['The Metamorphosis', 'Before the Law'],
    horizon: ['The Trial'],
  },
  'Fyodor Dostoevsky': {
    read: ['White Nights', 'Notes from Underground'],
    current: ['The Brothers Karamazov'],
    horizon: ['The Idiot', 'Crime and Punishment'],
  },
  'George R. R. Martin': {
    collection: 'A Song of Ice and Fire',
    read: ['A Game of Thrones', 'A Clash of Kings', 'A Storm of Swords', 'A Feast for Crows', 'A Dance with Dragons'],
  },
  'Homer': {
    read: ['The Iliad'],
    horizon: ['The Odyssey'],
  },
  'Leo Tolstoy': {
    read: ['The Death of Ivan Ilyich'],
    horizon: ['Anna Karenina', 'War and Peace'],
  },
  'Miguel de Cervantes': {
    read: ['Don Quixote'],
    horizon: ['The Trials of Persiles and Sigismunda'],
  },
  'Oscar Wilde': {
    read: ["Lady Windermere’s Fan"],
    horizon: ['The Picture of Dorian Gray', 'The Canterville Ghost'],
  },
  'Sylvia Plath': {
    read: ['The Bell Jar'],
    horizon: ['Ariel'],
  },
  'William Shakespeare': {
    read: ['Julius Caesar'],
    horizon: ['Hamlet', 'Macbeth', 'Romeo and Juliet', 'A Midsummer Night’s Dream'],
  },
};

for (const shelf of Object.values(readingShelf)) {
  for (const group of ['read', 'current', 'horizon']) shelf[group]?.sort(compareText);
}

export const shelfSearchText = shelf => shelf
  ? [shelf.collection || '', ...(shelf.read || []), ...(shelf.current || []), ...(shelf.horizon || [])].join(' ')
  : '';
