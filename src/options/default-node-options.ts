import { RenderOption } from ".";
import NodeType from "../nodes/node-type";

export const defaultNodeOption: RenderOption = {
   'p':({metadata}) {
       `<p ${metadata.atts.toString()}> ${metadata.text} </p>`
   }
}