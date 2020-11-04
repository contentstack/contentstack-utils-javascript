import { AssetModel } from './asset-model';

export interface EntryModel {
  uid: string;
  [propName: string]: any;
}

export interface EmbedModel<T> {
  [path: string]: T[]
}

export interface ContentTypeEntry extends EntryModel {
  _content_type_uid: string;
}

export interface Entry extends EntryModel {
  _embedded_assets?: EmbedModel<AssetModel>;
  _embedded_entries?: EmbedModel<ContentTypeEntry>;
}
