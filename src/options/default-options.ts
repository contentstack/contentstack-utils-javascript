import StyleType from '../embedded-types/style-type';
import { RenderOption } from '.';

export const defaultOptions: RenderOption = {
  [StyleType.BLOCK]: (entry) =>
    `<div><p>${entry.title || entry.uid}</p><p>Content type: <span>${entry._content_type_uid}</span></p></div>`,
  [StyleType.INLINE]: (entry) => `<span>${entry.title || entry.uid}</span>`,
  [StyleType.LINK]: (entry, metadata) => `<a href="${entry.url}">${metadata.text || entry.title || entry.uid}</a>`,
  [StyleType.DISPLAY]: (asset, metadata) => `<img src="${asset.url}" alt="${metadata.attributes.alt || asset.title || asset.filename || asset.uid}" />`,
  [StyleType.DOWNLOAD]: (entry, metadata) => `<a href="${entry.url}">${metadata.text || entry.title || entry.uid}</a>`,
};
