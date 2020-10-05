import ASSET from '../embedded-types/asset';
import ENTRY from '../embedded-types/entry';
import { RenderOption } from '.';

export const defaultOptions: RenderOption = {
  [ENTRY.BLOCK]: (entry) =>
    `<div><p>${entry.title || entry.uid}</p><p>Content type: <span>${entry._content_type_uid}</span></p></div>`,
  [ENTRY.INLINE]: (entry) => `<span>${entry.title || entry.uid}</span>`,
  [ENTRY.LINK]: (entry, embedAttributes) => `<a href="${entry.url}">${embedAttributes[`#text`] || entry.title || entry.uid}</a>`, // Todo Check for link with Manish
  [ASSET.DOWNLOADABLE]: (asset, embedAttributes) => `<a href="${asset.url}">${embedAttributes[`#text`] || asset.title || asset.filename || asset.uid}</a>`,
  [ASSET.DISPLAYABLE]: (asset, embedAttributes) => {
    const displaycontent = `<img src="${asset.url}" alt="${embedAttributes.alt || asset.title || asset.filename || asset.uid}" />`
    return displaycontent
  },
};
