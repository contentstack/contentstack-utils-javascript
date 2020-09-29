
import { renderContent } from '../src/render-embedded-objects';
import { Options } from '../src/options/index';
import { embeddedAssetWithNoRenderOption, embeddedAssetWithRenderOption, embeddedEntriesWithNoRenderOption, embeddedEntriesWithRenderOption, embeddedObjectWithMultiRenderOption } from './mock/render-options';
import { entryBlock, entryLink, entryInline, assetDownload, assetDisplay } from './mock/embedded-object-mock';
import { entryEmbeddedAssets, entryEmbeddedEntries, entryMultilevelEmbed } from './mock/entry-mock';

const NoHTML = 'non html string'
const SimpleHTML = '<h1>Hello</h1> World'

describe('Embedded object render from content', () => {
    it('Render function with blank content and options test', done => {
        expect(makeRenderFunction(undefined)).toEqual('')
        expect(makeRenderFunction()).toEqual('')
        expect(makeRenderFunction([''])).toEqual([''])
        done()
    })

    it('Render function with non html content', done => {
        expect(makeRenderFunction(NoHTML)).toEqual(NoHTML)
        expect(makeRenderFunction([NoHTML])).toEqual([NoHTML])
        done()
    })

    it('Render function with html content without Embedded object', done => {
        expect(makeRenderFunction(SimpleHTML)).toEqual(SimpleHTML)
        expect(makeRenderFunction([SimpleHTML])).toEqual([SimpleHTML])
        done()
    })

    // content as array of string tests
    it('Render function with non html content and blanks', done => {
        expect(makeRenderFunction([NoHTML, ''])).toEqual([NoHTML, ''])
        expect(makeRenderFunction([SimpleHTML, NoHTML])).toEqual([SimpleHTML, NoHTML])
        done()
    })

    it('Render Function with Embedded Entry without Options', done => {
        expect(makeRenderFunction(entryBlock)).toEqual('')
        expect(makeRenderFunction(entryLink)).toEqual('')
        expect(makeRenderFunction(entryInline)).toEqual('')
        done()
    })

    it('Render Function with Embedded Asset without Options test', done => {
        expect(makeRenderFunction(assetDownload)).toEqual('')
        expect(makeRenderFunction(assetDisplay)).toEqual('')
        done()
    })

    it('Render Function with Embedded Entry with Options', done => {
        expect(makeRenderFunction(entryBlock, embeddedAssetWithNoRenderOption)).toEqual('')
        expect(makeRenderFunction(entryLink, embeddedAssetWithNoRenderOption)).toEqual('')
        expect(makeRenderFunction(entryInline, embeddedAssetWithNoRenderOption)).toEqual('')
        done()
    })

    it('Render Function with Embedded Asset with Options test', done => {
        expect(makeRenderFunction(assetDownload, embeddedAssetWithNoRenderOption)).toEqual('')
        expect(makeRenderFunction(assetDisplay, embeddedAssetWithNoRenderOption)).toEqual('')
        done()
    })

    it('Render Function string of array with Embedded Entry with Options', done => {
        expect(makeRenderFunction([entryBlock])).toEqual([''])
        expect(makeRenderFunction([entryBlock, entryLink])).toEqual(['', ''])
        done()
    })

    it('Render Function with Embedded Asset with Options test', done => {
        expect(makeRenderFunction([assetDownload])).toEqual([''])
        expect(makeRenderFunction([assetDownload, assetDisplay])).toEqual(['', ''])
        done()
    })

    it('Render Function to render Embbedded Asset test', done => {
        expect(makeRenderFunction(entryEmbeddedAssets.rich_text_editor, embeddedAssetWithNoRenderOption)).toEqual(`<p>&nbsp;</p>
<img src=\"/v3/assets/blt333/blt44asset/dummy.pdf\" alt=\"dummy.pdf\" />
<img data-image=\"236uaymkloww\" src=\"https://contentstack.image/v3/assets/blt333/c/5f47707a1cef380a7a669416/html5.png\" data-sys-asset-uid=\"blt222\" alt=\"html5.png\">
<p></p>
<img src=\"/v3/assets/blt333/blt9844/5f59f360d33e9a0a3571b707/svg-logo-text.png\" alt=\"svg-logo-text.png\" />`)
        done()
    })

    it('Render Function to render Embbedded Asset with render option test', done => {
        expect(makeRenderFunction(entryEmbeddedAssets.rich_text_editor, embeddedAssetWithRenderOption)).toEqual(`<p>&nbsp;</p>
<img src=\"/v3/assets/blt333/blt44asset/dummy.pdf\" alt=\"Alternet Text\" />
<img data-image=\"236uaymkloww\" src=\"https://contentstack.image/v3/assets/blt333/c/5f47707a1cef380a7a669416/html5.png\" data-sys-asset-uid=\"blt222\" alt=\"html5.png\">
<p></p>
<img src=\"/v3/assets/blt333/blt9844/5f59f360d33e9a0a3571b707/svg-logo-text.png\" alt=\"Alternet Text\" />`)
        done()
    })

    it('Render Function to render Embedded Entries with out render option test', done => {
        expect(makeRenderFunction(entryEmbeddedEntries.rich_text_editor, embeddedEntriesWithNoRenderOption)).toEqual(`<div><p>updated title</p><p>Content type: <span>embeddedrte</span></p></div>
<p></p>
<img src=\"/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png\" alt=\"svg-logo-text.png\" />`)
        done()
    })

    it('Render Function to render Embedded Entries with render option test', done => {
        expect(makeRenderFunction(entryEmbeddedEntries.rich_text_editor, embeddedEntriesWithRenderOption)).toEqual(`<div><p>updated title</p><p>Content type: <span>embeddedrte</span></p></div>
<p></p>
<img src=\"/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png\" alt=\"svg-logo-text.png\" />`)
        done()
    })

    it('Render Function to render Embedded Entries with render option test', done => {
        expect(makeRenderFunction([entryEmbeddedEntries.rich_text_editor, entryEmbeddedEntries.rte], embeddedEntriesWithRenderOption)).toEqual([
            `<div><p>updated title</p><p>Content type: <span>embeddedrte</span></p></div>
<p></p>
<img src=\"/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png\" alt=\"svg-logo-text.png\" />`, 
        `<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>
<span>Entry with embedded entry</span>
<p></p>`])
        done()
    })

    it('Render function to render Embedded Entries with Multi-level rendering test', done => {
        expect(makeRenderFunction(entryMultilevelEmbed.rich_text_editor, embeddedObjectWithMultiRenderOption)).toEqual(`<div><p>updated title</p><p>Content type: <span>embeddedrte</span></p></div>
<p></p>
<img src=\"/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png\" alt=\"svg-logo-text.png\" />`)
        done()
    })

    it('Render function to render Embedded Entries with Multi-level rendering test', done => {
        expect(makeRenderFunction([entryMultilevelEmbed.rich_text_editor, entryMultilevelEmbed.rte], embeddedObjectWithMultiRenderOption)).toEqual([`<div><p>updated title</p><p>Content type: <span>embeddedrte</span></p></div>
<p></p>
<img src=\"/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png\" alt=\"svg-logo-text.png\" />`, 
`<div>
            <div>Update this title</div>
            <div><span>blttitleuid</span>
            </div>
<div>
            <div>bltemmbedEntryUID</div>
            <MYCONTENT><div><p>blt1234CtUID</p><p>Content type: <span>1234</span></p></div>
<span>blt1234CtUID</span>
<p><br><br></p>
<img src=\"undefined\" alt=\"blt1234AssetUID\" /></MYCONTENT>
            </div>
<p></p>`])
        done()
    })
})
function makeRenderFunction(content: string | string[] = '', option: Options = embeddedAssetWithNoRenderOption) {
    return renderContent(content, option)
}