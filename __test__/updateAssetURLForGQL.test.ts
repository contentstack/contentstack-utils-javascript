import { updateAssetURLForGQL } from '../src/updateAssetURLForGQL';
import { gqlResponseForAssetUpdate, gqlResponseForAssetUpdateWithoutSystemUid, gqlResponseForAssetUpdateMultipleEntries } from './mock/gql-asset-url-update-mock';

describe('updateAssetURLForGQL test', () => {

  it.skip('should update the asset URL in the GQL response when proper response is passed', done => {
    const testResponse = { ...gqlResponseForAssetUpdate };
    updateAssetURLForGQL(testResponse);

    const rteField = testResponse.data.page_json_rte.rte_2;
    const assetLink = rteField.json.children[0].attrs['asset-link'];
    const expectedUrl = rteField.embedded_itemsConnection.edges[0].node.url;

    expect(assetLink).toBe(expectedUrl);
    done();
  });

  it.skip('should update the asset URL in the GQL response when proper response is passed', done => {
    const testResponse = { ...gqlResponseForAssetUpdateMultipleEntries };
    updateAssetURLForGQL(testResponse);

    const rteField = testResponse.data.page_json_rte.items[0].body_new[0].body.body_12;
    const assetLink = rteField.json.children[0].attrs['asset-link'];
    const expectedUrl = rteField.embedded_itemsConnection.edges[0].node.url;

    expect(assetLink).toBe(expectedUrl);
    done();
  });

  it.skip('should throw error when system.uid is not present', done => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const testResponse = { ...gqlResponseForAssetUpdateWithoutSystemUid };
    updateAssetURLForGQL(testResponse);

    expect(console.error).toHaveBeenCalledWith(
      'Error in updating asset URL for GQL response',
      expect.any(Error) // Expecting any Error object
    );

    expect(console.error).toHaveBeenCalledWith(
      'Error in updating asset URL for GQL response',
      new Error('Asset UID not found in the response') // Expecting any Error object
    );
    done();
  });
});