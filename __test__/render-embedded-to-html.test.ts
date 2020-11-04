import { Option } from '../src/options/index';
import { 
    renderContent, 
    render 
} from '../src/render-embedded-objects';
import { 
    embeddedAssetWithRenderOption, 
    embeddedEntriesWithRenderOption, 
    embeddedAssetWithNoRenderOption, 
    embeddedEntriesWithNoRenderOption, 
    embeddedObjectWithMultiRenderOption 
} from './mock/render-options';
import { 
    entryLink, 
    entryBlock, 
    entryInline, 
    assetDisplay
} from './mock/embedded-object-mock';
import { 
    entrymultipleRTE,
    entryAssetRichText,
    entryEmbeddedAssets, 
    entryEmbeddedEntries, 
    entryMultilevelEmbed, 
    entryMultipleRichText,
    entrymultipleRTERenderOption,
    entryAssetRichTextRenderOption
} from './mock/entry-mock';

const NoHTML = 'non html string'
const SimpleHTML = '<h1>Hello</h1> World'
describe('Embedded object render from content', () => {
    it('Render Simple Entry without renderOption', done => {
        const entry = Object.assign({}, entryMultilevelEmbed)
        render({entry, paths: ['rich_text_editor', 'rte'] })
        expect(entry.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entry.rte).toEqual(entrymultipleRTE)
        done()
    })
    it('Render Simple Entry with renderOption', done => {
        const entry = Object.assign({}, entryMultilevelEmbed)
        render({entry, paths:['rich_text_editor', 'rte'], renderOption: embeddedObjectWithMultiRenderOption.renderOption})
        expect(entry.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entry.rte).toEqual(entrymultipleRTERenderOption)
        done()
    })

    it('Render Simple Entry without renderOption and paths', done => {
        const entry = Object.assign({}, entryMultilevelEmbed)
        render({entry})
        expect(entry.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entry.rte).toEqual(entrymultipleRTE)
        done()
    })
    it('Render Simple Entry with renderOption without path', done => {
        const entry = Object.assign({}, entryMultilevelEmbed)
        render({entry, renderOption: embeddedObjectWithMultiRenderOption.renderOption})
        expect(entry.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entry.rte).toEqual(entrymultipleRTERenderOption)
        done()
    })
    
    it('Render Simple Entries without renderOption', done => {
        const entryMultilevel = Object.assign({}, entryMultilevelEmbed)
        const entry = Object.assign({}, entryEmbeddedEntries)

        render({entry: [entry, entryMultilevel], paths: ['rich_text_editor', 'rte']})
        expect(entry.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entry.rte).toEqual(entrymultipleRTE)
        expect(entryMultilevel.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entryMultilevel.rte).toEqual(entrymultipleRTE)
        done()
    })
    it('Render Simple Entries with renderOption', done => {
        const entryMultilevel = Object.assign({}, entryMultilevelEmbed)
        const entry = Object.assign({}, entryEmbeddedEntries)

        render({entry: [entry, entryMultilevel], paths: ['rich_text_editor', 'rte'], renderOption: embeddedObjectWithMultiRenderOption.renderOption})
        expect(entry.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entry.rte).toEqual(entrymultipleRTERenderOption)
        expect(entryMultilevel.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entryMultilevel.rte).toEqual(entrymultipleRTERenderOption)
        done()
    })

    it('Render Simple Entries without renderOption and path', done => {
        const entryMultilevel = Object.assign({}, entryMultilevelEmbed)
        const entry = Object.assign({}, entryEmbeddedEntries)

        render({entry: [entry, entryMultilevel]})
        expect(entry.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entry.rte).toEqual(entrymultipleRTE)
        expect(entryMultilevel.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entryMultilevel.rte).toEqual(entrymultipleRTE)
        done()
    })
    it('Render Simple Entries with renderOption without path', done => {
        const entryMultilevel = Object.assign({}, entryMultilevelEmbed)
        const entry = Object.assign({}, entryEmbeddedEntries)

        render({entry: [entry, entryMultilevel], renderOption: embeddedObjectWithMultiRenderOption.renderOption})
        expect(entry.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entry.rte).toEqual(entrymultipleRTERenderOption)
        expect(entryMultilevel.rich_text_editor).toEqual(entryMultipleRichText)
        expect(entryMultilevel.rte).toEqual(entrymultipleRTERenderOption)
        done()
    })

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
        expect(makeRenderFunction(assetDisplay, embeddedAssetWithNoRenderOption)).toEqual('')
        done()
    })

    it('Render Function string of array with Embedded Entry with Options', done => {
        expect(makeRenderFunction([entryBlock])).toEqual([''])
        expect(makeRenderFunction([entryBlock, entryLink])).toEqual(['', ''])
        done()
    })

    it('Render Function to render Embbedded Asset test', done => {
        expect(makeRenderFunction(entryEmbeddedAssets.rich_text_editor, embeddedAssetWithNoRenderOption)).toEqual(entryAssetRichText)
        done()
    })

    it('Render Function to render Embbedded Asset with render option test', done => {
        expect(makeRenderFunction(entryEmbeddedAssets.rich_text_editor, embeddedAssetWithRenderOption)).toEqual(entryAssetRichTextRenderOption)
        done()
    })

    it('Render Function to render Embedded Entries with out render option test', done => {
        expect(makeRenderFunction(entryEmbeddedEntries.rich_text_editor, embeddedEntriesWithNoRenderOption)).toEqual(entryMultipleRichText)
        done()
    })

    it('Render Function to render Embedded Entries with render option test', done => {
        expect(makeRenderFunction(entryEmbeddedEntries.rich_text_editor, embeddedEntriesWithRenderOption)).toEqual(entryMultipleRichText)
        done()
    })

    it('Render Function to render Embedded Entries with render option test', done => {
        expect(makeRenderFunction([entryEmbeddedEntries.rich_text_editor, entryEmbeddedEntries.rte], embeddedEntriesWithRenderOption)).toEqual([entryMultipleRichText, entrymultipleRTE])
        done()
    })

    it('Render function to render Embedded Entries with Multi-level rendering test', done => {
        expect(makeRenderFunction(entryMultilevelEmbed.rich_text_editor, embeddedObjectWithMultiRenderOption)).toEqual(entryMultipleRichText)
        done()
    })

    it('Render function to render Embedded Entries with Multi-level rendering test', done => {
        expect(makeRenderFunction([entryMultilevelEmbed.rich_text_editor, entryMultilevelEmbed.rte], embeddedObjectWithMultiRenderOption)).toEqual([entryMultipleRichText, entrymultipleRTERenderOption])
        done()
    })
})
function makeRenderFunction(content: string | string[] = '', option: Option = embeddedAssetWithNoRenderOption) {
    return renderContent(content, option)
}