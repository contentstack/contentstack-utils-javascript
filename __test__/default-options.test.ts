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
        embedAttributes.item = entryContentBlank
        expect(entryBlockFunction(embedAttributes)).toEqual(`<div><p>${entryContentBlank.uid}</p><p>Content type: <span>${entryContentBlank._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction(embedAttributes)).toEqual(`<span>${entryContentBlank.uid}</span>`)
        expect(entryLinkFunction(embedAttributes)).toEqual(`<a href="undefined">${entryContentBlank.uid}</a>`)
        done()
    })

    it('Default options Entry with uid, url test', done => {
        embedAttributes.item = entryContentURL
        expect(entryBlockFunction(embedAttributes)).toEqual(`<div><p>${entryContentURL.uid}</p><p>Content type: <span>${entryContentURL._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction(embedAttributes)).toEqual(`<span>${entryContentURL.uid}</span>`)
        expect(entryLinkFunction(embedAttributes)).toEqual(`<a href="${entryContentURL.url}">${entryContentURL.uid}</a>`)
        done()
    })

    it('Default options Entry with only uid, title test', done => {
        embedAttributes.item = entryContentTitle
        expect(entryBlockFunction(embedAttributes)).toEqual(`<div><p>${entryContentTitle.title}</p><p>Content type: <span>${entryContentTitle._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction(embedAttributes)).toEqual(`<span>${entryContentTitle.title}</span>`)
        expect(entryLinkFunction(embedAttributes)).toEqual(`<a href="undefined">${entryContentTitle.title}</a>`)
        done()
    })

    it('Default options Entry with only uid, url, title test', done => {
        embedAttributes.item = entryContentTitleURL
        expect(entryBlockFunction(embedAttributes)).toEqual(`<div><p>${entryContentTitleURL.title}</p><p>Content type: <span>${entryContentTitleURL._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction(embedAttributes)).toEqual(`<span>${entryContentTitleURL.title}</span>`)
        expect(entryLinkFunction(embedAttributes)).toEqual(`<a href="${entryContentURL.url}">${entryContentTitleURL.title}</a>`)
        done()
    })

    it('Default options Asset with only uid test', done => {
        embedAttributes.item = assetContentBlank
        expect(assetDisplaableFunction(embedAttributes)).toEqual(`<img src="undefined" alt="${assetContentBlank.uid}" />`)
        expect(assetDownloadFunction(embedAttributes)).toEqual(`<a href="undefined\">${assetContentBlank.uid}</a>`)
        done()
    })

    it('Default options Asset with uid and url test', done => {
        embedAttributes.item = assetContentUrl
        expect(assetDisplaableFunction(embedAttributes)).toEqual(`<img src="${assetContentUrl.url}" alt="${assetContentUrl.uid}" />`)
        expect(assetDownloadFunction(embedAttributes)).toEqual(`<a href="${assetContentUrl.url}">${assetContentUrl.uid}</a>`)
        done()
    })


    it('Default options Asset with uid and filename test', done => {
        embedAttributes.item = assetContentonlyFileName
        expect(assetDisplaableFunction(embedAttributes)).toEqual(`<img src="undefined" alt="${assetContentonlyFileName.filename}" />`)
        expect(assetDownloadFunction(embedAttributes)).toEqual(`<a href="undefined">${assetContentonlyFileName.uid}</a>`)
        done()
    })

    it('Default options Asset with uid, url and filename test', done => {
        embedAttributes.item = assetContentonlyFileNameAndURL
        expect(assetDisplaableFunction(embedAttributes)).toEqual(`<img src="${assetContentonlyFileNameAndURL.url}" alt="${assetContentonlyFileNameAndURL.filename}" />`)
        expect(assetDownloadFunction(embedAttributes)).toEqual(`<a href="${assetContentonlyFileNameAndURL.url}">${assetContentonlyFileNameAndURL.uid}</a>`)
        done()
    })

    it('Default options Asset with uid and title test', done => {
        embedAttributes.item = assetContentonlyTitle
        expect(assetDisplaableFunction(embedAttributes)).toEqual(`<img src="undefined" alt="${assetContentonlyTitle.title}" />`)
        expect(assetDownloadFunction(embedAttributes)).toEqual(`<a href="undefined">${assetContentonlyTitle.title || assetContentonlyTitle.uid}</a>`)
        done()
    })

    it('Default options Asset with uid, url and filename test', done => {
        embedAttributes.item = assetContentonlyTitleAndUrl
        expect(assetDisplaableFunction(embedAttributes)).toEqual(`<img src="${assetContentonlyTitleAndUrl.url}" alt="${assetContentonlyTitleAndUrl.title}" />`)
        expect(assetDownloadFunction(embedAttributes)).toEqual(`<a href="${assetContentonlyTitleAndUrl.url}">${assetContentonlyTitleAndUrl.title || assetContentonlyTitleAndUrl.uid}</a>`)
        done()
    })

    it('Default options Link text test', done => {
        embedAttributesText.item = entryContentURL
        expect(entryLinkFunction(embedAttributesText)).toEqual(`<a href="${entryContentURL.url}">${linkText}</a>`)
        
        embedAttributesText.item = entryContentTitle
        expect(entryLinkFunction(embedAttributesText)).toEqual(`<a href="undefined">${linkText}</a>`)
        
        embedAttributesText.item = entryContentBlank
        expect(entryLinkFunction(embedAttributesText)).toEqual(`<a href="undefined">${linkText}</a>`)
        
        embedAttributesText.item = entryContentTitleURL
        expect(entryLinkFunction(embedAttributesText)).toEqual(`<a href="${entryContentURL.url}">${linkText}</a>`)

        embedAttributesText.item = assetContentBlank
        expect(assetDisplaableFunction(embedAttributesText)).toEqual(`<img src="undefined" alt="${linkText}" />`)
        
        embedAttributesText.item = assetContentBlank
        expect(assetDownloadFunction(embedAttributesText)).toEqual(`<a href="undefined">${linkText}</a>`)
        done()
    })
})