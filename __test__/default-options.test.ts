import StyleType from '../src/embedded-types/style-type';
import { defaultOptions } from '../src/options/default-options';
import { entryContentBlank, entryContentURL, entryContentTitle, entryContentTitleURL } from './mock/entry-mock';
import { RenderNode } from '../src/options/index';
import { assetContentBlank, 
    assetContentUrl,
    assetContentonlyFileName, 
    assetContentonlyFileNameAndURL, 
    assetContentonlyTitle, 
    assetContentonlyTitleAndUrl } from './mock/asset-mock';
import { Metadata, Attributes } from '../src/Models/metadata-model';

const linkText = "linkText"
const entryBlockFunction: RenderNode = defaultOptions[StyleType.BLOCK] as RenderNode
const entryInlineFunction: RenderNode = defaultOptions[StyleType.INLINE] as RenderNode
const entryLinkFunction: RenderNode = defaultOptions[StyleType.LINK] as RenderNode

const assetDisplaableFunction: RenderNode = defaultOptions[StyleType.DISPLAY] as RenderNode
const assetDownloadFunction: RenderNode = defaultOptions[StyleType.DOWNLOAD] as RenderNode

const embedAttributes = { attributes: {} } as Metadata

const embedAttributesText = { text: linkText, attributes: { alt: linkText } } as unknown as Metadata

describe('Default Option test', () => {
    it('Default options Entry with only uid test', done => {
        expect(entryBlockFunction({item:entryContentBlank, metadata: embedAttributes})).toEqual(`<div><p>${entryContentBlank.uid}</p><p>Content type: <span>${entryContentBlank._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction({item: entryContentBlank, metadata: embedAttributes })).toEqual(`<span>${entryContentBlank.uid}</span>`)
        expect(entryLinkFunction({item: entryContentBlank, metadata: embedAttributes })).toEqual(`<a href="undefined">${entryContentBlank.uid}</a>`)
        done()
    })

    it('Default options Entry with uid, url test', done => {
        expect(entryBlockFunction({item: entryContentURL, metadata: embedAttributes })).toEqual(`<div><p>${entryContentURL.uid}</p><p>Content type: <span>${entryContentURL._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction({item: entryContentURL, metadata: embedAttributes })).toEqual(`<span>${entryContentURL.uid}</span>`)
        expect(entryLinkFunction({item: entryContentURL, metadata: embedAttributes })).toEqual(`<a href="${entryContentURL.url}">${entryContentURL.uid}</a>`)
        done()
    })

    it('Default options Entry with only uid, title test', done => {
        expect(entryBlockFunction({item: entryContentTitle, metadata: embedAttributes })).toEqual(`<div><p>${entryContentTitle.title}</p><p>Content type: <span>${entryContentTitle._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction({item: entryContentTitle, metadata: embedAttributes })).toEqual(`<span>${entryContentTitle.title}</span>`)
        expect(entryLinkFunction({item: entryContentTitle, metadata: embedAttributes })).toEqual(`<a href="undefined">${entryContentTitle.title}</a>`)
        done()
    })

    it('Default options Entry with only uid, url, title test', done => {
        expect(entryBlockFunction({item: entryContentTitleURL, metadata: embedAttributes })).toEqual(`<div><p>${entryContentTitleURL.title}</p><p>Content type: <span>${entryContentTitleURL._content_type_uid}</span></p></div>`)
        expect(entryInlineFunction({item: entryContentTitleURL, metadata: embedAttributes })).toEqual(`<span>${entryContentTitleURL.title}</span>`)
        expect(entryLinkFunction({item: entryContentTitleURL, metadata: embedAttributes })).toEqual(`<a href="${entryContentURL.url}">${entryContentTitleURL.title}</a>`)
        done()
    })

    it('Default options Asset with only uid test', done => {
        expect(assetDisplaableFunction({item: assetContentBlank, metadata: embedAttributes })).toEqual(`<img src="undefined" alt="${assetContentBlank.uid}" />`)
        expect(assetDownloadFunction({item: assetContentBlank, metadata: embedAttributes })).toEqual(`<a href="undefined\">${assetContentBlank.uid}</a>`)
        done()
    })

    it('Default options Asset with uid and url test', done => {
        expect(assetDisplaableFunction({item: assetContentUrl, metadata: embedAttributes })).toEqual(`<img src="${assetContentUrl.url}" alt="${assetContentUrl.uid}" />`)
        expect(assetDownloadFunction({item: assetContentUrl, metadata: embedAttributes })).toEqual(`<a href="${assetContentUrl.url}">${assetContentUrl.uid}</a>`)
        done()
    })


    it('Default options Asset with uid and filename test', done => {
        expect(assetDisplaableFunction({item: assetContentonlyFileName, metadata: embedAttributes })).toEqual(`<img src="undefined" alt="${assetContentonlyFileName.filename}" />`)
        expect(assetDownloadFunction({item: assetContentonlyFileName, metadata: embedAttributes })).toEqual(`<a href="undefined">${assetContentonlyFileName.uid}</a>`)
        done()
    })

    it('Default options Asset with uid, url and filename test', done => {
        expect(assetDisplaableFunction({item: assetContentonlyFileNameAndURL, metadata: embedAttributes })).toEqual(`<img src="${assetContentonlyFileNameAndURL.url}" alt="${assetContentonlyFileNameAndURL.filename}" />`)
        expect(assetDownloadFunction({item: assetContentonlyFileNameAndURL, metadata: embedAttributes })).toEqual(`<a href="${assetContentonlyFileNameAndURL.url}">${assetContentonlyFileNameAndURL.uid}</a>`)
        done()
    })

    it('Default options Asset with uid and title test', done => {
        expect(assetDisplaableFunction({item: assetContentonlyTitle, metadata: embedAttributes })).toEqual(`<img src="undefined" alt="${assetContentonlyTitle.title}" />`)
        expect(assetDownloadFunction({item: assetContentonlyTitle, metadata: embedAttributes })).toEqual(`<a href="undefined">${assetContentonlyTitle.title || assetContentonlyTitle.uid}</a>`)
        done()
    })

    it('Default options Asset with uid, url and filename test', done => {
        expect(assetDisplaableFunction({item: assetContentonlyTitleAndUrl, metadata: embedAttributes })).toEqual(`<img src="${assetContentonlyTitleAndUrl.url}" alt="${assetContentonlyTitleAndUrl.title}" />`)
        expect(assetDownloadFunction({item: assetContentonlyTitleAndUrl, metadata: embedAttributes })).toEqual(`<a href="${assetContentonlyTitleAndUrl.url}">${assetContentonlyTitleAndUrl.title || assetContentonlyTitleAndUrl.uid}</a>`)
        done()
    })

    it('Default options Link text test', done => {
        expect(entryLinkFunction({item: entryContentTitle, metadata: embedAttributesText })).toEqual(`<a href="undefined">${linkText}</a>`)
        expect(entryLinkFunction({item: entryContentURL, metadata: embedAttributesText })).toEqual(`<a href="${entryContentURL.url}">${linkText}</a>`)
        expect(entryLinkFunction({item: entryContentBlank, metadata: embedAttributesText })).toEqual(`<a href="undefined">${linkText}</a>`)
        expect(entryLinkFunction({item: entryContentTitleURL, metadata: embedAttributesText })).toEqual(`<a href="${entryContentURL.url}">${linkText}</a>`)

        expect(assetDisplaableFunction({item: assetContentBlank, metadata: embedAttributesText })).toEqual(`<img src="undefined" alt="${linkText}" />`)
        expect(assetDownloadFunction({item: assetContentBlank, metadata: embedAttributesText })).toEqual(`<a href="undefined">${linkText}</a>`)
        done()
    })
})