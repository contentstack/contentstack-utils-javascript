import { EntryEmbedable, EmbeddedContentTypeUid, EmbeddedObject } from '../Models/embedded-object';
import { Metadata } from '../Models/metadata-model';

export type RenderObject = (object: EmbeddedContentTypeUid | EmbeddedObject, metadata: Metadata) => string;

export interface RenderOption {
  [embedType: string]: RenderObject | RenderContentType;
}

export interface RenderContentType {
  [contentTypeUid: string]: RenderObject;
}

export interface Option {
  entry: EntryEmbedable;
  renderOption?: RenderOption;
}
