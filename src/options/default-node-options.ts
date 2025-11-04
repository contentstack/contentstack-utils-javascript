import { Next, RenderOption } from ".";
import MarkType from "../nodes/mark-type";
import Node from "../nodes/node";
import NodeType from "../nodes/node-type";
import { sanitizeHTML } from "../helper/sanitize";

/**
 * Safely gets an attribute value from node.attrs
 */
function getAttr(node: Node, key: string): unknown {
    return node.attrs?.[key];
}

/**
 * Safely gets a string attribute value from node.attrs
 */
function getAttrString(node: Node, key: string): string | undefined {
    const value = node.attrs?.[key];
    return typeof value === 'string' ? value : undefined;
}

/**
 * Builds common HTML attributes string (style, class-name, id)
 */
function buildCommonAttrs(node: Node): string {
    if (!node.attrs) return '';
    
    const attrs: string[] = [];
    if (node.attrs.style) {
        attrs.push(` style="${node.attrs.style}"`);
    }
    if (node.attrs['class-name']) {
        attrs.push(` class="${node.attrs['class-name']}"`);
    }
    if (node.attrs.id) {
        attrs.push(` id="${node.attrs.id}"`);
    }
    return attrs.join('');
}

export const defaultNodeOption: RenderOption = {
    [NodeType.DOCUMENT]:() => {
        return ``
    },
    [NodeType.PARAGRAPH]:(node: Node, next: Next) => {
        return `<p${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</p>`
    },
    [NodeType.LINK]:(node: Node, next: Next) => {
        const href = getAttrString(node, 'href') || getAttrString(node, 'url') || '';
        const sanitizedHref = sanitizeHTML(href);
        const target = getAttrString(node, 'target');
        const targetAttr = target ? ` target="${target}"` : '';
        return `<a${buildCommonAttrs(node)} href="${sanitizedHref}"${targetAttr}>${sanitizeHTML(next(node.children))}</a>`
    },
    [NodeType.IMAGE]:(node: Node, next: Next) => {
        const src = getAttrString(node, 'src') || getAttrString(node, 'url');
        const sanitizedSrc = src ? encodeURI(sanitizeHTML(src)) : '';
        return `<img${buildCommonAttrs(node)}${sanitizedSrc ? ` src="${sanitizedSrc}"` : ''} />${sanitizeHTML(next(node.children))}`
    },
    [NodeType.EMBED]:(node: Node, next: Next) => {
        const src = getAttrString(node, 'src') || getAttrString(node, 'url');
        const sanitizedSrc = src ? encodeURI(sanitizeHTML(src)) : '';
        return `<iframe${buildCommonAttrs(node)}${sanitizedSrc ? ` src="${sanitizedSrc}"` : ''}>${sanitizeHTML(next(node.children))}</iframe>`
    },
    [NodeType.HEADING_1]:(node: Node, next: Next) => {
        return `<h1${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</h1>`
    },
    [NodeType.HEADING_2]:(node: Node, next: Next) => {
        return `<h2${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</h2>`
    },
    [NodeType.HEADING_3]:(node: Node, next: Next) => {
        return `<h3${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</h3>`
    },
    [NodeType.HEADING_4]:(node: Node, next: Next) => {
        return `<h4${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</h4>`
    },
    [NodeType.HEADING_5]:(node: Node, next: Next) => {
        return `<h5${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</h5>`
    },
    [NodeType.HEADING_6]:(node: Node, next: Next) => {
        return `<h6${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</h6>`
    },
    [NodeType.ORDER_LIST]:(node: Node, next: Next) => {
        return `<ol${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</ol>`
    },
    [NodeType.FRAGMENT]:(node: Node, next: Next) => {
        return `<fragment>${sanitizeHTML(next(node.children))}</fragment>`
    },
    [NodeType.UNORDER_LIST]:(node: Node, next: Next) => {
        return `<ul${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</ul>`
    },
    [NodeType.LIST_ITEM]:(node: Node, next: Next) => {
        return `<li${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</li>`
    },
    [NodeType.HR]:() => {
        return `<hr>`
    },
    [NodeType.TABLE]: (node: Node, next: Next) => {
        // Generate colgroup if colWidths attribute is present
        let colgroupHTML = '';
        const colWidths = getAttr(node, 'colWidths');
        if (colWidths && Array.isArray(colWidths)) {
            const totalWidth = colWidths.reduce((sum: number, width: number) => sum + width, 0);
            colgroupHTML = `<${NodeType.COL_GROUP} data-width="${totalWidth}">`;
            colWidths.forEach((colWidth: number) => {
                const widthPercentage = (colWidth / totalWidth) * 100;
                colgroupHTML += `<${NodeType.COL} style="width:${widthPercentage.toFixed(2)}%"/>`;
            });
            colgroupHTML += `</${NodeType.COL_GROUP}>`;
        }
    
        // Generate table with colgroup and other attributes
        return `<table${buildCommonAttrs(node)}>${colgroupHTML}${sanitizeHTML(next(node.children))}</table>`;
    },
    [NodeType.TABLE_HEADER]:(node: Node, next: Next) => {
        return `<thead${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</thead>`
    },
    [NodeType.TABLE_BODY]:(node: Node, next: Next) => {
        return `<tbody${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</tbody>`
    },
    [NodeType.TABLE_FOOTER]:(node: Node, next: Next) => {
        return `<tfoot${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</tfoot>`
    },
    [NodeType.TABLE_ROW]:(node: Node, next: Next) => {
        return `<tr${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</tr>`
    },
    [NodeType.TABLE_HEAD]:(node: Node, next: Next) => {
        if (getAttr(node, 'void')) return '';

        const rowSpan = getAttr(node, 'rowSpan');
        const colSpan = getAttr(node, 'colSpan');
        const rowSpanAttr = rowSpan ? ` rowspan="${rowSpan}"` : '';
        const colSpanAttr = colSpan ? ` colspan="${colSpan}"` : '';
        
        return `<th${rowSpanAttr}${colSpanAttr}${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</th>`
    },
    [NodeType.TABLE_DATA]:(node: Node, next: Next) => {
        if (getAttr(node, 'void')) return '';

        const rowSpan = getAttr(node, 'rowSpan');
        const colSpan = getAttr(node, 'colSpan');
        const rowSpanAttr = rowSpan ? ` rowspan="${rowSpan}"` : '';
        const colSpanAttr = colSpan ? ` colspan="${colSpan}"` : '';
        
        return `<td${rowSpanAttr}${colSpanAttr}${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</td>`
    },
    [NodeType.BLOCK_QUOTE]:(node: Node, next: Next) => {
        return `<blockquote${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</blockquote>`
    },
    [NodeType.CODE]:(node: Node, next: Next) => {
        return `<code${buildCommonAttrs(node)}>${sanitizeHTML(next(node.children))}</code>`
    },

    ['reference']:(node: Node, next: Next) => {
        const type = getAttr(node, 'type');
        const displayType = getAttr(node, 'display-type');
        
        if ((type === 'entry' || type === 'asset') && displayType === 'link'){
            const href = getAttrString(node, 'href') || getAttrString(node, 'url') || '';
            const target = getAttrString(node, 'target');
            const assetUid = getAttrString(node, 'asset-uid');
            
            let aTagAttrs = buildCommonAttrs(node);
            aTagAttrs += ` href="${href}"`;
            if (target) {
                aTagAttrs += ` target="${target}"`;
            }
            if (type === 'asset') {
                aTagAttrs += ` type="asset" content-type-uid="sys_assets"`;
                if (assetUid) {
                    aTagAttrs += ` data-sys-asset-uid="${assetUid}"`;
                }
                aTagAttrs += ` sys-style-type="download"`;
            }
            return `<a${aTagAttrs}>${sanitizeHTML(next(node.children))}</a>`;
        }
        
        if (type === 'asset') {
            const assetLink = getAttrString(node, 'asset-link');
            const src = assetLink ? encodeURI(assetLink) : '';
            const redactorAttrs = getAttr(node, 'redactor-attributes') as Record<string, unknown> | undefined;
            const alt = redactorAttrs?.['alt'] as string | undefined;
            const link = getAttrString(node, 'link');
            const target = getAttrString(node, 'target') || "";
            const caption = (redactorAttrs?.['asset-caption'] as string | undefined) || getAttrString(node, 'asset-caption') || "";
            const style = getAttrString(node, 'style');
            const assetUid = getAttrString(node, 'asset-uid');
            const className = getAttrString(node, 'class-name');

            const assetUidAttr = assetUid ? ` asset_uid="${assetUid}"` : '';
            const classAttr = className ? ` class="${sanitizeHTML(className)}"` : '';
            const srcAttr = src ? ` src="${sanitizeHTML(src)}"` : '';
            const altAttr = alt ? ` alt="${alt}"` : '';
            const targetAttr = target === "_blank" ? ` target="_blank"` : '';
            const styleAttr = style ? ` style="${style}"` : '';
            
            const imageTag = `<img${assetUidAttr}${classAttr}${srcAttr}${altAttr}${targetAttr}${styleAttr} />`;
            const styleAttrFig = style ? ` style="${style}"` : '';

            return `<figure${styleAttrFig}>` +
                    (link ? `<a href="${link}" target="${target || ""}">` : "") +
                    imageTag +
                    (link ? `</a>` : "") +
                    (caption ? `<figcaption>${caption}</figcaption>` : "") +
                    `</figure>`;
        }
        return ``
    },
    ['default']:(node: Node, next: Next) => {
        return sanitizeHTML(next(node.children))
    },

    [MarkType.BOLD]:(text: string) => {
        return `<strong>${sanitizeHTML(text)}</strong>`
    },
    [MarkType.ITALIC]:(text: string) => {
        return `<em>${sanitizeHTML(text)}</em>`
    },
    [MarkType.UNDERLINE]:(text: string) => {
        return `<u>${sanitizeHTML(text)}</u>`
    },
    [MarkType.STRIKE_THROUGH]:(text: string) => {
        return `<strike>${sanitizeHTML(text)}</strike>`
    },
    [MarkType.INLINE_CODE]:(text: string) => {
        return `<span data-type='inlineCode'>${sanitizeHTML(text)}</span>`
    },
    [MarkType.SUBSCRIPT]:(text: string) => {
        return `<sub>${sanitizeHTML(text)}</sub>`
    },
    [MarkType.SUPERSCRIPT]:(text: string) => {
        return `<sup>${sanitizeHTML(text)}</sup>`
    },
    [MarkType.BREAK]:(text: string) => {
        // Check if text is only newlines (which will be converted to <br /> by sanitizeHTML)
        // If so, don't add an extra <br /> to avoid duplication
        const onlyNewlines = /^\n+$/.test(text);
        if (onlyNewlines) {
            return sanitizeHTML(text);
        }
        return `<br />${sanitizeHTML(text)}`
    },
    [MarkType.CLASSNAME_OR_ID]:(text: string, classname: string, id:string) => {
        return `<span${classname ? ` class="${classname}"` : ``}${id ? ` id="${id}"` : ``}>${sanitizeHTML(text)}</span>`
    }

}
