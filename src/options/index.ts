import { EntryEmbedable, EmbeddedItem } from '../Models/embedded-object';
import { Metadata } from '../Models/metadata-model';

export type RenderNode = (node: { item: EmbeddedItem, metadata: Metadata }) => string;
export type RenderMark = (text: string) => string;
export interface RenderOption {
  [embedType: string]: RenderNode | RenderMark | RenderContentType;
}

export interface RenderContentType {
  [contentTypeUid: string]: RenderNode;
}

export interface Option {
  entry: EntryEmbedable;
  renderOption?: RenderOption;
}
