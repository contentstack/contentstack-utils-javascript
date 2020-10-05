
import { AssetModel } from '../src/Models/asset-model';
import { entryEmbeddedEntries, entryEmbeddedAssets, assetRichTextJson, entryRichTextJson } from './mock/entry-mock';
import { ContentTypeEntry, Entry } from '../src/Models/entry-model';
import { assetDownloadJson, assetDisplayJson } from './mock/embedded-object-mock';
import { EmbeddedAsset, EmbedAttributes } from '../src/Models/embed-attributes-model';
import { findEmbeddedEntry, findEmbeddedAsset, findRenderString, findEmbeddedObjects } from '../src/helper/find-embeded-object';
import { RenderObject } from '../src/options/index';
import ENTRY from '../src/embedded-types/entry';
import ASSET from '../src/embedded-types/asset';
describe('Embedded object render from content', () => {
    it('Find Embedded Entry no matching uids with blank embedded Entry test', done => {
        expect(makeFindEntry()).toEqual([])
        expect(makeFindEntry('bltUID')).toEqual([])
        expect(makeFindEntry('bltUID', 'Content_type_not_forUID')).toEqual([])
        done()
    })

    it('Find Embedded Entry no matching uids with embedded Entry test', done => {
        expect(makeFindEntry('', '', entryEmbeddedEntries._embedded_entries)).toEqual([])
        expect(makeFindEntry('blttitleuid', 'conent', entryEmbeddedEntries._embedded_entries)).toEqual([])
        expect(makeFindEntry('blttitleuid', '', entryEmbeddedEntries._embedded_entries)).toEqual([])
        expect(makeFindEntry('', 'conent', entryEmbeddedEntries._embedded_entries)).toEqual([])
        expect(makeFindEntry('nons,', 'content_block', entryEmbeddedEntries._embedded_entries)).toEqual([])
        done()
    })

    it('Find Embedded Entry no matching uids without embedded Entry test', done => {
        expect(makeFindAsset()).toEqual([])
        expect(makeFindAsset('bltUID')).toEqual([])
        done()
    })

    it('Find Embedded Asset matching uids with embedded asset test', done => {
        expect(makeFindAsset('', entryEmbeddedEntries._embedded_assets)).toEqual([])
        expect(makeFindAsset('blttuid', entryEmbeddedEntries._embedded_assets)).toEqual([])
        done()
    })

    it('Find Embedded asset and entry matching contents test', done => {
        expect(makeFindEntry('blttitleuid', 'content_block', entryEmbeddedEntries._embedded_entries)).toEqual([entryEmbeddedEntries._embedded_entries[0]])
        expect(makeFindAsset('bltassetEmbuid', entryEmbeddedEntries._embedded_assets)).toEqual([entryEmbeddedEntries._embedded_assets[0]])
        done()
    })

    it('Find EmbedObject from undefinded data test', done => {
        let renderModels = findEmbeddedObjects(undefined, entryEmbeddedAssets)
        expect(renderModels).toEqual([])
        renderModels = findEmbeddedObjects(assetDownloadJson as unknown as EmbedAttributes, undefined)
        expect(renderModels).toEqual([])
        renderModels = findEmbeddedObjects(undefined, undefined)
        expect(renderModels).toEqual([])
        done()
    })

    it('Find EmbedObject from embed asset test', done => {
        let renderModels = findEmbeddedObjects(assetRichTextJson as unknown as EmbedAttributes, entryEmbeddedAssets)
        expect(renderModels).toEqual([entryEmbeddedAssets._embedded_assets[0]])
        renderModels = findEmbeddedObjects(entryRichTextJson as unknown as EmbedAttributes, entryEmbeddedEntries)
        expect(renderModels).toEqual([entryEmbeddedEntries._embedded_entries[1]])
        done()
    })

    it('Find Render string from undefined objects test', done => {
        let renderString = findRenderString(undefined, entryEmbeddedAssets._embedded_assets[0])
        expect(renderString).toEqual('')
        renderString = findRenderString(assetDownloadJson as unknown as EmbedAttributes, undefined)
        expect(renderString).toEqual('')
        renderString = findRenderString(assetDownloadJson as unknown as EmbedAttributes, entryEmbeddedAssets._embedded_assets[0], undefined)
        expect(renderString).toEqual('<a href=\"/v3/assets/blt333/blt44asset/dummy.pdf\"> {{title}}\n</a>')
        renderString = findRenderString(assetDownloadJson as unknown as EmbedAttributes, entryEmbeddedAssets._embedded_assets[0], { [ENTRY.BLOCK]: () => ''})
        expect(renderString).toEqual('<a href=\"/v3/assets/blt333/blt44asset/dummy.pdf\"> {{title}}\n</a>')
        done()
    }) 

    it('Find Render string from default renderOption', done => {
        let renderString = findRenderString(assetDownloadJson as unknown as EmbedAttributes, entryEmbeddedAssets._embedded_assets[0])
        expect(renderString).toEqual('<a href=\"/v3/assets/blt333/blt44asset/dummy.pdf\"> {{title}}\n</a>')
        renderString = findRenderString(entryRichTextJson as unknown as EmbedAttributes, entryEmbeddedEntries._embedded_entries[0])
        expect(renderString).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })

    it('Find Render string from default renderOption with alternate text', done => {
        const renderString = findRenderString(assetDisplayJson as unknown as EmbedAttributes, entryEmbeddedAssets._embedded_assets[0])
        expect(renderString).toEqual('<img src=\"/v3/assets/blt333/blt44asset/dummy.pdf\" alt=\"{{object.title}}\" />')
        done()
    })

    it('Find Render string from passed renderOption', done => {
        let renderString = findRenderString(assetDownloadJson as unknown as EmbedAttributes, entryEmbeddedAssets._embedded_assets[0], {
            [ASSET.DOWNLOADABLE]: (asset) => `<a href="${asset.url}">${asset.title || asset.filename || asset.uid}</a>`
        })
        expect(renderString).toEqual('<a href=\"/v3/assets/blt333/blt44asset/dummy.pdf\">dummy.pdf</a>')

        renderString = findRenderString(entryRichTextJson as unknown as EmbedAttributes, entryEmbeddedEntries._embedded_entries[0], {
            [ENTRY.BLOCK]: (entry) => `<div><div>${entry.title || entry.uid}</div><div>Content type: <span>${entry._content_type_uid}</span></div></div>`
        })
        expect(renderString).toEqual('<div><div>Update this title</div><div>Content type: <span>content_block</span></div></div>')

        renderString = findRenderString(entryRichTextJson as unknown as EmbedAttributes, entryEmbeddedEntries._embedded_entries[0], {
            [ENTRY.BLOCK]: 
            {
                'embeddedrte':
                (entry) => `<div>${entry.title || entry.uid}<div>Content type: <span>${entry._content_type_uid}</span></div></div>`
            }
        })
        expect(renderString).toEqual('<div>Update this title<div>Content type: <span>content_block</span></div></div>')

        renderString = findRenderString(entryRichTextJson as unknown as EmbedAttributes, entryEmbeddedEntries._embedded_entries[0], {
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

