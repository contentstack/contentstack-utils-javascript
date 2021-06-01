import StyleType from '../embedded-types/style-type';
import TextNode from '../nodes/text';
import { EmbeddedItem } from './embedded-object';
export interface Metadata {
  text: string
  attributes: Attributes

  itemUid: string | undefined
  itemType: 'entry' | 'asset' | undefined
  styleType: StyleType | undefined
  contentTypeUid: string | undefined

  item: EmbeddedItem | undefined
}

export interface Attributes {
  type?: 'entry' | 'asset',
  class?: string,
  [key: string]: any,
  'sys-style-type'?: string,
}

export interface EntryAttributes extends Attributes {
  'data-sys-entry-uid': string;
  'data-sys-entry-local': string;
  'data-sys-content-type-uid': string;
}

export interface AssetAttributes extends Attributes {
  'data-sys-asset-uid': string;
  'data-sys-asset-filelink': string;
  'data-sys-asset-contenttype': string;
}

export function createMetadata(attribute: Attributes): Metadata {
  return {
    text: attribute['#text'],
    itemUid: attribute["data-sys-entry-uid"] || attribute["data-sys-asset-uid"],
    itemType: attribute.type,
    styleType: attribute["sys-style-type"] as StyleType,
    attributes: attribute,
    contentTypeUid: attribute["data-sys-content-type-uid"],
    item: undefined
  }
}

export function nodeToMetadata(attribute: Attributes, textNode: TextNode): Metadata {
 return {
  text: textNode.text,
  itemUid: attribute["entry-uid"] || attribute["asset-uid"],
  itemType: attribute.type,
  styleType: attribute["display-type"] as StyleType,
  attributes: attribute,
  contentTypeUid: attribute["content-type-uid"],
  item: undefined
 }
}