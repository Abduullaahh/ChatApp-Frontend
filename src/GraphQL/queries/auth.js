import { gql } from '@apollo/client';

export const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    isAuthenticated
  }
`;