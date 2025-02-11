export const gqlResponseForAssetUpdate = {
  "data": {
    "page_json_rte": {
      "title": "My First JSON-Rte Entry",
      "system": {
        "content_type_uid": "page_json_rte",
        "uid": "uid_page_json_rte"
      },
      "rte_2": {
        "embedded_itemsConnection": {
          "edges": [
            {
              "node": {
                "title": "FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "url": "https://images.contentstack.io/v3/assets/api_key/asset_uid_1341/66427e3816e6bfae8f58d971/pexels-pixabay-33109.jpg",
                "content_type": "image/jpeg",
                "filename": "pexels-pixabay-33109.jpg",
                "system": {
                  "uid": "asset_uid_1341"
                }
              }
            }
          ]
        },
        "json": {
          "type": "doc",
          "uid": "rte_uid",
          "attrs": {},
          "children": [
            {
              "uid": "rte_node_uid",
              "type": "reference",
              "attrs": {
                "display-type": "display",
                "asset-uid": "asset_uid_1341",
                "content-type-uid": "sys_assets",
                "asset-link": "https://images.contentstack.io/v3/assets/api_key/asset_uid_1341/6502bb17bb60f72316481aaa/FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "asset-name": "FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "asset-type": "image/jpeg",
                "type": "asset",
                "class-name": "embedded-asset",
                "alt": "FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "asset-alt": "FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "inline": false
              },
              "children": [
                {
                  "text": ""
                }
              ]
            },
            {
              "type": "p",
              "attrs": {},
              "uid": "rte_node_2_uid",
              "children": [
                {
                  "text": ""
                }
              ]
            }
          ],
          "_version": 10
        }
      }
    }
  }
}

export const gqlResponseForAssetUpdateWithoutSystemUid = {
  "data": {
    "page_json_rte": {
      "title": "My First JSON-Rte Entry",
      "system": {
        "content_type_uid": "page_json_rte",
        "uid": "uid_page_json_rte"
      },
      "rte_2": {
        "embedded_itemsConnection": {
          "edges": [
            {
              "node": {
                "title": "FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "url": "https://images.contentstack.io/v3/assets/api_key/asset_uid_1341/66427e3816e6bfae8f58d971/pexels-pixabay-33109.jpg",
                "content_type": "image/jpeg",
                "filename": "pexels-pixabay-33109.jpg",
              }
            }
          ]
        },
        "json": {
          "type": "doc",
          "uid": "rte_uid",
          "attrs": {},
          "children": [
            {
              "uid": "rte_node_uid",
              "type": "reference",
              "attrs": {
                "display-type": "display",
                "asset-uid": "asset_uid_1341",
                "content-type-uid": "sys_assets",
                "asset-link": "https://images.contentstack.io/v3/assets/api_key/asset_uid_1341/6502bb17bb60f72316481aaa/FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "asset-name": "FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "asset-type": "image/jpeg",
                "type": "asset",
                "class-name": "embedded-asset",
                "alt": "FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "asset-alt": "FA23_TJ_FUEL_TJM_DEL_1_STITCHED.jpg",
                "inline": false
              },
              "children": [
                {
                  "text": ""
                }
              ]
            },
            {
              "type": "p",
              "attrs": {},
              "uid": "rte_node_2_uid",
              "children": [
                {
                  "text": ""
                }
              ]
            }
          ],
          "_version": 10
        }
      }
    }
  }
}

export const gqlResponseForAssetUpdateMultipleEntries = {
  "data": {
    "page_json_rte": {
      "total": 1,
      "items": [
        {
          "body_new": [
            {
              "__typename": "CopyOfArticleTutorialBodyNewBody",
              "body": {
                "body_12": {
                  "json": {
                    "type": "doc",
                    "attrs": {},
                    "uid": "rte_uid",
                    "children": [
                      {
                        "uid": "ref_uid",
                        "type": "reference",
                        "attrs": {
                          "display-type": "display",
                          "asset-uid": "asset_uid_1",
                          "content-type-uid": "sys_assets",
                          "asset-link": "https://azure-na-images.contentstack.com/v3/assets/folder_uid/asset_uid_1/folder_uid_2/merry-marketplace.png?branch=test2",
                          "asset-name": "merry-marketplace.png",
                          "asset-type": "image/png",
                          "type": "asset",
                          "class-name": "embedded-asset",
                          "alt": "merry-marketplace.png",
                          "asset-alt": "merry-marketplace.png",
                          "inline": false
                        },
                        "children": [
                          {
                            "text": ""
                          }
                        ]
                      },
                      {
                        "uid": "p8_uid",
                        "type": "p",
                        "children": [
                          {
                            "text": "\n\ntext 2\n\n"
                          }
                        ],
                        "attrs": {}
                      },
                      {
                        "uid": "ref2_uid",
                        "type": "reference",
                        "attrs": {
                          "display-type": "display",
                          "asset-uid": "asset_uid_2",
                          "content-type-uid": "sys_assets",
                          "asset-link": "https://azure-na-images.contentstack.com/v3/assets/folder_uid/asset_uid_2/folder_uid_3/blog-assortment-growth_1.png?branch=test2",
                          "asset-name": "merry-marketplace.png",
                          "asset-type": "image/png",
                          "type": "asset",
                          "class-name": "embedded-asset",
                          "alt": "merry-marketplace.png",
                          "asset-alt": "merry-marketplace.png",
                          "inline": false
                        },
                        "children": [
                          {
                            "text": ""
                          }
                        ]
                      },
                      {
                        "uid": "p9_uid",
                        "type": "p",
                        "attrs": {},
                        "children": [
                          {
                            "text": "\n\ntext 3\n\n"
                          },
                          {
                            "uid": "ref3_uid",
                            "type": "reference",
                            "attrs": {
                              "display-type": "link",
                              "type": "asset",
                              "class-name": "embedded-entry redactor-component undefined-entry",
                              "asset-uid": "asset_uid_3",
                              "content-type-uid": "sys_assets",
                              "target": "_self",
                              "href": "https://azure-na-assets.contentstack.com/v3/assets/folder_uid/asset_uid_3/folder_uid_4/2412_Tracking-Number-dos-and-donts.pdf?branch=test2"
                            },
                            "children": [
                              {
                                "text": "https://azure-na-assets.contentstack.com/v3/assets/folder_uid/asset_uid_3/67613d97e789e60c7b802387/2412_Tracking-Number-dos-and-donts.pdf?branch=test2"
                              }
                            ]
                          },
                          {
                            "text": ""
                          }
                        ]
                      },
                      {
                        "uid": "p10_uid",
                        "type": "p",
                        "children": [
                          {
                            "text": ""
                          }
                        ],
                        "attrs": {}
                      },
                      {
                        "uid": "p11_uid",
                        "type": "p",
                        "children": [
                          {
                            "text": ""
                          }
                        ],
                        "attrs": {}
                      }
                    ],
                    "_version": 12
                  },
                  "embedded_itemsConnection": {
                    "edges": [
                      {
                        "node": {
                          "title": "merry-marketplace.png",
                          "url": "actual_asset_url.png",
                          "content_type": "image/png",
                          "description": null,
                          "file_size": 273858,
                          "filename": "merry-marketplace.png",
                          "permanent_url": "Permanent URL Not Defined!"
                        }
                      },
                      {
                        "node": {
                          "title": "Screenshot.png",
                          "url": "https://azure-na-images.contentstack.com/v3/assets/folder_uid/asset_uid_2/folder_uid_4/Screenshot_2024-12-09_at_7.28.28_PM.png?branch=test2",
                          "content_type": "image/png",
                          "description": "",
                          "file_size": 287954,
                          "filename": "Screenshot_2024-12-09_at_7.28.28_PM.png",
                          "permanent_url": "Permanent URL Not Defined!"
                        }
                      },
                      {
                        "node": {
                          "title": "2412_Rich-Media_Technical-Requirements.pdf",
                          "url": "https://azure-na-assets.contentstack.com/v3/assets/folder_uid/asset_uid_3/folder_uid_5/Aadhaar.pdf?branch=test2",
                          "content_type": "application/pdf",
                          "description": "",
                          "file_size": 1050317,
                          "filename": "Aadhaar.pdf",
                          "permanent_url": "Permanent URL Not Defined!"
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      ]
    }
  }
}