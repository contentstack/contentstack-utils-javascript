import { EntryModel } from "."

interface AppliedVariants {
    _applied_variants: { [key: string]: any }
    shouldApplyVariant: boolean
    metaKey: string
}

export function addTags(entry: EntryModel, contentTypeUid: string, tagsAsObject: boolean, locale: string = 'en-us'): void {
    if (entry) {
        // handle case senstivity for contentTypeUid and locale
        contentTypeUid = contentTypeUid.toLowerCase();
        locale = locale.toLowerCase();
        
        const appliedVariants = entry._applied_variants || entry?.system?.applied_variants || null;
        entry.$ = getTag(entry, `${contentTypeUid}.${entry.uid}.${locale}`, tagsAsObject, locale, { _applied_variants: appliedVariants, shouldApplyVariant: !!appliedVariants, metaKey: '' })
    }
}

function getTag(content: object, prefix: string, tagsAsObject: boolean, locale: string, appliedVariants: AppliedVariants): object {
    const tags: any = {}
    const { metaKey, shouldApplyVariant, _applied_variants } = appliedVariants
    Object.entries(content).forEach(([key, value]) => {
        if (key === '$') return
        let metaUID = value && typeof value === 'object' && value !== null && value._metadata && value._metadata.uid ? value._metadata.uid : '';
        let updatedMetakey = appliedVariants.shouldApplyVariant ? `${appliedVariants.metaKey ? appliedVariants.metaKey + '.' : ''}${key}` : '';
        if (metaUID && updatedMetakey) updatedMetakey = updatedMetakey + '.' + metaUID;
        switch (typeof value) {
            case "object":
                if (Array.isArray(value)) {
                    value.forEach((obj, index) => {
                        const childKey = `${key}__${index}`
                        const parentKey = `${key}__parent`
                        metaUID = value && typeof value === 'object' && obj !== null && obj._metadata && obj._metadata.uid ? obj._metadata.uid : '';
                        updatedMetakey = appliedVariants.shouldApplyVariant ? `${appliedVariants.metaKey ? appliedVariants.metaKey + '.' : ''}${key}` : '';
                        if (metaUID && updatedMetakey) updatedMetakey = updatedMetakey + '.' + metaUID;
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
                        tags[childKey] = getTagsValue(`${prefix}.${key}.${index}`, tagsAsObject, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
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
                            const newAppliedVariants = obj._applied_variants || obj?.system?.applied_variants || _applied_variants;
                            const newShouldApplyVariant = !!newAppliedVariants
                            value[index].$ = getTag(obj, `${obj._content_type_uid}.${obj.uid}.${obj.locale || locale}`, tagsAsObject, locale, { _applied_variants: newAppliedVariants, shouldApplyVariant: newShouldApplyVariant, metaKey: "" })
                        } else if (typeof obj === "object") {
                            /**
                             * Objects inside Array like modular blocks are handled here
                             * {
                             *  "array": [{
                             *    "title": "title",
                             *    "$": {"title": {"data-cslp": "content_type_uid.entry_uid.locale.array.0.title"}}
                             *  }]
                             * }
                             */
                            obj.$ = getTag(obj, `${prefix}.${key}.${index}`, tagsAsObject, locale, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
                        }
                    })
                } else {
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
                        value.$ = getTag(value, `${prefix}.${key}`, tagsAsObject, locale, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
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

                tags[key] = getTagsValue(`${prefix}.${key}`, tagsAsObject, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
                break;
            default:
                /**
                 * All primitive values are handled here
                 * {
                 *  "title": "title",
                 *  "$": {title: {"data-cslp": "content_type_uid.entry_uid.locale.title"}}
                 * }
                 */
                tags[key] = getTagsValue(`${prefix}.${key}`, tagsAsObject, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
        }
    })
    return tags
}

function getTagsValue(dataValue: string, tagsAsObject: boolean, appliedVariants: { _applied_variants: { [key: string]: any }, shouldApplyVariant: boolean, metaKey: string }): any {
    if (appliedVariants.shouldApplyVariant && appliedVariants._applied_variants) {
      const isFieldVariantised = appliedVariants._applied_variants[appliedVariants.metaKey];
      if(isFieldVariantised) {
        const variant = appliedVariants._applied_variants[appliedVariants.metaKey]
        // Adding v2 prefix to the cslp tag. New cslp tags are in v2 format. ex: v2:content_type_uid.entry_uid.locale.title
        const newDataValueArray = ('v2:' + dataValue).split('.');
        newDataValueArray[1] = newDataValueArray[1] + '_' + variant;
        dataValue = newDataValueArray.join('.');
      }
      else {
        const parentVariantisedPath = getParentVariantisedPath(appliedVariants);
        if(parentVariantisedPath) {
          const variant = appliedVariants._applied_variants[parentVariantisedPath];
          const newDataValueArray = ('v2:' + dataValue).split('.');
          newDataValueArray[1] = newDataValueArray[1] + '_' + variant;
          dataValue = newDataValueArray.join('.');
        }
      }
    }
    if (tagsAsObject) {
        return { "data-cslp": dataValue };
    } else {
        return `data-cslp=${dataValue}`;
    }
}

function getParentTagsValue(dataValue: string, tagsAsObject: boolean): any {
    if (tagsAsObject) {
        return { "data-cslp-parent-field": dataValue };
    } else {
        return `data-cslp-parent-field=${dataValue}`;
    }
}

function getParentVariantisedPath(appliedVariants: AppliedVariants) {
    try {
        // Safety fallback
        if(!appliedVariants._applied_variants) return '';
        const variantisedFieldPaths = Object.keys(appliedVariants._applied_variants).sort((a, b) => {
            return b.length - a.length;
        });
        const childPathFragments = appliedVariants.metaKey.split('.');
        // Safety fallback
        if(childPathFragments.length === 0 || variantisedFieldPaths.length === 0) return '';
        const parentVariantisedPath = variantisedFieldPaths.find(path => {
            const parentFragments = path.split('.');
            if(parentFragments.length > childPathFragments.length) return false;
            return parentFragments.every((fragment, index) => childPathFragments[index] === fragment);
        }) ?? '';
        return parentVariantisedPath;
    }
    catch(e) {
        return '';
    }
}