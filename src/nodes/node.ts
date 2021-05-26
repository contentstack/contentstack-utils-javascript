import { Attributes } from "../Models/metadata-model"
import NodeType from "./node-type"
import TextNode from "./text"

export default class Node {
    type: NodeType
    attrs: Attributes
    children: Node[] | TextNode[]
}