import { getContentstackEndpoint, Region, ContentstackEndpoints } from '../src/endpoints';

// Mock fetch globally
Object.defineProperty(window, 'fetch', {
  value: jest.fn(),
  writable: true,
});

describe('getContentstackEndpoint', () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockEndpointsData = {
    "AWS": {
      "NA": {
        "CDA": "https://cdn.contentstack.io",
        "CMA": "https://api.contentstack.io",
        "Analytics": "https://app.contentstack.com",
        "GraphQL": "https://graphql.contentstack.com",
        "Personalize": {
          "Management": "https://personalize-api.contentstack.com",
          "Edge": "https://personalize-edge.contentstack.com"
        }
      },
      "EU": {
        "CDA": "https://eu-cdn.contentstack.com",
        "CMA": "https://eu-api.contentstack.com",
        "Analytics": "https://eu-app.contentstack.com",
        "GraphQL": "https://eu-graphql.contentstack.com"
      },
      "AU": {
        "CDA": "https://au-cdn.contentstack.com",
        "CMA": "https://au-api.contentstack.com"
      }
    },
    "AZURE": {
      "NA": {
        "CDA": "https://azure-na-cdn.contentstack.com",
        "CMA": "https://azure-na-api.contentstack.com"
      },
      "EU": {
        "CDA": "https://azure-eu-cdn.contentstack.com",
        "CMA": "https://azure-eu-api.contentstack.com"
      }
    },
    "GCP": {
      "NA": {
        "CDA": "https://gcp-na-cdn.contentstack.com",
        "CMA": "https://gcp-na-api.contentstack.com"
      },
      "EU": {
        "CDA": "https://gcp-eu-cdn.contentstack.com",
        "CMA": "https://gcp-eu-api.contentstack.com"
      }
    }
  };

  describe('successful scenarios', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        json: async () => mockEndpointsData,
      } as unknown as Response);
    });

    test('should return US region endpoints by default', async () => {
      const result = await getContentstackEndpoint();
      
      expect(result).toEqual(mockEndpointsData.AWS.NA);
      expect(mockFetch).toHaveBeenCalledWith('https://raw.githubusercontent.com/contentstack/contentstack-endpoints/master/src/endpoints.json');
    });

    test('should return EU region endpoints', async () => {
      const result = await getContentstackEndpoint(Region.EU);
      
      expect(result).toEqual(mockEndpointsData.AWS.EU);
    });

    test('should return AU region endpoints', async () => {
      const result = await getContentstackEndpoint(Region.AU);
      
      expect(result).toEqual(mockEndpointsData.AWS.AU);
    });

    test('should return Azure NA region endpoints', async () => {
      const result = await getContentstackEndpoint(Region.AZURE_NA);
      
      expect(result).toEqual(mockEndpointsData.AZURE.NA);
    });

    test('should return Azure EU region endpoints', async () => {
      const result = await getContentstackEndpoint(Region.AZURE_EU);
      
      expect(result).toEqual(mockEndpointsData.AZURE.EU);
    });

    test('should return GCP NA region endpoints', async () => {
      const result = await getContentstackEndpoint(Region.GCP_NA);
      
      expect(result).toEqual(mockEndpointsData.GCP.NA);
    });

    test('should return GCP EU region endpoints', async () => {
      const result = await getContentstackEndpoint(Region.GCP_EU);
      
      expect(result).toEqual(mockEndpointsData.GCP.EU);
    });

    test('should return endpoints with HTTPS when omitHttps is false', async () => {
      const result = await getContentstackEndpoint(Region.US, false);
      
      expect(result.CDA).toBe('https://cdn.contentstack.io');
      expect(result.CMA).toBe('https://api.contentstack.io');
    });

    test('should return endpoints without HTTPS when omitHttps is true', async () => {
      const result = await getContentstackEndpoint(Region.US, true);
      
      expect(result.CDA).toBe('cdn.contentstack.io');
      expect(result.CMA).toBe('api.contentstack.io');
      expect(result.Analytics).toBe('app.contentstack.com');
    });

    test('should handle nested objects when omitHttps is true', async () => {
      const result = await getContentstackEndpoint(Region.US, true);
      
      expect(result.Personalize).toEqual({
        "Management": "personalize-api.contentstack.com",
        "Edge": "personalize-edge.contentstack.com"
      });
    });

    test('should preserve nested objects when omitHttps is false', async () => {
      const result = await getContentstackEndpoint(Region.US, false);
      
      expect(result.Personalize).toEqual({
        "Management": "https://personalize-api.contentstack.com",
        "Edge": "https://personalize-edge.contentstack.com"
      });
    });
  });

  describe('error scenarios', () => {
    test('should throw error when fetch fails with network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(getContentstackEndpoint()).rejects.toThrow('Network error');
    });

    test('should throw error when HTTP response is not ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        json: jest.fn(),
      } as unknown as Response);

      await expect(getContentstackEndpoint()).rejects.toThrow(
        'Failed to fetch endpoints from https://raw.githubusercontent.com/contentstack/contentstack-endpoints/master/src/endpoints.json. HTTP status: 404 - Not Found'
      );
    });

    test('should throw error when JSON parsing fails', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as unknown as Response);

      await expect(getContentstackEndpoint()).rejects.toThrow(
        'Failed to parse JSON response from https://raw.githubusercontent.com/contentstack/contentstack-endpoints/master/src/endpoints.json. Response may not be valid JSON.'
      );
    });

    test('should throw error for invalid region', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        json: async () => mockEndpointsData,
      } as unknown as Response);

      await expect(getContentstackEndpoint('invalid-region' as Region)).rejects.toThrow(
        'Invalid region: invalid-region. Supported regions are: us, eu, au, azure-na, azure-eu, gcp-na, gcp-eu'
      );
    });

    test('should throw error when region data is missing from JSON', async () => {
      const incompleteData = {
        "AWS": {
          "NA": {
            "CDA": "https://cdn.contentstack.io"
          }
        }
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        json: async () => incompleteData,
      } as unknown as Response);

      await expect(getContentstackEndpoint(Region.EU)).rejects.toThrow(
        'No endpoints found for region: eu (provider: AWS, region: EU)'
      );
    });

    test('should throw error when provider is missing from JSON', async () => {
      const incompleteData = {
        "AWS": {
          "NA": {
            "CDA": "https://cdn.contentstack.io"
          }
        }
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
        json: async () => incompleteData,
      } as unknown as Response);

      await expect(getContentstackEndpoint(Region.AZURE_NA)).rejects.toThrow(
        'No endpoints found for region: azure-na (provider: AZURE, region: NA)'
      );
    });
  });

  describe('Region enum', () => {
    test('should have correct region values', () => {
      expect(Region.US).toBe('us');
      expect(Region.EU).toBe('eu');
      expect(Region.AU).toBe('au');
      expect(Region.AZURE_NA).toBe('azure-na');
      expect(Region.AZURE_EU).toBe('azure-eu');
      expect(Region.GCP_NA).toBe('gcp-na');
      expect(Region.GCP_EU).toBe('gcp-eu');
    });
  });

  describe('ContentstackEndpoints interface', () => {
    test('should accept string values', () => {
      const endpoints: ContentstackEndpoints = {
        CDA: 'https://cdn.contentstack.io',
        CMA: 'https://api.contentstack.io'
      };
      
      expect(endpoints.CDA).toBe('https://cdn.contentstack.io');
      expect(endpoints.CMA).toBe('https://api.contentstack.io');
    });

    test('should accept nested objects', () => {
      const endpoints: ContentstackEndpoints = {
        Personalize: {
          Management: 'https://personalize-api.contentstack.com',
          Edge: 'https://personalize-edge.contentstack.com'
        }
      };
      
      expect(endpoints.Personalize).toEqual({
        Management: 'https://personalize-api.contentstack.com',
        Edge: 'https://personalize-edge.contentstack.com'
      });
    });
  });
});
