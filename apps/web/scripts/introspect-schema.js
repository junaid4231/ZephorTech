/**
 * Introspect Strapi GraphQL schema to understand the correct query structure
 */

const fetch = require('node-fetch');

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function introspectSchema() {
  const query = `
    {
      __schema {
        queryType {
          fields {
            name
            type {
              name
              kind
              ofType {
                name
                kind
                ofType {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`${CMS_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return;
    }

    const servicesField = result.data.__schema.queryType.fields.find(
      (f) => f.name === 'services'
    );
    const testimonialsField = result.data.__schema.queryType.fields.find(
      (f) => f.name === 'testimonials'
    );

    console.log('\n📋 Services field:');
    console.log(JSON.stringify(servicesField, null, 2));
    
    console.log('\n📋 Testimonials field:');
    console.log(JSON.stringify(testimonialsField, null, 2));

    // Check what fields Service type has
    const serviceTypeQuery = `
      {
        __type(name: "Service") {
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    `;

    const serviceTypeResponse = await fetch(`${CMS_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      body: JSON.stringify({ query: serviceTypeQuery }),
    });

    const serviceTypeResult = await serviceTypeResponse.json();
    console.log('\n📋 Service type fields:');
    console.log(JSON.stringify(serviceTypeResult.data?.__type?.fields, null, 2));

    // Check what fields Testimonial type has
    const testimonialTypeQuery = `
      {
        __type(name: "Testimonial") {
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    `;

    const testimonialTypeResponse = await fetch(`${CMS_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      body: JSON.stringify({ query: testimonialTypeQuery }),
    });

    const testimonialTypeResult = await testimonialTypeResponse.json();
    console.log('\n📋 Testimonial type fields:');
    console.log(JSON.stringify(testimonialTypeResult.data?.__type?.fields, null, 2));

    // Now check what fields ServiceEntityResponseCollection has
    if (servicesField?.type?.ofType?.name === 'ServiceEntityResponseCollection') {
      const collectionQuery = `
        {
          __type(name: "ServiceEntityResponseCollection") {
            fields {
              name
              type {
                name
                kind
              }
            }
          }
        }
      `;

      const collectionResponse = await fetch(`${CMS_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        body: JSON.stringify({ query: collectionQuery }),
      });

      const collectionResult = await collectionResponse.json();
      console.log('\n📋 ServiceEntityResponseCollection fields:');
      console.log(JSON.stringify(collectionResult.data?.__type?.fields, null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

introspectSchema();

