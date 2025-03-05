
type AllowedTags = 'p' | 'a' | 'strong' | 'em' | 'ul' | 'ol' | 'li' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'sub' | 'u' | 'table' | 'thead' | 'tbody' | 'tr' | 'th' | 'td' | 'span' | 'fragment' | 'strike' | 'sup' | 'br'| 'img' | 'colgroup' | 'col' | 'div';
type AllowedAttributes = 'href' | 'title' | 'target' | 'alt' | 'src' | 'class' | 'id' | 'style' | 'colspan' | 'rowspan' | 'content-type-uid' | 'data-sys-asset-uid' | 'sys-style-type' | 'data-type' | 'data-width' | 'data-rows' | 'data-cols' | 'data-mtec';

export function sanitizeHTML(input: string, allowedTags: AllowedTags[] = ['p', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sub', 'u', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span', 'fragment', 'sup', 'strike', 'br', 'img', 'colgroup', 'col', 'div'], allowedAttributes: AllowedAttributes[] = ['href', 'title', 'target', 'alt', 'src', 'class', 'id', 'style', 'colspan', 'rowspan', 'content-type-uid', 'data-sys-asset-uid', 'sys-style-type', 'data-type', 'data-width', 'data-rows', 'data-cols', 'data-mtec']): string {
    
    // Replace newline characters with <br /> before processing the HTML tags
    input = input.replace(/\n/g, '<br />');

    // Regular expression to find and remove all HTML tags except the allowed ones
    const sanitized = input.replace(/<\/?([a-z][a-z0-9]*)\b[^<>]*>/gi, (match, tag) => {
        return allowedTags.includes(tag.toLowerCase()) ? match : '';
    });

    // Regular expression to remove all attributes except the allowed ones
    const cleaned = sanitized.replace(/<([a-z][a-z0-9]*)\b[^<>]*>/gi, (match, tag) => {
        if (!allowedTags.includes(tag.toLowerCase())) {
            return match; // Ignore tags not in allowedTags
        }
        // For each tag that is allowed, clean its attributes
        return match.replace(/\s([a-z\-]+)=['"][^'"]*['"]/gi, (attributeMatch, attribute) => {
            return allowedAttributes.includes(attribute.toLowerCase()) ? attributeMatch : '';
        });
    });
    return cleaned;
}