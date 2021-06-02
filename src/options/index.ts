import { AnyNode } from '../json-to-html';
import { EntryEmbedable, EmbeddedItem } from '../Models/embedded-object';
import { Metadata } from '../Models/metadata-model';
import Node from '../nodes/node';
import TextNode from '../nodes/text';

export type Next = (nodes: AnyNode[]) => string
export type RenderNode = (node: Node, next: Next) => string;
export type RenderMark = (text: string) => string;
export type RenderItem = (item: EmbeddedItem, metadata: Metadata) => string;
export interface RenderOption {
  [embedType: string]: RenderNode | RenderMark | RenderItem | RenderContentType;
}

export interface RenderContentType {
  [contentTypeUid: string]: RenderItem;
}

export interface Option {
  entry: EntryEmbedable;
  renderOption?: RenderOption;
}
