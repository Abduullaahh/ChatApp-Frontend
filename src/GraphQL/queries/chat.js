import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages($username: String!) {
    getMessages(username: $username) {
      __typename
      id
      content
      sender
      receiver
      timestamp
    }
  }
`;