import './extensions'
import { Option, RenderOption } from './options';
import { Metadata } from './Models/metadata-model';
import { findEmbeddedItems, findRenderString } from './helper/find-embeded-object';
import { EntryEmbedable } from './Models/embedded-object';
import { findRenderContent } from './helper/find-render-content';
/**
 * Renders RTE (Rich Text Editor) content with embedded objects in-place.
 * Mutates the entry/entries by replacing embedded item tags with HTML produced
 * by the provided render options. Works with a single entry or an array of entries.
 *
 * @param option - Configuration for rendering.
 * @param option.entry - Entry or array of entries containing RTE fields with embedded objects.
 * @param option.renderOption - Optional render options (node/item handlers) to produce HTML for embedded content.
 * @param option.paths - Optional key paths to specific RTE fields. If omitted, all RTE paths on the entry are rendered.
 */
export function render(option: { 
    entry: EntryEmbedable| EntryEmbedable[],
    renderOption?: RenderOption,
    paths?: string[]
}) {

    function findContent(path: string, entry: EntryEmbedable) {
        findRenderContent(path, entry, (content: string| string[]) => {
            return renderContent(content, { entry, renderOption: option.renderOption })
        })
    }

    function findAndRender (entry: EntryEmbedable) {
        if (!option.paths || option.paths.length === 0) {
            Object.keys({ 
                ...entry._embedded_items,
            }).forEach((path) => {
                findContent(path, entry)
            })
        } else {
            option.paths.forEach((path) => {
                findContent(path, entry)
            })
        }
    }

    if (option.entry instanceof Array) {
        option.entry.forEach((entry) => {
            findAndRender(entry)
        })
    }else {
        findAndRender(option.entry)
    }
}

/**
 * Renders a single RTE content string or array of strings by replacing embedded
 * item tags with HTML. Uses the entry and renderOption from the given option to
 * resolve embedded references and produce output.
 *
 * @param content - RTE content string or array of strings containing embedded item tags.
 * @param option - Must include the entry (for resolving embedded items) and optionally renderOption.
 * @returns The same shape as content: a string or array of strings with embedded tags replaced by rendered HTML.
 */
export function renderContent(content: (string | string[]), option: Option): (string| string[]) {
    // return blank if content not present
    if (!content || content === undefined) {
        return ''
    }

    // render content of type string
    if (typeof content === 'string') {
        let contentToReplace = content
        content.forEachEmbeddedItem((embededObjectTag: string, object: Metadata) => {
            contentToReplace = findAndReplaceEmbeddedItem(
                contentToReplace,
                embededObjectTag, 
                object, 
                option)
        })
        return contentToReplace
    }

    // render content of type array of string
    const resultContent: string[] = []
    content.forEach((element) => {
        resultContent.push(renderContent(element, option) as string)
    })
    return resultContent
}

function findAndReplaceEmbeddedItem(content:string, embededObjectTag: string, metadata: Metadata, option: Option): string {    
    const embeddedObjects = findEmbeddedItems(metadata, option.entry)
    const renderString = findRenderString(embeddedObjects[0], metadata, option.renderOption)
    return content.replace(embededObjectTag, renderString)
}
