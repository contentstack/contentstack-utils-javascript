import { Option } from "../../src/options";
import { entryEmbeddedAssets, entryEmbeddedItem, entryEmbeddedEntries, entryAssetEmbedBlank } from './entry-mock';
import StyleType from '../../src/embedded-types/style-type';
import { renderContent } from "../../src/render-embedded-objects";
import { EmbeddedItem } from "../../src/Models/embedded-object";

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
    entry: entryEmbeddedItem,
}

export const embeddedAssetWithRenderOption: Option = {
    entry: entryEmbeddedAssets,
    renderOption: {
        [StyleType.DISPLAY]:  ({item}) => `<img src=\"${item.url}\" alt=\"Alternet Text\" />`,
    }
}

export const embeddedEntriesWithRenderOption: Option = {
    entry: entryEmbeddedEntries,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content-type': ({item}) => item.title
        },
        [StyleType.INLINE]: {
            'content-type': ({item}) => item.uid
        }
    }
}

export const embeddedObjectWithRenderOption: Option = {
    entry: entryEmbeddedItem,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content_block': ({item}) => `<div><div>${item.title}</div></div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': ({item}) => `<div><div>${item.uid}</div></div>`
        }
    }
}
export const embeddedObjectWithMultiRenderOption: Option = {
    entry: entryEmbeddedItem,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content_block': ({item}) => `<div>
            <div>${item.title}</div>
            <div>${renderContent(item.rich_text_editor, {
                entry: item as EmbeddedItem,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}
            </div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': ({item}) => `<div>
            <div>${item.uid}</div>
            <MYCONTENT>${renderContent(item.rich_text_editor[0], {
                entry: item as EmbeddedItem,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}</MYCONTENT>
            </div>`
        }
    }
}


export const embeddedObjectDefaultRender: Option = {
    entry: entryEmbeddedItem,
    renderOption: {
        [StyleType.BLOCK]:  {
            '$default': ({item}) => `<div>
            <div>${item.title}</div>
            <div>${renderContent(item.rich_text_editor, {
                entry: item as EmbeddedItem,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}
            </div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': ({item}) => `<div>
            <div>${item.uid}</div>
            <MYCONTENT>${renderContent(item.rich_text_editor[0], {
                entry: item as EmbeddedItem,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}</MYCONTENT>
            </div>`
        }
    }
}