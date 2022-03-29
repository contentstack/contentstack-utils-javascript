import { EmbeddedConnection } from "../../src/Models/json-rte-model"

const embeddedItemsConnection: EmbeddedConnection = {
  edges: [
    {
      node: {
        system:  {
          content_type_uid: 'sys_assets',
          uid: 'asset_uid_9'
        },
        created_at: '2020-08-19T09:13:05.864Z',
        updated_at: '2020-09-10T09:35:28.393Z',
        created_by: 'create_uid',
        updated_by: 'create_uid',
        content_type: 'image/png',
        file_size: '36743',
        filename: 'svg-logo-text.png',
        url: '/v3/assets/svg-logo-text.png',
        _version: 7,
        title: 'svg-logo-text.png',
        description: '',
      }
    }, {
      node: {
        system:  {
          content_type_uid: 'sys_assets',
          uid: 'asset_uid_1',
        },
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
      }
    }, {
      node: {
        title: 'Update this title',
        url: '',
        locale: 'en-us',
        system:  {
          uid: 'entry_uid_16',
          content_type_uid: 'content_block',
        },
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
      }
    }, {
      node: {
        title: 'updated title',
        rich_text_editor: [
          '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/asset_uid_11//DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_11" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        system:  {
          uid: 'titleUpdateUID',
          content_type_uid: 'embeddedrte',
        },
        _in_progress: false,
        _embedded_items: {
          rich_text_editor: [
            {
              uid: 'asset_uid_11',
              _content_type_uid: 'sys_assets',
            }
          ]
        }
      }
    }, {
      node: {
        title: 'Entry with embedded entry',
        rich_text_editor: [
          '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_12" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        system:  {
          uid: 'entry_uid_20',
          content_type_uid: 'embeddedrte',
        },
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
    }, {
      node: {
        system:  {
          uid: 'entry_uid_18',
          content_type_uid: 'sys_assets',
        },
        content_type: 'image/png',
        file_size: '36743',
        filename: 'svg-logo-text.png',
        url: '/entry_uid_18/svg-logo-text.png',
        title: 'svg-logo-text.png',
        description: ''
      }
    }, {
      node: {
        title: 'Update this title',
        url: '',
        locale: 'en-us',
        system:  {
          uid: 'entry_uid_16',
          content_type_uid: 'content_block',
        },
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
      }
    }, {
      node: {
        title: 'updated title',
        rich_text_editor: [
          '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_11" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        system:  {
          uid: 'titleUpdateUID',
          content_type_uid: 'embeddedrte',
        },
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
      }
    }, {
      node: {
        title: 'Entry with embedded entry',
        rich_text_editor: [
          '<figure class="embedded-entry block-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="block" type="entry"></figure>\n<figure class="embedded-entry inline-entry" data-sys-entry-uid="entry_uid_21" data-sys-content-type-uid="1234" sys-style-type="inline" type="entry"></figure>\n<p><br><br></p>\n<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/html5.png" data-sys-asset-uid="asset_uid_12" data-sys-asset-filename="html5.png" data-sys-asset-contenttype="image/png" type="asset" sys-style-type="display"></figure>'
        ],
        locale: 'en-us',
        system:  {
          uid: 'entry_uid_20',
          content_type_uid: 'embeddedrte',
        },
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
    }
  ]
}

export {
    embeddedItemsConnection
}
