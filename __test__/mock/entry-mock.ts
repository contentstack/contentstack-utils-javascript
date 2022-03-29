
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
  'data-sys-asset-uid': 'asset_uid_1',
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
  'data-sys-asset-filelink': 'https://contentstack.asset/dummy.pdf',
  'data-sys-asset-uid': 'asset_uid_1',
  'data-sys-asset-filename': 'dummy.pdf',
  'data-sys-asset-contenttype': 'application/pdf',
  type: 'asset',
  'sys-style-type': 'display' 
}

export const entryRichTextJson = { 
  class: 'embedded-entry block-entry',
  'data-sys-entry-uid': 'titleUpdateUID',
  'data-sys-entry-locale': 'en-us',
  'data-sys-content-type-uid': 'embeddedrte',
  'sys-style-type': 'block',
  type: 'entry' 
}

export const entryEmbeddedAssets = {
    title: 'one',
    url: '/one',
    rich_text_editor: '<p>&nbsp;</p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.asset/dummy.pdf" data-sys-asset-uid="asset_uid_1" data-sys-asset-filename="dummy.pdf" data-sys-asset-contenttype="application/pdf" type="asset" sys-style-type="display"></figure>\n<img data-image="236uaymkloww" src="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_8" alt="html5.png">\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/svg-logo-text.png" data-sys-asset-uid="asset_uid_9" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
    locale: 'en-us',
    uid: 'asset_uid_10',
    created_by: 'create_uid',
    updated_by: 'create_uid',
    created_at: '2020-08-13T06:18:18.989Z',
    updated_at: '2020-08-31T06:06:31.258Z',
    markdown: '',
    _embedded_items: {
      rich_text_editor: [
        {
          _content_type_uid: 'sys_assets',
          uid: 'asset_uid_1',
          created_at: '2020-08-19T09:13:32.785Z',
          updated_at: '2020-08-19T09:13:32.785Z',
          created_by: 'create_uid',
          updated_by: 'create_uid',
          content_type: 'application/pdf',
          file_size: '13264',
          filename: 'dummy.pdf',
          url: '/asset_uid_1/dummy.pdf',
          _version: 1,
          title: 'dummy.pdf'
        },
        {
          _content_type_uid: 'sys_assets',
          uid: 'asset_uid_9',
          created_at: '2020-08-19T09:13:05.864Z',
          updated_at: '2020-09-10T09:35:28.393Z',
          created_by: 'create_uid',
          updated_by: 'create_uid',
          content_type: 'image/png',
          file_size: '36743',
          filename: 'svg-logo-text.png',
          url: '/svg-logo-text.png',
          _version: 7,
          title: 'svg-logo-text.png',
          description: '',
        }
      ]
    }
  }

export const entryAssetEmbedBlank = {
  title: 'one',
  url: '/one',
  rich_text_editor: '<p>&nbsp;</p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.asset/v3/assets/dummy.pdf" data-sys-asset-uid="asset_uid_1" data-sys-asset-filename="dummy.pdf" data-sys-asset-contenttype="application/pdf" type="asset" sys-style-type="display"></figure>\n<img data-image="236uaymkloww" src="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_8" alt="html5.png">\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/svg-logo-text.png" data-sys-asset-uid="asset_uid_9" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
  locale: 'en-us',
  uid: 'asset_uid_10',
  created_by: 'create_uid',
  updated_by: 'create_uid',
  created_at: '2020-08-13T06:18:18.989Z',
  updated_at: '2020-08-31T06:06:31.258Z',
  markdown: '',
}

export const entryEmbeddedEntries =  {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: '<figure class="embedded-entry block-entry" data-sys-entry-uid="titleUpdateUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="block" type="entry"></figure>\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/entry_uid_18/html5.png" data-sys-asset-uid="entry_uid_18" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
    locale: 'en-us',
    _in_progress: false,
    uid: 'asset_uid_10',
    rte: '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_20" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="inline" type="entry"></figure>\n<p></p>',
    _embedded_items: {
      rich_text_editor: [
        {
          title: 'Update this title',
          url: '',
          locale: 'en-us',
          uid: 'entry_uid_16',
          _content_type_uid: 'content_block',
          _version: 5,
          _in_progress: false,
          multi_line: '',
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'entry_uid_16',
                _content_type_uid: 'content_block'
              }
            ]
          },
          rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"> asfsaf </figure>',
        },
        {
          title: 'updated title',
          rich_text_editor: [
            '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_11" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
          ],
          locale: 'en-us',
          uid: 'titleUpdateUID',
          _content_type_uid: 'embeddedrte',
          _in_progress: false,
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'asset_uid_11',
                _content_type_uid: 'sys_assets',
              }
            ]
          }
        },
        {
          title: 'Entry with embedded entry',
          rich_text_editor: [
            '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_12" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
          ],
          locale: 'en-us',
          uid: 'entry_uid_20',
          _content_type_uid: 'embeddedrte',
          _in_progress: false,
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'entry_uid_21',
                _content_type_uid: '1234'
              },
              {
                uid: 'entry_uid_21',
                _content_type_uid: '1234'
              },
              {
                uid: 'asset_uid_12',
                _content_type_uid: 'sys_assets'
              }
            ]
          }
        },
        {
          uid: 'entry_uid_18',
          _content_type_uid: 'sys_assets',
          content_type: 'image/png',
          file_size: '36743',
          filename: 'svg-logo-text.png',
          url: '/entry_uid_18/svg-logo-text.png',
          title: 'svg-logo-text.png',
          description: ''
        }
      ],
      rte: [
        {
          uid: 'entry_uid_18',
          content_type: 'image/png',
          _content_type_uid: 'sys_assets',
          file_size: '36743',
          filename: 'svg-logo-text.png',
          url: '/entry_uid_18/svg-logo-text.png',
          title: 'svg-logo-text.png',
          description: ''
        },
        {
          title: 'Update this title',
          url: '',
          locale: 'en-us',
          uid: 'entry_uid_16',
          _content_type_uid: 'content_block',
          _version: 5,
          _in_progress: false,
          multi_line: '',
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'entry_uid_16',
                _content_type_uid: 'content_block'
              }
            ]
          },
          rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"> asfsaf </figure>',
        },
        {
          title: 'updated title',
          rich_text_editor: [
            '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_11" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
          ],
          locale: 'en-us',
          uid: 'titleUpdateUID',
          _content_type_uid: 'embeddedrte',
          _in_progress: false,
          _embedded_items: { 
            rich_text_editor:
            [
              {
                uid: 'asset_uid_11',
                _content_type_uid: 'sys_assets'
              }
            ]
          }
        },
        {
          title: 'Entry with embedded entry',
          rich_text_editor: [
            '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_12" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
          ],
          locale: 'en-us',
          uid: 'entry_uid_20',
          _content_type_uid: 'embeddedrte',
          _in_progress: false,
          _embedded_items: {
            rich_text_editor:[
              {
                uid: 'entry_uid_21',
                _content_type_uid: '1234'
              },
              {
                uid: 'entry_uid_21',
                _content_type_uid: '1234'
              },
              {
                uid: 'asset_uid_12',
                _content_type_uid: 'sys_assets'
              }
            ]
          }
        }
      ]
    }
  }
  
export const entryEmbeddedItem =  {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: '<figure class="embedded-entry block-entry" data-sys-entry-uid="titleUpdateUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="block" type="entry"></figure>\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/entry_uid_18/html5.png" data-sys-asset-uid="entry_uid_18" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
    locale: 'en-us',
    _in_progress: false,
    uid: 'asset_uid_10',
    rte: '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_20" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="inline" type="entry"></figure>\n<p></p>',
    _embedded_items: {
      rich_text_editor: [
        {
          uid: 'entry_uid_18',
          content_type: 'image/png',
          file_size: '36743',
          filename: 'svg-logo-text.png',
          url: '/entry_uid_18/svg-logo-text.png',
          title: 'svg-logo-text.png',
          description: '',
          _content_type_uid: 'sys_assets',
        },
      {
        title: 'Update this title',
        url: '',
        locale: 'en-us',
        uid: 'entry_uid_16',
        _content_type_uid: 'content_block',
        _version: 5,
        _in_progress: false,
        multi_line: '',
        _embedded_items: {
          rich_text_editor: [
            {
              uid: 'entry_uid_16',
              _content_type_uid: 'content_block'
            }
          ]
        },
        rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"></figure>',
      },
      {
        title: 'updated title',
        rich_text_editor: [
          '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_11" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        uid: 'titleUpdateUID',
        _content_type_uid: 'embeddedrte',
        _in_progress: false,
        _embedded_items: {
          rich_text_editor: 
          [
            {
              uid: 'asset_uid_11',
              _content_type_uid: 'sys_assets'
            }
          ]
        }
      },
      {
        title: 'Entry with embedded entry',
        rich_text_editor: [
          '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_12" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        uid: 'entry_uid_20',
        _content_type_uid: 'embeddedrte',
        _in_progress: false,
        _embedded_items: {
          rich_text_editor: [
            {
              uid: 'entry_uid_21',
              _content_type_uid: '1234'
            },
            {
              uid: 'entry_uid_21',
              _content_type_uid: '1234'
            },
            {
              uid: 'asset_uid_12',
              _content_type_uid: 'sys_assets'
            }
          ]
        }
      }
    ],
    rte: [
      {
        title: 'Update this title',
        url: '',
        locale: 'en-us',
        uid: 'entry_uid_16',
        _content_type_uid: 'content_block',
        _version: 5,
        _in_progress: false,
        multi_line: '',
        _embedded_items: {
          rich_text_editor:[
            {
              uid: 'entry_uid_16',
              _content_type_uid: 'content_block'
            }
          ]
        },
        rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"></figure>',
      },
      {
        title: 'updated title',
        rich_text_editor: [
          '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_11" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        uid: 'titleUpdateUID',
        _content_type_uid: 'embeddedrte',
        _in_progress: false,
        _embedded_items: {
          rich_text_editor: 
          [
            {
              uid: 'asset_uid_11',
              _content_type_uid: 'sys_assets',
            }
          ]
        }
      },
      {
        title: 'Entry with embedded entry',
        rich_text_editor: [
          '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_12" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        uid: 'entry_uid_20',
        _content_type_uid: 'embeddedrte',
        _in_progress: false,
        _embedded_items: {
          rich_text_editor:[
            {
              uid: 'entry_uid_21',
              _content_type_uid: '1234'
            },
            {
              uid: 'entry_uid_21',
              _content_type_uid: '1234'
            },
            {
              uid: 'asset_uid_12',
              _content_type_uid: 'sys_assets'
            }
          ]
        }
      }
    ]
  }
}
export const entryMultilevelEmbed =  {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: '<figure class="embedded-entry block-entry" data-sys-entry-uid="titleUpdateUID" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="block" type="entry"></figure>\n<p></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/entry_uid_18/html5.png" data-sys-asset-uid="entry_uid_18" data-sys-asset-filename="svg-logo-text.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>',
    locale: 'en-us',
    _in_progress: false,
    uid: 'asset_uid_10',
    rte: '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_20" data-sys-entry-locale="en-us" data-sys-content-type-uid="embeddedrte" sys-style-type="inline" type="entry"></figure>\n<p></p>',
    _embedded_items: {
      rich_text_editor: [
        {
          uid: 'entry_uid_18',
          content_type: 'image/png',
          file_size: '36743',
          filename: 'svg-logo-text.png',
          url: '/entry_uid_18/svg-logo-text.png',
          title: 'svg-logo-text.png',
          description: '',
          _content_type_uid: 'sys_assets',
        },
        {
          title: 'Update this title',
          url: '',
          locale: 'en-us',
          uid: 'entry_uid_16',
          _content_type_uid: 'content_block',
          _version: 5,
          _in_progress: false,
          multi_line: '',
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'entry_uid_16',
                _content_type_uid: 'content_block'
              }
            ]
          },
          rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"></figure>',
        },
        {
          title: 'updated title',
          rich_text_editor: [
            '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_11" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
          ],
          locale: 'en-us',
          uid: 'titleUpdateUID',
          _content_type_uid: 'embeddedrte',
          _in_progress: false,
          _embedded_items: {
            rich_text_editor:[
              {
                _content_type_uid: 'sys_assets',
                uid: 'asset_uid_11',
                content_type: 'image/png',
                file_size: '36743',
                filename: 'svg-logo-text.png',
                url: '/entry_uid_18/svg-logo-text.png',
                title: 'svg-logo-text.png',
                description: ''
              }
            ]
          }
        },
        {
          title: 'Entry with embedded entry',
          rich_text_editor: [
            '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_12" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
          ],
          locale: 'en-us',
          uid: 'entry_uid_20',
          _content_type_uid: 'embeddedrte',
          _in_progress: false,
          _embedded_items: {
            rich_text_editor:[
              {
                uid: 'entry_uid_21',
                _content_type_uid: '1234'
              },
              {
                uid: 'entry_uid_21',
                _content_type_uid: '1234'
              },
              {
                uid: 'asset_uid_12',
                _content_type_uid: 'sys_assets'
              }
            ]
          },
        }
      ],
      rte: [
        {
          uid: 'entry_uid_18',
          content_type: 'image/png',
          _content_type_uid: 'sys_assets',
          file_size: '36743',
          filename: 'svg-logo-text.png',
          url: '/entry_uid_18/svg-logo-text.png',
          title: 'svg-logo-text.png',
          description: ''
        },
        {
          title: 'Update this title',
          url: '',
          locale: 'en-us',
          uid: 'entry_uid_16',
          _content_type_uid: 'content_block',
          _version: 5,
          _in_progress: false,
          multi_line: '',
          _embedded_items: {
            rich_text_editor:[
              {
                uid: 'entry_uid_16',
                _content_type_uid: 'content_block'
              }
            ]
          },
          rich_text_editor: '<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_16" data-sys-entry-locale="en-us" data-sys-content-type-uid="content_block" sys-style-type="inline" type="entry"></figure>',
        },
        {
          title: 'updated title',
          rich_text_editor: [
            '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_11" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
          ],
          locale: 'en-us',
          uid: 'titleUpdateUID',
          _content_type_uid: 'embeddedrte',
          _in_progress: false,
          _embedded_items: {
            rich_text_editor:[
              {
                uid: 'asset_uid_11',
                content_type: 'image/png',
                file_size: '36743',
                filename: 'svg-logo-text.png',
                url: '/entry_uid_18/svg-logo-text.png',
                title: 'svg-logo-text.png',
                description: '',
                _content_type_uid: 'sys_assets',
              }
            ]
          }
        },
        {
          title: 'Entry with embedded entry',
          rich_text_editor: [
            '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_12" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
          ],
          locale: 'en-us',
          uid: 'entry_uid_20',
          _content_type_uid: 'embeddedrte',
          _in_progress: false,
          _embedded_items: {
              rich_text_editor: [
              {
                uid: 'entry_uid_21',
                _content_type_uid: '1234'
              },
              {
                uid: 'entry_uid_21',
                _content_type_uid: '1234'
              },
              {
                uid: 'asset_uid_12',
                _content_type_uid: 'sys_assets',
              }
            ]
          }
        }
      ]
    },
  }

export const entryAssetRichText = `<p>&nbsp;</p>
<img src=\"/asset_uid_1/dummy.pdf\" alt=\"dummy.pdf\" />
<img data-image=\"236uaymkloww\" src=\"https://contentstack.image/html5.png\" data-sys-asset-uid=\"asset_uid_8\" alt=\"html5.png\">
<p></p>
<img src=\"/svg-logo-text.png\" alt=\"svg-logo-text.png\" />`

export const entryAssetRichTextRenderOption = `<p>&nbsp;</p>
<img src=\"/asset_uid_1/dummy.pdf\" alt=\"Alternet Text\" />
<img data-image=\"236uaymkloww\" src=\"https://contentstack.image/html5.png\" data-sys-asset-uid=\"asset_uid_8\" alt=\"html5.png\">
<p></p>
<img src=\"/svg-logo-text.png\" alt=\"Alternet Text\" />`

export const entryMultipleRichText = `<div><p>updated title</p><p>Content type: <span>embeddedrte</span></p></div>
<p></p>
<img src=\"/entry_uid_18/svg-logo-text.png\" alt=\"svg-logo-text.png\" />`

export const entrymultipleRTE = `<div><p>Update this title</p><p>Content type: <span>content_block</span></p></div>
<span>Entry with embedded entry</span>
<p></p>`

export const entrymultipleRTERenderOption = `<div>
            <div>Update this title</div>
            <div><span>entry_uid_16</span>
            </div>
<div>
            <div>entry_uid_20</div>
            <MYCONTENT><div><p>entry_uid_21</p><p>Content type: <span>1234</span></p></div>
<span>entry_uid_21</span>
<p><br><br></p>
<img src=\"undefined\" alt=\"asset_uid_12\" /></MYCONTENT>
            </div>
<p></p>`