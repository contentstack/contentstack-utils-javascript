
export const entryContentBlank = {
    uid: "uid",
    _content_type_uid: "content_type_uid",
}

export const entryContentURL = {
    uid: "uid",
    url: "url",
    _content_type_uid: "content_type_uid"
}

export const entryContentTitle = {
    uid: "uid",
    title: "title",
    _content_type_uid: "content_type_uid"
}

export const entryContentTitleURL = {
    uid: "uid",
    url: "url",
    title: "title",
    _content_type_uid: "content_type_uid"
}

export const assetDownloadJson = { 
  type: 'asset',
  'data-sys-asset-uid': 'blt44asset',
  style: 'display:inline;',
  'sys-style-type': 'download',
  '#text': '\n',
  a: { 
      'data-sys-field-uid': 'title',
      href: '{{url}}',
      '#text': '{{title}}' 
  } 
}

export const assetRichTextJson =  { 
  class: 'embedded-asset',
  'data-sys-asset-filelink': 'https://contentstack.asset/v3/assets/dummy.pdf',
  'data-sys-asset-uid': 'blt44asset',
  'data-sys-asset-filename': 'dummy.pdf',
  'data-sys-asset-contenttype': 'application/pdf',
  type: 'asset',
  'sys-style-type': 'display' 
}

export const entryRichTextJson = { 
  class: 'embedded-entry block-entry',
  'data-sys-entry-uid': 'blttitleUpdateUID',
  'data-sys-entry-locale': 'en-us',
  'data-sys-content-type-uid': 'embeddedrte',
  'sys-style-type': 'block',
  type: 'entry' 
}

export const entryEmbeddedAssets = {
    title: 'one',
    url: '/one',
    rich_text_editor: '<p>&nbsp;</p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.asset/v3/assets/dummy.pdf" data-sys-asset-uid="blt44asset" data-sys-asset-filename="dummy.pdf" data-sys-asset-contenttype="application/pdf" type="asset" sys-style-type="display"></figure>\n<img data-image="236uaymkloww" src="https://contentstack.image/v3/assets/blt333/c/5f47707a1cef380a7a669416/html5.png" data-sys-asset-uid="blt222" alt="html5.png">\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blt333/blt9844/5f3f6fdbdcb41a4ad11f845f/svg-logo-text.png" data-sys-asset-uid="blt9844" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
    locale: 'en-us',
    uid: 'blt88jn',
    created_by: 'bltcreate',
    updated_by: 'bltcreate',
    created_at: '2020-08-13T06:18:18.989Z',
    updated_at: '2020-08-31T06:06:31.258Z',
    markdown: '',
    _embedded_assets: [
      {
        uid: 'blt44asset',
        created_at: '2020-08-19T09:13:32.785Z',
        updated_at: '2020-08-19T09:13:32.785Z',
        created_by: 'bltcreate',
        updated_by: 'bltcreate',
        content_type: 'application/pdf',
        file_size: '13264',
        filename: 'dummy.pdf',
        url: '/v3/assets/blt333/blt44asset/dummy.pdf',
        _version: 1,
        title: 'dummy.pdf'
      },
      {
        uid: 'blt9844',
        created_at: '2020-08-19T09:13:05.864Z',
        updated_at: '2020-09-10T09:35:28.393Z',
        created_by: 'bltcreate',
        updated_by: 'bltcreate',
        content_type: 'image/png',
        file_size: '36743',
        filename: 'svg-logo-text.png',
        url: '/v3/assets/blt333/blt9844/5f59f360d33e9a0a3571b707/svg-logo-text.png',
        _version: 7,
        title: 'svg-logo-text.png',
        description: '',
        
      }
    ]
  }

export const entryEmbeddedEntries =  {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: '<figure class="embedded-entry block-entry" data-sys-entry-uid="blttitleUpdateUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="block" type="entry"></figure>\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/bltassetEmbuid/5f57ae45c83b840a87d92910/html5.png" data-sys-asset-uid="bltassetEmbuid" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
    locale: 'en-us',
    _in_progress: false,
    uid: 'blt88jn',
    rte: '<figure class="embedded-entry block-entry" data-sys-entry-uid="blttitleuid" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="bltemmbedEntryUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="inline" type="entry"></figure>\n<p></p>',
    _embedded_entries: [
      {
        title: 'Update this title',
        url: '',
        locale: 'en-us',
        uid: 'blttitleuid',
        _content_type_uid: 'content_block',
        _version: 5,
        _in_progress: false,
        multi_line: '',
        _embedded_entries: [
          {
            uid: 'blttitleuid',
            _content_type_uid: 'content_block'
          }
        ],
        rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="blttitleuid" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"> asfsaf </figure>',
      },
      {
        title: 'updated title',
        rich_text_editor: [
          '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/bltassetUID/5f4dee15f4b7a40acfb622dc/DIABETICDIET-800x600.jpg" data-sys-asset-uid="bltassetUID" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
        ],


        locale: 'en-us',
        uid: 'blttitleUpdateUID',
        _content_type_uid: 'embeddedrte',

        _in_progress: false,
        _embedded_assets: [
          {
            uid: 'bltassetUID'
          }
        ]
      },
      {
        title: 'Entry with embedded entry',
        rich_text_editor: [
          '<figure class="embedded-entry block-entry" data-sys-entry-uid="blt1234CtUID" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="blt1234CtUID" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/blt1234AssetUID/5f47707a1cef380a7a669416/html5.png" data-sys-asset-uid="blt1234AssetUID" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        uid: 'bltemmbedEntryUID',
        _content_type_uid: 'embeddedrte',
        _in_progress: false,
        _embedded_entries: [
          {
            uid: 'blt1234CtUID',
            _content_type_uid: '1234'
          },
          {
            uid: 'blt1234CtUID',
            _content_type_uid: '1234'
          }
        ],
        _embedded_assets: [
          {
            uid: 'blt1234AssetUID'
          }
        ]
      }
    ],
    _embedded_assets: [
      {
        uid: 'bltassetEmbuid',
        content_type: 'image/png',
        file_size: '36743',
        filename: 'svg-logo-text.png',
        url: '/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png',
        title: 'svg-logo-text.png',
        description: ''
      }
    ]
  }
  
export const entryEmbeddedObject =  {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: '<figure class="embedded-entry block-entry" data-sys-entry-uid="blttitleUpdateUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="block" type="entry"></figure>\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/bltassetEmbuid/5f57ae45c83b840a87d92910/html5.png" data-sys-asset-uid="bltassetEmbuid" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
    locale: 'en-us',
    _in_progress: false,
    uid: 'blt88jn',
    rte: '<figure class="embedded-entry block-entry" data-sys-entry-uid="blttitleuid" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="bltemmbedEntryUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="inline" type="entry"></figure>\n<p></p>',
    _embedded_entries: [
      {
        title: 'Update this title',
        url: '',
        locale: 'en-us',
        uid: 'blttitleuid',
        _content_type_uid: 'content_block',
        _version: 5,
        _in_progress: false,
        multi_line: '',
        _embedded_entries: [
          {
            uid: 'blttitleuid',
            _content_type_uid: 'content_block'
          }
        ],
        rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="blttitleuid" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"></figure>',
      },
      {
        title: 'updated title',
        rich_text_editor: [
          '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/bltassetUID/5f4dee15f4b7a40acfb622dc/DIABETICDIET-800x600.jpg" data-sys-asset-uid="bltassetUID" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
        ],


        locale: 'en-us',
        uid: 'blttitleUpdateUID',
        _content_type_uid: 'embeddedrte',

        _in_progress: false,
        _embedded_assets: [
          {
            uid: 'bltassetUID'
          }
        ]
      },
      {
        title: 'Entry with embedded entry',
        rich_text_editor: [
          '<figure class="embedded-entry block-entry" data-sys-entry-uid="blt1234CtUID" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="blt1234CtUID" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/blt1234AssetUID/5f47707a1cef380a7a669416/html5.png" data-sys-asset-uid="blt1234AssetUID" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        uid: 'bltemmbedEntryUID',
        _content_type_uid: 'embeddedrte',
        _in_progress: false,
        _embedded_entries: [
          {
            uid: 'blt1234CtUID',
            _content_type_uid: '1234'
          },
          {
            uid: 'blt1234CtUID',
            _content_type_uid: '1234'
          }
        ],
        _embedded_assets: [
          {
            uid: 'blt1234AssetUID'
          }
        ]
      }
    ],
    _embedded_assets: [
      {
        uid: 'bltassetEmbuid',
        content_type: 'image/png',
        file_size: '36743',
        filename: 'svg-logo-text.png',
        url: '/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png',
        title: 'svg-logo-text.png',
        description: ''
      }
    ]
  }
export const entryMultilevelEmbed =  {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: '<figure class="embedded-entry block-entry" data-sys-entry-uid="blttitleUpdateUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="block" type="entry"></figure>\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/bltassetEmbuid/5f57ae45c83b840a87d92910/html5.png" data-sys-asset-uid="bltassetEmbuid" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
    locale: 'en-us',
    _in_progress: false,
    uid: 'blt88jn',
    rte: '<figure class="embedded-entry block-entry" data-sys-entry-uid="blttitleuid" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="bltemmbedEntryUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="inline" type="entry"></figure>\n<p></p>',
    _embedded_entries: [
      {
        title: 'Update this title',
        url: '',
        locale: 'en-us',
        uid: 'blttitleuid',
        _content_type_uid: 'content_block',
        _version: 5,
        _in_progress: false,
        multi_line: '',
        _embedded_entries: [
          {
            uid: 'blttitleuid',
            _content_type_uid: 'content_block'
          }
        ],
        rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="blttitleuid" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"></figure>',
      },
      {
        title: 'updated title',
        rich_text_editor: [
          '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/bltassetUID/5f4dee15f4b7a40acfb622dc/DIABETICDIET-800x600.jpg" data-sys-asset-uid="bltassetUID" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
        ],


        locale: 'en-us',
        uid: 'blttitleUpdateUID',
        _content_type_uid: 'embeddedrte',

        _in_progress: false,
        _embedded_assets: [
          {
            uid: 'bltassetUID',
            content_type: 'image/png',
            file_size: '36743',
            filename: 'svg-logo-text.png',
            url: '/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png',
            title: 'svg-logo-text.png',
            description: ''
          }
        ]
      },
      {
        title: 'Entry with embedded entry',
        rich_text_editor: [
          '<figure class="embedded-entry block-entry" data-sys-entry-uid="blt1234CtUID" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="blt1234CtUID" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/blt1234AssetUID/5f47707a1cef380a7a669416/html5.png" data-sys-asset-uid="blt1234AssetUID" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        uid: 'bltemmbedEntryUID',
        _content_type_uid: 'embeddedrte',
        _in_progress: false,
        _embedded_entries: [
          {
            uid: 'blt1234CtUID',
            _content_type_uid: '1234'
          },
          {
            uid: 'blt1234CtUID',
            _content_type_uid: '1234'
          }
        ],
        _embedded_assets: [
          {
            uid: 'blt1234AssetUID'
          }
        ]
      }
    ],
    _embedded_assets: [
      {
        uid: 'bltassetEmbuid',
        content_type: 'image/png',
        file_size: '36743',
        filename: 'svg-logo-text.png',
        url: '/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png',
        title: 'svg-logo-text.png',
        description: ''
      }
    ]
  }
