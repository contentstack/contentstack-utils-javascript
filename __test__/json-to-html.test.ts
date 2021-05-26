import { jsonToHTML, parseJsonToHTML } from '../src/json-to-html'
import Document from '../src/nodes/document'
import { plainEntry, plainJsonArrayEntry } from './mock/json-element-mock'

describe('Node parser', () => {
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
        const entry = {...plainEntry}

        jsonToHTML({entry, paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual('')
        done()
    })

    it('Should render Json To html for Array of Entries',  done => {
        const entry = {...plainEntry}

        jsonToHTML({entry: [entry], paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual('')
        done()
    })

    it('Should render array Json To array html',  done => {
        const entry = {...plainJsonArrayEntry}

        jsonToHTML({entry, paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual([''])
        done()
    })

    it('Should render array Json To array html for array of Entries',  done => {
        const entry = {...plainJsonArrayEntry}

        jsonToHTML({entry: [entry], paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual([''])
        done()
    })

    it('Should parse Json to HTML', done => {
        const htmlString = parseJsonToHTML(plainEntry.rich_text_editor as Document)

        expect(htmlString).toEqual('')
        done()
    })
})