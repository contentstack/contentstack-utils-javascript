import { EntryModel } from "."

interface AppliedVariants {
    _applied_variants: { [key: string]: any }
    shouldApplyVariant: boolean
    metaKey: string
}

/**
 * Adds Contentstack Live Preview (CSLP) data tags to an entry for editable UIs.
 * Mutates the entry by attaching a `$` property with tag strings or objects
 * (e.g. `data-cslp` / `data-cslp-parent-field`) for each field, including nested
 * objects and references. Supports variant-aware tagging when the entry has
 * applied variants.
 *
 * @param entry - The entry (EmbeddedItem) to tag. Must have uid and optional system/applied variants.
 * @param contentTypeUid - Content type UID (e.g. `blog_post`). Used as part of the tag path.
 * @param tagsAsObject - If true, tags are stored as objects (e.g. `{ "data-cslp": "..." }`); if false, as strings (e.g. `data-cslp=...`).
 * @param locale - Locale code for the tag path (default: `'en-us'`).
 * @param options.useLowerCaseLocale - Optional boolean to make locale case-insensitive.
 */
export function addTags(entry: EntryModel, contentTypeUid: string, tagsAsObject: boolean, locale: string = 'en-us', options?: {
    useLowerCaseLocale?: boolean
}): void {
    const { useLowerCaseLocale = true } = options || {};
    if (entry) {
        // handle case senstivity for contentTypeUid and locale
        contentTypeUid = contentTypeUid.toLowerCase();
        locale = useLowerCaseLocale ? locale.toLowerCase() : locale;
        
        const appliedVariants = entry._applied_variants || entry?.system?.applied_variants || null;
        entry.$ = getTag(entry, `${contentTypeUid}.${entry.uid}.${locale}`, tagsAsObject, locale, { _applied_variants: appliedVariants, shouldApplyVariant: !!appliedVariants, metaKey: '' })
    }
}

/** @internal Exported for testing the null/undefined guard (Issue #193). */
export function getTag(content: object, prefix: string, tagsAsObject: boolean, locale: string, appliedVariants: AppliedVariants): object {
    if (content == null) {
        return {}
    }
    const tags: any = {}
    const { shouldApplyVariant, _applied_variants } = appliedVariants
    Object.entries(content).forEach(([key, value]) => {
        if (key === '$') return
        let metaUID = value?._metadata?.uid ?? '';
        const metaKeyPrefix = appliedVariants.metaKey ? appliedVariants.metaKey + '.' : '';
        let updatedMetakey = appliedVariants.shouldApplyVariant ? `${metaKeyPrefix}${key}` : '';
        if (metaUID && updatedMetakey) updatedMetakey = updatedMetakey + '.' + metaUID;
        switch (typeof value) {
            case "object":
                if (Array.isArray(value)) {
                    value.forEach((obj, index) => {
                        if (obj === null || obj === undefined) {
                            return;
                        }
                        const childKey = `${key}__${index}`
                        const parentKey = `${key}__parent`
                        metaUID = obj?._metadata?.uid ?? '';
                        updatedMetakey = appliedVariants.shouldApplyVariant ? `${metaKeyPrefix}${key}` : '';
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
                        tags[childKey] = tagsAsObject
                            ? getTagsValueAsObject(`${prefix}.${key}.${index}`, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
                            : getTagsValueAsString(`${prefix}.${key}.${index}`, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
                        tags[parentKey] = tagsAsObject ? getParentTagsValueAsObject(`${prefix}.${key}`) : getParentTagsValueAsString(`${prefix}.${key}`)
                        if (obj?._content_type_uid !== undefined && obj?.uid !== undefined) {
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
                            const newAppliedVariants = obj._applied_variants || obj?.system?.applied_variants || null //check for _applied_variants in the reference object only return null if not present , do not check in the parent object;
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

                tags[key] = tagsAsObject
                    ? getTagsValueAsObject(`${prefix}.${key}`, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
                    : getTagsValueAsString(`${prefix}.${key}`, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
                break;
            default:
                /**
                 * All primitive values are handled here
                 * {
                 *  "title": "title",
                 *  "$": {title: {"data-cslp": "content_type_uid.entry_uid.locale.title"}}
                 * }
                 */
                tags[key] = tagsAsObject
                ? getTagsValueAsObject(`${prefix}.${key}`, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
                : getTagsValueAsString(`${prefix}.${key}`, { _applied_variants, shouldApplyVariant, metaKey: updatedMetakey })
        }
    })
    return tags
}

type TagsAppliedVariants = { _applied_variants: { [key: string]: any }; shouldApplyVariant: boolean; metaKey: string };

function applyVariantToDataValue(dataValue: string, appliedVariants: TagsAppliedVariants): string {
    if (appliedVariants?.shouldApplyVariant && appliedVariants?._applied_variants) {
        const isFieldVariantised = appliedVariants._applied_variants[appliedVariants.metaKey];
        if (isFieldVariantised) {
            const variant = appliedVariants._applied_variants[appliedVariants.metaKey];
            const newDataValueArray = ('v2:' + dataValue).split('.');
            newDataValueArray[1] = newDataValueArray[1] + '_' + variant;
            return newDataValueArray.join('.');
        }
        const parentVariantisedPath = getParentVariantisedPath(appliedVariants as AppliedVariants);
        if (parentVariantisedPath) {
            const variant = appliedVariants._applied_variants[parentVariantisedPath];
            const newDataValueArray = ('v2:' + dataValue).split('.');
            newDataValueArray[1] = newDataValueArray[1] + '_' + variant;
            return newDataValueArray.join('.');
        }
    }
    return dataValue;
}

function getTagsValueAsObject(dataValue: string, appliedVariants: TagsAppliedVariants): { "data-cslp": string } {
    const resolved = applyVariantToDataValue(dataValue, appliedVariants);
    return { "data-cslp": resolved };
}

function getTagsValueAsString(dataValue: string, appliedVariants: TagsAppliedVariants): string {
    const resolved = applyVariantToDataValue(dataValue, appliedVariants);
    return `data-cslp=${resolved}`;
}

function getParentTagsValueAsObject(dataValue: string): { "data-cslp-parent-field": string } {
    return { "data-cslp-parent-field": dataValue };
}

function getParentTagsValueAsString(dataValue: string): string {
    return `data-cslp-parent-field=${dataValue}`;
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