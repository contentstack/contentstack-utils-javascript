/**
 * Updates asset URLs in a GraphQL response in-place. Walks the response data,
 * finds RTE fields that have `embedded_itemsConnection`, and sets each
 * embedded asset's `asset-link` attribute in the JSON to the asset's `url`
 * from the response. Use after fetching content via GraphQL so RTE JSON
 * contains correct asset URLs for rendering.
 *
 * @param gqlResponse - The raw GraphQL response object (e.g. `{ data: { ... } }`). Modified in place.
 */
export function updateAssetURLForGQL(gqlResponse:any) {
  try {
    const response = gqlResponse?.data;
    for (let contentType in response) {
      if ("items" in response[contentType]) {
        const entries = response[contentType].items;

        entries.forEach((entry:any) => {              // iterate over all entries
          processEntry(entry);
        });
      } else { 
        processEntry(response[contentType]);        
       }
    }
  } catch (error) {
    console.error('Error in updating asset URL for GQL response', error);
  }
}

function processEntry(entry:any) {
  for (let field in entry) {
    const fieldData = entry[field];
    if (fieldData instanceof Array) {
      fieldData.forEach((data:any) => {
        findRTEFieldAndUpdateURL(data);
      });
    } else if (fieldData && typeof fieldData === 'object') {
      findRTEFieldAndUpdateURL(fieldData);
    }
  }
}

function findRTEFieldAndUpdateURL(fieldData:any) {
  const rteField = findRTEField(fieldData);

  if (!rteField) return;

  const edges = rteField?.embedded_itemsConnection?.edges;
  edges.forEach((edge:any) => {
    const node = edge.node;
    if (node?.url && node?.filename) {
      
      if (!node?.system?.uid) throw new Error('Asset UID not found in the response');

      const correspondingAsset = rteField?.json?.children?.find((child:any) => child.attrs['asset-uid'] === node.system.uid);
      correspondingAsset.attrs['asset-link'] = node.url;
    }
  });
}

function findRTEField(fieldData: any): any {
  if (fieldData?.embedded_itemsConnection) {
    return fieldData;
  }
  for (const key in fieldData) {
    if (fieldData[key] && typeof fieldData[key] === 'object') {
      const found = findRTEField(fieldData[key]);
      if (found) {
        return found;
      }
    }
  }
}