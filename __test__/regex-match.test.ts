import { containsFigureTag, matchFigureTag, countFigureTags } from '../src/helper/regex-match';
import { assetDisplay, entryBlock, entryInline, entryLink } from './mock/embedded-object-mock';
describe('Regex Match Test', () => {
    it('Check string contains Figure Tag test', done => {
        let contains = containsFigureTag('<figure type="entry" data-sys-entry-uid="" data-sys-content-type-uid="data-sys-content-type-uid" style="display:inline;" sys-style-type = "inline"> </figure>')
        expect(contains).toEqual(true)
        contains = containsFigureTag(`<figure type="entry" data-sys-entry-uid="" data-sys-content-type-uid="data-sys-content-type-uid" style="display:inline;" sys-style-type = "inline"> 
        </figure>`)
        expect(contains).toEqual(true)
        contains = containsFigureTag(`<figur type="entry" data-sys-entry-uid="" data-sys-content-type-uid="data-sys-content-type-uid" style="display:inline;" sys-style-type = "inline"> 
        </figure>`)
        expect(contains).toEqual(false)
        contains = containsFigureTag(`<figure type="asset" data-sys-entry-uid="" data-sys-content-type-uid="data-sys-content-type-uid" style="display:inline;" sys-style-type = "inline"> 
        </figure>`)
        expect(contains).toEqual(true)
        done()
    })

    it('Match Asset and Entry figure', done => {
        expect(containsFigureTag(assetDisplay)).toEqual(true)
        expect(containsFigureTag(entryBlock)).toEqual(true)
        expect(containsFigureTag(entryInline)).toEqual(true)
        expect(containsFigureTag(entryLink)).toEqual(true)
        done()
    })

    it('Match Count Asset and Entry figure', done => {
        expect(countFigureTags(assetDisplay)).toEqual(1)
        expect(countFigureTags(entryBlock)).toEqual(1)
        expect(countFigureTags(entryInline)).toEqual(1)
        expect(countFigureTags(entryLink)).toEqual(1)

        expect(countFigureTags(` ${entryLink} ${entryInline}`)).toEqual(2)
        expect(countFigureTags(` ${assetDisplay} ${entryLink} ${entryInline}`)).toEqual(3)
        expect(countFigureTags(` ${assetDisplay} ${entryLink} ${entryInline} ${entryBlock}`)).toEqual(4)

        expect(countFigureTags(` <p> ${entryLink} ${entryInline} </p>`)).toEqual(2)
        expect(countFigureTags(`  <p> ${assetDisplay} </p>`)).toEqual(1)
        expect(countFigureTags(` <p>  ${assetDisplay} </p> ${entryLink}  <p> ${entryInline} </p>`)).toEqual(3)
        expect(countFigureTags(` <p>  ${assetDisplay} </p> ${entryLink}  <p> ${entryInline} </p> ${entryBlock}`)).toEqual(4)

        done()
    })

    it('Match Figure Tag test', done => {
        expect(matchFigureTag(assetDisplay)).toEqual([assetDisplay])
        expect(matchFigureTag(entryBlock)).toEqual([entryBlock])
        expect(matchFigureTag(entryInline)).toEqual([entryInline])
        expect(matchFigureTag(entryLink)).toEqual([entryLink])

        expect(matchFigureTag(` ${entryLink} ${entryInline}`)).toEqual([entryLink, entryInline])
        expect(matchFigureTag(` ${assetDisplay} ${entryLink} ${entryInline}`)).toEqual([assetDisplay, entryLink, entryInline])
        expect(matchFigureTag(` ${assetDisplay} ${entryLink} ${entryInline} ${entryBlock}`)).toEqual([assetDisplay, entryLink, entryInline, entryBlock])

        expect(matchFigureTag(` <p> ${entryLink} ${entryInline} </p>`)).toEqual([entryLink, entryInline])
        expect(matchFigureTag(` <p>  ${assetDisplay} </p> ${entryLink}  <p> ${entryInline} </p>`)).toEqual([assetDisplay, entryLink, entryInline])
        expect(matchFigureTag(` <p>  ${assetDisplay} </p> ${entryLink}  <p> ${entryInline} </p> ${entryBlock}`)).toEqual([assetDisplay, entryLink, entryInline, entryBlock])

        done()
    })
})