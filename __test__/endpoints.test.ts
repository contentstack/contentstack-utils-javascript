import { getContentstackEndpoint, ContentstackEndpoints } from '../src/endpoints';
import * as path from 'path';
import * as fs from 'fs';

beforeAll(() => {
  // Verify build completed - dist/lib/regions.json must exist
  // The pretest hook ensures build runs before tests
  const regionsPath = path.join(process.cwd(), 'dist', 'lib', 'regions.json');
  
  if (!fs.existsSync(regionsPath)) {
    throw new Error('dist/lib/regions.json not found. Please run "npm run build" first. The pretest hook should have handled this automatically.');
  }
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

    it('should throw error for invalid service', () => {
      expect(() => {
        getContentstackEndpoint('us', 'invalidService');
      }).toThrow(/Service "invalidService" not found for region/);
    });

    it('should throw error with exact error message format for invalid service', () => {
      expect(() => {
        getContentstackEndpoint('us', 'nonexistentService');
      }).toThrow('Service "nonexistentService" not found for region "na"');
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

    it('should strip https from EU endpoint when omitHttps is true', () => {
      const result = getContentstackEndpoint('eu', 'contentDelivery', true);
      
      expect(result).toBe('eu-cdn.contentstack.com');
    });

    it('should strip https from Azure endpoint when omitHttps is true', () => {
      const result = getContentstackEndpoint('azure-na', 'contentDelivery', true);
      
      expect(result).toBe('azure-na-cdn.contentstack.com');
    });

    it('should strip https from GCP endpoint when omitHttps is true', () => {
      const result = getContentstackEndpoint('gcp-na', 'contentDelivery', true);
      
      expect(result).toBe('gcp-na-cdn.contentstack.com');
    });

    it('should strip https from all endpoints for EU region when omitHttps is true', () => {
      const result = getContentstackEndpoint('eu', '', true) as ContentstackEndpoints;
      
      expect(result.contentDelivery).toBe('eu-cdn.contentstack.com');
      expect(result.contentManagement).toBe('eu-api.contentstack.com');
    });
  });

  describe('Error handling and edge cases', () => {
    it('should throw error for empty region', () => {
      expect(() => {
        getContentstackEndpoint('');
      }).toThrow('Empty region provided. Please put valid region.');
    });

    it('should throw error for invalid region', () => {
      expect(() => {
        getContentstackEndpoint('invalid-region', 'contentDelivery');
      }).toThrow('Invalid region: invalid-region');
    });

    it('should throw error when region is not found', () => {
      expect(() => {
        getContentstackEndpoint('nonexistent', 'contentDelivery');
      }).toThrow('Invalid region: nonexistent');
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
      expect((result as ContentstackEndpoints).contentDelivery).toBe('https://cdn.contentstack.io');
    });

    it('should use default omitHttps false when not provided', () => {
      const result = getContentstackEndpoint('us', 'contentDelivery');
      
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should return all endpoints when service is empty string', () => {
      const result = getContentstackEndpoint('us', '');
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect((result as ContentstackEndpoints).contentDelivery).toBe('https://cdn.contentstack.io');
      expect((result as ContentstackEndpoints).contentManagement).toBe('https://api.contentstack.io');
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

  describe('Additional regions and aliases', () => {
    it('should return correct EU endpoints', () => {
      const result = getContentstackEndpoint('eu', 'contentDelivery');
      
      expect(result).toBe('https://eu-cdn.contentstack.com');
    });

    it('should return correct Australia endpoints', () => {
      const result = getContentstackEndpoint('au', 'contentDelivery');
      
      expect(result).toBe('https://au-cdn.contentstack.com');
    });

    it('should match Australia region by alias "aws-au"', () => {
      const result = getContentstackEndpoint('aws-au', 'contentDelivery');
      
      expect(result).toBe('https://au-cdn.contentstack.com');
    });

    it('should return correct Azure NA endpoints', () => {
      const result = getContentstackEndpoint('azure-na', 'contentDelivery');
      
      expect(result).toBe('https://azure-na-cdn.contentstack.com');
    });

    it('should return correct Azure EU endpoints', () => {
      const result = getContentstackEndpoint('azure-eu', 'contentDelivery');
      
      expect(result).toBe('https://azure-eu-cdn.contentstack.com');
    });

    it('should return correct GCP NA endpoints', () => {
      const result = getContentstackEndpoint('gcp-na', 'contentDelivery');
      
      expect(result).toBe('https://gcp-na-cdn.contentstack.com');
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
    it('should throw error for null region', () => {
      expect(() => {
        getContentstackEndpoint(null as any, 'contentDelivery');
      }).toThrow();
    });

    it('should use default region for undefined region', () => {
      // undefined uses the default parameter 'us', so it doesn't throw
      const result = getContentstackEndpoint(undefined as any, 'contentDelivery');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should handle region with only whitespace', () => {
      // Whitespace gets trimmed, then normalized to 'us' if empty
      // Since '   '.trim() is empty string, it normalizes to 'us'
      const result = getContentstackEndpoint('   ', 'contentDelivery');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should throw error for region with special characters', () => {
      expect(() => {
        getContentstackEndpoint('region@#$%', 'contentDelivery');
      }).toThrow('Invalid region: region@#$%');
    });

    it('should throw error for very long region name', () => {
      const longRegion = 'a'.repeat(1000);
      expect(() => {
        getContentstackEndpoint(longRegion, 'contentDelivery');
      }).toThrow(`Invalid region: ${longRegion}`);
    });
  });

});
