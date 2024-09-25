import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, split } from '@apollo/client'; // {{ edit_1 }}
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities'; // {{ edit_2 }}
import { WebSocketLink } from '@apollo/client/link/ws'; // {{ edit_3 }}

// Create an HTTP link to connect to the GraphQL server
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Create an auth link to include the JWT token in the headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Set the authorization header
    }
  };
});

// Create a WebSocket link for subscriptions
const wsLink = new WebSocketLink({ // {{ edit_4 }}
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('token'), // Pass token for authentication
    },
  },
});

// Use split to direct traffic to the appropriate link
const link = split( // {{ edit_5 }}
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink, // Use WebSocket link for subscriptions
  ApolloLink.from([authLink, httpLink]) // Use HTTP link for queries and mutations
);

// Combine the auth link and HTTP link
const client = new ApolloClient({
  link: link, // {{ edit_6 }}
  cache: new InMemoryCache(),
});

export default client;
