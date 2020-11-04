import { Entry, ContentTypeEntry } from '../Models/entry-model';
import { AssetModel } from '../Models/asset-model';
import { Attributes } from '../Models/embed-attributes-model';

export type RenderObject = (object: ContentTypeEntry | AssetModel, embedAttributes: Attributes) => string;

export interface RenderOption {
  [embedType: string]: RenderObject | RenderContentType;
}

export interface RenderContentType {
  [contentTypeUid: string]: RenderObject;
}

export interface Option {
  entry: Entry;
  renderOption?: RenderOption;
}
