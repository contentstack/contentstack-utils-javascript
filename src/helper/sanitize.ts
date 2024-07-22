
type AllowedTags = 'p' | 'a' | 'strong' | 'em' | 'ul' | 'ol' | 'li' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'sub' | 'u' | 'table' | 'thead' | 'tbody' | 'tr' | 'th' | 'td' | 'span'|'fragment'|'strike'|'sup'|'br';
type AllowedAttributes = 'href' | 'title' | 'target' | 'alt' | 'src' | 'class' | 'id' | 'style';

export function sanitizeHTML(input: string, allowedTags: AllowedTags[] = ['p', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sub', 'u', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span','fragment','sup','strike','br'], allowedAttributes: AllowedAttributes[] = ['href', 'title', 'target', 'alt', 'src', 'class', 'id', 'style']): string {
    // Regular expression to find and remove all HTML tags except the allowed ones
    const sanitized = input.replace(/<\/?([a-z][a-z0-9]*)\b[^<>]*>/gi, (match, tag) => {
        return allowedTags.includes(tag.toLowerCase()) ? match : '';
    });

    // Regular expression to remove all attributes except the allowed ones
    const cleaned = sanitized.replace(/\s([a-z:]+)=['"][^'"]*['"]/gi
    , (match, attribute) => {
        return allowedAttributes.includes(attribute.toLowerCase()) ? match : '';
    });

    return cleaned;
}

