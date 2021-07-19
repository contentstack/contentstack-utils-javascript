import Document from "../nodes/document";
export interface JsonRTE {
    json: Document| Document[],
    embedded_itemsConnection?: EmbeddedConnection
}

export interface EmbeddedConnection {
    edges: {
        node: EntryNode;
    }[]
}

export interface EntryNode {
    system: SystemField;
    [propName: string]: any;
}
export interface SystemField {
    uid: string;
    content_type_uid?: string;
    [propName: string]: any;
}