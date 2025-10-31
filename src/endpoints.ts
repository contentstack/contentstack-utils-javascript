/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs';

// Type declarations for CommonJS runtime (rollup outputs CommonJS format)
declare const __dirname: string;

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

// Load regions.json at runtime from the dist/lib directory
function loadRegions(): RegionsResponse {
  // The bundled file is at dist/index.es.js, regions.json is at dist/lib/regions.json
  // So __dirname will be 'dist/' and we need to go to 'dist/lib/regions.json'
  const regionsPath = path.join(__dirname, 'lib', 'regions.json');
  
  if (fs.existsSync(regionsPath)) {
    try {
      const regionsData = fs.readFileSync(regionsPath, 'utf-8');
      return JSON.parse(regionsData);
    } catch (error) {
      throw new Error(`Failed to parse regions.json: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // If not found, throw clear error
  throw new Error('regions.json file not found at dist/lib/regions.json. Please ensure the package is properly installed and postinstall script has run.');
}

// Cache the loaded regions data
let cachedRegions: RegionsResponse | null = null;

function getRegions(): RegionsResponse {
  if (!cachedRegions) {
    cachedRegions = loadRegions();
  }
  return cachedRegions;
}

export function getContentstackEndpoint(region: string = 'us', service: string = '', omitHttps: boolean = false): string | ContentstackEndpoints {
  // Validate empty region before any processing
  if (region === '') {
    console.warn('Invalid region: empty or invalid region provided');
    throw new Error('Unable to set the host. Please put valid host');
  }

  try {
    const regionsData: RegionsResponse = getRegions();

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
        return undefined as unknown as ContentstackEndpoints;
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
  const regions = getRegions();
  const defaultEndpoints: ContentstackEndpoints = regions.regions.find((r: RegionData) => r.isDefault)?.endpoints || {};

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