import { AssetModel } from '../src/Models/asset-model';
import { entryEmbeddedEntries, entryEmbeddedAssets, assetRichTextJson, entryRichTextJson } from './mock/entry-mock';
import { ContentTypeEntry, EmbedModel } from '../src/Models/entry-model';
import { assetDisplayJson } from './mock/embedded-object-mock';
import { Attributes } from '../src/Models/embed-attributes-model';
import { findEmbeddedEntry, findEmbeddedAsset, findRenderString, findEmbeddedObjects } from '../src/helper/find-embeded-object';
import ENTRY from '../src/embedded-types/entry';
describe('Embedded object render from content', () => {
    it('Find Embedded Entry no matching uids with blank embedded Entry test', done => {
        expect(makeFindEntry()).toEqual([])
        expect(makeFindEntry('bltUID')).toEqual([])
        expect(makeFindEntry('bltUID', 'Content_type_not_forUID')).toEqual([])
        done()
    })

    it('Find Embedded Entry no matching uids with embedded Entry test', done => {
        expect(makeFindEntry('', '', reduceToArray(entryEmbeddedEntries._embedded_entries) as ContentTypeEntry[])).toEqual([])
        expect(makeFindEntry('blttitleuid', 'conent', reduceToArray(entryEmbeddedEntries._embedded_entries) as ContentTypeEntry[])).toEqual([])
        expect(makeFindEntry('blttitleuid', '', reduceToArray(entryEmbeddedEntries._embedded_entries) as ContentTypeEntry[])).toEqual([])
        expect(makeFindEntry('', 'conent', reduceToArray(entryEmbeddedEntries._embedded_entries) as ContentTypeEntry[])).toEqual([])
        expect(makeFindEntry('nons,', 'content_block', reduceToArray(entryEmbeddedEntries._embedded_entries) as ContentTypeEntry[])).toEqual([])
        done()
    })

    it('Find Embedded Entry no matching uids without embedded Entry test', done => {
        expect(makeFindAsset()).toEqual([])
        expect(makeFindAsset('bltUID')).toEqual([])
        done()
    })

    it('Find Embedded Asset matching uids with embedded asset test', done => {
        expect(makeFindAsset('', (reduceToArray(entryEmbeddedEntries._embedded_assets) as AssetModel[]))).toEqual([])
        expect(makeFindAsset('blttuid', (reduceToArray(entryEmbeddedEntries._embedded_assets) as AssetModel[]))).toEqual([])
        done()
    })

    it('Find Embedded asset and entry matching contents test', done => {
        expect(makeFindEntry('blttitleuid', 'content_block', (reduceToArray(entryEmbeddedEntries._embedded_entries) as ContentTypeEntry[]))).toEqual([entryEmbeddedEntries._embedded_entries.rich_text_editor[0], entryEmbeddedEntries._embedded_entries.rich_text_editor[0]])
        expect(makeFindAsset('bltassetEmbuid', (reduceToArray(entryEmbeddedEntries._embedded_assets) as AssetModel[]))).toEqual([entryEmbeddedEntries._embedded_assets.rich_text_editor[0], entryEmbeddedEntries._embedded_assets.rich_text_editor[0]])
        done()
    })

    it('Find EmbedObject from undefinded data test', done => {
        let renderModels = findEmbeddedObjects(undefined, entryEmbeddedAssets)
        expect(renderModels).toEqual([])
        renderModels = findEmbeddedObjects(undefined, undefined)
        expect(renderModels).toEqual([])
        done()
    })

    it('Find EmbedObject from embed asset test', done => {
        let renderModels = findEmbeddedObjects(assetRichTextJson as unknown as Attributes, entryEmbeddedAssets)
        expect(renderModels).toEqual([entryEmbeddedAssets._embedded_assets.rich_text_editor[0]])
        renderModels = findEmbeddedObjects(entryRichTextJson as unknown as Attributes, entryEmbeddedEntries)
        expect(renderModels).toEqual([entryEmbeddedEntries._embedded_entries.rich_text_editor[1], entryEmbeddedEntries._embedded_entries.rich_text_editor[1]])
        done()
    })

    it('Find Render string from undefined objects test', done => {
        const renderString = findRenderString(undefined, entryEmbeddedAssets._embedded_assets.rich_text_editor[0])
        expect(renderString).toEqual('')
        done()
    }) 

    it('Find Render string from default renderOption', done => {
        const renderString = findRenderString(entryRichTextJson as unknown as Attributes, entryEmbeddedEntries._embedded_entries.rich_text_editor[0])
        expect(renderString).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })

    it('Find Render string from default renderOption with alternate text', done => {
        const renderString = findRenderString(assetDisplayJson as unknown as Attributes, entryEmbeddedAssets._embedded_assets.rich_text_editor[0])
        expect(renderString).toEqual('<img src=\"/v3/assets/blt333/blt44asset/dummy.pdf\" alt=\"{{object.title}}\" />')
        done()
    })

    it('Find Render string from passed renderOption', done => {
        let renderString = findRenderString(entryRichTextJson as unknown as Attributes, entryEmbeddedEntries._embedded_entries.rich_text_editor[0], {
            [ENTRY.BLOCK]: (entry) => `<div><div>${entry.title || entry.uid}</div><div>Content type: <span>${entry._content_type_uid}</span></div></div>`
        })
        expect(renderString).toEqual('<div><div>Update this title</div><div>Content type: <span>content_block</span></div></div>')

        renderString = findRenderString(entryRichTextJson as unknown as Attributes, entryEmbeddedEntries._embedded_entries.rich_text_editor[0], {
            [ENTRY.BLOCK]: 
            {
                'embeddedrte':
                (entry) => `<div>${entry.title || entry.uid}<div>Content type: <span>${entry._content_type_uid}</span></div></div>`
            }
        })
        expect(renderString).toEqual('<div>Update this title<div>Content type: <span>content_block</span></div></div>')

        renderString = findRenderString(entryRichTextJson as unknown as Attributes, entryEmbeddedEntries._embedded_entries.rich_text_editor[0], {
            [ENTRY.BLOCK]: 
            {
                'content-type':
                (entry) => `<div><div>${entry.title || entry.uid}</div><div>Content type: <span>${entry._content_type_uid}</span></div></div>`
            }
        })
        expect(renderString).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })
})

function makeFindEntry(uid: string = '', contentTypeUid: string = '', embeddedEntries?: ContentTypeEntry[]) {
    return findEmbeddedEntry(uid, contentTypeUid, embeddedEntries)
}

function makeFindAsset(uid: string = '', embeddedAssets?: AssetModel[]) {
    return findEmbeddedAsset(uid, embeddedAssets)
}

function reduceToArray (embedModel: EmbedModel<ContentTypeEntry| AssetModel>): (ContentTypeEntry| AssetModel)[]{
    return Object.values(embedModel).reduce((accumulator, value) => accumulator.concat(value), [])
}

