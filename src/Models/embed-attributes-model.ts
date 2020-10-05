import ENTRY from '../embedded-types/entry';
import ASSET from '../embedded-types/asset';
export interface EmbedAttributes {
  class: string,
  type: 'entry' | 'asset';
  'sys-style-type': ENTRY.BLOCK | ENTRY.INLINE | ENTRY.LINK | ASSET.DISPLAYABLE | ASSET.DOWNLOADABLE;
  [key: string]: any;
}

export interface EmbeddedEntry extends EmbedAttributes {
  'data-sys-entry-uid': string;
  'data-sys-content-type-uid': string;
  'data-sys-entry-local': string;
}

export interface EmbeddedAsset extends EmbedAttributes {
  'data-sys-asset-contenttype': string;
  'data-sys-asset-filelink': string;
  'data-sys-asset-uid': string;
}
