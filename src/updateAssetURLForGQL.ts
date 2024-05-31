export function updateAssetURLForGQL(gqlResponse:any) {
  try {
    const response = gqlResponse?.data;
    for (let contentType in response) {
      const entry = response[contentType]; // page_json_rte
      for (let field in entry) {
        const fieldData = entry[field];
        if (fieldData && fieldData.embedded_itemsConnection) { // rte field with embedded items e.g rte_2
          const edges = fieldData?.embedded_itemsConnection?.edges;
          edges.forEach((edge:any) => {
            const node = edge.node;
            if (node?.url && node?.filename) {
              
              if (!node?.system?.uid) throw new Error('Asset UID not found in the response');

              const correspondingAsset = fieldData?.json?.children?.find((child:any) => child.attrs['asset-uid'] === node.system.uid);
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