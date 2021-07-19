export interface EmbeddedItem {
  uid: string;
  _content_type_uid?: string;
  [propName: string]: any;
}

export interface EmbedModel<T> {
  [path: string]: T[]
}

export interface EntryEmbedable {
  uid: string;
  _embedded_items?: EmbedModel<EmbeddedItem>
  [propName: string]: any;
}
