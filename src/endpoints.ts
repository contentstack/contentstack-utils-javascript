import regionsData from './assets/regions.json';

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

/**
 * Returns the Contentstack API endpoint(s) for a given region and optional service.
 * Region can be an ID (e.g. `'us'`, `'eu'`) or an alias. Throws if the region is
 * invalid or empty.
 *
 * @param region - Region ID or alias (e.g. `'us'`, `'eu'`). Default: `'us'`.
 * @param service - Optional service name to return a single endpoint (e.g. `'delivery'`). If empty, returns all endpoints for the region.
 * @param omitHttps - If true, strips the `https://` prefix from the returned URL(s). Default: false.
 * @returns A single endpoint URL string if `service` is provided, otherwise the full endpoints object for the region.
 * @throws Error if region is empty, invalid, or if the requested service is not found.
 */
export function getContentstackEndpoint(region: string = 'us', service: string = '', omitHttps: boolean = false): string | ContentstackEndpoints {
  // Validate empty region before any processing
  if (region === '') {
    throw new Error('Empty region provided. Please put valid region.');
  }

  const regions: RegionsResponse = regionsData as RegionsResponse;

  // Normalize the region input
  const normalizedRegion = region.toLowerCase().trim() || 'us';

  // Check if regions data is malformed
  if (!Array.isArray(regions.regions)) {
    throw new Error('Invalid Regions file. Please install the SDK again to fix this issue.');
  }

  // Find the region by ID or alias
  const regionData = findRegionByIDOrAlias(regions.regions, normalizedRegion);

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