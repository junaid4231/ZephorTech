/**
 * GraphQL Client for Strapi CMS
 * Simple fetch-based client for making GraphQL queries
 * Uses API token for authenticated requests
 */

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';
const GRAPHQL_ENDPOINT = `${CMS_URL}/graphql`;
// API token for authenticated GraphQL requests
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<GraphQLResponse<T>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add API token if available for authenticated requests
    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      // Cache for 60 seconds in production, no cache in development
      next: { revalidate: process.env.NODE_ENV === 'production' ? 60 : 0 },
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors && result.errors.length > 0) {
      console.error('GraphQL errors:', result.errors);
      throw new Error(result.errors[0].message);
    }

    return result;
  } catch (error) {
    console.error('GraphQL fetch error:', error);
    throw error;
  }
}

