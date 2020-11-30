import { elementToJson } from '../helper/html-to-json';
import { EntryAttributes, AssetAttributes, Metadata, createMetadata, Attributes } from '../Models/metadata-model';
import { parse } from 'node-html-parser';
const frameflag = 'documentfragmentcontainer';

declare global {
  interface String {
    forEachEmbeddedObject(callbackfn: (embededObjectTag: string, object: Metadata) => void): void;
  }
}

String.prototype.forEachEmbeddedObject = function (
  callbackfn: (embededObjectTag: string, object: Metadata) => void,
): void {

  const str = `<${frameflag}>${this.toString()}</${frameflag}>`;
  const root = parse(str)
  const embeddedEntries = root.querySelectorAll(".embedded-entry")
  
  embeddedEntries.forEach((element) => {    
    callbackfn(element.outerHTML, createMetadata(elementToJson(element) as Attributes))
  })
  const embeddedAsset = root.querySelectorAll(".embedded-asset")
  embeddedAsset.forEach((element) => {
    callbackfn(element.outerHTML, createMetadata(elementToJson(element) as Attributes))
  })
};
