import StyleType from '../embedded-types/style-type';
import { RenderOption } from '.';
import { Metadata } from '../Models/metadata-model';

export const defaultOptions: RenderOption = {
  [StyleType.BLOCK]: (metadata: Metadata) =>
    `<div><p>${metadata.item.title || metadata.item.uid}</p><p>Content type: <span>${metadata.item._content_type_uid}</span></p></div>`,
  [StyleType.INLINE]: (metadata: Metadata) => `<span>${metadata.item.title || metadata.item.uid}</span>`,
  [StyleType.LINK]: (metadata: Metadata) => `<a href="${metadata.item.url}">${metadata.text || metadata.item.title || metadata.item.uid}</a>`,
  [StyleType.DISPLAY]: (metadata: Metadata) => `<img src="${metadata.item.url}" alt="${metadata.attributes.alt || metadata.item.title || metadata.item.filename || metadata.item.uid}" />`,
  [StyleType.DOWNLOAD]: (metadata: Metadata) => `<a href="${metadata.item.url}">${metadata.text || metadata.item.title || metadata.item.uid}</a>`,
};
