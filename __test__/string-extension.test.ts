import '../src/extensions'
import { 
    entryBlock,
    entryInline,
    entryLink,
    noChildNode,
    assetDisplay,
} from './mock/embedded-object-mock';    
import { 
    noChildNodeJson,
    entryLinkJson,
    entryInlineJson,
    entryBlockJson,
    assetDisplayJson
} from './mock/embedded-object-mock';
import { Attributes } from '../src/Models/embed-attributes-model';

const NoHTML = 'non html string'

describe('String extension for each embedded Object ', () => {
    it('Find Embedded object function with undefined string test', done => {
        expect.assertions(0)
        makeFindEmbedd(undefined, (embTag: string, object: Attributes) => {
            expect(embTag).toEqual(undefined)
            expect(object).toEqual({})
        })
        done()
    })
    it('Find Embedded object function with no Embedded contents test', done => {
        expect.assertions(0)
        makeFindEmbedd('', (embTag: string, object: Attributes) => {
            expect(embTag).toEqual(undefined)
            expect(object).toEqual({})
        })
        makeFindEmbedd(NoHTML, (embTag: string, object: Attributes) => {
            expect(embTag).toEqual(undefined)
            expect(object).toEqual({})
        })
        done()
    })

    it('Find Embedded object function with Embedded contents no child test', done => {
        expect.assertions(2)
        makeFindEmbedd(noChildNode, (embTag: string, object: Attributes) => {            
            expect(embTag).toEqual(noChildNode)
            expect(object).toEqual(noChildNodeJson)
        })
        done()
    })

    it('Find Embedded entry function with Embedded contents test', done => {
        expect.assertions(6)
        makeFindEmbedd(entryLink, (embTag: string, object: Attributes) => {
            expect(embTag).toEqual(entryLink)
            expect(object).toEqual(entryLinkJson)
        })
        makeFindEmbedd(entryInline, (embTag: string, object: Attributes) => {
            expect(embTag).toEqual(entryInline)
            expect(object).toEqual(entryInlineJson)
        })
        makeFindEmbedd(entryBlock, (embTag: string, object: Attributes) => {
            expect(embTag).toEqual(entryBlock)
            expect(object).toEqual(entryBlockJson)
        })
        done()
    })

    it('Find Embedded assets function with Embedded contents test', done => {
        expect.assertions(2)
        makeFindEmbedd(assetDisplay, (embTag: string, object: Attributes) => {
            expect(embTag).toEqual(assetDisplay)
            expect(object).toEqual(assetDisplayJson)
        })
        done()
    })

    it('Find Embedded multiple object Link and Inline test', done => {
        expect.assertions(2)
        makeFindEmbedd(` ${entryLink} ${entryInline}`,  (embTag: string, object: Attributes) => {
            if (embTag === entryLink) {
                expect(object).toEqual(entryLinkJson)
            }else {
                expect(object).toEqual(entryInlineJson)
            }
        })
        done()
    })

    it('Find Embedded multiple object Block, Link and Inline test', done => {
        expect.assertions(3)
        makeFindEmbedd(` ${entryBlock} ${entryLink} ${entryInline}`,  (embTag: string, object: Attributes) => {
            if (embTag === entryLink) {
                expect(object).toEqual(entryLinkJson)
            }else if (embTag === entryBlock) {
                expect(object).toEqual(entryBlockJson)
            }else {
                expect(object).toEqual(entryInlineJson)
            }
        })
        done()
    })

    it('Find Embedded multiple object Link and Display test', done => {
        expect.assertions(2)
        makeFindEmbedd(` ${assetDisplay} ${entryLink}`,  (embTag: string, object: Attributes) => {
            if (embTag === entryLink) {
                expect(object).toEqual(entryLinkJson)
            }else if (embTag === assetDisplay) {
                expect(object).toEqual(assetDisplayJson)
            }
        })
        done()
    })

    it('Find Embedded multiple object Display, Link and Inline test', done => {
        expect.assertions(3)
        makeFindEmbedd(` ${assetDisplay} ${entryLink} ${entryInline}`,  (embTag: string, object: Attributes) => {
            if (embTag === entryLink) {
                expect(object).toEqual(entryLinkJson)
            }else if (embTag === assetDisplay) {
                expect(object).toEqual(assetDisplayJson)
            }else if (embTag === entryInline){
                expect(object).toEqual(entryInlineJson)
            }
        })
        done()
    })

    it('Find Embedded multiple object Display, Block, Link and Inline test', done => {
        expect.assertions(4)
        makeFindEmbedd(` ${assetDisplay} ${entryLink} ${entryInline} ${entryBlock}`,  (embTag: string, object: Attributes) => {
            if (embTag === entryLink) {
                expect(object).toEqual(entryLinkJson)
            }else if (embTag === assetDisplay) {
                expect(object).toEqual(assetDisplayJson)
            }else if (embTag === entryBlock) {
                expect(object).toEqual(entryBlockJson)
            }else if (embTag === entryInline){
                expect(object).toEqual(entryInlineJson)
            }
        })
        done()
    })
})

function makeFindEmbedd(content: string = '', callback: (embedTag: string, object: Attributes) => void) {
    content.forEachEmbeddedObject(callback)
}
