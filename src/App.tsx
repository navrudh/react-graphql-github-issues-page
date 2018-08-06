import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import AppMain from './AppMain/AppMain';
import { client } from './support';

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <AppMain />
      </ApolloProvider>
    );
  }
}

export default App;
