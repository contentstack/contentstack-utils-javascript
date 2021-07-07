import { AnyNode } from '../json-to-html';
import { EntryEmbedable, EmbeddedItem } from '../Models/embedded-object';
import { EntryNode } from '../Models/json-rte-model';
import { Metadata } from '../Models/metadata-model';
import Node from '../nodes/node';

export type Next = (nodes: AnyNode[]) => string
export type RenderNode = (node: Node, next: Next) => string;
export type RenderMark = (text: string) => string;
export type RenderItem = (item: EmbeddedItem | EntryNode, metadata: Metadata) => string;
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
