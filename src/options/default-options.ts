import StyleType from '../embedded-types/style-type';
import { RenderOption } from '.';
import { Metadata } from '../Models/metadata-model';
import { EmbeddedItem } from '../Models/embedded-object';

export const defaultOptions: RenderOption = {
  [StyleType.BLOCK]: (item: EmbeddedItem) =>
    `<div><p>${item.title || item.uid}</p><p>Content type: <span>${item._content_type_uid}</span></p></div>`,
  [StyleType.INLINE]: (item: EmbeddedItem) => `<span>${item.title || item.uid}</span>`,
  [StyleType.LINK]: (item: EmbeddedItem, metadata: Metadata) => `<a href="${item.url}">${metadata.text || item.title || item.uid}</a>`,
  [StyleType.DISPLAY]: (item: EmbeddedItem, metadata: Metadata) => `<img src="${item.url}" alt="${metadata.attributes.alt || item.title || item.filename || item.uid}" />`,
  [StyleType.DOWNLOAD]: (item: EmbeddedItem, metadata: Metadata) => `<a href="${item.url}">${metadata.text || item.title || item.uid}</a>`,
};
