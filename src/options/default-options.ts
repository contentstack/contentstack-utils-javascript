import StyleType from '../embedded-types/style-type';
import { RenderOption } from '.';
import { Metadata } from '../Models/metadata-model';
import { EmbeddedItem } from '../Models/embedded-object';
import { EntryNode } from '../Models/json-rte-model';
import * as DOMPurify from 'dompurify';

export const defaultOptions: RenderOption = {
  [StyleType.BLOCK]: (item: EmbeddedItem | EntryNode) => {
    const title = DOMPurify.sanitize(item.title || item.uid);
    const contentTypeUid = DOMPurify.sanitize(item._content_type_uid || (item.system ? item.system.content_type_uid : ''));
    return `<div><p>${title}</p><p>Content type: <span>${contentTypeUid}</span></p></div>`;
  },
  [StyleType.INLINE]: (item: EmbeddedItem | EntryNode) => {
    const title = DOMPurify.sanitize(item.title || item.uid);
    return `<span>${title}</span>`;
  },
  [StyleType.LINK]: (item: EmbeddedItem | EntryNode, metadata: Metadata) => {
    const url = DOMPurify.sanitize(item.url || 'undefined');
    const text = DOMPurify.sanitize(metadata.text || item.title || item.uid || (item.system ? item.system.uid : ''));
    return `<a href="${url}">${text}</a>`;
  },
  [StyleType.DISPLAY]: (item: EmbeddedItem | EntryNode, metadata: Metadata) => {
    const url = DOMPurify.sanitize(item.url || 'undefined');
    const alt = DOMPurify.sanitize(metadata.attributes.alt || item.title || item.filename || item.uid
      || (item.system ? item.system.uid : ''));
    return `<img src="${url}" alt="${alt}" />`;
  },
  [StyleType.DOWNLOAD]: (item: EmbeddedItem | EntryNode, metadata: Metadata) => {
    const href = DOMPurify.sanitize(item.url || 'undefined');
    const text = DOMPurify.sanitize(metadata.text || item.title || item.uid || (item.system ? item.system.content_type_uid : ''));
    return `<a href="${href}">${text}</a>`;
  },
};
