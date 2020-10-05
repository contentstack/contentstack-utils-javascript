import './extensions'
import { Options } from './options';
import { EmbedAttributes } from './Models/embed-attributes-model';
import { findEmbeddedObjects, findRenderString } from './helper/find-embeded-object';
import { HTMLElement } from 'node-html-parser';

export function renderContent(content: (string | string[]), options: Options): (string| string[]) {
    // return blank if content not present
    if (!content || content === undefined) {
        return ''
    }

    // render content of type string
    if (typeof content === 'string') {
        let contentToReplace = content
        content.forEachEmbeddedObject((embededObjectTag: string, object: EmbedAttributes) => {
            contentToReplace = findAndReplaceEmbeddedObject(
                contentToReplace,
                embededObjectTag, 
                object, 
                options)
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
            element.forEachEmbeddedObject((embededObjectTag: string, object: EmbedAttributes) => {
                contentToReplace = findAndReplaceEmbeddedObject(
                    contentToReplace,
                    embededObjectTag, 
                    object, 
                    options)            
            })
            resultContent.push(contentToReplace)
        }
    })
    return resultContent
}

function findAndReplaceEmbeddedObject(content:string, embededObjectTag: string, object: EmbedAttributes, option: Options): string {    
    const embeddedObjects = findEmbeddedObjects(object, option.entry)
    const renderString = findRenderString(object, embeddedObjects[0], option.renderOption)
    return content.replace(embededObjectTag, renderString)
}
