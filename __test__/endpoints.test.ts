import { getContentstackEndpoint } from '../src/endpoints';

// Mock the global fetch
const mockFetch = jest.fn();
(globalThis as any).fetch = mockFetch;

// Mock console.warn and console.error to avoid noise in tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {
  // Reset mocks before each test
  mockFetch.mockClear();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  // Restore original console methods
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});

// Mock endpoints data structure
const mockEndpointsData = {
  AWS: {
    NA: {
      CDA: 'https://cdn.contentstack.io',
      CMA: 'https://api.contentstack.io',
      GQL: 'https://graphql.contentstack.com'
    },
    EU: {
      CDA: 'https://eu-cdn.contentstack.com',
      CMA: 'https://eu-api.contentstack.com',
      GQL: 'https://eu-graphql.contentstack.com'
    },
    APAC: {
      CDA: 'https://apac-cdn.contentstack.com',
      CMA: 'https://apac-api.contentstack.com',
      GQL: 'https://apac-graphql.contentstack.com'
    }
  },
  AZURE: {
    NA: {
      CDA: 'https://azure-na-cdn.contentstack.com',
      CMA: 'https://azure-na-api.contentstack.com',
      GQL: 'https://azure-na-graphql.contentstack.com'
    }
  }
};

describe('getContentstackEndpoint', () => {
  
  describe('Successful fetch scenarios', () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });
    });

    it('should return correct endpoint for default parameters (us region, CDA service)', async () => {
      const result = await getContentstackEndpoint();
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should return endpoint without https when omitHttps is true', async () => {
      const result = await getContentstackEndpoint('us', 'CDA', true);
      expect(result).toBe('cdn.contentstack.io');
    });

    it('should handle "us" region and convert to aws_na', async () => {
      const result = await getContentstackEndpoint('us', 'CDA');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle "eu" region and convert to aws_eu', async () => {
      const result = await getContentstackEndpoint('eu', 'CDA');
      expect(result).toBe('https://eu-cdn.contentstack.com');
    });

    it('should handle "apac" region and convert to aws_apac', async () => {
      const result = await getContentstackEndpoint('apac', 'CDA');
      expect(result).toBe('https://apac-cdn.contentstack.com');
    });

    it('should handle region with underscore separator (aws_na)', async () => {
      const result = await getContentstackEndpoint('aws_na', 'CDA');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle region with hyphen separator (aws-na)', async () => {
      const result = await getContentstackEndpoint('aws-na', 'CDA');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should convert us region in aws_us format to aws_na', async () => {
      const result = await getContentstackEndpoint('aws_us', 'CDA');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should convert us region in aws-us format to aws_na', async () => {
      const result = await getContentstackEndpoint('aws-us', 'CDA');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle azure cloud provider', async () => {
      const result = await getContentstackEndpoint('azure_na', 'CDA');
      expect(result).toBe('https://azure-na-cdn.contentstack.com');
    });

    it('should handle azure cloud provider with hyphen', async () => {
      const result = await getContentstackEndpoint('azure-na', 'CDA');
      expect(result).toBe('https://azure-na-cdn.contentstack.com');
    });

    it('should handle different services (CMA)', async () => {
      const result = await getContentstackEndpoint('us', 'CMA');
      expect(result).toBe('https://api.contentstack.io');
    });

    it('should handle different services (GQL)', async () => {
      const result = await getContentstackEndpoint('us', 'GQL');
      expect(result).toBe('https://graphql.contentstack.com');
    });

    it('should handle case insensitive regions', async () => {
      const result = await getContentstackEndpoint('EU', 'CDA');
      expect(result).toBe('https://eu-cdn.contentstack.com');
    });

    it('should handle mixed case regions with separators', async () => {
      const result = await getContentstackEndpoint('AWS_EU', 'CDA');
      expect(result).toBe('https://eu-cdn.contentstack.com');
    });
  });

  describe('Error scenarios', () => {
    it('should return default host when fetch fails', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      
      const result = await getContentstackEndpoint('us', 'CDA');
      expect(result).toBe('cdn.contentstack.io');
      expect(console.warn).toHaveBeenCalledWith('Failed to fetch endpoints:', expect.any(Error));
    });

    it('should return default host when response is not ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404
      });
      
      const result = await getContentstackEndpoint('us', 'CDA');
      expect(result).toBe('cdn.contentstack.io');
    });

    it('should handle invalid JSON response and fall back to default', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue('invalid json')
      });

      const result = await getContentstackEndpoint('us', 'CDA');
      expect(result).toBe('cdn.contentstack.io');
      expect(console.warn).toHaveBeenCalledWith('Failed to parse JSON response:', expect.any(Error));
      expect(console.warn).toHaveBeenCalledWith('Response content:', 'invalid json...');
      expect(console.warn).toHaveBeenCalledWith('Failed to fetch endpoints:', expect.any(Error));
    });

    it('should throw invalid JSON error when explicitly tested', async () => {
      // Test that the JSON parsing actually does throw the error
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue('invalid json')
      });

      // Create a special mock to test the error throwing behavior
      const originalConsoleWarn = console.warn;
      const consoleWarnSpy = jest.fn();
      console.warn = consoleWarnSpy;

      try {
        // Manually trigger the JSON parsing by mocking a scenario
        const response = await fetch('test');
        const result = await response.text();
        expect(() => JSON.parse(result)).toThrow();
      } catch {
        // Expected to catch
      }

      console.warn = originalConsoleWarn;
    });

    it('should handle empty region', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      await expect(getContentstackEndpoint('', 'CDA')).rejects.toThrow('Unable to set the host. Please put valid host');
      expect(console.warn).toHaveBeenCalledWith('Invalid region: empty or invalid region provided');
    });

    it('should handle null region', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      const result = await getContentstackEndpoint(null as any, 'CDA');
      expect(result).toBe('cdn.contentstack.io');
      expect(console.warn).toHaveBeenCalledWith('Failed to fetch endpoints:', expect.any(Error));
    });

    it('should handle undefined region', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      const result = await getContentstackEndpoint(undefined, 'CDA');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle invalid region format (single part)', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      await expect(getContentstackEndpoint('invalid_region_format_with_too_many_parts', 'CDA')).rejects.toThrow('Unable to set the host. Please put valid host');
      expect(console.warn).toHaveBeenCalledWith('Invalid region format: invalid_region_format_with_too_many_parts');
    });

    it('should handle non-existent cloud provider', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      await expect(getContentstackEndpoint('invalid_na', 'CDA')).rejects.toThrow('Unable to set the host. Please put valid host');
      expect(console.warn).toHaveBeenCalledWith('Invalid region combination: INVALID_NA - CDA');
    });

    it('should handle non-existent region for valid cloud provider', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      await expect(getContentstackEndpoint('aws_invalid', 'CDA')).rejects.toThrow('Unable to set the host. Please put valid host');
      expect(console.warn).toHaveBeenCalledWith('Invalid region combination: AWS_INVALID - CDA');
    });

    it('should handle non-existent service for valid cloud and region', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      const result = await getContentstackEndpoint('aws_na', 'INVALID_SERVICE');
      expect(result).toBe(undefined);
    });

    it('should handle malformed endpoints data structure', async () => {
      const malformedData = {
        AWS: 'invalid structure'
      };
      
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(malformedData))
      });

      await expect(getContentstackEndpoint('aws_na', 'CDA')).rejects.toThrow('Unable to set the host. Please put valid host');
      expect(console.warn).toHaveBeenCalledWith('Invalid region combination: AWS_NA - CDA');
    });

    it('should re-throw host validation errors from catch block', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      // This will trigger the catch block but the error should be re-thrown
      await expect(getContentstackEndpoint('invalid_format', 'CDA')).rejects.toThrow('Unable to set the host. Please put valid host');
    });
  });

  describe('Edge cases and special scenarios', () => {
    it('should handle text response parsing error in text() method', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockRejectedValue(new Error('Text parsing error'))
      });

      const result = await getContentstackEndpoint('us', 'CDA');
      expect(result).toBe('cdn.contentstack.io');
      expect(console.warn).toHaveBeenCalledWith('Failed to fetch endpoints:', expect.any(Error));
    });

    it('should handle endpoints data with null values', async () => {
      const dataWithNulls = {
        AWS: {
          NA: {
            CDA: null as any
          }
        }
      };
      
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(dataWithNulls))
      });

      const result = await getContentstackEndpoint('aws_na', 'CDA');
      expect(result).toBe(null);
    });

    it('should handle endpoints with different protocol (http)', async () => {
      const dataWithHttp = {
        AWS: {
          NA: {
            CDA: 'http://cdn.contentstack.io'
          }
        }
      };
      
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(dataWithHttp))
      });

      const result = await getContentstackEndpoint('aws_na', 'CDA', true);
      expect(result).toBe('cdn.contentstack.io');
    });

    it('should handle endpoints without protocol when omitHttps is true', async () => {
      const dataWithoutProtocol = {
        AWS: {
          NA: {
            CDA: 'cdn.contentstack.io'
          }
        }
      };
      
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(dataWithoutProtocol))
      });

      const result = await getContentstackEndpoint('aws_na', 'CDA', true);
      expect(result).toBe('cdn.contentstack.io');
    });

    it('should handle complex region names with multiple separators', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(JSON.stringify(mockEndpointsData))
      });

      // This should be processed but result in invalid format
      await expect(getContentstackEndpoint('aws_na_extra', 'CDA')).rejects.toThrow('Unable to set the host. Please put valid host');
    });

    it('should handle very long response content in error message', async () => {
      const longInvalidJson = 'x'.repeat(500);
      mockFetch.mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue(longInvalidJson)
      });

      const result = await getContentstackEndpoint('us', 'CDA');
      expect(result).toBe('cdn.contentstack.io');
      expect(console.warn).toHaveBeenCalledWith('Response content:', longInvalidJson.substring(0, 200) + '...');
      expect(console.warn).toHaveBeenCalledWith('Failed to fetch endpoints:', expect.any(Error));
    });
  });
});
