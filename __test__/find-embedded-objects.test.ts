import { EmbeddedItem, EmbedModel } from '../src/Models/embedded-object'
import { entryEmbeddedEntries, entryEmbeddedAssets, assetRichTextJson, entryRichTextJson } from './mock/entry-mock';
import { assetDisplayJson } from './mock/embedded-object-mock';
import { Attributes, createMetadata, Metadata } from '../src/Models/metadata-model';
import { findEmbeddedEntry, findEmbeddedAsset, findRenderString, findEmbeddedItems } from '../src/helper/find-embeded-object';
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
        expect(makeFindEntry('', '', reduceToArray(entryEmbeddedEntries._embedded_items))).toEqual([])
        expect(makeFindEntry('blttitleuid', 'conent', reduceToArray(entryEmbeddedEntries._embedded_items))).toEqual([])
        expect(makeFindEntry('blttitleuid', '', reduceToArray(entryEmbeddedEntries._embedded_items))).toEqual([])
        expect(makeFindEntry('', 'conent', reduceToArray(entryEmbeddedEntries._embedded_items))).toEqual([])
        expect(makeFindEntry('nons,', 'content_block', reduceToArray(entryEmbeddedEntries._embedded_items))).toEqual([])
        done()
    })

    it('Find Embedded Entry no matching uids without embedded Entry test', done => {
        expect(makeFindAsset()).toEqual([])
        expect(makeFindAsset('bltUID')).toEqual([])
        done()
    })

    it('Find Embedded Asset matching uids with embedded asset test', done => {
        expect(makeFindAsset('', (reduceToArray(entryEmbeddedEntries._embedded_items) as EmbeddedItem[]))).toEqual([])
        expect(makeFindAsset('blttuid', (reduceToArray(entryEmbeddedEntries._embedded_items) as EmbeddedItem[]))).toEqual([])
        done()
    })

    it('Find Embedded asset and entry matching contents test', done => {
        expect(makeFindEntry('blttitleuid', 'content_block', (reduceToArray(entryEmbeddedEntries._embedded_items)))).toEqual([entryEmbeddedEntries._embedded_items.rich_text_editor[0], entryEmbeddedEntries._embedded_items.rich_text_editor[0]])
        expect(makeFindAsset('bltassetEmbuid', (reduceToArray(entryEmbeddedEntries._embedded_items) as EmbeddedItem[]))).toEqual([entryEmbeddedEntries._embedded_items.rich_text_editor[3], entryEmbeddedEntries._embedded_items.rich_text_editor[3]])
        done()
    })

    it('Find EmbedObject from undefinded data test', done => {
        let renderModels = findEmbeddedItems(undefined, entryEmbeddedAssets)
        expect(renderModels).toEqual([])
        renderModels = findEmbeddedItems(undefined, undefined)
        expect(renderModels).toEqual([])
        done()
    })

    it('Find EmbedObject from embed asset test', done => {
        let renderModels = findEmbeddedItems(assetRichTextMetadata, entryEmbeddedAssets)
        expect(renderModels).toEqual([entryEmbeddedAssets._embedded_items.rich_text_editor[0]])
        renderModels = findEmbeddedItems(entryRichTextMetadata, entryEmbeddedEntries)
        expect(renderModels).toEqual([entryEmbeddedEntries._embedded_items.rich_text_editor[1], entryEmbeddedEntries._embedded_items.rich_text_editor[1]])
        done()
    })

    it('Find Render string from undefined objects test', done => {
        
        const renderString = findRenderString(entryEmbeddedAssets._embedded_items.rich_text_editor[0], undefined)
        expect(renderString).toEqual('')
        done()
    }) 

    it('Find Render string from default renderOption', done => {
        const renderString = findRenderString(entryEmbeddedEntries._embedded_items.rich_text_editor[0], entryRichTextMetadata)
        expect(renderString).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })

    it('Find Render string from default renderOption with alternate text', done => {
        const renderString = findRenderString(entryEmbeddedAssets._embedded_items.rich_text_editor[0], assetDisplayMetadata)
        expect(renderString).toEqual('<img src=\"/v3/assets/blt333/blt44asset/dummy.pdf\" alt=\"{{object.title}}\" />')
        done()
    })

    it('Find Render string from passed renderOption', done => {
        let renderString = findRenderString(entryEmbeddedEntries._embedded_items.rich_text_editor[0], entryRichTextMetadata, {
            [StyleType.BLOCK]: (item:EmbeddedItem, metadata: Metadata) => `<div><div>${item.title || item.uid}</div><div>Content type: <span>${item._content_type_uid}</span></div></div>`
        })
        expect(renderString).toEqual('<div><div>Update this title</div><div>Content type: <span>content_block</span></div></div>')
        
        renderString = findRenderString(entryEmbeddedEntries._embedded_items.rich_text_editor[0], entryRichTextMetadata, {
            [StyleType.BLOCK]: 
            {
                'embeddedrte':
                (item:EmbeddedItem, metadata: Metadata) => `<div>${item.title || item.uid}<div>Content type: <span>${item._content_type_uid}</span></div></div>`
            }
        })
        expect(renderString).toEqual('<div>Update this title<div>Content type: <span>content_block</span></div></div>')

        renderString = findRenderString(entryEmbeddedEntries._embedded_items.rich_text_editor[0], entryRichTextMetadata, {
            [StyleType.BLOCK]: 
            {
                'content-type':
                (item:EmbeddedItem, metadata: Metadata) => `<div><div>${item.title || item.uid}</div><div>Content type: <span>${item._content_type_uid}</span></div></div>`
            }
        })
        expect(renderString).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })
})

function makeFindEntry(uid: string = '', contentTypeUid: string = '', embeddeditems?: EmbeddedItem[]) {
    return findEmbeddedEntry(uid, contentTypeUid, embeddeditems)
}

function makeFindAsset(uid: string = '', embeddedAssets?: EmbeddedItem[]) {
    return findEmbeddedAsset(uid, embeddedAssets)
}

function reduceToArray (embedModel: EmbedModel<EmbeddedItem>): EmbeddedItem[]{
    return Object.values(embedModel).reduce((accumulator, value) => accumulator.concat(value), [])
}

