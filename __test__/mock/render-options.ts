import { Option } from "../../src/options";
import { entryEmbeddedAssets, entryEmbeddedObject, entryEmbeddedEntries } from './entry-mock';
import ENTRY from '../../src/embedded-types/entry';
import ASSET from '../../src/embedded-types/asset';
import { renderContent } from "../../src/render-embedded-objects";
import { Entry } from "../../src/Models/entry-model";

export const embeddedAssetWithNoRenderOption: Option = {
    entry: entryEmbeddedAssets,
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
        [ASSET.DISPLAYABLE]:  (asset) => `<img src=\"${asset.url}\" alt=\"Alternet Text\" />`,
    }
}

export const embeddedEntriesWithRenderOption: Option = {
    entry: entryEmbeddedEntries,
    renderOption: {
        [ENTRY.BLOCK]:  {
            'content-type': (entry) => entry.title
        },
        [ENTRY.INLINE]: {
            'content-type': (entry) => entry.uid
        }
    }
}

export const embeddedObjectWithRenderOption: Option = {
    entry: entryEmbeddedObject,
    renderOption: {
        [ENTRY.BLOCK]:  {
            'content_block': (entry) => `<div><div>${entry.title}</div></div>`
        },
        [ENTRY.INLINE]: {
            'embeddedrte': (entry) => `<div><div>${entry.uid}</div></div>`
        }
    }
}
export const embeddedObjectWithMultiRenderOption: Option = {
    entry: entryEmbeddedObject,
    renderOption: {
        [ENTRY.BLOCK]:  {
            'content_block': (entry) => `<div>
            <div>${entry.title}</div>
            <div>${renderContent(entry.rich_text_editor, {
                entry: entry as Entry,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}
            </div>`
        },
        [ENTRY.INLINE]: {
            'embeddedrte': (entry) => `<div>
            <div>${entry.uid}</div>
            <MYCONTENT>${renderContent(entry.rich_text_editor[0], {
                entry: entry as Entry,
                renderOption: embeddedObjectWithRenderOption.renderOption
            })}</MYCONTENT>
            </div>`
        }
    }
}