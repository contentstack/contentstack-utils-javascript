import Node from './nodes/node';
import TextNode from './nodes/text-node';
import { RenderOption } from './options';
import { JsonRTE } from './Models/json-rte-model';
import { Metadata } from './Models/metadata-model';
import { findRenderContent } from './helper/find-render-content';
import { findGQLEmbeddedItems } from './helper/find-embeded-object';
import { EmbeddedItem, EntryEmbedable } from './Models/embedded-object';
import { enumerate, enumerateContents } from './helper/enumerate-entries';

export type AnyNode = TextNode | Node;

function jsonToHTML(option: { 
    entry: EmbeddedItem| EmbeddedItem[],
    paths: string[],
    renderOption?: RenderOption,
}) {
    if (option.entry instanceof Array) {
        enumerate(option.entry, (entry: EmbeddedItem) => {
            jsonToHTML({entry, paths: option.paths, renderOption: option.renderOption})
        })
    } else {
        enumerateKeys({
            entry: option.entry,
            paths: option.paths,
            renderOption: option.renderOption,
        })
    }
}

function enumerateKeys(option: { 
    entry: EntryEmbedable,
    paths: string[],
    renderOption?: RenderOption,
}) {
    for (const key of option.paths) {
        findRenderContent(key, 
            option.entry, 
            ((content: JsonRTE) => {
            if (content && content.json) {
                const edges = content.embedded_itemsConnection ? content.embedded_itemsConnection.edges : []
                const items = Object.values(edges || []).reduce((accumulator, value) => accumulator.concat(value.node), [])
                return enumerateContents(content.json, option.renderOption, (metadata: Metadata) => {
                    return findGQLEmbeddedItems(metadata, items)[0]
                })
            }   
            return content as unknown as string
        }))
    }
}

/**
 * GraphQL API utilities for Contentstack. Provides methods to work with
 * content fetched via the GraphQL API, including rendering Supercharged RTE
 * (JSON) with embedded items from the GQL response.
 */
export const GQL = {
    /**
     * Converts Supercharged RTE (JSON) content to HTML for entries from a GraphQL response.
     * Uses `embedded_itemsConnection.edges` to resolve embedded items. Mutates the entry
     * JSON in-place by replacing JSON RTE content with the generated HTML.
     *
     * @param option - Configuration for conversion.
     * @param option.entry - Entry or array of entries (EmbeddedItem) from a GQL response with JSON RTE and embedded_itemsConnection.
     * @param option.paths - Key paths to the JSON RTE fields on the entry.
     * @param option.renderOption - Optional render options to customize how nodes and embedded items are rendered to HTML.
     */
    jsonToHTML
}