import { Node } from "./node"
import NodeType from "./node-type"

export default class TextNode {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    inlineCode?: boolean
    superscript?: boolean
    subscript?: boolean

    text: string
}
