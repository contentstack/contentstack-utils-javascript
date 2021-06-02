import StyleType from '../src/embedded-types/style-type';
import { defaultOptions } from '../src/options/default-options';
import { entryContentBlank, entryContentURL, entryContentTitle, entryContentTitleURL } from './mock/entry-mock';
import { RenderItem } from '../src/options/index';
import { assetContentBlank, 
    assetContentUrl,
    assetContentonlyFileName, 
    assetContentonlyFileNameAndURL, 
    assetContentonlyTitle, 
    assetContentonlyTitleAndUrl } from './mock/asset-mock';
import { Metadata, Attributes } from '../src/Models/metadata-model';

const linkText = "linkText"
const entryBlockFunction: RenderItem = defaultOptions[StyleType.BLOCK] as RenderItem
const entryInlineFunction: RenderItem = defaultOptions[StyleType.INLINE] as RenderItem
const entryLinkFunction: RenderItem = defaultOptions[StyleType.LINK] as RenderItem

const assetDisplaableFunction: RenderItem = defaultOptions[StyleType.DISPLAY] as RenderItem
const assetDownloadFunction: RenderItem = defaultOptions[StyleType.DOWNLOAD] as RenderItem

const embedAttributes = { attributes: {} } as Metadata

const embedAttributesText = { text: linkText, attributes: { alt: linkText } } as unknown as Metadata

describe('Default Option test', () => {
    it('Default options Entry with only uid test', done => {
        expect(entryBlockFunction(entryContentBlank, embedAttributes)).toEqual(`<div><p>${entryContentBlank.uid}</p><p>Content type: <span>${entryContentBlank._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction(entryContentBlank, embedAttributes)).toEqual(`<span>${entryContentBlank.uid}</span>`)
        expect(entryLinkFunction(entryContentBlank, embedAttributes)).toEqual(`<a href="undefined">${entryContentBlank.uid}</a>`)
        done()
    })

    it('Default options Entry with uid, url test', done => {
        expect(entryBlockFunction(entryContentURL, embedAttributes)).toEqual(`<div><p>${entryContentURL.uid}</p><p>Content type: <span>${entryContentURL._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction(entryContentURL, embedAttributes)).toEqual(`<span>${entryContentURL.uid}</span>`)
        expect(entryLinkFunction(entryContentURL, embedAttributes)).toEqual(`<a href="${entryContentURL.url}">${entryContentURL.uid}</a>`)
        done()
    })

    it('Default options Entry with only uid, title test', done => {
        expect(entryBlockFunction(entryContentTitle, embedAttributes)).toEqual(`<div><p>${entryContentTitle.title}</p><p>Content type: <span>${entryContentTitle._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction(entryContentTitle, embedAttributes)).toEqual(`<span>${entryContentTitle.title}</span>`)
        expect(entryLinkFunction(entryContentTitle, embedAttributes)).toEqual(`<a href="undefined">${entryContentTitle.title}</a>`)
        done()
    })

    it('Default options Entry with only uid, url, title test', done => {
        expect(entryBlockFunction(entryContentTitleURL, embedAttributes)).toEqual(`<div><p>${entryContentTitleURL.title}</p><p>Content type: <span>${entryContentTitleURL._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction(entryContentTitleURL, embedAttributes)).toEqual(`<span>${entryContentTitleURL.title}</span>`)
        expect(entryLinkFunction(entryContentTitleURL, embedAttributes)).toEqual(`<a href="${entryContentURL.url}">${entryContentTitleURL.title}</a>`)
        done()
    })

    it('Default options Asset with only uid test', done => {
        expect(assetDisplaableFunction(assetContentBlank, embedAttributes)).toEqual(`<img src="undefined" alt="${assetContentBlank.uid}" />`)
        expect(assetDownloadFunction(assetContentBlank, embedAttributes)).toEqual(`<a href="undefined\">${assetContentBlank.uid}</a>`)
        done()
    })

    it('Default options Asset with uid and url test', done => {
        expect(assetDisplaableFunction(assetContentUrl, embedAttributes)).toEqual(`<img src="${assetContentUrl.url}" alt="${assetContentUrl.uid}" />`)
        expect(assetDownloadFunction(assetContentUrl, embedAttributes)).toEqual(`<a href="${assetContentUrl.url}">${assetContentUrl.uid}</a>`)
        done()
    })


    it('Default options Asset with uid and filename test', done => {
        expect(assetDisplaableFunction(assetContentonlyFileName, embedAttributes)).toEqual(`<img src="undefined" alt="${assetContentonlyFileName.filename}" />`)
        expect(assetDownloadFunction(assetContentonlyFileName, embedAttributes)).toEqual(`<a href="undefined">${assetContentonlyFileName.uid}</a>`)
        done()
    })

    it('Default options Asset with uid, url and filename test', done => {
        expect(assetDisplaableFunction(assetContentonlyFileNameAndURL, embedAttributes)).toEqual(`<img src="${assetContentonlyFileNameAndURL.url}" alt="${assetContentonlyFileNameAndURL.filename}" />`)
        expect(assetDownloadFunction(assetContentonlyFileNameAndURL, embedAttributes)).toEqual(`<a href="${assetContentonlyFileNameAndURL.url}">${assetContentonlyFileNameAndURL.uid}</a>`)
        done()
    })

    it('Default options Asset with uid and title test', done => {
        expect(assetDisplaableFunction(assetContentonlyTitle, embedAttributes)).toEqual(`<img src="undefined" alt="${assetContentonlyTitle.title}" />`)
        expect(assetDownloadFunction(assetContentonlyTitle, embedAttributes)).toEqual(`<a href="undefined">${assetContentonlyTitle.title || assetContentonlyTitle.uid}</a>`)
        done()
    })

    it('Default options Asset with uid, url and filename test', done => {
        expect(assetDisplaableFunction(assetContentonlyTitleAndUrl, embedAttributes)).toEqual(`<img src="${assetContentonlyTitleAndUrl.url}" alt="${assetContentonlyTitleAndUrl.title}" />`)
        expect(assetDownloadFunction(assetContentonlyTitleAndUrl, embedAttributes)).toEqual(`<a href="${assetContentonlyTitleAndUrl.url}">${assetContentonlyTitleAndUrl.title || assetContentonlyTitleAndUrl.uid}</a>`)
        done()
    })

    it('Default options Link text test', done => {
        expect(entryLinkFunction(entryContentURL, embedAttributesText)).toEqual(`<a href="${entryContentURL.url}">${linkText}</a>`)
        expect(entryLinkFunction(entryContentTitle, embedAttributesText)).toEqual(`<a href="undefined">${linkText}</a>`)
        expect(entryLinkFunction(entryContentBlank, embedAttributesText)).toEqual(`<a href="undefined">${linkText}</a>`)
        expect(entryLinkFunction(entryContentTitleURL, embedAttributesText)).toEqual(`<a href="${entryContentURL.url}">${linkText}</a>`)
        expect(assetDisplaableFunction(assetContentBlank, embedAttributesText)).toEqual(`<img src="undefined" alt="${linkText}" />`)
        expect(assetDownloadFunction(assetContentBlank, embedAttributesText)).toEqual(`<a href="undefined">${linkText}</a>`)
        done()
    })
})