import { EntryEmbedable, EmbeddedItem } from '../Models/embedded-object';
import { RenderOption, RenderNode, RenderContentType } from '../options/index';
import { EntryAttributes, Metadata } from '../Models/metadata-model';
import { defaultOptions } from '../options/default-options';

// This function will find Embedded object present in string
export function findEmbeddedEntry(
  uid: string,
  contentTypeUid: string,
  embeddeditems: EmbeddedItem[] = [],
): EmbeddedItem[] {
  return embeddeditems.filter((entry) => {
    if (entry.uid === uid && entry._content_type_uid === contentTypeUid) {
      return entry;
    }
  });
}

export function findEmbeddedAsset(uid: string, embeddedAssets: EmbeddedItem[] = []): EmbeddedItem[] {
  return embeddedAssets.filter((asset) => {
    if (asset.uid === uid) {
      return asset;
    }
  });
}

export function findEmbeddedItems(object: Metadata, entry: EntryEmbedable): (EmbeddedItem)[] {
  if (object && object !== undefined && entry && entry !== undefined) {
    if (entry._embedded_items !== undefined) {
      const entryEmbedable = entry
      if (object.itemType === 'entry') {
        return findEmbeddedEntry(
          object.itemUid,
          object.contentTypeUid,
          Object.values(entryEmbedable._embedded_items || []).reduce((accumulator, value) => accumulator.concat(value), []),
        );
      } else {
        return findEmbeddedAsset(
          object.itemUid, 
          Object.values(entryEmbedable._embedded_items|| []).reduce((accumulator, value) => accumulator.concat(value), []),);
      }
    }
  }
  return [];
}

export function findRenderString(
  metadata: Metadata,
  renderModel: EmbeddedItem,
  renderOptions?: RenderOption,
): string {
  if ((!renderModel && renderModel === undefined) || (!metadata && metadata === undefined)) {
    return '';
  }
  
  if (renderOptions && renderOptions[metadata.styleType] !== undefined) {
    const renderFunction = renderOptions[metadata.styleType] as RenderNode;

    if (
      (metadata.attributes as EntryAttributes)['data-sys-content-type-uid'] !== undefined &&
      typeof renderFunction !== 'function' &&
      renderFunction[(metadata.attributes as EntryAttributes)['data-sys-content-type-uid']] !== undefined
    ) {
      return (renderFunction as RenderContentType)[(metadata.attributes as EntryAttributes)['data-sys-content-type-uid']]({item: renderModel, metadata});
    } else if (
      (metadata.attributes as EntryAttributes)['data-sys-content-type-uid'] !== undefined &&
      typeof renderFunction !== 'function' &&
      (renderFunction as RenderContentType).$default !== undefined
    ) {
      return (renderFunction as RenderContentType).$default({item: renderModel, metadata});
    } else if (typeof renderFunction === 'function') {
      return renderFunction({item: renderModel, metadata});
    }
  }
  const defaultRenderFunction = defaultOptions[metadata.styleType] as RenderNode;  
  return defaultRenderFunction({item: renderModel, metadata});
}
