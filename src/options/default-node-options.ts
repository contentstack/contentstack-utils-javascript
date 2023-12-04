import { Next, RenderOption } from ".";
import MarkType from "../nodes/mark-type";
import Node from "../nodes/node";
import NodeType from "../nodes/node-type";

export const defaultNodeOption: RenderOption = {
    [NodeType.DOCUMENT]:(node: Node) => {
        return ``
    },
    [NodeType.PARAGRAPH]:(node: Node, next: Next) => {
        return `<p${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</p>`
    },
    [NodeType.LINK]:(node: Node, next: Next) => {
        if (node.attrs.target) {
            return `<a${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} href="${node.attrs.href || node.attrs.url}" target="${node.attrs.target}">${next(node.children)}</a>`   
        }
         return `<a${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} href="${node.attrs.href || node.attrs.url}">${next(node.children)}</a>`
    },
    [NodeType.IMAGE]:(node: Node, next: Next) => {
        return `<img${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} src="${node.attrs.src || node.attrs.url}" />${next(node.children)}`
    },
    [NodeType.EMBED]:(node: Node, next: Next) => {
        return `<iframe${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} src="${node.attrs.src || node.attrs.url}">${next(node.children)}</iframe>`
    },
    [NodeType.HEADING_1]:(node: Node, next: Next) => {
        return `<h1${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</h1>`
    },
    [NodeType.HEADING_2]:(node: Node, next: Next) => {
        return `<h2${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</h2>`
    },
    [NodeType.HEADING_3]:(node: Node, next: Next) => {
        return `<h3${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</h3>`
    },
    [NodeType.HEADING_4]:(node: Node, next: Next) => {
        return `<h4${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</h4>`
    },
    [NodeType.HEADING_5]:(node: Node, next: Next) => {
        return `<h5${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</h5>`
    },
    [NodeType.HEADING_6]:(node: Node, next: Next) => {
        return `<h6${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</h6>`
    },
    [NodeType.ORDER_LIST]:(node: Node, next: Next) => {
        return `<ol${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</ol>`
    },
    [NodeType.UNORDER_LIST]:(node: Node, next: Next) => {
        return `<ul${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</ul>`
    },
    [NodeType.LIST_ITEM]:(node: Node, next: Next) => {
        return `<li${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</li>`
    },
    [NodeType.HR]:(node: Node, next: Next) => {
        return `<hr>`
    },
    [NodeType.TABLE]:(node: Node, next: Next) => {
        return `<table${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</table>`
    },
    [NodeType.TABLE_HEADER]:(node: Node, next: Next) => {
        return `<thead${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</thead>`
    },
    [NodeType.TABLE_BODY]:(node: Node, next: Next) => {
        return `<tbody${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</tbody>`
    },
    [NodeType.TABLE_FOOTER]:(node: Node, next: Next) => {
        return `<tfoot${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</tfoot>`
    },
    [NodeType.TABLE_ROW]:(node: Node, next: Next) => {
        return `<tr${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</tr>`
    },
    [NodeType.TABLE_HEAD]:(node: Node, next: Next) => {
        return `<th${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</th>`
    },
    [NodeType.TABLE_DATA]:(node: Node, next: Next) => {
        return `<td${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</td>`
    },
    [NodeType.BLOCK_QUOTE]:(node: Node, next: Next) => {
        return `<blockquote${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</blockquote>`
    },
    [NodeType.CODE]:(node: Node, next: Next) => {
        return `<code${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``}>${next(node.children)}</code>`
    },

    ['reference']:(node: Node, next: Next) => {
        if (node.attrs.type === 'asset') {
            return `<img${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs.class ? ` class="${node.attrs.class}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} src="${node.attrs['asset-link']}" />`
        }
        return ``
    },
    ['default']:(node: Node, next: Next) => {
        return next(node.children)
    },

    [MarkType.BOLD]:(text: string, classname?: string) => {
        return `<strong>${text}</strong>`
    },
    [MarkType.ITALIC]:(text: string) => {
        return `<em>${text}</em>`
    },
    [MarkType.UNDERLINE]:(text: string) => {
        return `<u>${text}</u>`
    },
    [MarkType.STRIKE_THROUGH]:(text: string) => {
        return `<strike>${text}</strike>`
    },
    [MarkType.INLINE_CODE]:(text: string) => {
        return `<span>${text}</span>`
    },
    [MarkType.SUBSCRIPT]:(text: string) => {
        return `<sub>${text}</sub>`
    },
    [MarkType.SUPERSCRIPT]:(text: string) => {
        return `<sup>${text}</sup>`
    },
    [MarkType.BREAK]:(text: string) => {
        return `<br />${text}`
    },
    [MarkType.CLASSNAME_OR_ID]:(text: string, classname: string, id:string) => {
        return `<span${classname ? ` class="${classname}"` : ``}${id ? ` id="${id}"` : ``}>${text}</span>`
    }

}
