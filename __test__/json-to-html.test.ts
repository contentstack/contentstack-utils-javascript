import { jsonToHTML } from '../src/json-to-html'
import { embeddedAssetWithRenderOption } from './mock/render-options'
import { 
    blockquoteJson,
    codeJson,
    embeddedAssetJsonEntry,
    h1Json,
    h2Json,
    h3Json,
    h4Json,
    h5Json,
    h6Json,
    imgJson,
    imgJsonURL,
    linkInPJson,
    linkInPJsonUrl,
    orderListJson,
    paragraphEntry,
    paragraphJsonArrayEntry,
    plainTextJson,
    styleinPJson,
    tableJson,
    unorderListJson} from './mock/json-element-mock'
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
    linkInPURLHtml,
    orderListHtml,
    paragraphHtml,
    plainTextHtml, 
    styleinPHtml, 
    tableHtml, 
    unorderListHtml} from './mock/json-element-mock-result'
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

        expect(entry.rich_text_editor).toEqual(paragraphHtml)
        done()
    })

    it('Should render Json To html for Array of Entries',  done => {
        const entry = {...paragraphEntry}

        jsonToHTML({entry: [entry], paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual(paragraphHtml)
        done()
    })

    it('Should render array Json To array html',  done => {
        const entry = {...paragraphJsonArrayEntry}

        jsonToHTML({entry, paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual([paragraphHtml])
        done()
    })

    it('Should render array Json To array html for array of Entries',  done => {
        const entry = {...paragraphJsonArrayEntry}

        jsonToHTML({entry: [entry], paths: ['rich_text_editor']})

        expect(entry.rich_text_editor).toEqual([paragraphHtml])
        done()
    })
})

describe('Node parser reference content', () => {
    it('Should render reference asset to html from Entry',  done => {
        const entry = {...embeddedAssetJsonEntry}

        jsonToHTML({entry, paths: ['rich_text_editor', 'rte']})

        expect(entry.rich_text_editor).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />')
        expect(entry.rte).toEqual(['<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />'])
        done()
    })

    it('Should render reference asset to html from Entries',  done => {
        const entry = [{ ...embeddedAssetJsonEntry }]

        jsonToHTML({entry, paths: ['rich_text_editor', 'rte']})

        expect(entry[0].rich_text_editor).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />')
        expect(entry[0].rte).toEqual(['<img src="/asset_uid_1/dummy.pdf" alt="dummy.pdf" />'])
        done()
    })

    it('Should render reference asset to html from Entry with custom render option',  done => {
        const entry = {...embeddedAssetJsonEntry}

        jsonToHTML({entry, paths: ['rich_text_editor', 'rte'], renderOption: embeddedAssetWithRenderOption.renderOption})

        expect(entry.rich_text_editor).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="Alternet Text" />')
        expect(entry.rte).toEqual(['<img src="/asset_uid_1/dummy.pdf" alt="Alternet Text" />'])
        done()
    })

    it('Should render reference asset to html from Entries with custom render option',  done => {
        const entry = [{ ...embeddedAssetJsonEntry }]

        jsonToHTML({entry, paths: ['rich_text_editor', 'rte'], renderOption: embeddedAssetWithRenderOption.renderOption})

        expect(entry[0].rich_text_editor).toEqual('<img src="/asset_uid_1/dummy.pdf" alt="Alternet Text" />')
        expect(entry[0].rte).toEqual(['<img src="/asset_uid_1/dummy.pdf" alt="Alternet Text" />'])
        done()
    })
})

describe('Node parse text Content', () => {
    it('Should return all text wrapped patterns', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...plainTextJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']
        
        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(plainTextHtml)
        done()
    })

    it('Should return array text wrapped patterns', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: [
                {
                    ...plainTextJson
                }
            ],
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']
        
        jsonToHTML({ entry, paths})
        expect(entry.supercharged_rte).toEqual([plainTextHtml])
        done()
    })
    it('Should return html text with classname', done => {
        const entry = {
            "uid": "",
            "_version": 3,
            "locale": "en-us",
            "json_rte": {
                "type": "doc",
                "attrs": {},
                "uid": "",
                "children": [
                    {
                        "type": "p",
                        "attrs": {class: "class_p"},
                        "uid": "",
                        "children": [
                            {
                                "text": "abc",
                                "classname": "yellow",
                            },
                            {
                                "text": "def",
                                "italic": false,
                                "underline": true,
                                "classname": "red",
                                
                            },
                            {
                                "text": "fed",
                                "italic": true,
                                "underline": true,
                                "classname": "green",
                                
                            },
                            {
                                "text": "ghi",
                                "underline": true,
                                "classname": "blue",
                            },
                            {
                                "text": "Basic",
                                "classname": "orange",
                                "id": "blue",
                                "bold": true,
                                "underline": true,
                                "italic": true
                            },
                            {
                                "text": "data",
                                "classname": "brown",
                                "id": "blue",
                                "bold": false,
                                "underline": true,
                                "italic": true
                            },
                            {
                                "type": "h1",
                                "attrs": {},
                                "uid": "",
                                "children": [
                                    {
                                        "text": "abc",
                                        "classname": "purple",
                                    },
                                    {
                                        "text": "def",
                                        "italic": false,
                                        "underline": true,
                                        "classname": "white",
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "_version": 3
            }
        }
        const paths = ['json_rte', 'children']
        const response = jsonToHTML({ entry: entry, paths })
        console.log("🚀 ~ file: json-to-html.test.ts:193 ~ describe ~ entry.json_rte:", entry)
        done()
    })
})

describe('Node parse headers content', () => {
    it('Should return h1 html string', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...h1Json
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(h1Html)
        done()
    })
    it('Should return h2 html string', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...h2Json
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(h2Html)
        done()
    })
    it('Should return h3 html string', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...h3Json
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(h3Html)
        done()
    })
    it('Should return h4 html string', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...h4Json
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(h4Html)
        done()
    })
    it('Should return h5 html string', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...h5Json
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(h5Html)
        done()
    })
    it('Should return h6 html string', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...h6Json
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(h6Html)
        done()
    })

    it('Shoul return array of headers in html string', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: [
                {
                    ...h6Json
                },
                {
                    ...h3Json
                },
                {
                    ...h2Json
                },
                {
                    ...h5Json
                },
                {
                    ...h1Json
                },
                {
                    ...h4Json
                },
            ],
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual([h6Html, h3Html, h2Html, h5Html, h1Html, h4Html])
        done()
    })
})

describe('Node parse list content', () => {
    it('Should return order list html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...orderListJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(orderListHtml)
        done()
    })

    it('Should return un-order list html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...unorderListJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(unorderListHtml)
        done()
    })
})

describe('Node parse image content', () => {
    it('Should return image html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...imgJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(imgHtml)
        done()
    })

    it('Should return image list html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: [
                {
                    ...imgJsonURL
                }
            ],
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual([imgHtml])
        done()
    })
})

describe('Node parse table content', () => {
    it('Should return table html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...tableJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(tableHtml)
        done()
    })
})

describe('Node parse blockquote content', () => {
    it('Should return blockquote html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...blockquoteJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(blockquoteHtml)
        done()
    })

    it('Should return blockquote array html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: [
                {
                    ...blockquoteJson
                },
            ],
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual([blockquoteHtml])
        done()
    })
})

describe('Node parse code content', () => {
    it('Should return code html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...codeJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(codeHtml)
        done()
    })

    it('Should return code array html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: [
                {
                    ...codeJson
                },
            ],
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual([codeHtml])
        done()
    })
})


describe('Node parse link in paragraph content', () => {
    it('Should return link in paragraph html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...linkInPJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(linkInPHtml)
        done()
    })

    it('Should return link in paragraph array html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: [
                {
                    ...linkInPJsonUrl
                },
            ],
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual([linkInPURLHtml])
        done()
    })
})


describe('Node parse style attribute', () => {
    it('Should return style attribute in paragraph html content', done => {
        const entry = {
            uid: 'entry_uid_19',
            supercharged_rte: {
                ...styleinPJson
            },
            _embedded_items: {}
        }
        const paths = ['supercharged_rte']

        jsonToHTML({ entry, paths})

        expect(entry.supercharged_rte).toEqual(styleinPHtml)
        done()
    })
})
