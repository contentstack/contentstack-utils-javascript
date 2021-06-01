import { referenceToHTML } from '../src/json-to-html'
import Node from '../src/nodes/node'
import NodeType from '../src/nodes/node-type'
import { defaultOptions } from '../src/options/default-options'
import { assetReferenceJson, embeddedAssetJsonEntry, embeddedEntryJsonEntry, entryReferenceBlockJson, entryReferenceInlineJson, entryReferenceLinkJson } from './mock/json-element-mock'
import { embeddedAssetWithRenderOption, embeddedObjectDefaultRender, embeddedObjectWithRenderOption } from './mock/render-options'
describe('Reference Node To HTML', () => {
    it('Should return blank for undefined entry', done => {
        const node = assetReferenceJson.children[0] as undefined as Node
        const renderOption = {}

        const resultHTML = referenceToHTML(node, renderOption)

        expect(resultHTML).toEqual('')
        done()
    })

    it('Should return blank for no children', done => {
        const node = {
            "uid": "4f7e333390a955de10c1c836",
            "type": NodeType.REFERENCE,
            "attrs": {
                "display-type": "display",
                "asset-uid": "blt44asset",
                "content-type-uid": "sys_assets",
                "asset-link": "https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg",
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

        const resultHTML = referenceToHTML(node as unknown as Node, renderOption, embeddedAssetJsonEntry)

        expect(resultHTML).toEqual('<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="dummy.pdf" />')
        done()
    })

    it('Should return HTML for embedded asset', done => {
        const node = assetReferenceJson.children[0] as undefined as Node
        const renderOption = {}

        const resultHTML = referenceToHTML(node, renderOption, embeddedAssetJsonEntry)

        expect(resultHTML).toEqual('<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="dummy.pdf" />')
        done()
    })

    it('Should return HTML for embedded block entry', done => {
        const node = entryReferenceBlockJson.children[0] as undefined as Node
        const renderOption = {}

        const resultHTML = referenceToHTML(node, renderOption, embeddedEntryJsonEntry)
        expect(resultHTML).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        done()
    })

    it('Should return HTML for embedded link entry', done => {
        const node = entryReferenceLinkJson.children[0] as undefined as Node
        const renderOption = {}

        const resultHTML = referenceToHTML(node, renderOption, embeddedEntryJsonEntry)
        expect(resultHTML).toEqual('<a href=\"undefined\">/copy-of-entry-final-02</a>')
        done()
    })

    it('Should return HTML for embedded inline entry', done => {
        const node = entryReferenceInlineJson.children[0] as undefined as Node
        const renderOption = {}
        
        const resultHTML = referenceToHTML(node, renderOption, embeddedEntryJsonEntry)
        expect(resultHTML).toEqual('<span>updated title</span>')
        done()
    })

    // Custom render option
    it('Should return custom HTML for embedded asset', done => {
        const node = assetReferenceJson.children[0] as undefined as Node
        const renderOption = embeddedAssetWithRenderOption.renderOption
        
        const resultHTML = referenceToHTML(node, renderOption, embeddedAssetJsonEntry)
        expect(resultHTML).toEqual('<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="Alternet Text" />')
        done()
    })

    it('Should return custom HTML for embedded block entry', done => {
        const node = entryReferenceBlockJson.children[0] as undefined as Node
        const renderOption = embeddedObjectWithRenderOption.renderOption
        
        const resultHTML = referenceToHTML(node, renderOption, embeddedEntryJsonEntry)
        expect(resultHTML).toEqual('<div><div>Update this title</div></div>')
        done()
    })

    it('Should return custom HTML for embedded inline entry', done => {
        const node = entryReferenceInlineJson.children[0] as undefined as Node
        const renderOption = embeddedObjectWithRenderOption.renderOption
        
        const resultHTML = referenceToHTML(node, renderOption, embeddedEntryJsonEntry)
        expect(resultHTML).toEqual('<div><div>blttitleUpdateUID</div></div>')
        done()
    })

    it('Should return custom default HTML for embedded inline entry', done => {
        const node = entryReferenceBlockJson.children[0] as undefined as Node
        const renderOption = embeddedObjectDefaultRender.renderOption
        
        const resultHTML = referenceToHTML(node, renderOption, embeddedEntryJsonEntry)
        expect(resultHTML).toEqual(`<div>
            <div>Update this title</div>
            <div><span>blttitleuid</span>
            </div>`)
        done()
    })
})