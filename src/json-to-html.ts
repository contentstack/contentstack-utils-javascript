import Node from './nodes/node';
import TextNode from './nodes/text';
import Document from './nodes/document';
import MarkType from './nodes/mark-type';
import { nodeToMetadata } from './Models/metadata-model';
import { EntryEmbedable } from './Models/embedded-object';
import { findRenderContent } from './helper/find-render-content';
import { defaultNodeOption } from './options/default-node-options';
import { Next, RenderMark, RenderNode, RenderOption } from './options';
import { findEmbeddedItems, findRenderString } from './helper/find-embeded-object';

export type AnyNode = TextNode | Node;

export function jsonToHTML(option: { 
    entry: EntryEmbedable| EntryEmbedable[],
    paths: string[],
    renderOption?: RenderOption,
}) {
    if (option.entry instanceof Array) {
        enumerateEntries({
            entry: option.entry,
            paths: option.paths,
            renderOption: option.renderOption,
        })
    } else {
        enumerateKeys({
            entry: option.entry,
            paths: option.paths,
            renderOption: option.renderOption,
        })
    }
}

function enumerateEntries(option: { 
    entry: EntryEmbedable[],
    paths: string[],
    renderOption?: RenderOption,
}) {
    for (const entry of option.entry) {
        jsonToHTML({entry, paths: option.paths, renderOption: option.renderOption})
    }
}

function enumerateKeys(option: { 
    entry: EntryEmbedable,
    paths: string[],
    renderOption?: RenderOption,
}) {
    for (const key of option.paths) {
        findRenderContent(key, option.entry as EntryEmbedable, ((content: Document | Document[]) => {
            return enumerateContents(content, option.entry, option.renderOption)
        }))
    }
}

function enumerateContents(
    content:Document | Document[], 
    entry: EntryEmbedable,
    renderOption?: RenderOption,
): string | string[] {
    if (!(content instanceof Array) && content.type !== 'doc') {
        return content as unknown as string
    } 
    if (content instanceof Array) {
        const result: string[] = []
        content.forEach((doc) => {
            result.push(enumerateContents(doc, entry, renderOption) as string)
        })
        return result
    } 
    const commonRenderOption = {
        ...defaultNodeOption,
        ...renderOption
    }
    return nodeChildrenToHTML(content.children, commonRenderOption, entry)
}

export function textNodeToHTML(node: TextNode, renderOption: RenderOption): string {
    let text = node.text
    if (node.superscript) {
        text =  (renderOption[MarkType.SUPERSCRIPT] as RenderMark)(text)
    }
    if (node.subscript) {
        text =  (renderOption[MarkType.SUBSCRIPT] as RenderMark)(text)
    }
    if (node.inlineCode) {
        text =  (renderOption[MarkType.INLINE_CODE] as RenderMark)(text)
    }
    if (node.strikethrough) {
        text =  (renderOption[MarkType.STRIKE_THROUGH] as RenderMark)(text)
    }
    if (node.underline) {
        text =  (renderOption[MarkType.UNDERLINE] as RenderMark)(text)
    }
    if (node.italic) {
        text =  (renderOption[MarkType.ITALIC] as RenderMark)(text)
    }
    if (node.bold) {
        text =  (renderOption[MarkType.BOLD] as RenderMark)(text)
    }
    return text
}

export function referenceToHTML(node: Node, 
    renderOption: RenderOption,
    entry?: EntryEmbedable
): string {
    if (!entry) {
        return ''
    }
    const metadata = nodeToMetadata(node.attrs, ((node.children && node.children.length > 0) ? node.children[0]: {}) as unknown as TextNode)
    metadata.item = findEmbeddedItems(metadata, entry)[0]
    return findRenderString(metadata, renderOption)
}

function nodeChildrenToHTML(nodes: AnyNode[], 
    renderOption: RenderOption,
    entry?: EntryEmbedable,
    ): string {
        return nodes.map<string>((node: AnyNode) => nodeToHTML(node, renderOption, entry)).join('')
}

function nodeToHTML(
    node: AnyNode, 
    renderOption: RenderOption,
    entry?: EntryEmbedable,
): string {    
    if (!node.type) {
        return textNodeToHTML(node as TextNode, renderOption)
    }else if ((node.type as string) === 'reference') {
        return referenceToHTML(node, renderOption, entry)
    }else {
        const next: Next = nodes => nodeChildrenToHTML(nodes, renderOption, entry)
        return (renderOption[node.type] as RenderNode)(node, next)
    }
}