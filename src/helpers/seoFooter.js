export const hasCorporateSection = sections =>
  !!sections.find(({ id }) => id === 'corporate-links');
