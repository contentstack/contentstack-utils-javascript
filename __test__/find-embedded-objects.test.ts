import { EmbeddedObject, EmbeddedContentTypeUid, EmbedModel } from '../src/Models/embedded-object'
import { entryEmbeddedEntries, entryEmbeddedAssets, assetRichTextJson, entryRichTextJson } from './mock/entry-mock';
import { assetDisplayJson } from './mock/embedded-object-mock';
import { Attributes, createMetadata } from '../src/Models/metadata-model';
import { findEmbeddedEntry, findEmbeddedAsset, findRenderString, findEmbeddedObjects } from '../src/helper/find-embeded-object';
import StyleType from '../src/embedded-types/style-type';

const assetRichTextMetadata = createMetadata(assetRichTextJson as unknown as Attributes)
const entryRichTextMetadata = createMetadata(entryRichTextJson as unknown as Attributes)
const assetDisplayMetadata =  createMetadata(assetDisplayJson as unknown as Attributes)

describe('Embedded object render from content', () => {
    it('Find Embedded Entry no matching uids with blank embedded Entry test', done => {
        expect(makeFindEntry()).toEqual([])
        expect(makeFindEntry('bltUID')).toEqual([])
        expect(makeFindEntry('bltUID', 'Content_type_not_forUID')).toEqual([])
        done()
    })

    it('Find Embedded Entry no matching uids with embedded Entry test', done => {
        expect(makeFindEntry('', '', reduceToArray(entryEmbeddedEntries._embedded_entries) as EmbeddedContentTypeUid[])).toEqual([])
        expect(makeFindEntry('blttitleuid', 'conent', reduceToArray(entryEmbeddedEntries._embedded_entries) as EmbeddedContentTypeUid[])).toEqual([])
        expect(makeFindEntry('blttitleuid', '', reduceToArray(entryEmbeddedEntries._embedded_entries) as EmbeddedContentTypeUid[])).toEqual([])
        expect(makeFindEntry('', 'conent', reduceToArray(entryEmbeddedEntries._embedded_entries) as EmbeddedContentTypeUid[])).toEqual([])
        expect(makeFindEntry('nons,', 'content_block', reduceToArray(entryEmbeddedEntries._embedded_entries) as EmbeddedContentTypeUid[])).toEqual([])
        done()
    })

    it('Find Embedded Entry no matching uids without embedded Entry test', done => {
        expect(makeFindAsset()).toEqual([])
        expect(makeFindAsset('bltUID')).toEqual([])
        done()
    })

    it('Find Embedded Asset matching uids with embedded asset test', done => {
        expect(makeFindAsset('', (reduceToArray(entryEmbeddedEntries._embedded_assets) as EmbeddedObject[]))).toEqual([])
        expect(makeFindAsset('blttuid', (reduceToArray(entryEmbeddedEntries._embedded_assets) as EmbeddedObject[]))).toEqual([])
        done()
    })

    it('Find Embedded asset and entry matching contents test', done => {
        expect(makeFindEntry('blttitleuid', 'content_block', (reduceToArray(entryEmbeddedEntries._embedded_entries) as EmbeddedContentTypeUid[]))).toEqual([entryEmbeddedEntries._embedded_entries.rich_text_editor[0], entryEmbeddedEntries._embedded_entries.rich_text_editor[0]])
        expect(makeFindAsset('bltassetEmbuid', (reduceToArray(entryEmbeddedEntries._embedded_assets) as EmbeddedObject[]))).toEqual([entryEmbeddedEntries._embedded_assets.rich_text_editor[0], entryEmbeddedEntries._embedded_assets.rich_text_editor[0]])
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
        let renderModels = findEmbeddedObjects(assetRichTextMetadata, entryEmbeddedAssets)
        expect(renderModels).toEqual([entryEmbeddedAssets._embedded_assets.rich_text_editor[0]])
        renderModels = findEmbeddedObjects(entryRichTextMetadata, entryEmbeddedEntries)
        expect(renderModels).toEqual([entryEmbeddedEntries._embedded_entries.rich_text_editor[1], entryEmbeddedEntries._embedded_entries.rich_text_editor[1]])
        done()
    })

    it('Find Render string from undefined objects test', done => {
        const renderString = findRenderString(undefined, entryEmbeddedAssets._embedded_assets.rich_text_editor[0])
        expect(renderString).toEqual('')
        done()
    }) 

    it('Find Render string from default renderOption', done => {
        const renderString = findRenderString(entryRichTextMetadata, entryEmbeddedEntries._embedded_entries.rich_text_editor[0])
        expect(renderString).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })

    it('Find Render string from default renderOption with alternate text', done => {
        const renderString = findRenderString(assetDisplayMetadata, entryEmbeddedAssets._embedded_assets.rich_text_editor[0])
        expect(renderString).toEqual('<img src=\"/v3/assets/blt333/blt44asset/dummy.pdf\" alt=\"{{object.title}}\" />')
        done()
    })

    it('Find Render string from passed renderOption', done => {
        let renderString = findRenderString(entryRichTextMetadata, entryEmbeddedEntries._embedded_entries.rich_text_editor[0], {
            [StyleType.BLOCK]: (entry) => `<div><div>${entry.title || entry.uid}</div><div>Content type: <span>${entry._content_type_uid}</span></div></div>`
        })
        expect(renderString).toEqual('<div><div>Update this title</div><div>Content type: <span>content_block</span></div></div>')

        renderString = findRenderString(entryRichTextMetadata, entryEmbeddedEntries._embedded_entries.rich_text_editor[0], {
            [StyleType.BLOCK]: 
            {
                'embeddedrte':
                (entry) => `<div>${entry.title || entry.uid}<div>Content type: <span>${entry._content_type_uid}</span></div></div>`
            }
        })
        expect(renderString).toEqual('<div>Update this title<div>Content type: <span>content_block</span></div></div>')

        renderString = findRenderString(entryRichTextMetadata, entryEmbeddedEntries._embedded_entries.rich_text_editor[0], {
            [StyleType.BLOCK]: 
            {
                'content-type':
                (entry) => `<div><div>${entry.title || entry.uid}</div><div>Content type: <span>${entry._content_type_uid}</span></div></div>`
            }
        })
        expect(renderString).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })
})

function makeFindEntry(uid: string = '', contentTypeUid: string = '', embeddedEntries?: EmbeddedContentTypeUid[]) {
    return findEmbeddedEntry(uid, contentTypeUid, embeddedEntries)
}

function makeFindAsset(uid: string = '', embeddedAssets?: EmbeddedObject[]) {
    return findEmbeddedAsset(uid, embeddedAssets)
}

function reduceToArray (embedModel: EmbedModel<EmbeddedContentTypeUid| EmbeddedObject>): (EmbeddedContentTypeUid| EmbeddedObject)[]{
    return Object.values(embedModel).reduce((accumulator, value) => accumulator.concat(value), [])
}

