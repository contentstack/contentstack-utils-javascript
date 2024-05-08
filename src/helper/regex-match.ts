export function containsFigureTag(content: string): boolean {
  const openingTag = '<figure';
  const closingTag = '</figure>';
  const openingIndex = content.indexOf(openingTag);
  const closingIndex = content.indexOf(closingTag);
  return openingIndex !== -1 && closingIndex !== -1 && closingIndex > openingIndex;
}

export function matchFigureTag(content: string): string[] | null {
  const matches: string[] = [];
  const openingTag = '<figure';
  const closingTag = '</figure>';
  let startIndex = 0;
  while ((startIndex = content.indexOf(openingTag, startIndex)) !== -1) {
    const endIndex = content.indexOf(closingTag, startIndex);
    if (endIndex !== -1 && endIndex > startIndex) {
      matches.push(content.substring(startIndex, endIndex + closingTag.length));
      startIndex = endIndex + closingTag.length; 
    } else {
      console.error('Malformed figure tag found in content');
      break;
    }
  }
  return matches.length > 0 ? matches : null;
}

export function countFigureTags(content: string): number {
  const match = matchFigureTag(content);
  return match ? match.length : 0;
}
