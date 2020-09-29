import { Entry, ContentTypeEntry } from '../Models/entry-model';
import { AssetModel } from '../Models/asset-model';

export type RenderObject = (object: ContentTypeEntry | AssetModel, text?: string) => string;

export interface RenderOption {
  [embedType: string]: RenderObject | RenderContentType;
}

export interface RenderContentType {
  [contentTypeUid: string]: RenderObject;
}

export interface Options {
  entry: Entry;
  renderOption?: RenderOption;
}
