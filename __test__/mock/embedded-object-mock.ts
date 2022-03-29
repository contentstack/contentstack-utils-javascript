export const assetDisplay = `<figure class="embedded-asset" alt="{{object.title}}" data-redactor-type="embed" data-sys-asset-filelink="{{url}}" data-sys-asset-filename="Cuvier-67_Autruche_d_Afrique.jpg" data-sys-asset-contenttype="image/png" type="asset" data-sys-asset-uid="asset_uid_5" style="display:inline;" sys-style-type="display">
</figure>`
export const assetDisplayJson = { 
  type: 'asset',
  class: "embedded-asset",
  'data-sys-asset-uid': 'asset_uid_5',
  style: 'display:inline;',
  'sys-style-type': 'display',
  '#text': '\n',
  alt: '{{object.title}}',
  'data-sys-asset-filename': "Cuvier-67_Autruche_d_Afrique.jpg",
  "data-sys-asset-filelink":'{{url}}',
  "data-redactor-type": "embed",
  "data-sys-asset-contenttype": "image/png",
}

export const assetDisplayLink = `<figure class="embedded-asset" data-redactor-type="embed" data-sys-asset-filelink="{{url}}" data-sys-asset-uid="asset_uid_6" data-sys-asset-filename="iphone-mockup.png" data-sys-asset-contenttype="image/png" data-sys-asset-alt="iphone-mockup.png" data-sys-asset-caption="Caption" data-sys-asset-link="{{link}}" data-sys-asset-position="center" data-sys-asset-isnewtab="true" type="asset" sys-style-type="display"></figure>`

export const assetDisplayLinkJson ={
  "class": "embedded-asset",
  "data-redactor-type": "embed",
  "data-sys-asset-alt": "iphone-mockup.png",
  "data-sys-asset-caption": "Caption",
  "data-sys-asset-contenttype": "image/png",
  "data-sys-asset-filelink": "{{url}}",
  "data-sys-asset-filename": "iphone-mockup.png",
  "data-sys-asset-isnewtab": "true",
  "data-sys-asset-link": "{{link}}",
  "data-sys-asset-position": "center",
  "data-sys-asset-uid": "asset_uid_6",
  "sys-style-type": "display",
  "type": "asset",
}
export const entryBlock = `<figure class="embedded-entry block-entry" data-redactor-type="embed" type="entry" data-sys-entry-uid="asset_uid_5"  data-sys-entry-locale="en-us" data-sys-content-type-uid="article" sys-style-type="block">{{title}}</figure>`
export const entryBlockJson = { 
  class: "embedded-entry block-entry",
  type: 'entry',
  'data-sys-entry-uid': 'asset_uid_5',
  'data-sys-content-type-uid': 'article',
  'sys-style-type': 'block',
  '#text': '{{title}}',
  "data-redactor-type": "embed",
  "data-sys-entry-locale": "en-us"
}

export const entryInline = `<figure class="embedded-entry inline-entry" data-redactor-type="embed"  type="entry" data-sys-entry-uid="asset_uid_5" data-sys-entry-locale="en-us" data-sys-content-type-uid="article" style="display:inline;" sys-style-type="inline">{{title}}
</figure>`
export const entryInlineJson = { 
  class: "embedded-entry inline-entry",
  type: 'entry',
  'data-sys-entry-uid': 'asset_uid_5',
  'data-sys-content-type-uid': 'article',
  style: 'display:inline;',
  'sys-style-type': 'inline',
  '#text': '{{title}}\n',
  "data-redactor-type": "embed",
  "data-sys-entry-locale": "en-us"
}

export const entryLink =`<figure class="embedded-entry link-entry" type="entry" data-sys-entry-locale="en-us" data-sys-entry-uid="asset_uid_5" href="/this-is-unique-title" data-sys-content-type-uid="article" style="display:inline;" sys-style-type="link">{{title}}
</figure>`

export const entryLinkJson = {
  type: 'entry',
  class: "embedded-entry link-entry",
  'data-sys-entry-uid': 'asset_uid_5',
  'data-sys-content-type-uid': 'article',
  style: 'display:inline;',
  'sys-style-type': 'link',
  '#text': '{{title}}\n',
  "data-sys-entry-locale": "en-us",
  "href": "/this-is-unique-title"
}

export const unexpectedCloseTag = `<figur2 class="embedded-asset" type="asset" data-sys-entry-uid="uid" data-sys-content-type-uid="data-sys-content-type-uid" style="display:inline;" sys-style-type="inline"> 
</figure>`

export const noChildNode = `<figure class="embedded-asset" type="asset" data-sys-entry-uid="uid" data-sys-content-type-uid="data-sys-content-type-uid" style="display:inline;" sys-style-type="inline"> 
</figure>`

export const noChildNodeJson = { 
  type: 'asset',
  class: "embedded-asset",
  'data-sys-entry-uid': 'uid',
  'data-sys-content-type-uid': 'data-sys-content-type-uid',
  style: 'display:inline;',
  'sys-style-type': 'inline',
  '#text': ' \n' 
}

export const noChildNod = `<figure class="embedded-asset" data-sys-asset-filelink="https://image.url/clitud.jpeg" data-sys-asset-uid="asset_uid_7" data-sys-asset-filename="Cuvier-67_Autruche_d_Afrique.jpg" data-sys-asset-contenttype="image/jpeg" data-sys-asset-alt="Cuvier-67_Autruche_d_Afrique.jpg" data-sys-asset-caption="somecaption" data-sys-asset-link="http://abc.com" data-sys-asset-position="center" data-sys-asset-isnewtab="true" type="asset" sys-style-type="display"></figure>
<p></p>
<p></p>
<figure class="embedded-asset" data-redactor-type="embed" data-widget-code="" data-sys-asset-filelink="{{url}}" data-sys-asset-uid="asset_uid_6" data-sys-asset-filename="iphone-mockup.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>`
