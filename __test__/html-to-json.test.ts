import { elementToJson } from '../src/helper/html-to-json';
import { assetDisplayJson, assetDisplayLink, assetDisplayLinkJson } from './mock/embedded-object-mock';
import { entryBlock,
    entryInline,
    entryLink,
    noChildNode,
    unexpectedCloseTag,
    assetDisplay,
    noChildNodeJson,
    entryLinkJson,
    entryInlineJson,
    entryBlockJson
 } from './mock/embedded-object-mock';
const dom = new DOMParser();
const getBody = (content: string) => {
    return dom.parseFromString(content, 'text/html').body
}

describe('HTML To JSON test', () => {
    it('HTML To JSON figure tag with no child test', done => {
        expect(elementToJson(getBody(noChildNode))).toEqual({ figure: noChildNodeJson})
        done()
    })

    it('HTML to JSON entry figure tag test', done => {
        expect(elementToJson(getBody(entryLink))).toEqual({ figure: entryLinkJson })
        expect(elementToJson(getBody(entryInline))).toEqual({ figure: entryInlineJson })
        expect(elementToJson(getBody(entryBlock))).toEqual({ figure: entryBlockJson })
        done()
    })

    it('HTML to JSON asset figure tag test', done => {
        expect(elementToJson(getBody(assetDisplay))).toEqual({ figure: assetDisplayJson })
        expect(elementToJson(getBody(assetDisplayLink))).toEqual({ figure: assetDisplayLinkJson })
        done()
    })
    it('HTML to JSON false tag test', done => {
        expect(elementToJson(getBody(unexpectedCloseTag))).toEqual({ "figur2":{
            "#text": " \n",
            "class": "embedded-asset",
            "data-sys-content-type-uid": "data-sys-content-type-uid",
            "data-sys-entry-uid": "uid",
            "style": "display:inline;",
            "sys-style-type": "inline",
            "type": "asset"
        } })
        expect(elementToJson(getBody('String'))).toEqual({ "#text": "String" })
        expect(elementToJson(getBody(''))).toEqual({})
        done()
    })
})