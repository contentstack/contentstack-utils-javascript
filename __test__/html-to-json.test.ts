import { elementToJson } from '../src/helper/html-to-json';
import { assetDisplayJson, assetDownloadJson, assetDisplayLink, assetDisplayLinkJson } from './mock/embedded-object-mock';
import { parse } from 'node-html-parser';
import { entryBlock,
    entryInline,
    entryLink,
    noChildNode,
    unexpectedCloseTag,
    assetDisplay,
    assetDownload,
    noChildNodeJson,
    entryLinkJson,
    entryInlineJson,
    entryBlockJson
 } from './mock/embedded-object-mock';
const noChildNodeHTML = parse(noChildNode)
describe('HTML To JSON test', () => {
    it('HTML To JSON figure tag with no child test', done => {
        expect(elementToJson(noChildNodeHTML)).toEqual({ figure: noChildNodeJson})
        done()
    })

    it('HTML to JSON entry figure tag test', done => {
        expect(elementToJson(parse(entryLink))).toEqual({ figure: entryLinkJson })
        expect(elementToJson(parse(entryInline))).toEqual({ figure: entryInlineJson })
        expect(elementToJson(parse(entryBlock))).toEqual({ figure: entryBlockJson })
        done()
    })

    it('HTML to JSON asset figure tag test', done => {
        expect(elementToJson(parse(assetDownload))).toEqual({ figure: assetDownloadJson })
        expect(elementToJson(parse(assetDisplay))).toEqual({ figure: assetDisplayJson })
        expect(elementToJson(parse(assetDisplayLink))).toEqual({ figure: assetDisplayLinkJson })
        done()
    })
    it('HTML to JSON false tag test', done => {
        expect(elementToJson(parse(unexpectedCloseTag))).toEqual({ "figur2":{
            "#text": " \n",
            "class": "embedded-asset",
            "data-sys-content-type-uid": "data-sys-content-type-uid",
            "data-sys-entry-uid": "uid",
            "style": "display:inline;",
            "sys-style-type": "inline",
            "type": "asset"
        } })
        expect(elementToJson(parse('String'))).toEqual({ "#text": "String" })
        expect(elementToJson(parse(''))).toEqual({})
        expect(elementToJson(parse(`<data><![CDATA[This text contains a CEND ]]]]><![CDATA[>]]></data>`))).toEqual( {
            "data": {
              "#text": "<![CDATA[This text contains a CEND ]]]]><![CDATA[>]]>",
            },
        })
        done()
    })
    
    it('HTML comment to JSON false tag test', done => {
        expect(elementToJson(parse('<html><!-- Comment in html --><html>', { comment: true}))).toEqual({ html: {} })
        done()
    })
})