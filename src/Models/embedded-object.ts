export interface EmbeddedObject {
  uid: string;
  [propName: string]: any;
}

export interface EmbedModel<T> {
  [path: string]: T[]
}

export interface EmbeddedContentTypeUid extends EmbeddedObject {
  _content_type_uid: string;
}

export interface EntryEmbedable extends EmbeddedObject {
  _embedded_assets?: EmbedModel<EmbeddedObject>;
  _embedded_entries?: EmbedModel<EmbeddedContentTypeUid>;
}
