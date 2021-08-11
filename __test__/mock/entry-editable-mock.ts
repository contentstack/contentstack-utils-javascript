const entry_with_text =  {
    "_version": 10,
    "locale": "en-us",
    "uid": "bltcb70aa8425b4676c",
    "ACL": {},
    "rich_text_editor": "<div class=\"redactor-component embedded-entry block-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"blt41a3bf40728446c3\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_suraj\" sys-style-type=\"block\" type=\"entry\" data-sys-can-edit=\"true\"></div>\n<p>one</p>\n<figure class=\"embedded-asset\" data-sys-asset-filelink=\"https://dev16-images.contentstack.com/v3/assets/blt77263d300aee3e6b/blt120a5a04d91c9466/5ebb86965a68ad069038b729/iphone-mockup.png\" data-sys-asset-uid=\"blt120a5a04d91c9466\" data-sys-asset-filename=\"iphone-mockup.png\" data-sys-asset-contenttype=\"image/png\" type=\"asset\" sys-style-type=\"display\"></figure>",
    "rich_text_editor_multiple": [
        "<p>Two</p><img data-image=\"akofs65z4070\" src=\"https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg\" data-sys-asset-uid=\"blt7324a68403ee7281\" alt=\"11.jpg\">"
    ]
}

const entry_modular_block = {
    "_version": 10,
    "locale": "en-us",
    "uid": "bltcb70aa8425b4676c",
    "ACL": {},
    "modular_blocks": [
        {
            "rich_text_inmodular": {
                "rich_text_editor": "<div class=\"redactor-component embedded-entry block-entry redactor-component-active\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"bltf2fb45e5fc46f8d4\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_suraj_final\" data-sys-can-edit=\"true\" sys-style-type=\"block\" type=\"entry\"></div>\n<p>Modul 1</p>",
                "rich_text_editor_multiple": [
                    "<p>module 2&nbsp;</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg\" data-sys-asset-uid=\"blt7324a68403ee7281\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>"
                ],
                "_metadata": {
                    "uid": "csb005424df53ebe6d"
                }
            }
        },
        {
            "global_modular": {
                "rich_text_editor": "<p><a data-sys-entry-uid=\"blt4d27c2875ffcaefc\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/entry-1\" title=\"Entry 1\">Global</a> 1</p>",
                "rich_text_editor_multiple": [
                    "<p>Global 2<span class=\"redactor-component embedded-entry inline-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"blt1c9e75e3608f8c6b\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"inline\" type=\"entry\"></span></p>"
                ],
                "group": {
                    "rich_text_editor": "<p>Global group 1</p><div class=\"redactor-component embedded-entry block-entry redactor-component-active\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"blt92875864eb2678c6\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_bug_1\" data-sys-can-edit=\"true\" sys-style-type=\"block\" type=\"entry\"></div>",
                    "rich_text_editor_multiple": [
                        "<p>Global <a data-sys-entry-uid=\"blt92875864eb2678c6\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_bug_1\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/kitee\" title=\"kitee\">Global</a> 2</p>"
                    ]
                },
                "modular_blocks": [
                    {
                        "rich_in_modular": {
                            "rich_text_editor": "<p><a data-sys-entry-uid=\"bltb9e1cfc94315f8eb\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_copy_of_00_suraj\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/entry-11-00-suraj\" title=\"Entry 11 00 Suraj\">Global</a> 1</p>",
                            "rich_text_editor_multiple": [
                                "<p>Module 2</p><div class=\"redactor-component embedded-entry block-entry redactor-component-active\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"blt49af3673cdd268a5\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"block\" type=\"entry\"></div>"
                            ],
                            "_metadata": {
                                "uid": "cs3a04936ad071c1f6"
                            }
                        }
                    }
                ],
                "_metadata": {
                    "uid": "csee93977f7b5e442d"
                }
            }
        }
    ]
}

const entry_reference = {
    "_version": 10,
    "locale": "en-us",
    "uid": "bltcb70aa8425b4676c",
    "ACL": {},
    "reference": [
        {
            "uid": "blt9c95983f8f327537",
            "_content_type_uid": "embed_entry",
            "created_at": '2020-08-19T09:13:32.785Z',
            "updated_at": '2020-08-19T09:13:32.785Z',
            "created_by": 'bltcreate',
            "updated_by": 'bltcreate',
            "_version": 1,
            "title": 'updated title',
            "rich_text_editor": '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/bltassetUID/5f4dee15f4b7a40acfb622dc/DIABETICDIET-800x600.jpg" data-sys-asset-uid="bltassetUID" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>',   
            "rich_text_editor_multiple": [
                '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/v3/assets/blturl/bltassetUID/5f4dee15f4b7a40acfb622dc/DIABETICDIET-800x600.jpg" data-sys-asset-uid="bltassetUID" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
            ],     
        }
    ]
}

const entry_global_field = {
    "_version": 10,
    "locale": "en-us",
    "uid": "bltcb70aa8425b4676c",
    "ACL": {},
    "global_rich": {
        "rich_text_editor": "<p><a data-sys-entry-uid=\"blt41a3bf40728446c3\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_suraj\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/suraj-123-entry\" title=\"Manish New entry\">Global</a></p>",
        "rich_text_editor_multiple": [
            "<p>global 2<a data-sys-entry-uid=\"blt49af3673cdd268a5\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/untitledsas\" title=\"Untitledsas\">Global</a></p>"
        ],
        "group": {
            "rich_text_editor": "<div class=\"redactor-component embedded-entry block-entry redactor-component-active\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"blt1c9e75e3608f8c6b\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"block\" type=\"entry\"></div>\n<p>Global group 1</p>",
            "rich_text_editor_multiple": [
                "<p><span class=\"redactor-component embedded-entry inline-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"blt1c9e75e3608f8c6b\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"inline\" type=\"entry\"></span></p>"
            ]
        },
        "modular_blocks": [
            {
                "rich_in_modular": {
                    "rich_text_editor": "<p>global&nbsp;</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg\" data-sys-asset-uid=\"blt7324a68403ee7281\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>\n<p> modular 1</p>",
                    "rich_text_editor_multiple": [
                        "<p>global modular 2<span class=\"redactor-component embedded-entry inline-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"blt2fcbb159a2a4c216\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_bug_1\" data-sys-can-edit=\"true\" sys-style-type=\"inline\" type=\"entry\"></span></p>"
                    ],
                    "_metadata": {
                        "uid": "csa79c950db2d52503"
                    }
                }
            }
        ]
    },
}

const entry_global_field_multiple = {
    "_version": 10,
    "locale": "en-us",
    "uid": "bltcb70aa8425b4676c",
    "ACL": {},
    "global_rich_multiple": [
        {
            "rich_text_editor": "<p>Global <a data-sys-entry-uid=\"blt3e080541e130736b\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_suraj\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/copy-of-suraj-123-entry\" title=\"Copy of Suraj 123 Entry\">multiple</a> 1</p>",
            "rich_text_editor_multiple": [
                "<p>Global multiple 2<span class=\"redactor-component embedded-entry inline-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"blt49af3673cdd268a5\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"inline\" type=\"entry\"></span></p>"
            ],
            "group": {
                "rich_text_editor": "<p>Global multiple group 1</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg\" data-sys-asset-uid=\"blt7324a68403ee7281\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>",
                "rich_text_editor_multiple": [
                    "<p>Global multiple group 2</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg\" data-sys-asset-uid=\"blt7324a68403ee7281\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>"
                ]
            },
            "modular_blocks": [
                {
                    "rich_in_modular": {
                        "rich_text_editor": "<p><a data-sys-entry-uid=\"blt1c9e75e3608f8c6b\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/untitled\" title=\"Entry 001 123\">Global multiple modular 1</a></p>",
                        "rich_text_editor_multiple": [
                            "<p>Global multiple modular</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg\" data-sys-asset-uid=\"blt7324a68403ee7281\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>\n<p> 2</p>"
                        ],
                        "_metadata": {
                            "uid": "cs6d492f34be84aa04"
                        }
                    }
                }
            ],
            "_metadata": {
                "uid": "csed3e41fc79756950"
            }
        }
    ]
}
export {
    entry_with_text,
    entry_reference,
    entry_global_field,
    entry_modular_block,
    entry_global_field_multiple
}