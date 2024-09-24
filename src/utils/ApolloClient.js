import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

// Combine the auth link and HTTP link
const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
