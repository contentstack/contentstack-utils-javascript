export interface ContentstackEndpoints {
  [key: string]: string | ContentstackEndpoints;
}

// Default endpoint URL - should return the same structure as endpoints.json
const DEFAULT_ENDPOINTS_URL = 'https://raw.githubusercontent.com/nadeem-cs/cs-endpoints/refs/heads/main/endpoints.json';


export async function getContentstackEndpoint(region: string = 'us', service: string = '', omitHttps: boolean = false): Promise<string | ContentstackEndpoints> {
  try {
    const response = await fetch(DEFAULT_ENDPOINTS_URL);
      
    if (response.ok) {
      const result = await response.text();
      let endpointsData;
      
      try {
        endpointsData = JSON.parse(result);
      } catch (jsonError) {
        console.warn('Failed to parse JSON response:', jsonError);
        console.warn('Response content:', result.substring(0, 200) + '...');
        throw new Error('Invalid JSON response from endpoints service');
      }
      
      let normalizedRegion = region.toUpperCase();

      // Convert 'US' to 'aws_na' and handle existing patterns
      if (normalizedRegion === 'US') {
        normalizedRegion = 'AWS-NA';
      } else if (normalizedRegion.includes('_') || normalizedRegion.includes('-')) {  // (e.g., 'aws_us' -> 'aws_na' or 'aws-us' -> 'aws-na')
        const separator = normalizedRegion.includes('_') ? '_' : '-';
        const parts = normalizedRegion.split(separator);
        if (parts.length === 2 && parts[1] === 'US') {
          normalizedRegion = `${parts[0]}-NA`;
        } else if (parts.length === 2) {
          normalizedRegion = `${parts[0]}-${parts[1]}`;
        }
      } else if (!normalizedRegion.includes('_') && !normalizedRegion.includes('-') && normalizedRegion) {
        normalizedRegion = `AWS-${normalizedRegion}`;
      }
      
      if (normalizedRegion) {
        const parts = normalizedRegion.toUpperCase().split('-');
        if (parts.length === 2) {
          const [cloud, region] = parts;
          
          try {
            const endpoint = service ? endpointsData[cloud][region][service] : endpointsData[cloud][region];
            endpoint['Region'] = normalizedRegion;

            return omitHttps ? stripHttps(endpoint) : endpoint;
          } catch (error) {
            throw Error(`Invalid region combination: ${cloud}-${region} - ${service || 'all'}`);
          }
        } else {
          throw Error(`Invalid region format: ${normalizedRegion}`);
        }
      } else {
        // Handle empty or falsy region
        throw Error('Invalid region: empty or invalid region provided');
      }
    }
  } catch (error) {
    throw error;
  }
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