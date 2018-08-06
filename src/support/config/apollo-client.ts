import 'dotenv/config';

import ApolloClient, { PresetConfig } from 'apollo-boost';

import { GITHUB_PERSONAL_ACCESS_TOKEN } from './env-vars';

const config: PresetConfig = {
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    });
  },
  uri: 'https://api.github.com/graphql'
};

export const client = new ApolloClient(config);
