export function updateAssetURLForGQL(gqlResponse:any) {
  try {
    const response = gqlResponse.data;
    for (let contentType in response) {
      const entry = response[contentType]; // page_json_rte
      for (let key in entry) {
        const field = entry[key];
        if (field && field.embedded_itemsConnection) { // rte field with embedded items e.g rte_2
          const edges = field.embedded_itemsConnection.edges;
          edges.forEach((edge:any) => {
            const node = edge.node;
            if (node.url && node.filename) {
              
              if (!node?.system?.uid) throw new Error('Asset UID not found in the response');

              const correspondingAsset = field.json.children.find((child:any) => child.attrs['asset-uid'] === node.system.uid);
              correspondingAsset.attrs['asset-link'] = node.url;
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error in updating asset URL for GQL response', error);
  }
}