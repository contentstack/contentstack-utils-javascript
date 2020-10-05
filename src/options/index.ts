import { Entry, ContentTypeEntry } from '../Models/entry-model';
import { AssetModel } from '../Models/asset-model';
import { EmbedAttributes } from '../Models/embed-attributes-model';

export type RenderObject = (object: ContentTypeEntry | AssetModel, embedAttributes: EmbedAttributes) => string;

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
