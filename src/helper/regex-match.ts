const FigureTagRegex = /<\s*figure[^>]*>([^]*?)<\s*\/\s*figure>/g;

export function containsFigureTag(content: string): boolean {
  return countFigureTags(content) > 0;
}

export function matchFigureTag(content: string): RegExpMatchArray {
  return content.match(FigureTagRegex);
}

export function countFigureTags(content: string): number {
  const match = matchFigureTag(content);
  return match ? match.length : 0;
}
