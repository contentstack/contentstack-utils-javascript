
type AllowedTags = 'p' | 'a' | 'strong' | 'em' | 'ul' | 'ol' | 'li';
type AllowedAttributes = 'href' | 'title' | 'target' | 'alt' | 'src';

export function sanitizeHTML(input: string, allowedTags: AllowedTags[] = ['p', 'a', 'strong', 'em', 'ul', 'ol', 'li'], allowedAttributes: AllowedAttributes[] = ['href', 'title', 'target']): string {
    // Regular expression to find and remove all HTML tags except the allowed ones
    const sanitized = input.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, (match, tag) => {
        return allowedTags.includes(tag.toLowerCase()) ? match : '';
    });

    // Regular expression to remove all attributes except the allowed ones
    const cleaned = sanitized.replace(/\s([a-z:]+)=['"][^'"]*['"]/gi, (match, attribute) => {
        return allowedAttributes.includes(attribute.toLowerCase()) ? match : '';
    });

    return cleaned;
}

