import { Option } from "../../src/options";
import { entryEmbeddedAssets, entryEmbeddedObject, entryEmbeddedEntries, entryAssetEmbedBlank } from './entry-mock';
import StyleType from '../../src/embedded-types/style-type';
import { renderContent } from "../../src/render-embedded-objects";
import { EmbeddedObject } from "../../src/Models/embedded-object";

export const embeddedAssetWithNoRenderOption: Option = {
    entry: entryEmbeddedAssets,
}

export const embeddedAssetWithNoAssetObject: Option = {
    entry: entryAssetEmbedBlank,
}

export const embeddedEntriesWithNoRenderOption: Option = {
    entry: entryEmbeddedEntries,
}

export const embeddedObjectWithNoRenderOption: Option = {
    entry: entryEmbeddedObject,
}

export const embeddedAssetWithRenderOption: Option = {
    entry: entryEmbeddedAssets,
    renderOption: {
        [StyleType.DISPLAY]:  (asset) => `<img src=\"${asset.url}\" alt=\"Alternet Text\" />`,
    }
}

export const embeddedEntriesWithRenderOption: Option = {
    entry: entryEmbeddedEntries,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content-type': (entry) => entry.title
        },
        [StyleType.INLINE]: {
            'content-type': (entry) => entry.uid
        }
    }
}

export const embeddedObjectWithRenderOption: Option = {
    entry: entryEmbeddedObject,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content_block': (entry) => `<div><div>${entry.title}</div></div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': (entry) => `<div><div>${entry.uid}</div></div>`
        }
    }
}
export const embeddedObjectWithMultiRenderOption: Option = {
    entry: entryEmbeddedObject,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content_block': (entry) => `<div>
            <div>${entry.title}</div>
            <div>${renderContent(entry.rich_text_editor, {
                entry: entry as EmbeddedObject,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}
            </div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': (entry) => `<div>
            <div>${entry.uid}</div>
            <MYCONTENT>${renderContent(entry.rich_text_editor[0], {
                entry: entry as EmbeddedObject,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}</MYCONTENT>
            </div>`
        }
    }
}


export const embeddedObjectDefaultRender: Option = {
    entry: entryEmbeddedObject,
    renderOption: {
        [StyleType.BLOCK]:  {
            '$default': (entry) => `<div>
            <div>${entry.title}</div>
            <div>${renderContent(entry.rich_text_editor, {
                entry: entry as EmbeddedObject,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}
            </div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': (entry) => `<div>
            <div>${entry.uid}</div>
            <MYCONTENT>${renderContent(entry.rich_text_editor[0], {
                entry: entry as EmbeddedObject,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}</MYCONTENT>
            </div>`
        }
    }
}