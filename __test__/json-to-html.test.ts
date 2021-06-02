import { jsonToHTML } from '../src/json-to-html'
import { embeddedAssetJsonEntry, paragraphEntry, paragraphJsonArrayEntry } from './mock/json-element-mock'
import { embeddedAssetWithRenderOption } from './mock/render-options'

describe('Node parser paragraph content', () => {
    it('Should accept proper values', done => {
        const entry = { uid: 'uid'}

        jsonToHTML({ entry, paths: [] })

        expect(entry.uid).toEqual('uid')
        done()
    })

    it('Should return content for non JSON RTE', done => {
        const entry = { uid: 'uid', normalText: 'text'}

        jsonToHTML({entry, paths: ['normalText']})

        expect(entry.normalText).toEqual('text')
        done()
    })

    it('Should render Json To html',  done => {
        const entry = {...paragraphEntry}

        jsonToHTML({entry, paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual('<p>text</p>')
        done()
    })

    it('Should render Json To html for Array of Entries',  done => {
        const entry = {...paragraphEntry}

        jsonToHTML({entry: [entry], paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual('<p>text</p>')
        done()
    })

    it('Should render array Json To array html',  done => {
        const entry = {...paragraphJsonArrayEntry}

        jsonToHTML({entry, paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual(['<p>text</p>'])
        done()
    })

    it('Should render array Json To array html for array of Entries',  done => {
        const entry = {...paragraphJsonArrayEntry}

        jsonToHTML({entry: [entry], paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual(['<p>text</p>'])
        done()
    })
})

describe('Node parser reference content', () => {
    it('Should render reference asset to html from Entry',  done => {
        const entry = {...embeddedAssetJsonEntry}

        jsonToHTML({entry, paths: ['rich_text_editor', 'rte']})

        expect(entry.rich_text_editor).toEqual('<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="dummy.pdf" />')
        expect(entry.rte).toEqual(['<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="dummy.pdf" />'])
        done()
    })

    it('Should render reference asset to html from Entries',  done => {
        const entry = [{ ...embeddedAssetJsonEntry }]

        jsonToHTML({entry, paths: ['rich_text_editor', 'rte']})

        expect(entry[0].rich_text_editor).toEqual('<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="dummy.pdf" />')
        expect(entry[0].rte).toEqual(['<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="dummy.pdf" />'])
        done()
    })

    it('Should render reference asset to html from Entry with custom render option',  done => {
        const entry = {...embeddedAssetJsonEntry}

        jsonToHTML({entry, paths: ['rich_text_editor', 'rte'], renderOption: embeddedAssetWithRenderOption.renderOption})

        expect(entry.rich_text_editor).toEqual('<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="Alternet Text" />')
        expect(entry.rte).toEqual(['<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="Alternet Text" />'])
        done()
    })

    it('Should render reference asset to html from Entries with custom render option',  done => {
        const entry = [{ ...embeddedAssetJsonEntry }]

        jsonToHTML({entry, paths: ['rich_text_editor', 'rte'], renderOption: embeddedAssetWithRenderOption.renderOption})

        expect(entry[0].rich_text_editor).toEqual('<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="Alternet Text" />')
        expect(entry[0].rte).toEqual(['<img src="/v3/assets/blt333/blt44asset/dummy.pdf" alt="Alternet Text" />'])
        done()
    })
})