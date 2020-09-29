import { containsFigureTag, matchFigureTag, countFigureTags } from '../src/helper/regex-match';
import { assetDisplay, assetDownload, entryBlock, entryInline, entryLink } from './mock/embedded-object-mock';
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
        expect(containsFigureTag(assetDownload)).toEqual(true)
        expect(containsFigureTag(entryBlock)).toEqual(true)
        expect(containsFigureTag(entryInline)).toEqual(true)
        expect(containsFigureTag(entryLink)).toEqual(true)
        done()
    })

    it('Match Count Asset and Entry figure', done => {
        expect(countFigureTags(assetDisplay)).toEqual(1)
        expect(countFigureTags(assetDownload)).toEqual(1)
        expect(countFigureTags(entryBlock)).toEqual(1)
        expect(countFigureTags(entryInline)).toEqual(1)
        expect(countFigureTags(entryLink)).toEqual(1)

        expect(countFigureTags(` ${entryLink} ${entryInline}`)).toEqual(2)
        expect(countFigureTags(` ${assetDisplay} ${assetDownload}`)).toEqual(2)
        expect(countFigureTags(` ${assetDisplay} ${assetDownload} ${entryLink} ${entryInline}`)).toEqual(4)
        expect(countFigureTags(` ${assetDisplay} ${assetDownload} ${entryLink} ${entryInline} ${entryBlock}`)).toEqual(5)

        expect(countFigureTags(` <p> ${entryLink} ${entryInline} </p>`)).toEqual(2)
        expect(countFigureTags(`  <p> ${assetDisplay} ${assetDownload}</p>`)).toEqual(2)
        expect(countFigureTags(` <p>  ${assetDisplay} ${assetDownload} </p> ${entryLink}  <p> ${entryInline} </p>`)).toEqual(4)
        expect(countFigureTags(` <p>  ${assetDisplay} ${assetDownload} </p> ${entryLink}  <p> ${entryInline} </p> ${entryBlock}`)).toEqual(5)

        done()
    })

    it('Match Figure Tag test', done => {
        expect(matchFigureTag(assetDisplay)).toEqual([assetDisplay])
        expect(matchFigureTag(assetDownload)).toEqual([assetDownload])
        expect(matchFigureTag(entryBlock)).toEqual([entryBlock])
        expect(matchFigureTag(entryInline)).toEqual([entryInline])
        expect(matchFigureTag(entryLink)).toEqual([entryLink])

        expect(matchFigureTag(` ${entryLink} ${entryInline}`)).toEqual([entryLink, entryInline])
        expect(matchFigureTag(` ${assetDisplay} ${assetDownload}`)).toEqual([assetDisplay, assetDownload])
        expect(matchFigureTag(` ${assetDisplay} ${assetDownload} ${entryLink} ${entryInline}`)).toEqual([assetDisplay, assetDownload, entryLink, entryInline])
        expect(matchFigureTag(` ${assetDisplay} ${assetDownload} ${entryLink} ${entryInline} ${entryBlock}`)).toEqual([assetDisplay, assetDownload, entryLink, entryInline, entryBlock])

        expect(matchFigureTag(` <p> ${entryLink} ${entryInline} </p>`)).toEqual([entryLink, entryInline])
        expect(matchFigureTag(`  <p> ${assetDisplay} ${assetDownload}</p>`)).toEqual([assetDisplay, assetDownload])
        expect(matchFigureTag(` <p>  ${assetDisplay} ${assetDownload} </p> ${entryLink}  <p> ${entryInline} </p>`)).toEqual([assetDisplay, assetDownload, entryLink, entryInline])
        expect(matchFigureTag(` <p>  ${assetDisplay} ${assetDownload} </p> ${entryLink}  <p> ${entryInline} </p> ${entryBlock}`)).toEqual([assetDisplay, assetDownload, entryLink, entryInline, entryBlock])

        done()
    })
})