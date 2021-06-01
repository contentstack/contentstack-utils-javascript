import { Option } from "../../src/options";
import { entryEmbeddedAssets, entryEmbeddedItem, entryEmbeddedEntries, entryAssetEmbedBlank } from './entry-mock';
import StyleType from '../../src/embedded-types/style-type';
import { renderContent } from "../../src/render-embedded-objects";
import { EmbeddedItem } from "../../src/Models/embedded-object";
import { Metadata } from "../../src/Models/metadata-model";

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
        [StyleType.DISPLAY]:  (metadata: Metadata) => `<img src=\"${metadata.item.url}\" alt=\"Alternet Text\" />`,
    }
}

export const embeddedEntriesWithRenderOption: Option = {
    entry: entryEmbeddedEntries,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content-type': (metadata: Metadata) => metadata.item.title,
        },
        [StyleType.INLINE]: {
            'content-type': (metadata: Metadata) => metadata.item.uid
        }
    }
}

export const embeddedObjectWithRenderOption: Option = {
    entry: entryEmbeddedItem,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content_block': (metadata: Metadata) => `<div><div>${metadata.item.title}</div></div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': (metadata: Metadata) => `<div><div>${metadata.item.uid}</div></div>`
        }
    }
}
export const embeddedObjectWithMultiRenderOption: Option = {
    entry: entryEmbeddedItem,
    renderOption: {
        [StyleType.BLOCK]:  {
            'content_block': (metadata: Metadata) => `<div>
            <div>${metadata.item.title}</div>
            <div>${renderContent(metadata.item.rich_text_editor, {
                entry: metadata.item as EmbeddedItem,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}
            </div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': (metadata: Metadata) => `<div>
            <div>${metadata.item.uid}</div>
            <MYCONTENT>${renderContent(metadata.item.rich_text_editor[0], {
                entry: metadata.item as EmbeddedItem,
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
            '$default': (metadata: Metadata) => `<div>
            <div>${metadata.item.title}</div>
            <div>${renderContent(metadata.item.rich_text_editor, {
                entry: metadata.item as EmbeddedItem,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}
            </div>`
        },
        [StyleType.INLINE]: {
            'embeddedrte': (metadata: Metadata) => `<div>
            <div>${metadata.item.uid}</div>
            <MYCONTENT>${renderContent(metadata.item.rich_text_editor[0], {
                entry: metadata.item as EmbeddedItem,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}</MYCONTENT>
            </div>`
        }
    }
}