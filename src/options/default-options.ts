import StyleType from '../embedded-types/style-type';
import { RenderOption } from '.';

export const defaultOptions: RenderOption = {
  [StyleType.BLOCK]: ({item}) =>
    `<div><p>${item.title || item.uid}</p><p>Content type: <span>${item._content_type_uid}</span></p></div>`,
  [StyleType.INLINE]: ({item}) => `<span>${item.title || item.uid}</span>`,
  [StyleType.LINK]: ({item, metadata}) => `<a href="${item.url}">${metadata.text || item.title || item.uid}</a>`,
  [StyleType.DISPLAY]: ({item, metadata}) => `<img src="${item.url}" alt="${metadata.attributes.alt || item.title || item.filename || item.uid}" />`,
  [StyleType.DOWNLOAD]: ({item, metadata}) => `<a href="${item.url}">${metadata.text || item.title || item.uid}</a>`,
};
