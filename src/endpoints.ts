// Enum definition first
export enum Region {
  US = "us",
  EU = "eu",
  AU = "au",
  AZURE_NA = "azure-na",
  AZURE_EU = "azure-eu",
  GCP_NA = "gcp-na",
  GCP_EU = "gcp-eu"
}

// Type definitions
export interface ContentstackEndpoints {
  [key: string]: string | ContentstackEndpoints;
}

interface RegionEndpoints {
  [provider: string]: {
    [region: string]: ContentstackEndpoints;
  };
}



// Default endpoint URL - should return the same structure as endpoints.json
const DEFAULT_ENDPOINTS_URL = 'https://raw.githubusercontent.com/contentstack/contentstack-endpoints/master/src/endpoints.json';

// Function to remove https prefix
function removeHttps(url: string): string {
  return url.replace(/^https:\/\//, '');
}

// Map regions to the data structure paths
const regionToPath: { [key in Region]: string[] } = {
  [Region.US]: ['AWS', 'NA'],
  [Region.EU]: ['AWS', 'EU'],
  [Region.AU]: ['AWS', 'AU'],
  [Region.AZURE_NA]: ['AZURE', 'NA'],
  [Region.AZURE_EU]: ['AZURE', 'EU'],
  [Region.GCP_NA]: ['GCP', 'NA'],
  [Region.GCP_EU]: ['GCP', 'EU']
};

// Function to fetch endpoints from remote URL
async function fetchEndpointsData(url: string = DEFAULT_ENDPOINTS_URL): Promise<RegionEndpoints> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch endpoints from ${url}. HTTP status: ${response.status} - ${response.statusText}`);
  }
  
  try {
    const endpointsData = await response.json();
    return endpointsData;
  } catch (parseError) {
    throw new Error(`Failed to parse JSON response from ${url}. Response may not be valid JSON.`);
  }
}

export async function getContentstackEndpoint(region: Region = Region.US, omitHttps: boolean = false): Promise<ContentstackEndpoints> {
  // Fetch endpoints data from remote URL - will throw error if fails
  const regionEndpoints = await fetchEndpointsData();
  
  // Get the path for the specified region
  const path = regionToPath[region];
  if (!path || path.length !== 2) {
    throw new Error(`Invalid region: ${region}. Supported regions are: ${Object.values(Region).join(', ')}`);
  }

  const [provider, regionKey] = path;
  const endpoints: ContentstackEndpoints = regionEndpoints[provider]?.[regionKey];

  if (!endpoints) {
    throw new Error(`No endpoints found for region: ${region} (provider: ${provider}, region: ${regionKey})`);
  }

  if (omitHttps) {
    const result: ContentstackEndpoints = {};
    Object.entries(endpoints).forEach(([key, value]: [string, any]) => {
      if (typeof value === 'string') {
        result[key] = removeHttps(value);
      } else if (typeof value === 'object' && value !== null) {
        // Handle nested objects (like Personalize)
        const nestedResult: { [key: string]: any } = {};
        Object.entries(value).forEach(([nestedKey, nestedValue]: [string, any]) => {
          nestedResult[nestedKey] = typeof nestedValue === 'string' ? removeHttps(nestedValue) : nestedValue;
        });
        result[key] = nestedResult;
      } else {
        result[key] = value;
      }
    });
    return result;
  }
  
  return endpoints;
}
