/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs';

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

// Declare __dirname for TypeScript (available at runtime in CommonJS output)
declare const __dirname: string;

// Load regions.json at runtime from the dist/lib directory
function loadRegions(): RegionsResponse {
  // Get the directory of the current module
  // In CommonJS (compiled output), __dirname is available at runtime
  // When packed, the file structure may be different, so we check multiple paths
  // __dirname will be available at runtime in CommonJS output from rollup
  // Use __dirname directly since it's available at runtime in CommonJS output
  const moduleDir = __dirname;

  // Try multiple possible paths:
  // 1. lib/regions.json (relative to __dirname - for production/packed package)
  //    Main entry point is dist/index.es.js, so __dirname is dist, file is at dist/lib/regions.json
  // 2. dist/lib/regions.json (relative to process.cwd() - for development/tests)
  const possiblePaths = [
    path.join(moduleDir, 'lib', 'regions.json'),
    path.join(process.cwd(), 'dist', 'lib', 'regions.json'),
  ];

  for (const regionsPath of possiblePaths) {
    if (fs.existsSync(regionsPath)) {
      try {
        const regionsData = fs.readFileSync(regionsPath, 'utf-8');
        return JSON.parse(regionsData);
      } catch (error) {
        throw new Error(`Failed to parse regions.json: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  
  // If not found, throw clear error
  throw new Error('regions.json file not found. Please ensure the package is properly installed and postinstall script has run.');
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
    throw new Error('Empty region provided. Please put valid region.');
  }

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
    throw new Error(`Invalid region: ${region}`);
  }

  // Get the endpoint(s)
  if (service) {
    // Return specific service endpoint
    const endpoint = regionData.endpoints[service];

    if (!endpoint) {
      throw new Error(`Service "${service}" not found for region "${regionData.id}"`);
    }
    return omitHttps ? stripHttps(endpoint) : endpoint;
  } else {
    return omitHttps ? stripHttps(regionData.endpoints) : regionData.endpoints;
  }
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