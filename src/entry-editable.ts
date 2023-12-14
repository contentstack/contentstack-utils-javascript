import { EntryModel } from ".";

export function addTags(entry: EntryModel, contentTypeUid: string, tagsAsObject: boolean, locale: string = 'en-us') : void {  
    if (entry)  
        entry.$ = getTag(entry, `${contentTypeUid}.${entry.uid}.${locale}`, tagsAsObject, locale)        
}

function getTag(content: object, prefix: string, tagsAsObject: boolean, locale: string): object {
    const tags: any = {}
    Object.entries(content).forEach(([key, value]) => {      
        if (key === '$') return

        switch (typeof value) {
            case "object":
                if (Array.isArray(value)) {
                    value.forEach((obj, index) => {
                        const childKey = `${key}__${index}`
                        const parentKey = `${key}__parent`
                        /**
                         * Indexes of array are handled here
                         * {
                         *  "array": ["hello", "world"],
                         *  "$": {
                         *      "array": {"data-cslp": "content_type_uid.entry_uid.locale.array"}
                         *      "array__0": {"data-cslp": "content_type_uid.entry_uid.locale.array.0"}
                         *      "array__1": {"data-cslp": "content_type_uid.entry_uid.locale.array.1"}
                         *  }
                         * }
                         */
                        tags[childKey] = getTagsValue(`${prefix}.${key}.${index}`, tagsAsObject)
                        tags[parentKey] = getParentTagsValue(`${prefix}.${key}`, tagsAsObject)
                        if (typeof obj !== 'undefined' && obj !== null && obj._content_type_uid !== undefined && obj.uid !== undefined) {
                            /**
                             * References are handled here
                             * {
                             *  "reference": [{
                             *      "title": "title",
                             *      "uid": "ref_uid",
                             *      "_content_type_uid": "ref_content_type_uid",
                             *     "$": {"title": {"data-cslp": "ref_content_type_uid.ref_uid.locale.title"}}
                             *  }]
                             * }
                             */
                            value[index].$ = getTag(obj, `${obj._content_type_uid}.${obj.uid}.${obj.locale || locale}`, tagsAsObject, locale)
                        }else if (typeof obj === "object") {
                            /**
                             * Objects inside Array like modular blocks are handled here
                             * {
                             *  "array": [{
                             *    "title": "title",
                             *    "$": {"title": {"data-cslp": "content_type_uid.entry_uid.locale.array.0.title"}}
                             *  }]
                             * }
                             */
                            obj.$ = getTag(obj,`${prefix}.${key}.${index}`, tagsAsObject, locale)
                        }
                    })
                }else {
                    if (value) {
                        /**
                         * Objects are handled here
                         * {
                         *  "object": {
                         *      "title": "title",
                         *      "$": {
                         *          "title": {"data-cslp": "content_type_uid.entry_uid.locale.object.title"}
                         *      }
                         *  },
                         * }
                         */
                        value.$ = getTag(value, `${prefix}.${key}`, tagsAsObject, locale)
                    }
                }
                /**
                 * {
                 *  "object": {
                 *      "title": "title",
                 *  },
                 *  "array": ["hello", "world"]
                 *  "$": {
                 *      "object": {"data-cslp": "content_type_uid.entry_uid.locale.object"},
                 *      "array": {"data-cslp": "content_type_uid.entry_uid.locale.array"}
                 *  }
                 * }
                 */
                tags[key] = getTagsValue(`${prefix}.${key}`, tagsAsObject)
                break;
            default:
                /**
                 * All primitive values are handled here
                 * {
                 *  "title": "title",
                 *  "$": {title: {"data-cslp": "content_type_uid.entry_uid.locale.title"}}
                 * }
                 */
                tags[key] = getTagsValue(`${prefix}.${key}`, tagsAsObject)
        }
    })
    return tags
}

function getTagsValue (dataValue:string, tagsAsObject: boolean): any {
    if (tagsAsObject) {
        return { "data-cslp": dataValue };
    } else {
        return `data-cslp=${dataValue}`;
    }
}

function getParentTagsValue (dataValue:string, tagsAsObject: boolean): any {
    if (tagsAsObject) {
        return { "data-cslp-parent-field": dataValue };
    } else {
        return `data-cslp-parent-field=${dataValue}`;
    }
}