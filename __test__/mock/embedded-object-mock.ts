export const assetDownload = `<figure class="embedded-asset" type="asset" data-sys-asset-uid="blt55f6d8cbd7e03a1f" style="display:inline;" sys-style-type="download"> 
  <a data-sys-field-uid="title" href="{{url}}">{{title}}</a>
</figure>`
export const assetDownloadJson = { 
    type: 'asset',
    class: "embedded-asset",
    'data-sys-asset-uid': 'blt55f6d8cbd7e03a1f',
    style: 'display:inline;',
    'sys-style-type': 'download',
    '#text': '\n',
    a: { 
        'data-sys-field-uid': 'title',
        href: '{{url}}',
        '#text': '{{title}}' 
    } 
}
export const assetDisplay = `<figure class="embedded-asset" type="asset" data-sys-asset-uid="blt55f6d8cbd7e03a1f" style="display:inline;" sys-style-type="display"> 
<img src="{{url}}" data-sys-asset-uid="{{uid}}" alt="{{object.title}}"></figure>`
export const assetDisplayJson = { 
  type: 'asset',
  class: "embedded-asset",
  'data-sys-asset-uid': 'blt55f6d8cbd7e03a1f',
  style: 'display:inline;',
  'sys-style-type': 'display',
  '#text': ' \n',
  img: { 
      src: '{{url}}',
      'data-sys-asset-uid': '{{uid}}',
      alt: '{{object.title}}' 
  } 
}

export const entryBlock = `<figure class="embedded-entry block-entry" type="entry" data-sys-entry-uid="blt55f6d8cbd7e03a1f" data-sys-content-type-uid="article" sys-style-type="block"> 
<span>{{title}}</span>
</figure>`
export const entryBlockJson = { 
  class: "embedded-entry block-entry",
  type: 'entry',
  'data-sys-entry-uid': 'blt55f6d8cbd7e03a1f',
  'data-sys-content-type-uid': 'article',
  'sys-style-type': 'block',
  '#text': '\n',
  span: { 
      '#text': '{{title}}' 
  } 
}

export const entryInline = `<figure class="embedded-entry inline-entry" type="entry" data-sys-entry-uid="blt55f6d8cbd7e03a1f" data-sys-content-type-uid="article" style="display:inline;" sys-style-type="inline"> 
<data data-sys-field-uid="title">{{title}}</data>
</figure>`
export const entryInlineJson = { 
  class: "embedded-entry inline-entry",
  type: 'entry',
  'data-sys-entry-uid': 'blt55f6d8cbd7e03a1f',
  'data-sys-content-type-uid': 'article',
  style: 'display:inline;',
  'sys-style-type': 'inline',
  '#text': '\n',
  data: { 
      'data-sys-field-uid': 'title', 
      '#text': '{{title}}' 
  } 
}

export const entryLink =`<figure class="embedded-entry link-entry" type="entry" data-sys-entry-uid="blt55f6d8cbd7e03a1f" data-sys-content-type-uid="article" style="display:inline;" sys-style-type="link"> 
<a data-sys-field-uid="title" href="{{url}}">{{title}}</a>
</figure>`

export const entryLinkJson = {
  type: 'entry',
  class: "embedded-entry link-entry",
  'data-sys-entry-uid': 'blt55f6d8cbd7e03a1f',
  'data-sys-content-type-uid': 'article',
  style: 'display:inline;',
  'sys-style-type': 'link',
  '#text': '\n',
  a: { 
      'data-sys-field-uid': 'title',
      href: '{{url}}',
      '#text': '{{title}}' 
  } 
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