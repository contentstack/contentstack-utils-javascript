import { Next, RenderOption } from ".";
import MarkType from "../nodes/mark-type";
import Node from "../nodes/node";
import NodeType from "../nodes/node-type";
import { sanitizeHTML } from "../helper/sanitize";

export const defaultNodeOption: RenderOption = {
    [NodeType.DOCUMENT]:(node: Node) => {
        return ``
    },
    [NodeType.PARAGRAPH]:(node: Node, next: Next) => {
        return `<p${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</p>`
    },
    [NodeType.LINK]:(node: Node, next: Next) => {
        const sanitizedHref = sanitizeHTML(node.attrs.href || node.attrs.url);
        if (node.attrs.target) {
            return `<a${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} href="${sanitizedHref}" target="${node.attrs.target}">${sanitizeHTML(next(node.children))}</a>`
        }
        return `<a${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} href="${sanitizedHref}">${sanitizeHTML(next(node.children))}</a>`
    },
    [NodeType.IMAGE]:(node: Node, next: Next) => {
        const sanitizedSrc = encodeURI(sanitizeHTML(node.attrs.src || node.attrs.url));
        return `<img${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} src="${sanitizedSrc}" />${sanitizeHTML(next(node.children))}`
    },
    [NodeType.EMBED]:(node: Node, next: Next) => {
        const sanitizedSrc = encodeURI(sanitizeHTML(node.attrs.src || node.attrs.url));
        return `<iframe${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} src="${sanitizedSrc}">${sanitizeHTML(next(node.children))}</iframe>`
    },
    [NodeType.HEADING_1]:(node: Node, next: Next) => {
        return `<h1${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</h1>`
    },
    [NodeType.HEADING_2]:(node: Node, next: Next) => {
        return `<h2${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</h2>`
    },
    [NodeType.HEADING_3]:(node: Node, next: Next) => {
        return `<h3${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</h3>`
    },
    [NodeType.HEADING_4]:(node: Node, next: Next) => {
        return `<h4${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</h4>`
    },
    [NodeType.HEADING_5]:(node: Node, next: Next) => {
        return `<h5${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</h5>`
    },
    [NodeType.HEADING_6]:(node: Node, next: Next) => {
        return `<h6${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</h6>`
    },
    [NodeType.ORDER_LIST]:(node: Node, next: Next) => {
        return `<ol${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</ol>`
    },
    [NodeType.FRAGMENT]:(node: Node, next: Next) => {
        return `<fragment>${sanitizeHTML(next(node.children))}</fragment>`
    },
    [NodeType.UNORDER_LIST]:(node: Node, next: Next) => {
        return `<ul${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</ul>`
    },
    [NodeType.LIST_ITEM]:(node: Node, next: Next) => {
        return `<li${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</li>`
    },
    [NodeType.HR]:(node: Node, next: Next) => {
        return `<hr>`
    },
    [NodeType.TABLE]: (node: Node, next: Next) => {
        // Generate colgroup if colWidths attribute is present
        let colgroupHTML = '';
        if (node.attrs.colWidths && Array.isArray(node.attrs.colWidths)) {
            const totalWidth = node.attrs.colWidths.reduce((sum, width) => sum + width, 0);
            colgroupHTML = `<${NodeType.COL_GROUP} data-width="${totalWidth}">`;
            node.attrs.colWidths.forEach(colWidth => {
                const widthPercentage = (colWidth / totalWidth) * 100;
                colgroupHTML += `<${NodeType.COL} style="width:${widthPercentage.toFixed(2)}%"/>`;
            });
            colgroupHTML += `</${NodeType.COL_GROUP}>`;
        }
    
        // Generate table with colgroup and other attributes
        return `<table${node.attrs.style ? ` style="${node.attrs.style}"` : ``}` +
               `${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}` +
               `${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>` +
               `${colgroupHTML}` +
               `${sanitizeHTML(next(node.children))}` +
               `</table>`;
    },
    [NodeType.TABLE_HEADER]:(node: Node, next: Next) => {
        return `<thead${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</thead>`
    },
    [NodeType.TABLE_BODY]:(node: Node, next: Next) => {
        return `<tbody${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</tbody>`
    },
    [NodeType.TABLE_FOOTER]:(node: Node, next: Next) => {
        return `<tfoot${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</tfoot>`
    },
    [NodeType.TABLE_ROW]:(node: Node, next: Next) => {
        return `<tr${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</tr>`
    },
    [NodeType.TABLE_HEAD]:(node: Node, next: Next) => {
        if (node.attrs.void) return '';

        return `<th` +
                `${node.attrs.rowSpan ? ` rowspan="${node.attrs.rowSpan}"` : ``}` +
                `${node.attrs.colSpan ? ` colspan="${node.attrs.colSpan}"` : ``}` +
                `${node.attrs.style ? ` style="${node.attrs.style}"` : ``}`+
                `${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}`+
                `${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}` +
                `</th>`
    },
    [NodeType.TABLE_DATA]:(node: Node, next: Next) => {
        if (node.attrs.void) return '';

        return `<td` +
                `${node.attrs.rowSpan ? ` rowspan="${node.attrs.rowSpan}"` : ``}` +
                `${node.attrs.colSpan ? ` colspan="${node.attrs.colSpan}"` : ``}` +
                `${node.attrs.style ? ` style="${node.attrs.style}"` : ``}`+
                `${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}`+
                `${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}` +
                `</td>`
    },
    [NodeType.BLOCK_QUOTE]:(node: Node, next: Next) => {
        return `<blockquote${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</blockquote>`
    },
    [NodeType.CODE]:(node: Node, next: Next) => {
        return `<code${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${sanitizeHTML(next(node.children))}</code>`
    },

    ['reference']:(node: Node, next: Next) => {
        if ((node.attrs.type === 'entry' || node.attrs.type === 'asset') && node.attrs['display-type'] === 'link'){
            let aTagAttrs = `${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} href="${node.attrs.href || node.attrs.url}"`;
            if (node.attrs.target) {
            aTagAttrs +=` target="${node.attrs.target}"`;
            }
            if(node.attrs.type == 'asset') {
            aTagAttrs += ` type="asset" content-type-uid="sys_assets" ${node.attrs['asset-uid'] ? `data-sys-asset-uid="${node.attrs['asset-uid']}"` : ``} sys-style-type="download"`
            }
            const aTag = `<a${aTagAttrs}>${sanitizeHTML(next(node.children))}</a>`;
            return aTag;
        }
        if (node.attrs.type === 'asset') {
            const src = encodeURI(node.attrs['asset-link']);
            const alt = node.attrs?.['redactor-attributes']?.['alt'];
            const link = node.attrs.link;
            const target = node.attrs.target || "";
            const caption = node.attrs?.['redactor-attributes']?.['asset-caption'] || node.attrs?.['asset-caption'] || "";
            const style = node.attrs.style;
            const asset_uid= node.attrs['asset-uid'];

            let imageTag = `<img${asset_uid ? ` asset_uid="${asset_uid}"` : `` }${node.attrs['class-name'] ? ` class="${sanitizeHTML(node.attrs['class-name'])}"`: ``}${src ? ` src="${sanitizeHTML(src)}"` : ``}${alt ? ` alt="${alt}"` : `` }${target === "_blank" ? ` target="_blank"` : `` }${style ? ` style="${style}"` : `` } />`;

            return `<figure${style ? ` style="${style}"` : ''}>` +
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
