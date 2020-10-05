import { elementToJson } from '../helper/html-to-json';
import { EmbedAttributes } from '../Models/embeddec-object-model';
import { parse } from 'node-html-parser';
const frameflag = 'documentfragmentcontainer';

declare global {
  interface String {
    forEachEmbeddedObject(callbackfn: (embededObjectTag: string, object: EmbedAttributes) => void): void;
  }
}

String.prototype.forEachEmbeddedObject = function (
  callbackfn: (embededObjectTag: string, object: EmbedAttributes) => void,
): void {

  const str = `<${frameflag}>${this.toString()}</${frameflag}>`;
  const root = parse(str)
  const embeddedEntries = root.querySelectorAll(".embedded-entry")
  
  embeddedEntries.forEach((element) => {    
    callbackfn(element.outerHTML, elementToJson(element) as EmbedAttributes)
  })
  const embeddedAsset = root.querySelectorAll(".embedded-asset")
  embeddedAsset.forEach((element) => {
    callbackfn(element.outerHTML, elementToJson(element) as EmbedAttributes)
  })
};
