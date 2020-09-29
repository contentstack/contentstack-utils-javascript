import { AssetModel } from './asset-model';

export interface EntryModel {
  uid: string;
  [propName: string]: any;
}

export interface ContentTypeEntry extends EntryModel {
  _content_type_uid: string;
}

export interface EmbeddedEntries extends EntryModel {
  _embedded_entries: ContentTypeEntry[];
}

export interface EmbeddedAssets extends EntryModel {
  _embedded_assets: AssetModel[];
}

export interface EmbeddedObjets extends EntryModel {
  _embedded_assets: AssetModel[];
  _embedded_entries: ContentTypeEntry[];
}

export type Entry = EmbeddedEntries | EmbeddedAssets | EmbeddedObjets;
