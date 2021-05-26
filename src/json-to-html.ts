import { RenderOption } from './options';
import { EntryEmbedable } from './Models/embedded-object';
import { findRenderContent } from './helper/find-render-content';
import Document from './nodes/document';
import { defaultOptions } from './options/default-options';

export const defaultNodeOption: RenderOption = {

}

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
    return parseJsonToHTML(content)
}

export function parseJsonToHTML(
    content: Document, 
    entry?: EntryEmbedable,
    renderOption?: RenderOption,
): string {
    // TODO: functionality to be added
    const renderNode = {
        ...defaultNodeOption,
        ...defaultOptions,
        ...renderOption
    }

    
    return ''
}