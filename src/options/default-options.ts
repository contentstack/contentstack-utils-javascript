import ASSET from '../embedded-types/asset';
import ENTRY from '../embedded-types/entry';
import { RenderOption } from '.';

export const defaultOptions: RenderOption = {
  [ENTRY.BLOCK]: (entry) =>
    `<div><p>${entry.title || entry.uid}</p><p>Content type: <span>${entry._content_type_uid}</span></p></div>`,
  [ENTRY.INLINE]: (entry) => `<span>${entry.title || entry.uid}</span>`,
  [ENTRY.LINK]: (entry, text) => `<a href="${entry.url}">${text || entry.title || entry.uid}</a>`, // Todo Check for link with Manish
  [ASSET.DOWNLOADABLE]: (asset, text) => `<a href="${asset.url}">${text || asset.title || asset.filename || asset.uid}</a>`,
  [ASSET.DISPLAYABLE]: (asset, text) => {
    const displaycontent = `<img src="${asset.url}" alt="${text || asset.title || asset.filename || asset.uid}" />`
    return displaycontent
  },
};
