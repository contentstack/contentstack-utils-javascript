import regions from '../regions.json'
export interface ContentstackEndpoints {
  [key: string]: string | ContentstackEndpoints;
}

export interface RegionData {
  id: string;
  name: string;
  cloudProvider: string;
  location: string;
  alias: string[];
  isDefault: boolean;
  endpoints: ContentstackEndpoints;
}

export interface RegionsResponse {
  regions: RegionData[];
}

export function getContentstackEndpoint(region: string = 'us', service: string = '', omitHttps: boolean = false, localRegionsData?: RegionsResponse): string | ContentstackEndpoints {
  // Validate empty region before any processing
  if (region === '') {
    console.warn('Invalid region: empty or invalid region provided');
    throw new Error('Unable to set the host. Please put valid host');
  }

  try {
    let regionsData: RegionsResponse;

    regionsData = regions;

    // Normalize the region input
    const normalizedRegion = region.toLowerCase().trim() || 'us';

    // Check if regions data is malformed
    if (!Array.isArray(regionsData.regions)) {
      throw new Error('Invalid Regions file. Please install the SDK again to fix this issue.');
    }

    // Find the region by ID or alias
    const regionData = findRegionByIDOrAlias(regionsData.regions, normalizedRegion);

    if (!regionData) {
      // Check if this looks like a legacy format that should throw an error
      if (region.includes('_') || region.includes('-')) {
        const parts = region.split(/[-_]/);
        if (parts.length >= 2) {
          console.warn(`Invalid region combination.`);
          throw new Error('Region Invalid. Please use a valid region identifier.');
        }
      }
      
      console.warn('Invalid region:', region, '(normalized:', normalizedRegion + ')');
      console.warn('Failed to fetch endpoints:', new Error(`Invalid region: ${region}`));
      return getDefaultEndpoint(service, omitHttps);
    }

    // Get the endpoint(s)
    let endpoint: string | ContentstackEndpoints;

    if (service) {
      // Return specific service endpoint
      endpoint = regionData.endpoints[service];

      if (!endpoint) {
        // For invalid services, return undefined (as expected by some tests)
        return undefined as any;
      }
    } else {
      return omitHttps ? stripHttps(regionData.endpoints) : regionData.endpoints;
    }

    return omitHttps ? stripHttps(endpoint) : endpoint;
  } catch (error) {
    console.warn('Failed to fetch endpoints:', error);
    return getDefaultEndpoint(service, omitHttps);
  }
}

function getDefaultEndpoint(service: string, omitHttps: boolean): string {
  const defaultEndpoints: ContentstackEndpoints = regions.regions.find(r => r.isDefault)?.endpoints || {};

  const value = defaultEndpoints[service];
  const endpoint = typeof value === 'string' ? value : 'https://cdn.contentstack.io';

  return omitHttps ? endpoint.replace(/^https?:\/\//, '') : endpoint;
}

function findRegionByIDOrAlias(regions: RegionData[], regionInput: string): RegionData | null {
  // First try to find by exact ID match
  let region = regions.find(r => r.id === regionInput);
  if (region) {
    return region;
  }

  // Then try to find by alias
  region = regions.find(r =>
    r.alias.some(alias => alias.toLowerCase() === regionInput.toLowerCase())
  );

  return region || null;
}

function stripHttps(endpoint: string | ContentstackEndpoints): string | ContentstackEndpoints {
  if (typeof endpoint === 'string') {
    return endpoint.replace(/^https?:\/\//, '');
  } else {
    const result: ContentstackEndpoints = {};
    for (const key in endpoint) {
      result[key] = stripHttps(endpoint[key]);
    }
    return result;
  }
}