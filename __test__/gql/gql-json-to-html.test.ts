import { GQL } from '../../src/gql'
import Document from '../../src/nodes/document'
import { EmbeddedItem } from '../../src/Models/embedded-object'
import { EmbeddedConnection } from '../../src/Models/json-rte-model'
import { embeddedItemsConnection } from '../mock/gql-json-element-mock'
import { 
    assetReferenceJson, 
    blockquoteJson, 
    codeJson, 
    entryReferenceBlockJson, 
    entryReferenceInlineJson, 
    entryReferenceLinkJson, 
    h1Json, 
    h2Json, 
    h3Json, 
    h4Json, 
    h5Json, 
    h6Json, 
    imgJson, 
    linkInPJson, 
    orderListJson, 
    paragraphJson, 
    plainTextJson, 
    tableJson, 
    unorderListJson 
} from '../mock/json-element-mock'
import { 
    blockquoteHtml, 
    codeHtml, 
    h1Html, 
    h2Html, 
    h3Html, 
    h4Html,
    h5Html, 
    h6Html, 
    imgHtml, 
    linkInPHtml, 
    orderListHtml, 
    paragraphHtml, 
    plainTextHtml, 
    tableHtml, 
    unorderListHtml 
} from '../mock/json-element-mock-result'

const paths = ["single_rte", "multiple_rte"]

describe('GQL Json To HTML', () => {
    it('Should accept proper values', done => {
        const entry = { uid: 'uid'}

        GQL.jsonToHTML({ entry, paths: [] })

        expect(entry.uid).toEqual('uid')
        done()
    })

    it('Should return content for non JSON RTE', done => {
        const entry = { uid: 'uid', normalText: 'text'}

        GQL.jsonToHTML({entry, paths: ['normalText']})

        expect(entry.normalText).toEqual('text')
        done()
    })

    it('Should render Json To html',  done => {
        const entry = gqlEntry(paragraphJson as unknown as Document)

        GQL.jsonToHTML({entry, paths})

        expect(entry.single_rte).toEqual(paragraphHtml)
        expect(entry.multiple_rte).toEqual([paragraphHtml])        
        done()
    })

    it('Should render Json To html for Array of Entries',  done => {
        const entry = gqlEntry(paragraphJson as unknown as Document, {} as EmbeddedConnection)

        GQL.jsonToHTML({entry: [entry], paths})

        expect(entry.single_rte).toEqual(paragraphHtml)
        expect(entry.multiple_rte).toEqual([paragraphHtml])  
        done()
    })
})

describe('Node parser reference content', () => {
    it('Should render reference asset to html from Entry',  done => {
        const entry = gqlEntry(assetReferenceJson as unknown as Document, embeddedItemsConnection)

        GQL.jsonToHTML({entry, paths})

        expect(entry.single_rte).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />')
        expect(entry.multiple_rte).toEqual(['<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />'])
        done()
    })

    it('Should render reference asset to html from Entries',  done => {
        const entry = [gqlEntry(assetReferenceJson as unknown as Document, embeddedItemsConnection)]

        GQL.jsonToHTML({entry, paths})

        expect(entry[0].single_rte).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />')
        expect(entry[0].multiple_rte).toEqual(['<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />'])
        done()
    })

    it('Should render reference entry Block to html from Entries',  done => {
        const entry = [gqlEntry(entryReferenceBlockJson as unknown as Document, embeddedItemsConnection)]

        GQL.jsonToHTML({entry, paths})

        expect(entry[0].single_rte).toEqual('<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>')
        expect(entry[0].multiple_rte).toEqual(['<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>'])
        done()
    })

    it('Should render reference entry link to html from Entries',  done => {
        const entry = [gqlEntry(entryReferenceLinkJson as unknown as Document, embeddedItemsConnection)]

        GQL.jsonToHTML({entry, paths})

        expect(entry[0].single_rte).toEqual('<a href=\"/copy-of-entry-final-02\" target=\"_self\">/copy-of-entry-final-02</a>')
        expect(entry[0].multiple_rte).toEqual(['<a href=\"/copy-of-entry-final-02\" target=\"_self\">/copy-of-entry-final-02</a>'])
        done()
    })

    it('Should render reference entry inline to html from Entries',  done => {
        const entry = [gqlEntry(entryReferenceInlineJson as unknown as Document, embeddedItemsConnection)]

        GQL.jsonToHTML({entry, paths})

        expect(entry[0].single_rte).toEqual('<span>updated title</span>')
        expect(entry[0].multiple_rte).toEqual(['<span>updated title</span>'])
        done()
    })
})

describe('GQL parse text Content', () => {
    it('Should return all text wrapped patterns', done => {
        const entry = gqlEntry(plainTextJson as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(plainTextHtml)
        expect(entry.multiple_rte).toEqual([plainTextHtml])
        done()
    })
})

describe('GQL parse headers content', () => {
    it('Should return h1 html string', done => {
        const entry = gqlEntry(h1Json as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(h1Html)
        expect(entry.multiple_rte).toEqual([h1Html])
        done()
    })
    it('Should return h2 html string', done => {
        const entry = gqlEntry(h2Json as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(h2Html)
        expect(entry.multiple_rte).toEqual([h2Html])
        done()
    })
    it('Should return h3 html string', done => {
        const entry = gqlEntry(h3Json as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(h3Html)
        expect(entry.multiple_rte).toEqual([h3Html])
        done()
    })
    it('Should return h4 html string', done => {
        const entry = gqlEntry(h4Json as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(h4Html)
        expect(entry.multiple_rte).toEqual([h4Html])
        done()
    })
    it('Should return h5 html string', done => {
        const entry = gqlEntry(h5Json as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(h5Html)
        expect(entry.multiple_rte).toEqual([h5Html])
        done()
    })
    it('Should return h6 html string', done => {
        const entry = gqlEntry(h6Json as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(h6Html)
        expect(entry.multiple_rte).toEqual([h6Html])
        done()
    })
})

describe('Node parse list content', () => {
    it('Should return order list html content', done => {
        const entry = gqlEntry(orderListJson as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(orderListHtml)
        expect(entry.multiple_rte).toEqual([orderListHtml])
        done()
    })

    it('Should return un-order list html content', done => {
        const entry = gqlEntry(unorderListJson as unknown as Document)
        
        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(unorderListHtml)
        expect(entry.multiple_rte).toEqual([unorderListHtml])
        done()
    })
})


describe('GQL parse image content', () => {
    it('Should return image html content', done => {
        const entry = gqlEntry(imgJson as unknown as Document)

        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(imgHtml)
        expect(entry.multiple_rte).toEqual([imgHtml])
        done()
    })
})

describe('GQL parse table content', () => {
    it('Should return table html content', done => {
        const entry = gqlEntry(tableJson as unknown as Document)

        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(tableHtml)
        expect(entry.multiple_rte).toEqual([tableHtml])
        done()
    })
})

describe('Node parse blockquote content', () => {
    it('Should return blockquote html content', done => {
        const entry = gqlEntry(blockquoteJson as unknown as Document)

        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(blockquoteHtml)
        expect(entry.multiple_rte).toEqual([blockquoteHtml])
        done()
    })
})
describe('GQL parse code content', () => {
    it('Should return code html content', done => {
        const entry = gqlEntry(codeJson as unknown as Document)

        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(codeHtml)
        expect(entry.multiple_rte).toEqual([codeHtml])
        done()
    })
})

describe('GQL parse link in paragraph content', () => {
    it('Should return link in paragraph html content', done => {
        const entry = gqlEntry(linkInPJson as unknown as Document)

        GQL.jsonToHTML({ entry, paths })

        expect(entry.single_rte).toEqual(linkInPHtml)
        expect(entry.multiple_rte).toEqual([linkInPHtml])
        done()
    })
})

function gqlEntry (node: Document, items?: EmbeddedConnection): EmbeddedItem {
    return {
        uid: 'EntryUID',
        single_rte: {
            json: node,
            embedded_itemsConnection: items
        },
        multiple_rte: {
            json: [node],
            embedded_itemsConnection: items
        }
    }
}