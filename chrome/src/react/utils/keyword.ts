export const normalizeKeywords = (keywords: string): string[] => {
  return keywords
    .replace(/\u3000/g, ' ')
    .split(' ')
    .filter(keyword => keyword !== '');
};
