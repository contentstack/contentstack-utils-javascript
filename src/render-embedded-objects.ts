import './extensions'
import { Option, RenderOption } from './options';
import { Metadata } from './Models/metadata-model';
import { findEmbeddedObjects, findRenderString } from './helper/find-embeded-object';
import { EntryEmbedable } from './Models/embedded-object';
import { findRenderContent } from './helper/find-render-content';
/**
 * 
 * @param {EntryEmbedable| EntryEmbedable[]} entry - Objects that contains RTE with embedded objects
 * @param {string[]} keyPaths - Key paths for RTE contents in Entry object
 * @param {RenderOption?} renderOption -  Optional render options to render content
 */
export function render(option: { 
    entry: EntryEmbedable| EntryEmbedable[],
    renderOption?: RenderOption,
    paths?: string[]
}) {

    function findContent(path: string, entry: EntryEmbedable) {
        findRenderContent(path, entry, (content) => {
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
        findAndRender(option.entry as EntryEmbedable)
    }
}

/**
 * 
 * @param {string | string[]} content - RTE content to render 
 * @param {EntryEmbedable} options.entry - Entry object containing embedded objects
 * @param {RenderOption?} options.renderOption - Optional render options to render content
 */
export function renderContent(content: (string | string[]), option: Option): (string| string[]) {
    // return blank if content not present
    if (!content || content === undefined) {
        return ''
    }

    // render content of type string
    if (typeof content === 'string') {
        let contentToReplace = content
        content.forEachEmbeddedObject((embededObjectTag: string, object: Metadata) => {
            contentToReplace = findAndReplaceEmbeddedObject(
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
        if (!element) {
            resultContent.push('')
        }else {
            let contentToReplace = element
            element.forEachEmbeddedObject((embededObjectTag: string, object: Metadata) => {
                contentToReplace = findAndReplaceEmbeddedObject(
                    contentToReplace,
                    embededObjectTag, 
                    object, 
                    option)            
            })
            resultContent.push(contentToReplace)
        }
    })
    return resultContent
}

function findAndReplaceEmbeddedObject(content:string, embededObjectTag: string, object: Metadata, option: Option): string {    
    const embeddedObjects = findEmbeddedObjects(object, option.entry)
    const renderString = findRenderString(object, embeddedObjects[0], option.renderOption)
    return content.replace(embededObjectTag, renderString)
}
