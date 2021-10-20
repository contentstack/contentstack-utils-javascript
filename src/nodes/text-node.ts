import Node from "./node"

export default class TextNode extends Node {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    inlineCode?: boolean
    superscript?: boolean
    subscript?: boolean

    text: string

    constructor(text: string) {
        super()
        this.text = text
    }
}
