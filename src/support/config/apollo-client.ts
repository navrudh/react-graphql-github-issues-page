import ApolloClient, {PresetConfig} from 'apollo-boost';
import 'dotenv/config';

const config: PresetConfig = {
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    });
  },
  uri: 'https://api.github.com/graphql',
}

export const client = new ApolloClient(config)