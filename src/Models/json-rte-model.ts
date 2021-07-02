import { EmbeddedItem } from "./embedded-object";
import Document from "../nodes/document";
export interface JsonRTE {
    json: Document| Document[],
    embedded_itemsConnection?: EmbeddedConnection
}

export interface EmbeddedConnection {
    edges: {
        node: EmbeddedItem
    }[]
}