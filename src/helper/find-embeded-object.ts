import { EntryEmbedable, EmbeddedObject } from '../Models/embedded-object';
import { RenderOption, RenderObject, RenderContentType } from '../options/index';
import { AssetAttributes, EntryAttributes, Metadata } from '../Models/metadata-model';
import { defaultOptions } from '../options/default-options';

// This function will find Embedded object present in string
export function findEmbeddedEntry(
  uid: string,
  contentTypeUid: string,
  embeddeditems: EmbeddedObject[] = [],
): EmbeddedObject[] {
  return embeddeditems.filter((entry) => {
    if (entry.uid === uid && entry._content_type_uid === contentTypeUid) {
      return entry;
    }
  });
}

export function findEmbeddedAsset(uid: string, embeddedAssets: EmbeddedObject[] = []): EmbeddedObject[] {
  return embeddedAssets.filter((asset) => {
    if (asset.uid === uid) {
      return asset;
    }
  });
}

export function findEmbeddedObjects(object: Metadata, entry: EntryEmbedable): (EmbeddedObject)[] {
  if (object && object !== undefined && entry && entry !== undefined) {
    if (object.itemType === 'entry') {
      const embeddedEntry = object.attributes as EntryAttributes;
      return findEmbeddedEntry(
        object.itemUid,
        object.contentTypeUid,
        Object.values(entry._embedded_items || []).reduce((accumulator, value) => accumulator.concat(value), []),
      );
    } else {
      const embeddedAsset = object.attributes as AssetAttributes;
      return findEmbeddedAsset(object.itemUid, Object.values(entry._embedded_items|| []).reduce((accumulator, value) => accumulator.concat(value), []),);
    }
  }
  return [];
}

export function findRenderString(
  metadata: Metadata,
  renderModel: EmbeddedObject,
  renderOptions?: RenderOption,
): string {
  if ((!renderModel && renderModel === undefined) || (!metadata && metadata === undefined)) {
    return '';
  }
  
  if (renderOptions && renderOptions[metadata.styleType] !== undefined) {
    const renderFunction = renderOptions[metadata.styleType] as RenderObject;

    if (
      (metadata.attributes as EntryAttributes)['data-sys-content-type-uid'] !== undefined &&
      typeof renderFunction !== 'function' &&
      renderFunction[(metadata.attributes as EntryAttributes)['data-sys-content-type-uid']] !== undefined
    ) {
      return (renderFunction as RenderContentType)[(metadata.attributes as EntryAttributes)['data-sys-content-type-uid']](renderModel, metadata);
    } else if (
      (metadata.attributes as EntryAttributes)['data-sys-content-type-uid'] !== undefined &&
      typeof renderFunction !== 'function' &&
      (renderFunction as RenderContentType).$default !== undefined
    ) {
      return (renderFunction as RenderContentType).$default(renderModel, metadata);
    } else if (typeof renderFunction === 'function') {
      return renderFunction(renderModel, metadata);
    }
  }
  const defaultRenderFunction = defaultOptions[metadata.styleType] as RenderObject;  
  return defaultRenderFunction(renderModel, metadata);
}
