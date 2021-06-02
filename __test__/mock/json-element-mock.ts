const paragraphJson = {
    uid: "06e34a7a4e5481190849d7fc2acd",
    _version: 13,
    attrs: {},
    children: [
        {
            type: "p",
            attrs: {},
            uid: "0a13457efb56ffe976aa510e5a",
            children: [
                {
                    text: "text"
                }
            ]
        }
    ],
    type: "doc"
}

const assetReferenceJson = {
    uid: "06e34a7a7a5e4e549d7fc2acd",
    _version: 1,
    attrs: {},
    children: [
        {
            "uid": "4f7e333390a955de10c1c836",
            "type": "reference",
            "attrs": {
                "display-type": "display",
                "asset-uid": "blt44asset",
                "content-type-uid": "sys_assets",
                "asset-link": "https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg",
                "asset-name": "11.jpg",
                "asset-type": "image/jpeg",
                "type": "asset",
                "class-name": "embedded-asset",
                "width": 25.16914749661705,
                "className": "dsd",
                "id": "sdf"
            },
            "children": [
                {
                    "text": ""
                }
            ]
        }
    ],
    type: "doc"
}
const entryReferenceBlockJson = {
    uid: "06e34a7a7a5e4e549d7fc2acd",
    _version: 1,
    attrs: {},
    children: [
    {
        "uid": "70f9b325075d43128c0d0aa3eb7f291f",
        "type": "reference",
        "attrs": {
          "display-type": "block",
          "entry-uid": "blttitleuid",
          "content-type-uid": "content_block",
          "locale": "en-us",
          "type": "entry",
          "class-name": "embedded-entry"
        },
        "children": [
          {
            "text": ""
          }
        ]
      } 
    ],
    type: "doc"
}
const entryReferenceLinkJson = {
    uid: "06e34a7a7a5e4e549d7fc2acd",
    _version: 1,
    attrs: {},
    children: [
        {
            "uid": "7626ea98e0e95d602210",
            "type": "reference",
            "attrs": {
            "target": "_self",
            "href": "/copy-of-entry-final-02",
            "display-type": "link",
            "entry-uid": "bltemmbedEntryUID",
            "content-type-uid": "embeddedrte",
            "locale": "en-us",
            "type": "entry",
            "class-name": "embedded-entry"
            },
            "children": [
            {
                "text": "/copy-of-entry-final-02"
            }
            ]
        } 
    ],
    type: "doc"
}
const entryReferenceInlineJson = {
    uid: "06e34a7a7a5e4e549d7fc2acd",
    _version: 1,
    attrs: {},
    children: [
        {
            "uid": "5064878f3f4621f0cbcaff",
            "type": "reference",
            "attrs": {
            "display-type": "inline",
            "entry-uid": "blttitleUpdateUID",
            "content-type-uid": "embeddedrte",
            "locale": "en-us",
            "type": "entry",
            "class-name": "embedded-entry"
            },
            "children": [
            {
                "text": ""
            }
            ]
        }
    ],
    type: "doc"
}

const paragraphEntry = {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: {...paragraphJson},
    locale: 'en-us',
    _in_progress: false,
    uid: 'blt88jn',
}

const paragraphJsonArrayEntry = {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: [paragraphJson],
    locale: 'en-us',
    _in_progress: false,
    uid: 'blt88jn',
    
}

const embeddedAssetJsonEntry = {
    uid: 'entry_uid',
    rich_text_editor: {...assetReferenceJson},
    rte: [
      assetReferenceJson
    ],
    _embedded_items: 
    {
        rich_text_editor: 
        [
          {
            _content_type_uid: 'sys_assets',
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
            _content_type_uid: 'sys_assets',
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
}

const embeddedEntryJsonEntry = {
    uid: 'entry-block-link-inline',
    rich_text_editor: {...entryReferenceBlockJson},
    rte: [
        entryReferenceBlockJson,
        entryReferenceLinkJson,
        entryReferenceInlineJson
    ],
    _embedded_items: {
      rich_text_editor: [
        {
          title: 'Update this title',
          url: '',
          locale: 'en-us',
          uid: 'blttitleuid',
          _content_type_uid: 'content_block',
          _version: 5,
          _in_progress: false,
          multi_line: '',
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'blttitleuid',
                _content_type_uid: 'content_block'
              }
            ]
          },
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
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'bltassetUID',
                _content_type_uid: 'sys_assets',
              }
            ]
          }
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
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'blt1234CtUID',
                _content_type_uid: '1234'
              },
              {
                uid: 'blt1234CtUID',
                _content_type_uid: '1234'
              },
              {
                uid: 'blt1234AssetUID',
                _content_type_uid: 'sys_assets'
              }
            ]
          }
        },
        {
          uid: 'bltassetEmbuid',
          _content_type_uid: 'sys_assets',
          content_type: 'image/png',
          file_size: '36743',
          filename: 'svg-logo-text.png',
          url: '/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png',
          title: 'svg-logo-text.png',
          description: ''
        }
      ],
      rte: [
        {
          uid: 'bltassetEmbuid',
          content_type: 'image/png',
          _content_type_uid: 'sys_assets',
          file_size: '36743',
          filename: 'svg-logo-text.png',
          url: '/v3/assets/blturl/bltassetEmbuid/5f59f360d33e9a0a3571b707/svg-logo-text.png',
          title: 'svg-logo-text.png',
          description: ''
        },
        {
          title: 'Update this title',
          url: '',
          locale: 'en-us',
          uid: 'blttitleuid',
          _content_type_uid: 'content_block',
          _version: 5,
          _in_progress: false,
          multi_line: '',
          _embedded_items: {
            rich_text_editor: [
              {
                uid: 'blttitleuid',
                _content_type_uid: 'content_block'
              }
            ]
          },
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
          _embedded_items: { 
            rich_text_editor:
            [
              {
                uid: 'bltassetUID',
                _content_type_uid: 'sys_assets'
              }
            ]
          }
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
          _embedded_items: {
            rich_text_editor:[
              {
                uid: 'blt1234CtUID',
                _content_type_uid: '1234'
              },
              {
                uid: 'blt1234CtUID',
                _content_type_uid: '1234'
              },
              {
                uid: 'blt1234AssetUID',
                _content_type_uid: 'sys_assets'
              }
            ]
          }
        }
      ]
    }
}

export { 
    paragraphJson, 
    paragraphEntry, 
    assetReferenceJson, 
    paragraphJsonArrayEntry, 
    embeddedAssetJsonEntry,
    embeddedEntryJsonEntry,
    entryReferenceLinkJson,
    entryReferenceBlockJson,
    entryReferenceInlineJson
}