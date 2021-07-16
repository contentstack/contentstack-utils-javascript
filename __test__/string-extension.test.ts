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
import { Attributes, Metadata, createMetadata } from '../src/Models/metadata-model';

const NoHTML = 'non html string'

const noChildNodeMetadata = createMetadata(noChildNodeJson as Attributes)
const entryLinkMetadata = createMetadata(entryLinkJson as Attributes)
const entryInlineMatadata = createMetadata(entryInlineJson as Attributes)
const entryBlockMetadata = createMetadata(entryBlockJson as Attributes)
const assetDisplayMetadata = createMetadata(assetDisplayJson as Attributes)
describe('String extension for each embedded Object ', () => {
    it('Find Embedded object function with undefined string test', done => {
        expect.assertions(0)
        makeFindEmbedd(undefined, (embTag: string, metadata: Metadata) => {
            expect(embTag).toEqual(undefined)
            expect(metadata).toEqual({})
        })
        done()
    })
    it('Find Embedded object function with no Embedded contents test', done => {
        expect.assertions(0)
        makeFindEmbedd('', (embTag: string, metadata: Metadata) => {
            expect(embTag).toEqual(undefined)
            expect(metadata).toEqual({})
        })
        makeFindEmbedd(NoHTML, (embTag: string, metadata: Metadata) => {
            expect(embTag).toEqual(undefined)
            expect(metadata).toEqual({})
        })
        done()
    })

    it('Find Embedded object function with Embedded contents no child test', done => {
        expect.assertions(2)
        makeFindEmbedd(noChildNode, (embTag: string, metadata: Metadata) => {            
            expect(embTag).toEqual(noChildNode)
            expect(metadata).toEqual(noChildNodeMetadata)
        })
        done()
    })

    it('Find Embedded entry function with Embedded contents test', done => {
        expect.assertions(6)
        makeFindEmbedd(entryLink, (embTag: string, metadata: Metadata) => {
            expect(embTag).toEqual(entryLink)
            expect(metadata).toEqual(entryLinkMetadata)
        })
        makeFindEmbedd(entryInline, (embTag: string, metadata: Metadata) => {
            expect(embTag).toEqual(entryInline)
            expect(metadata).toEqual(entryInlineMatadata)
        })
        makeFindEmbedd(entryBlock, (embTag: string, metadata: Metadata) => {
            expect(embTag).toEqual(entryBlock)
            expect(metadata).toEqual(entryBlockMetadata)
        })
        done()
    })

    it('Find Embedded assets function with Embedded contents test', done => {
        expect.assertions(2)
        makeFindEmbedd(assetDisplay, (embTag: string, metadata: Metadata) => {
            expect(embTag).toEqual(assetDisplay)
            expect(metadata).toEqual(assetDisplayMetadata)
        })
        done()
    })

    it('Find Embedded multiple object Link and Inline test', done => {
        expect.assertions(2)
        makeFindEmbedd(` ${entryLink} ${entryInline}`,  (embTag: string, metadata: Metadata) => {
            if (embTag === entryLink) {
                expect(metadata).toEqual(entryLinkMetadata)
            }else {
                expect(metadata).toEqual(entryInlineMatadata)
            }
        })
        done()
    })

    it('Find Embedded multiple object Block, Link and Inline test', done => {
        expect.assertions(3)
        makeFindEmbedd(` ${entryBlock} ${entryLink} ${entryInline}`,  (embTag: string, metadata: Metadata) => {
            if (embTag === entryLink) {
                expect(metadata).toEqual(entryLinkMetadata)
            }else if (embTag === entryBlock) {
                expect(metadata).toEqual(entryBlockMetadata)
            }else {
                expect(metadata).toEqual(entryInlineMatadata)
            }
        })
        done()
    })

    it('Find Embedded multiple object Link and Display test', done => {
        expect.assertions(2)
        makeFindEmbedd(` ${assetDisplay} ${entryLink}`,  (embTag: string, metadata: Metadata) => {
            if (embTag === entryLink) {
                expect(metadata).toEqual(entryLinkMetadata)
            }else if (embTag === assetDisplay) {
                expect(metadata).toEqual(assetDisplayMetadata)
            }
        })
        done()
    })

    it('Find Embedded multiple object Display, Link and Inline test', done => {
        expect.assertions(3)
        makeFindEmbedd(` ${assetDisplay} ${entryLink} ${entryInline}`,  (embTag: string, metadata: Metadata) => {
            if (embTag === entryLink) {
                expect(metadata).toEqual(entryLinkMetadata)
            }else if (embTag === assetDisplay) {
                expect(metadata).toEqual(assetDisplayMetadata)
            }else if (embTag === entryInline){
                expect(metadata).toEqual(entryInlineMatadata)
            }
        })
        done()
    })

    it('Find Embedded multiple object Display, Block, Link and Inline test', done => {
        expect.assertions(4)
        makeFindEmbedd(` ${assetDisplay} ${entryLink} ${entryInline} ${entryBlock}`,  (embTag: string, metadata: Metadata) => {
            if (embTag === entryLink) {
                expect(metadata).toEqual(entryLinkMetadata)
            }else if (embTag === assetDisplay) {
                expect(metadata).toEqual(assetDisplayMetadata)
            }else if (embTag === entryBlock) {
                expect(metadata).toEqual(entryBlockMetadata)
            }else if (embTag === entryInline){
                expect(metadata).toEqual(entryInlineMatadata)
            }
        })
        done()
    })
})

function makeFindEmbedd(content: string = '', callback: (embedTag: string, metadata: Metadata) => void) {
    content.forEachEmbeddedItem(callback)
}
