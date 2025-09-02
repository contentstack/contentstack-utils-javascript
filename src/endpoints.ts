export interface ContentstackEndpoints {
  [key: string]: string | ContentstackEndpoints;
}

// Default endpoint URL - should return the same structure as endpoints.json
const DEFAULT_ENDPOINTS_URL = 'https://raw.githubusercontent.com/nadeem-cs/cs-endpoints/refs/heads/main/endpoints.json';


export async function getContentstackEndpoint(region: string = 'us', service: string = 'CDA', omitHttps: boolean = false): Promise<string | ContentstackEndpoints> {
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
      
      // Normalize region name
      let normalizedRegion = region.toLowerCase();
      
      // Convert 'us' to 'aws_na' and handle existing cloud_us patterns
      if (normalizedRegion === 'us') {
        normalizedRegion = 'aws_na';
      } else if (normalizedRegion.includes('_') || normalizedRegion.includes('-')) {
        // Handle case where cloud provider is already included (e.g., 'aws_us' -> 'aws_na' or 'aws-us' -> 'aws_na')
        const separator = normalizedRegion.includes('_') ? '_' : '-';
        const parts = normalizedRegion.split(separator);
        if (parts.length === 2 && parts[1] === 'us') {
          normalizedRegion = `${parts[0]}_na`;
        } else if (parts.length === 2) {
          // Convert hyphen to underscore for consistency
          normalizedRegion = `${parts[0]}_${parts[1]}`;
        }
      } else if (!normalizedRegion.includes('_') && !normalizedRegion.includes('-') && normalizedRegion) {
        // If region doesn't contain a cloud provider separator, append 'aws'
        normalizedRegion = `aws_${normalizedRegion}`;
      }
      
      if (normalizedRegion) {
        const parts = normalizedRegion.toUpperCase().split('_');
        if (parts.length === 2) {
          const [cloud, region] = parts;
          
          try {
            const endpoint = endpointsData[cloud][region][service];

            return omitHttps ? endpoint.replace(/^https?:\/\//, '') : endpoint;
          } catch (error) {
            console.warn(`Invalid region combination: ${cloud}_${region} - ${service}`);
            throw Error('Unable to set the host. Please put valid host');
          }
        } else {
          // Handle invalid region format (not cloud_region pattern)
          console.warn(`Invalid region format: ${normalizedRegion}`);
          throw Error('Unable to set the host. Please put valid host');
        }
      } else {
        // Handle empty or falsy region
        console.warn('Invalid region: empty or invalid region provided');
        throw Error('Unable to set the host. Please put valid host');
      }
    }
  } catch (error) {
    // Re-throw errors that are explicitly thrown by our logic
    if (error instanceof Error && error.message === 'Unable to set the host. Please put valid host') {
      throw error;
    }
    // If fetch fails or any other error occurs, return default host
    console.warn('Failed to fetch endpoints:', error);
  }

  return 'cdn.contentstack.io';
}
