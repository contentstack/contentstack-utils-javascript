import { AnyNode } from "../json-to-html"
import { Attributes } from "../Models/metadata-model"
import NodeType from "./node-type"

export default class Node {
    type: NodeType
    attrs: Attributes
    children: AnyNode[]
}
