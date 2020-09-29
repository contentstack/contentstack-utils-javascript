import { ContentTypeEntry, Entry } from '../Models/entry-model';
import { AssetModel } from '../Models/asset-model';
import { RenderOption, RenderObject, RenderContentType } from '../options/index';
import { EmbeddedAsset, EmbeddedEntry, EmbedTagModel } from '../Models/embeddec-object-model';
import { defaultOptions } from '../options/default-options';

// This function will find Embedded object present in string
export function findEmbeddedEntry(
  uid: string,
  contentTypeUid: string,
  embeddedEntries: ContentTypeEntry[] = [],
): ContentTypeEntry[] {
  return embeddedEntries.filter((entry) => {
    if (entry.uid === uid && entry._content_type_uid === contentTypeUid) {
      return entry;
    }
  });
}

export function findEmbeddedAsset(uid: string, embeddedAssets: AssetModel[] = []): AssetModel[] {
  return embeddedAssets.filter((asset) => {
    if (asset.uid === uid) {
      return asset;
    }
  });
}

export function findEmbeddedObjects(object: EmbedTagModel, entry: Entry): (ContentTypeEntry | AssetModel)[] {
  if (object && object !== undefined && entry && entry !== undefined) {
    if (object.type === 'entry') {
      const embeddedEntry = object as EmbeddedEntry;
      return findEmbeddedEntry(
        embeddedEntry['data-sys-entry-uid'],
        embeddedEntry['data-sys-content-type-uid'],
        entry._embedded_entries,
      );
    } else {
      const embeddedAsset = object as EmbeddedAsset;
      return findEmbeddedAsset(embeddedAsset['data-sys-asset-uid'], entry._embedded_assets);
    }
  }
  return [];
}

export function findRenderString(
  object: EmbedTagModel,
  renderModel: ContentTypeEntry | AssetModel,
  renderOptions?: RenderOption,
): string {
  if ((!renderModel && renderModel === undefined) || (!object && object === undefined)) {
    return '';
  }
  let text = null
  if ((object as EmbeddedEntry).a && (object as EmbeddedEntry).a["#text"]) {
    text = (object as EmbeddedEntry).a["#text"]
  } else if ((object as EmbeddedEntry).img && (object as EmbeddedEntry).img.alt) {
    text = (object as EmbeddedEntry).img.alt
  }
  if (renderOptions && renderOptions[object['sys-style-type']] !== undefined) {
    const renderFunction = renderOptions[object['sys-style-type']] as RenderObject;

    if (
      (object as EmbeddedEntry)['data-sys-content-type-uid'] !== undefined &&
      typeof renderFunction !== 'function' &&
      renderFunction[(object as EmbeddedEntry)['data-sys-content-type-uid']] !== undefined
    ) {
      return (renderFunction as RenderContentType)[(object as EmbeddedEntry)['data-sys-content-type-uid']](renderModel, text);
    } else if (typeof renderFunction === 'function') {
      return renderFunction(renderModel, text);
    }
  }
  const defaultRenderFunction = defaultOptions[object['sys-style-type']] as RenderObject;
  return defaultRenderFunction(renderModel, text);
}
