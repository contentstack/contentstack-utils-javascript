/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs';

// Type declarations for CommonJS runtime (rollup outputs CommonJS format)
declare const __dirname: string;
declare function require(id: string): unknown;

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
  try {
    // Path to regions.json relative to the bundled file location
    // The bundled file is at dist/index.es.js, and regions.json is at dist/lib/regions.json
    // So from dist/index.es.js, the path is ./lib/regions.json
    const regionsPath = path.join(__dirname, 'lib/regions.json');
    
    // Try loading from the installed package location first
    if (fs.existsSync(regionsPath)) {
      const regionsData = fs.readFileSync(regionsPath, 'utf-8');
      return JSON.parse(regionsData);
    }
    
    // Fallback: try loading from package root (for development/testing)
    const fallbackPath = path.join(__dirname, '../../regions.json');
    if (fs.existsSync(fallbackPath)) {
      const regionsData = fs.readFileSync(fallbackPath, 'utf-8');
      return JSON.parse(regionsData);
    }
    
    // If neither path works, try require as final fallback
    try {
      // This might work in some bundler scenarios
      const regionsData = require('./lib/regions.json') as RegionsResponse;
      return regionsData;
    } catch {
      throw new Error('regions.json file not found. Please ensure the package is properly installed and postinstall script has run.');
    }
  } catch (error) {
    throw new Error(`Failed to load regions.json: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Cache the loaded regions data
let cachedRegions: RegionsResponse | null = null;

function getRegions(): RegionsResponse {
  if (!cachedRegions) {
    cachedRegions = loadRegions();
  }
  return cachedRegions;
}

export function getContentstackEndpoint(region: string = 'us', service: string = '', omitHttps: boolean = false, localRegionsData?: RegionsResponse): string | ContentstackEndpoints {
  // Validate empty region before any processing
  if (region === '') {
    console.warn('Invalid region: empty or invalid region provided');
    throw new Error('Unable to set the host. Please put valid host');
  }

  try {
    let regionsData: RegionsResponse;

    regionsData = localRegionsData || getRegions();

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