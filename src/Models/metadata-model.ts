import StyleType from '../embedded-types/style-type';
import TextNode from '../nodes/text-node';
import { replaceHtmlEntities, forbiddenAttrChars } from '../helper/enumerate-entries';

export interface Metadata {
  text: string;
  attributes: Attributes;

  itemUid: string | undefined;
  itemType: 'entry' | 'asset' | undefined;
  styleType: StyleType | undefined;
  contentTypeUid: string | undefined;
}

export interface Attributes {
  type?: 'entry' | 'asset';
  class?: string;
  id?: string;
  [key: string]: any;
  style?: styleObjType | string;
  'sys-style-type'?: string;
}
export type styleObjType = { [key: string]: any };

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
    itemUid: attribute['data-sys-entry-uid'] || attribute['data-sys-asset-uid'],
    itemType: attribute.type,
    styleType: attribute['sys-style-type'] as StyleType,
    attributes: attribute,
    contentTypeUid: attribute['data-sys-content-type-uid'],
  };
}

export function nodeToMetadata(attribute: Attributes, textNode: TextNode): Metadata {
  return {
    text: textNode.text,
    itemUid: attribute['entry-uid'] || attribute['asset-uid'],
    itemType: attribute.type,
    styleType: attribute['display-type'] as StyleType,
    attributes: attribute,
    contentTypeUid: attribute['content-type-uid'],
  };
}

export function attributeToString(attributes: Attributes): string {
  let result = '';
  for (const key in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, key)) {
      if (forbiddenAttrChars.some(char => key.includes(char))) {
        continue;
      }
      let value = attributes[key];
      if (Array.isArray(value)) {
        value = value.join(', ');
      } else if (typeof value === 'object') {
        let elementString = '';
        for (const subKey in value) {
          if (Object.prototype.hasOwnProperty.call(value, subKey)) {
            const subValue = value[subKey];
            if (subValue != null && subValue !== '') {
              elementString += `${subKey}:${subValue}; `;
            }
          }
        }
        value = elementString;
      }
      result += ` ${key}="${replaceHtmlEntities(String(value))}"`;
    }
  }
  return result;
}
