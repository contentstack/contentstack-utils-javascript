import { elementToJson } from '../helper/html-to-json';
import { EmbedTagModel } from '../Models/embeddec-object-model';
import { parse } from 'node-html-parser';
const frameflag = 'documentfragmentcontainer';

declare global {
  interface String {
    forEachEmbeddedObject(callbackfn: (embededObjectTag: string, object: EmbedTagModel) => void): void;
  }
}

String.prototype.forEachEmbeddedObject = function (
  callbackfn: (embededObjectTag: string, object: EmbedTagModel) => void,
): void {

  const str = `<${frameflag}>${this.toString()}</${frameflag}>`;
  const root = parse(str)
  const embeddedEntries = root.querySelectorAll(".embedded-entry")
  
  embeddedEntries.forEach((element) => {    
    callbackfn(element.outerHTML, elementToJson(element) as EmbedTagModel)
  })
  const embeddedAsset = root.querySelectorAll(".embedded-asset")
  embeddedAsset.forEach((element) => {
    callbackfn(element.outerHTML, elementToJson(element) as EmbedTagModel)
  })
};
