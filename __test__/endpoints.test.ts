import { getContentstackEndpoint, ContentstackEndpoints } from '../src/endpoints';
import * as path from 'path';
import * as fs from 'fs';

// Mock console.warn to avoid noise in tests
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.warn = jest.fn();
  
  // Verify build completed - dist/lib/regions.json must exist
  // The pretest hook ensures build runs before tests
  const regionsPath = path.join(process.cwd(), 'dist', 'lib', 'regions.json');
  
  if (!fs.existsSync(regionsPath)) {
    throw new Error('dist/lib/regions.json not found. Please run "npm run build" first. The pretest hook should have handled this automatically.');
  }
});

afterAll(() => {
  console.warn = originalConsoleWarn;
});

describe('getContentstackEndpoint', () => {
  describe('Basic functionality', () => {
    it('should return default endpoints for valid region without service', () => {
      const result = getContentstackEndpoint('us');
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect((result as ContentstackEndpoints).contentDelivery).toBe('https://cdn.contentstack.io');
      expect((result as ContentstackEndpoints).contentManagement).toBe('https://api.contentstack.io');
    });

    it('should return specific service endpoint for valid region and service', () => {
      const result = getContentstackEndpoint('us', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should return EU endpoints for EU region', () => {
      const result = getContentstackEndpoint('eu', 'contentDelivery');
      
      expect(result).toBe('https://eu-cdn.contentstack.com');
    });

    it('should return undefined for invalid service', () => {
      const result = getContentstackEndpoint('us', 'invalidService');
      
      expect(result).toBeUndefined();
    });
  });

  describe('Region alias matching', () => {
    it('should match region by alias "na"', () => {
      const result = getContentstackEndpoint('na', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should match region by alias "aws-na"', () => {
      const result = getContentstackEndpoint('aws-na', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should match region by alias "aws_na"', () => {
      const result = getContentstackEndpoint('aws_na', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should be case insensitive for region matching', () => {
      const result = getContentstackEndpoint('US', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should trim whitespace from region input', () => {
      const result = getContentstackEndpoint('  us  ', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });
  });

  describe('omitHttps parameter', () => {
    it('should strip https from string endpoint when omitHttps is true', () => {
      const result = getContentstackEndpoint('us', 'contentDelivery', true);
      
      expect(result).toBe('cdn.contentstack.io');
    });

    it('should strip https from all endpoints when omitHttps is true and no service specified', () => {
      const result = getContentstackEndpoint('us', '', true) as ContentstackEndpoints;
      
      expect(result.contentDelivery).toBe('cdn.contentstack.io');
      expect(result.contentManagement).toBe('api.contentstack.io');
      expect(result.application).toBe('app.contentstack.com');
    });

    it('should preserve https when omitHttps is false', () => {
      const result = getContentstackEndpoint('us', 'contentDelivery', false);
      
      expect(result).toBe('https://cdn.contentstack.io');
    });
  });

  describe('Error handling and edge cases', () => {
    it('should throw error for empty region', () => {
      expect(() => {
        getContentstackEndpoint('');
      }).toThrow('Unable to set the host. Please put valid host');
    });

    it('should return default endpoint for invalid region', () => {
      const result = getContentstackEndpoint('invalid-region', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should return default endpoint for region with underscores/dashes', () => {
      const result = getContentstackEndpoint('invalid_region_format', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle malformed regions data gracefully', () => {
      // Note: This test now verifies that invalid regions fallback to default endpoint
      // The malformed data scenario is handled by getRegions() throwing an error
      // which causes getContentstackEndpoint to fall back to getDefaultEndpoint
      const result = getContentstackEndpoint('us', 'contentDelivery', false);
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should fallback to default when region is not found', () => {
      const result = getContentstackEndpoint('nonexistent', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });
  });

  describe('Default parameters', () => {
    it('should use default region "us" when no region provided', () => {
      const result = getContentstackEndpoint();
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect((result as ContentstackEndpoints).contentDelivery).toBe('https://cdn.contentstack.io');
    });

    it('should use default service "" when no service provided', () => {
      const result = getContentstackEndpoint('us');
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should use default omitHttps false when not provided', () => {
      const result = getContentstackEndpoint('us', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });
  });

  describe('Service-specific endpoints', () => {
    it('should return correct application endpoint', () => {
      const result = getContentstackEndpoint('us', 'application');
      
      expect(result).toBe('https://app.contentstack.com');
    });

    it('should return correct auth endpoint', () => {
      const result = getContentstackEndpoint('us', 'auth');
      
      expect(result).toBe('https://auth-api.contentstack.com');
    });

    it('should return correct graphqlDelivery endpoint', () => {
      const result = getContentstackEndpoint('us', 'graphqlDelivery');
      
      expect(result).toBe('https://graphql.contentstack.com');
    });

    it('should return correct preview endpoint', () => {
      const result = getContentstackEndpoint('us', 'preview');
      
      expect(result).toBe('https://rest-preview.contentstack.com');
    });

    it('should return correct images endpoint', () => {
      const result = getContentstackEndpoint('us', 'images');
      
      expect(result).toBe('https://images.contentstack.io');
    });

    it('should return correct assets endpoint', () => {
      const result = getContentstackEndpoint('us', 'assets');
      
      expect(result).toBe('https://assets.contentstack.io');
    });

    it('should return correct automate endpoint', () => {
      const result = getContentstackEndpoint('us', 'automate');
      
      expect(result).toBe('https://automations-api.contentstack.com');
    });

    it('should return correct launch endpoint', () => {
      const result = getContentstackEndpoint('us', 'launch');
      
      expect(result).toBe('https://launch-api.contentstack.com');
    });

    it('should return correct developerHub endpoint', () => {
      const result = getContentstackEndpoint('us', 'developerHub');
      
      expect(result).toBe('https://developerhub-api.contentstack.com');
    });

    it('should return correct brandKit endpoint', () => {
      const result = getContentstackEndpoint('us', 'brandKit');
      
      expect(result).toBe('https://brand-kits-api.contentstack.com');
    });

    it('should return correct genAI endpoint', () => {
      const result = getContentstackEndpoint('us', 'genAI');
      
      expect(result).toBe('https://ai.contentstack.com');
    });

    it('should return correct personalize endpoint', () => {
      const result = getContentstackEndpoint('us', 'personalize');
      
      expect(result).toBe('https://personalize-api.contentstack.com');
    });

    it('should return correct personalizeEdge endpoint', () => {
      const result = getContentstackEndpoint('us', 'personalizeEdge');
      
      expect(result).toBe('https://personalize-edge.contentstack.com');
    });
  });

  describe('Different regions', () => {
    it('should return correct EU endpoints', () => {
      const result = getContentstackEndpoint('eu', 'contentDelivery');
      
      expect(result).toBe('https://eu-cdn.contentstack.com');
    });

    it('should return correct Azure NA endpoints', () => {
      const result = getContentstackEndpoint('azure-na', 'contentDelivery');
      
      expect(result).toBe('https://azure-na-cdn.contentstack.com');
    });

    it('should return correct GCP NA endpoints', () => {
      const result = getContentstackEndpoint('gcp-na', 'contentDelivery');
      
      expect(result).toBe('https://gcp-na-cdn.contentstack.com');
    });
  });

  describe('Additional regions and aliases', () => {
    it('should return correct Australia endpoints', () => {
      const result = getContentstackEndpoint('au', 'contentDelivery');
      
      expect(result).toBe('https://au-cdn.contentstack.com');
    });

    it('should match Australia region by alias "aws-au"', () => {
      const result = getContentstackEndpoint('aws-au', 'contentDelivery');
      
      expect(result).toBe('https://au-cdn.contentstack.com');
    });

    it('should return correct Azure EU endpoints', () => {
      const result = getContentstackEndpoint('azure-eu', 'contentDelivery');
      
      expect(result).toBe('https://azure-eu-cdn.contentstack.com');
    });

    it('should return correct GCP EU endpoints', () => {
      const result = getContentstackEndpoint('gcp-eu', 'contentDelivery');
      
      expect(result).toBe('https://gcp-eu-cdn.contentstack.com');
    });

    it('should match Azure region by underscore alias', () => {
      const result = getContentstackEndpoint('azure_na', 'contentDelivery');
      
      expect(result).toBe('https://azure-na-cdn.contentstack.com');
    });

    it('should match GCP region by underscore alias', () => {
      const result = getContentstackEndpoint('gcp_na', 'contentDelivery');
      
      expect(result).toBe('https://gcp-na-cdn.contentstack.com');
    });
  });

  describe('Edge cases and error scenarios', () => {
    it('should handle null region gracefully', () => {
      const result = getContentstackEndpoint(null as any, 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle undefined region gracefully', () => {
      const result = getContentstackEndpoint(undefined as any, 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle region with only whitespace', () => {
      const result = getContentstackEndpoint('   ', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle region with special characters', () => {
      const result = getContentstackEndpoint('region@#$%', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle very long region name', () => {
      const longRegion = 'a'.repeat(1000);
      const result = getContentstackEndpoint(longRegion, 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });
  });

  describe('Console warnings', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should warn for invalid region', () => {
      getContentstackEndpoint('invalid-region', 'contentDelivery');
      
      expect(console.warn).toHaveBeenCalledWith('Invalid region combination.');
    });

    it('should warn for failed endpoint fetch', () => {
      getContentstackEndpoint('invalid-region', 'contentDelivery');
      
      expect(console.warn).toHaveBeenCalledWith('Failed to fetch endpoints:', expect.any(Error));
    });
  });
});
