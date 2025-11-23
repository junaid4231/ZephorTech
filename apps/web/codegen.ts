import type { CodegenConfig } from '@graphql-codegen/cli';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';
// API token for GraphQL introspection (get from Strapi admin: Settings → API Tokens)
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`${CMS_URL}/graphql`]: {
      headers: API_TOKEN
        ? {
            Authorization: `Bearer ${API_TOKEN}`,
          }
        : {},
    },
  },
  documents: ['lib/graphql/**/*.graphql'],
  generates: {
    'lib/graphql/generated/types.ts': {
      plugins: ['typescript'],
      config: {
        useTypeImports: true,
        skipTypename: true,
        enumsAsTypes: true,
      },
    },
    'lib/graphql/generated/operations.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        useTypeImports: true,
        skipTypename: true,
        enumsAsTypes: true,
      },
    },
  },
};

export default config;

