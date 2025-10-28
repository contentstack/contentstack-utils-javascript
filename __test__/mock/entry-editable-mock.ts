const entry_with_text =  {
    "_version": 10,
    "locale": "en-us",
    "uid": "entry_uid_1",
    "ACL": {},
    "rich_text_editor": "<div class=\"redactor-component embedded-entry block-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_3\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_suraj\" sys-style-type=\"block\" type=\"entry\" data-sys-can-edit=\"true\"></div>\n<p>one</p>\n<figure class=\"embedded-asset\" data-sys-asset-filelink=\"https://image.url/iphone-mockup.png\" data-sys-asset-uid=\"entry_uid_14\" data-sys-asset-filename=\"iphone-mockup.png\" data-sys-asset-contenttype=\"image/png\" type=\"asset\" sys-style-type=\"display\"></figure>",
    "rich_text_editor_multiple": [
        "<p>Two</p><img data-image=\"akofs65z4070\" src=\"https://image.url/11.jpg\" data-sys-asset-uid=\"entry_uid_34\" alt=\"11.jpg\">"
    ]
}

const entry_modular_block = {
    "_version": 10,
    "locale": "en-us",
    "uid": "entry_uid_1",
    "ACL": {},
    "modular_blocks": [
        {
            "rich_text_inmodular": {
                "rich_text_editor": "<div class=\"redactor-component embedded-entry block-entry redactor-component-active\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_5\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_suraj_final\" data-sys-can-edit=\"true\" sys-style-type=\"block\" type=\"entry\"></div>\n<p>Modul 1</p>",
                "rich_text_editor_multiple": [
                    "<p>module 2&nbsp;</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://image.url/11.jpg\" data-sys-asset-uid=\"entry_uid_34\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>"
                ],
                "_metadata": {
                    "uid": "metadata_uid_1"
                }
            },
        },
        {
            "global_modular": {
                "rich_text_editor": "<p><a data-sys-entry-uid=\"entry_uid_6\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/entry-1\" title=\"Entry 1\">Global</a> 1</p>",
                "rich_text_editor_multiple": [
                    "<p>Global 2<span class=\"redactor-component embedded-entry inline-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_9\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"inline\" type=\"entry\"></span></p>"
                ],
                "group": {
                    "rich_text_editor": "<p>Global group 1</p><div class=\"redactor-component embedded-entry block-entry redactor-component-active\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_7\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_bug_1\" data-sys-can-edit=\"true\" sys-style-type=\"block\" type=\"entry\"></div>",
                    "rich_text_editor_multiple": [
                        "<p>Global <a data-sys-entry-uid=\"entry_uid_7\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_bug_1\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/kitee\" title=\"kitee\">Global</a> 2</p>"
                    ]
                },
                "modular_blocks": [
                    {
                        "rich_in_modular": {
                            "rich_text_editor": "<p><a data-sys-entry-uid=\"entry_uid_8\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_copy_of_00_suraj\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/entry-11-00-suraj\" title=\"Entry 11 00 Suraj\">Global</a> 1</p>",
                            "rich_text_editor_multiple": [
                                "<p>Module 2</p><div class=\"redactor-component embedded-entry block-entry redactor-component-active\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_10\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"block\" type=\"entry\"></div>"
                            ],
                            "_metadata": {
                                "uid": "metadata_uid_1"
                            }
                        },
                    }
                ],
                "_metadata": {
                    "uid": "metadata_uid_2"
                }
            }
        }
    ]
}

const entry_reference = {
    "_version": 10,
    "locale": "en-us",
    "uid": "entry_uid_1",
    "ACL": {},
    "reference": [
        {
            "uid": "entry_uid_11",
            "_content_type_uid": "embed_entry",
            "created_at": '2020-08-19T09:13:32.785Z',
            "updated_at": '2020-08-19T09:13:32.785Z',
            "created_by": 'create_by',
            "updated_by": 'create_by',
            "_version": 1,
            "title": 'updated title',
            "rich_text_editor": '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_3" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>',   
            "rich_text_editor_multiple": [
                '<figure class="embedded-asset" data-sys-asset-filelink="https://contentstack.image/DIABETICDIET-800x600.jpg" data-sys-asset-uid="asset_uid_3" data-sys-asset-filename="DIABETICDIET-800x600.jpg" data-sys-asset-contenttype="image/jpeg" type="asset" sys-style-type="display"></figure>'
            ],     
        }
    ]
}

const entry_global_field = {
    "_version": 10,
    "locale": "en-us",
    "uid": "entry_uid_1",
    "ACL": {},
    "global_rich": {
        "rich_text_editor": "<p><a data-sys-entry-uid=\"entry_uid_3\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_suraj\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/suraj-123-entry\" title=\"Manish New entry\">Global</a></p>",
        "rich_text_editor_multiple": [
            "<p>global 2<a data-sys-entry-uid=\"entry_uid_10\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/untitledsas\" title=\"Untitledsas\">Global</a></p>"
        ],
        "group": {
            "rich_text_editor": "<div class=\"redactor-component embedded-entry block-entry redactor-component-active\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_9\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"block\" type=\"entry\"></div>\n<p>Global group 1</p>",
            "rich_text_editor_multiple": [
                "<p><span class=\"redactor-component embedded-entry inline-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_9\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"inline\" type=\"entry\"></span></p>"
            ]
        },
        "modular_blocks": [
            {
                "rich_in_modular": {
                    "rich_text_editor": "<p>global&nbsp;</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://image.url/11.jpg\" data-sys-asset-uid=\"entry_uid_34\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>\n<p> modular 1</p>",
                    "rich_text_editor_multiple": [
                        "<p>global modular 2<span class=\"redactor-component embedded-entry inline-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_12\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_bug_1\" data-sys-can-edit=\"true\" sys-style-type=\"inline\" type=\"entry\"></span></p>"
                    ],
                    "_metadata": {
                        "uid": "metadata_uid_1"
                    }
                },
            }
        ]
    },
}

const entry_global_field_multiple = {
    "_version": 10,
    "locale": "en-us",
    "uid": "entry_uid_1",
    "ACL": {},
    "global_rich_multiple": [
        {
            "rich_text_editor": "<p>Global <a data-sys-entry-uid=\"entry_uid_13\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"00_suraj\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/copy-of-suraj-123-entry\" title=\"Copy of Suraj 123 Entry\">multiple</a> 1</p>",
            "rich_text_editor_multiple": [
                "<p>Global multiple 2<span class=\"redactor-component embedded-entry inline-entry\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-entry-uid=\"entry_uid_10\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" data-sys-can-edit=\"true\" sys-style-type=\"inline\" type=\"entry\"></span></p>"
            ],
            "group": {
                "rich_text_editor": "<p>Global multiple group 1</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://image.url/11.jpg\" data-sys-asset-uid=\"entry_uid_34\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>",
                "rich_text_editor_multiple": [
                    "<p>Global multiple group 2</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://image.url/11.jpg\" data-sys-asset-uid=\"entry_uid_34\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>"
                ]
            },
            "modular_blocks": [
                {
                    "rich_in_modular": {
                        "rich_text_editor": "<p><a data-sys-entry-uid=\"entry_uid_9\" data-sys-entry-locale=\"en-us\" data-sys-content-type-uid=\"0_solve\" sys-style-type=\"link\" data-sys-can-edit=\"true\" class=\"embedded-entry\" type=\"entry\" href=\"/untitled\" title=\"Entry 001 123\">Global multiple modular 1</a></p>",
                        "rich_text_editor_multiple": [
                            "<p>Global multiple modular</p><figure class=\"embedded-asset\" data-redactor-type=\"embed\" data-widget-code=\"\" data-sys-asset-filelink=\"https://image.url/11.jpg\" data-sys-asset-uid=\"entry_uid_34\" data-sys-asset-filename=\"11.jpg\" data-sys-asset-contenttype=\"image/jpeg\" type=\"asset\" sys-style-type=\"display\"></figure>\n<p> 2</p>"
                        ],
                        "_metadata": {
                            "uid": "metadata_uid_1"
                        }
                    },
                }
            ],
            "_metadata": {
                "uid": "metadata_uid_1"
            }
        }
    ]
}
// Mock entry with applied variants for testing variant functionality
const entry_with_applied_variants = {
    "_version": 10,
    "locale": "en-us",
    "uid": "entry_uid_1",
    "ACL": {},
    "_applied_variants": {
        "rich_text_editor": "variant_1",
        "nested.field": "variant_2",
        "modular_blocks.content_from_variant.metadata_uid_2": "variant_3",
        "modular_blocks.content_from_variant.metadata_uid_2.different_from_parent_variant": "variant_4"
    },
    "rich_text_editor": "<p>Content with variant</p>",
    "rich_text_editor_multiple": [
        "<p>Multiple content with variant</p>"
    ],
    "nested": {
        "field": "nested field content",
        "other_field": "other nested content"
    },
    "modular_blocks": [
        {
            "content": {
                "title": "modular title",
                "_metadata": {
                    "uid": "metadata_uid_1"
                }
            }
        },
        {
            "content_from_variant": {
                "title": "modular title from variant",
                "different_from_parent_variant": "different from parent variant",
                "_metadata": {
                    "uid": "metadata_uid_2"
                }
            }
        }
    ]
}


// Mock entry with nested parent path variants
const entry_with_parent_path_variants = {
    "_version": 10,
    "locale": "en-us", 
    "uid": "entry_uid_3",
    "ACL": {},
    "_applied_variants": {
        "group": "parent_variant",
        "group.nested.deep": "deep_variant",
        "modular_blocks.content.metadata_uid_1": "parent_variant"
    },
    "group": {
        "nested": {
            "field": "nested field",
            "deep": {
                "field": "deep field"
            }
        },
        "other": "other field"
    },
    "modular_blocks": [
        {
            "content": {
                "title": "modular title",
                "_metadata": {
                    "uid": "metadata_uid_1"
                }
            },
        },
        {
            "content": {
                "title": "modular title 2",
                "_metadata": {
                    "uid": "metadata_uid_2"
                }
            },
        }
    ],
    "group_multiple": [
        {
            "other": "other field",
            "_metadata": {
                "uid": "metadata_uid_1"
            }
        }
    ]
}

export {
    entry_with_text,
    entry_reference,
    entry_global_field,
    entry_modular_block,
    entry_global_field_multiple,
    entry_with_applied_variants,
    entry_with_parent_path_variants
}