import { Next, RenderOption } from ".";
import MarkType from "../nodes/mark-type";
import Node from "../nodes/node";
import NodeType from "../nodes/node-type";

export const defaultNodeOption: RenderOption = {
    [NodeType.DOCUMENT]:(node: Node) => {
        return ``
    },
    [NodeType.PARAGRAPH]:(node: Node, next: Next) => {
        return `<p${addStyleAttrs(node.attrs.style)}>${next(node.children)}</p>`
    },
    [NodeType.LINK]:(node: Node, next: Next) => {
        if (node.attrs.target) {
            return `<a${addStyleAttrs(node.attrs.style)} href="${node.attrs.href || node.attrs.url}" target="${node.attrs.target}">${next(node.children)}</a>`   
        }
         return `<a${addStyleAttrs(node.attrs.style)} href="${node.attrs.href || node.attrs.url}">${next(node.children)}</a>`
    },
    [NodeType.IMAGE]:(node: Node, next: Next) => {
        return `<img${addStyleAttrs(node.attrs.style)} src="${node.attrs.src || node.attrs.url}" />${next(node.children)}`
    },
    [NodeType.EMBED]:(node: Node, next: Next) => {
        return `<iframe${addStyleAttrs(node.attrs.style)} src="${node.attrs.src || node.attrs.url}">${next(node.children)}</iframe>`
    },
    [NodeType.HEADING_1]:(node: Node, next: Next) => {
        return `<h1${addStyleAttrs(node.attrs.style)}>${next(node.children)}</h1>`
    },
    [NodeType.HEADING_2]:(node: Node, next: Next) => {
        return `<h2${addStyleAttrs(node.attrs.style)}>${next(node.children)}</h2>`
    },
    [NodeType.HEADING_3]:(node: Node, next: Next) => {
        return `<h3${addStyleAttrs(node.attrs.style)}>${next(node.children)}</h3>`
    },
    [NodeType.HEADING_4]:(node: Node, next: Next) => {
        return `<h4${addStyleAttrs(node.attrs.style)}>${next(node.children)}</h4>`
    },
    [NodeType.HEADING_5]:(node: Node, next: Next) => {
        return `<h5${addStyleAttrs(node.attrs.style)}>${next(node.children)}</h5>`
    },
    [NodeType.HEADING_6]:(node: Node, next: Next) => {
        return `<h6${addStyleAttrs(node.attrs.style)}>${next(node.children)}</h6>`
    },
    [NodeType.ORDER_LIST]:(node: Node, next: Next) => {
        return `<ol${addStyleAttrs(node.attrs.style)}>${next(node.children)}</ol>`
    },
    [NodeType.UNORDER_LIST]:(node: Node, next: Next) => {
        return `<ul${addStyleAttrs(node.attrs.style)}>${next(node.children)}</ul>`
    },
    [NodeType.LIST_ITEM]:(node: Node, next: Next) => {
        return `<li${addStyleAttrs(node.attrs.style)}>${next(node.children)}</li>`
    },
    [NodeType.HR]:(node: Node, next: Next) => {
        return `<hr>`
    },
    [NodeType.TABLE]:(node: Node, next: Next) => {
        return `<table${addStyleAttrs(node.attrs.style)}>${next(node.children)}</table>`
    },
    [NodeType.TABLE_HEADER]:(node: Node, next: Next) => {
        return `<thead${addStyleAttrs(node.attrs.style)}>${next(node.children)}</thead>`
    },
    [NodeType.TABLE_BODY]:(node: Node, next: Next) => {
        return `<tbody${addStyleAttrs(node.attrs.style)}>${next(node.children)}</tbody>`
    },
    [NodeType.TABLE_FOOTER]:(node: Node, next: Next) => {
        return `<tfoot${addStyleAttrs(node.attrs.style)}>${next(node.children)}</tfoot>`
    },
    [NodeType.TABLE_ROW]:(node: Node, next: Next) => {
        return `<tr${addStyleAttrs(node.attrs.style)}>${next(node.children)}</tr>`
    },
    [NodeType.TABLE_HEAD]:(node: Node, next: Next) => {
        return `<th${addStyleAttrs(node.attrs.style)}>${next(node.children)}</th>`
    },
    [NodeType.TABLE_DATA]:(node: Node, next: Next) => {
        return `<td${addStyleAttrs(node.attrs.style)}>${next(node.children)}</td>`
    },
    [NodeType.BLOCK_QUOTE]:(node: Node, next: Next) => {
        return `<blockquote>${next(node.children)}</blockquote>`
    },
    [NodeType.CODE]:(node: Node, next: Next) => {
        return `<code>${next(node.children)}</code>`
    },

    ['reference']:(node: Node, next: Next) => {
        if (node.attrs['type'] === 'asset') {
            return `<img${addStyleAttrs(node.attrs.style)} src="${node.attrs['asset-link']}" />`
        }
        return ``
    },
    ['default']:(node: Node, next: Next) => {
        return next(node.children)
    },

    [MarkType.BOLD]:(text: string) => {
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

}

export default function addStyleAttrs(styleObj: { [key: string]: any }) {
    if (!styleObj) return '';
    let styleString: string = '';
    for (const key in styleObj) {
        const value = styleObj[key];
        styleString += `${key}:${value};`;
    }
    return ` style="${styleString}"`
}