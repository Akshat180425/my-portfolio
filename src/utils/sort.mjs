// Sort displayed names consistently, without changing prose or poem lines.
const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });
export const compareText = (a, b) => collator.compare(a, b);
export const compareBy = key => (a, b) => compareText(a[key], b[key]);
