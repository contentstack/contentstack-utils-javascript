import StyleType from '../embedded-types/style-type';
export interface Metadata {
  text: string
  itemUid: string
  itemType: 'entry' | 'asset'
  styleType: StyleType
  attributes: Attributes
  contentTypeUid: string | undefined
}

export interface Attributes {
  type: 'entry' | 'asset',
  class: string,
  [key: string]: any,
  'sys-style-type': StyleType
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
  const metadata: Metadata = {
    text: attribute['#text'],
    itemUid: attribute["data-sys-entry-uid"] || attribute["data-sys-asset-uid"],
    itemType: attribute.type,
    styleType: attribute["sys-style-type"],
    attributes: attribute,
    contentTypeUid: attribute["data-sys-content-type-uid"]
  }
  return metadata
}