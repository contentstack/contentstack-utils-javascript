import ENTRY from '../embedded-types/entry';
import ASSET from '../embedded-types/asset';
export interface EmbedTagModel {
  class: string,
  type: 'entry' | 'asset';
  'sys-style-type': ENTRY.BLOCK | ENTRY.INLINE | ENTRY.LINK | ASSET.DISPLAYABLE | ASSET.DOWNLOADABLE;
}

export interface EmbeddedEntry extends EmbedTagModel {
  'data-sys-entry-uid': string;
  'data-sys-content-type-uid': string;
  'data-sys-entry-local': string;
  [key: string]: any;
}

export interface EmbeddedAsset extends EmbedTagModel {
  'data-sys-asset-contenttype': string;
  'data-sys-asset-filelink': string;
  'data-sys-asset-uid': string;
  [key: string]: any;
}
