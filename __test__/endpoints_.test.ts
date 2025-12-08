import { getContentstackEndpoint, ContentstackEndpoints } from '../src/endpoints';

describe('getContentstackEndpoint', () => {
  describe('Default behavior', () => {
    it('should return all endpoints for default region (us) when no parameters provided', () => {
      const result = getContentstackEndpoint();
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
      expect((result as ContentstackEndpoints).contentDelivery).toBe('https://cdn.contentstack.io');
    });
  });

  describe('Region lookup by ID', () => {
    it('should find region by exact ID match', () => {
      const result = getContentstackEndpoint('na');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
    });

    it('should find region by ID (eu)', () => {
      const result = getContentstackEndpoint('eu');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://eu-app.contentstack.com');
    });

    it('should find region by ID (au)', () => {
      const result = getContentstackEndpoint('au');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://au-app.contentstack.com');
    });

    it('should find region by ID (azure-na)', () => {
      const result = getContentstackEndpoint('azure-na');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://azure-na-app.contentstack.com');
    });

    it('should find region by ID (gcp-eu)', () => {
      const result = getContentstackEndpoint('gcp-eu');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://gcp-eu-app.contentstack.com');
    });
  });

  describe('Region lookup by alias', () => {
    it('should find region by alias "us" (maps to na)', () => {
      const result = getContentstackEndpoint('us');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
    });

    it('should find region by alias "AWS-NA" (case insensitive)', () => {
      const result = getContentstackEndpoint('AWS-NA');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
    });

    it('should find region by alias "aws_na"', () => {
      const result = getContentstackEndpoint('aws_na');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
    });

    it('should find region by alias "EU" (case insensitive)', () => {
      const result = getContentstackEndpoint('EU');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://eu-app.contentstack.com');
    });

    it('should find region by alias "azure-eu"', () => {
      const result = getContentstackEndpoint('azure-eu');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://azure-eu-app.contentstack.com');
    });
  });

  describe('Region normalization', () => {
    it('should handle region with whitespace', () => {
      const result = getContentstackEndpoint('  na  ');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
    });

    it('should handle region with mixed case', () => {
      const result = getContentstackEndpoint('Na');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
    });

    it('should handle region with mixed case alias', () => {
      const result = getContentstackEndpoint('Us');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
    });
  });

  describe('Error handling', () => {
    it('should throw error for empty region string', () => {
      expect(() => {
        getContentstackEndpoint('');
      }).toThrow('Empty region provided. Please put valid region.');
    });

    it('should throw error for invalid region', () => {
      expect(() => {
        getContentstackEndpoint('invalid-region');
      }).toThrow('Invalid region: invalid-region');
    });

    it('should throw error for null region', () => {
      expect(() => {
        getContentstackEndpoint(null as any);
      }).toThrow();
    });
  });

  describe('Service endpoint retrieval', () => {
    it('should return specific service endpoint for valid service', () => {
      const result = getContentstackEndpoint('na', 'application');
      expect(result).toBe('https://app.contentstack.com');
    });

    it('should return contentDelivery endpoint', () => {
      const result = getContentstackEndpoint('na', 'contentDelivery');
      expect(result).toBe('https://cdn.contentstack.io');
    });

    it('should return contentManagement endpoint', () => {
      const result = getContentstackEndpoint('na', 'contentManagement');
      expect(result).toBe('https://api.contentstack.io');
    });

    it('should return auth endpoint', () => {
      const result = getContentstackEndpoint('na', 'auth');
      expect(result).toBe('https://auth-api.contentstack.com');
    });

    it('should return graphqlDelivery endpoint', () => {
      const result = getContentstackEndpoint('na', 'graphqlDelivery');
      expect(result).toBe('https://graphql.contentstack.com');
    });

    it('should return service endpoint for eu region', () => {
      const result = getContentstackEndpoint('eu', 'application');
      expect(result).toBe('https://eu-app.contentstack.com');
    });

    it('should return service endpoint for au region', () => {
      const result = getContentstackEndpoint('au', 'contentDelivery');
      expect(result).toBe('https://au-cdn.contentstack.com');
    });

    it('should throw error for invalid service', () => {
      expect(() => {
        getContentstackEndpoint('na', 'invalidService');
      }).toThrow('Service "invalidService" not found for region "na"');
    });

    it('should return all endpoints for empty service string', () => {
      // Empty service string should return all endpoints, not throw error
      const result = getContentstackEndpoint('na', '');
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('omitHttps flag', () => {
    it('should strip https from single endpoint when omitHttps is true', () => {
      const result = getContentstackEndpoint('na', 'application', true);
      expect(result).toBe('app.contentstack.com');
    });

    it('should strip https from all endpoints when omitHttps is true and no service specified', () => {
      const result = getContentstackEndpoint('na', '', true) as ContentstackEndpoints;
      expect(result.application).toBe('app.contentstack.com');
      expect(result.contentDelivery).toBe('cdn.contentstack.io');
      expect(result.contentManagement).toBe('api.contentstack.io');
    });

    it('should strip http from endpoint when omitHttps is true', () => {
      // This tests the regex pattern that matches both http and https
      const result = getContentstackEndpoint('na', 'application', true);
      expect(result).not.toMatch(/^https?:\/\//);
    });

    it('should preserve https when omitHttps is false', () => {
      const result = getContentstackEndpoint('na', 'application', false);
      expect(result).toBe('https://app.contentstack.com');
    });

    it('should preserve https by default', () => {
      const result = getContentstackEndpoint('na', 'application');
      expect(result).toBe('https://app.contentstack.com');
    });

    it('should strip https from nested endpoint objects', () => {
      const result = getContentstackEndpoint('na', '', true) as ContentstackEndpoints;
      expect(result).toBeDefined();
      expect(typeof result.application).toBe('string');
      expect(result.application).not.toMatch(/^https?:\/\//);
      expect(result.contentDelivery).not.toMatch(/^https?:\/\//);
    });
  });

  describe('All endpoints retrieval', () => {
    it('should return all endpoints for na region', () => {
      const result = getContentstackEndpoint('na') as ContentstackEndpoints;
      expect(result).toBeDefined();
      expect(result.application).toBe('https://app.contentstack.com');
      expect(result.contentDelivery).toBe('https://cdn.contentstack.io');
      expect(result.contentManagement).toBe('https://api.contentstack.io');
      expect(result.auth).toBe('https://auth-api.contentstack.com');
      expect(result.graphqlDelivery).toBe('https://graphql.contentstack.com');
      expect(result.preview).toBe('https://rest-preview.contentstack.com');
      expect(result.graphqlPreview).toBe('https://graphql-preview.contentstack.com');
      expect(result.images).toBe('https://images.contentstack.io');
      expect(result.assets).toBe('https://assets.contentstack.io');
    });

    it('should return all endpoints for eu region', () => {
      const result = getContentstackEndpoint('eu') as ContentstackEndpoints;
      expect(result).toBeDefined();
      expect(result.application).toBe('https://eu-app.contentstack.com');
      expect(result.contentDelivery).toBe('https://eu-cdn.contentstack.com');
    });

    it('should return all endpoints for au region', () => {
      const result = getContentstackEndpoint('au') as ContentstackEndpoints;
      expect(result).toBeDefined();
      expect(result.application).toBe('https://au-app.contentstack.com');
      expect(result.contentDelivery).toBe('https://au-cdn.contentstack.com');
    });
  });

  describe('Edge cases', () => {
    it('should handle region lookup with special characters in alias', () => {
      // Test that aliases with hyphens and underscores work
      const result1 = getContentstackEndpoint('aws-na');
      const result2 = getContentstackEndpoint('aws_na');
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
      expect((result1 as ContentstackEndpoints).application).toBe((result2 as ContentstackEndpoints).application);
    });

    it('should handle multiple service calls with different regions', () => {
      const naResult = getContentstackEndpoint('na', 'application');
      const euResult = getContentstackEndpoint('eu', 'application');
      const auResult = getContentstackEndpoint('au', 'application');
      
      expect(naResult).toBe('https://app.contentstack.com');
      expect(euResult).toBe('https://eu-app.contentstack.com');
      expect(auResult).toBe('https://au-app.contentstack.com');
    });

    it('should handle region with only whitespace (should default to us after trim)', () => {
      // Whitespace-only string after trim should default to 'us'
      const result = getContentstackEndpoint('   ');
      expect(result).toBeDefined();
      expect((result as ContentstackEndpoints).application).toBe('https://app.contentstack.com');
    });
  });
});

