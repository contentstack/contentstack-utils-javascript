import { updateAssetURLForGQL } from '../src/updateAssetURLForGQL';
import { gqlResponseForAssetUpdate, gqlResponseForAssetUpdateWithoutSystemUid, gqlResponseForAssetUpdateMultipleEntries } from './mock/gql-asset-url-update-mock';

describe('updateAssetURLForGQL test', () => {

  it('should update the asset URL in the GQL response when proper response is passed', done => {
    const testResponse = { ...gqlResponseForAssetUpdate };
    updateAssetURLForGQL(testResponse);

    const rteField = testResponse.data.page_json_rte.rte_2;
    const assetLink = rteField.json.children[0].attrs['asset-link'];
    const expectedUrl = rteField.embedded_itemsConnection.edges[0].node.url;

    expect(assetLink).toBe(expectedUrl);
    done();
  });

  it('should update the asset URL in the GQL response with multiple entries when proper response is passed', done => {
    const testResponse = { ...gqlResponseForAssetUpdateMultipleEntries };
    updateAssetURLForGQL(testResponse);

    const rteField = testResponse.data.page_json_rte.items[0].body_new[0].body.body_12;
    const assetLink = rteField.json.children[0].attrs['asset-link'];
    const expectedUrl = rteField.embedded_itemsConnection.edges[0].node.url;
    
    expect(assetLink).toBe(expectedUrl);
    done();
  });

  it('should throw error when system.uid is not present', done => {
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

  describe('Negative and corner cases', () => {
    it('should not throw when gqlResponse is null', done => {
      expect(() => updateAssetURLForGQL(null as any)).not.toThrow();
      done();
    });

    it('should not throw when gqlResponse is undefined', done => {
      expect(() => updateAssetURLForGQL(undefined as any)).not.toThrow();
      done();
    });

    it('should not throw when gqlResponse.data is null', done => {
      expect(() => updateAssetURLForGQL({ data: null } as any)).not.toThrow();
      done();
    });

    it('should not throw when gqlResponse.data is undefined', done => {
      expect(() => updateAssetURLForGQL({} as any)).not.toThrow();
      done();
    });

    it('should not throw when data is empty object', done => {
      expect(() => updateAssetURLForGQL({ data: {} } as any)).not.toThrow();
      done();
    });

    it('should not throw when entry has no RTE fields with embedded_itemsConnection', done => {
      const response = {
        data: {
          page: {
            title: 'Page',
            uid: 'page_1',
          },
        },
      };
      expect(() => updateAssetURLForGQL(response as any)).not.toThrow();
      expect(response.data.page.title).toBe('Page');
      done();
    });

    it('should not throw when embedded_itemsConnection.edges is empty array', done => {
      const response: any = {
        data: {
          page: {
            rte_field: {
              json: { children: [] },
              embedded_itemsConnection: { edges: [] },
            },
          },
        },
      };
      expect(() => updateAssetURLForGQL(response)).not.toThrow();
      done();
    });

    it('should catch and log when embedded_itemsConnection.edges is null (forEach throws)', done => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const responseWithNullEdges: any = {
        data: {
          page: {
            rte_field: {
              json: { children: [] },
              embedded_itemsConnection: { edges: null },
            },
          },
        },
      };
      expect(() => updateAssetURLForGQL(responseWithNullEdges as any)).not.toThrow();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
      done();
    });

    it('should not mutate when no child has matching asset-uid (logs error when correspondingAsset is missing)', done => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const originalUrl = 'https://original.url/file.pdf';
      const response: any = {
        data: {
          page: {
            rte_field: {
              json: {
                children: [
                  { attrs: { 'asset-uid': 'other_uid', 'asset-link': originalUrl } },
                ],
              },
              embedded_itemsConnection: {
                edges: [
                  {
                    node: {
                      url: 'https://new.url/file.pdf',
                      filename: 'file.pdf',
                      system: { uid: 'sys_asset_123' },
                    },
                  },
                ],
              },
            },
          },
        },
      };
      updateAssetURLForGQL(response);
      expect(response.data.page.rte_field.json.children[0].attrs['asset-link']).toBe(originalUrl);
      consoleSpy.mockRestore();
      done();
    });
  });
});