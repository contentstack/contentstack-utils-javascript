
import { referenceToHTML } from '../src/helper/enumerate-entries'
import { findEmbeddedItems } from '../src/helper/find-embeded-object'
import { Metadata } from '../src/Models/metadata-model'
import Node from '../src/nodes/node'
import NodeType from '../src/nodes/node-type'
import { Next, RenderOption } from '../src/options'
import { defaultNodeOption } from '../src/options/default-node-options'
import { defaultOptions } from '../src/options/default-options'
import { assetReferenceJson, embeddedAssetJsonEntry, embeddedEntryJsonEntry, entryReferenceBlockJson, entryReferenceInlineJson, entryReferenceLinkJson } from './mock/json-element-mock'
import { embeddedAssetWithRenderOption, embeddedObjectDefaultRender, embeddedObjectWithRenderOption } from './mock/render-options'
describe('Reference Node To HTML', () => {
    it('Should return blank for undefined entry', done => {
        const node = assetReferenceJson.children[0] as unknown as Node
        const renderOption = {}

        const resultHTML = referenceToHTML(node, renderOption)

        expect(resultHTML).toEqual('')
        done()
    })

    it('Should return blank for no children', done => {
        const node = {
            "uid": "node_uid_1",
            "type": NodeType.REFERENCE,
            "attrs": {
                "display-type": "display",
                "asset-uid": "asset_uid_1",
                "content-type-uid": "sys_assets",
                "asset-link": "https://image.url/11.jpg",
                "asset-name": "11.jpg",
                "asset-type": "image/jpeg",
                "type": "asset",
                "class-name": "embedded-asset",
                "width": 25.16914749661705,
                "className": "dsd",
                "id": "sdf"
            }
        }
        const renderOption = {}

        const resultHTML = referenceToHTML(node as unknown as Node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedAssetJsonEntry)[0]
        })

        expect(resultHTML).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />')
        done()
    })

    it('Should return HTML for embedded asset', done => {
        const node = assetReferenceJson.children[0] as unknown as Node
        const renderOption = {}

        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedAssetJsonEntry)[0]
        })

        expect(resultHTML).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />')
        done()
    })

    it('Should return HTML for embedded block entry', done => {
        const node = entryReferenceBlockJson.children[0] as unknown as Node
        const renderOption = {}

        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedEntryJsonEntry)[0]
        })
        expect(resultHTML).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })

    it('Should return HTML for embedded link entry', done => {
        const node = entryReferenceLinkJson.children[0] as unknown as Node
        const renderOption = {}

        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedEntryJsonEntry)[0]
        })
        expect(resultHTML).toEqual('<a href=\"undefined\">/copy-of-entry-final-02</a>')
        done()
    })

    it('Should return HTML for embedded inline entry', done => {
        const node = entryReferenceInlineJson.children[0] as unknown as Node
        const renderOption = {}
        
        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedEntryJsonEntry)[0]
        })
        expect(resultHTML).toEqual('<span>updated title</span>')
        done()
    })

    // Custom render option
    it('Should return custom HTML for embedded asset', done => {
        const node = assetReferenceJson.children[0] as unknown as Node
        const renderOption = embeddedAssetWithRenderOption.renderOption as RenderOption
        
        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedAssetJsonEntry)[0]
        })
        expect(resultHTML).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="Alternet Text" />')
        done()
    })

    it('Should return custom HTML for embedded block entry', done => {
        const node = entryReferenceBlockJson.children[0] as unknown as Node
        const renderOption = embeddedObjectWithRenderOption.renderOption as RenderOption
        
        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedEntryJsonEntry)[0]
        })
        expect(resultHTML).toEqual('<div><div>Update this title</div></div>')
        done()
    })

    it('Should return custom HTML for embedded inline entry', done => {
        const node = entryReferenceInlineJson.children[0] as unknown as Node
        const renderOption = embeddedObjectWithRenderOption.renderOption as RenderOption
        
        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedEntryJsonEntry)[0]
        })
        expect(resultHTML).toEqual('<div><div>titleUpdateUID</div></div>')
        done()
    })

    it('Should return custom default HTML for embedded inline entry', done => {
        const node = entryReferenceBlockJson.children[0] as unknown as Node
        const renderOption = embeddedObjectDefaultRender.renderOption as RenderOption
        
        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, embeddedEntryJsonEntry)[0]
        })
        expect(resultHTML).toEqual(`<div>
            <div>Update this title</div>
            <div><span>entry_uid_16</span>
            </div>`)
        done()
    })

    it('Should return image for undefined node asset', done => {
        const node = assetReferenceJson.children[0] as unknown as Node
        const renderOption = {
            'reference' : (node: Node, next: Next) => {
                return `<img src=${node.attrs['asset-link']}>`;
            }
        }

        const resultHTML = referenceToHTML(node, renderOption)
        expect(resultHTML).toEqual('<img src=https://image.url/11.jpg>')
        done()
    })
    it('Should return image for undefined node asset from default node option', done => {
        const node = assetReferenceJson.children[0] as unknown as Node

        const resultHTML = referenceToHTML(node, defaultNodeOption)
        expect(resultHTML).toEqual('<img id=\"sdf\" src="https://image.url/11.jpg" />')
        done()
    })
    
    it('Should return HTML for embedded link entry', done => {
        const node = entryReferenceLinkJson.children[0] as unknown as Node
        const renderOption = {
            'reference' : (node: Node, next: Next) => {
                return `<a href=\"${node.attrs['entry-uid']}\">${node.attrs.href}</a>`;
            }
        }

        const resultHTML = referenceToHTML(node, renderOption, (metadata: Metadata) => {
            return findEmbeddedItems(metadata, { uid: 'uid' })[0]
        })
        expect(resultHTML).toEqual('<a href=\"entry_uid_20\">/copy-of-entry-final-02</a>')
        done()
    })
})