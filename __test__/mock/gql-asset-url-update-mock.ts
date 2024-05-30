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