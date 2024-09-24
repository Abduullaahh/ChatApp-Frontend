import { gql } from '@apollo/client';

export const MESSAGE_RECEIVED = gql`
  subscription MessageReceived($username: String!) {
    messageReceived(username: $username) {
      id
      content
      sender
      receiver
      timestamp
    }
  }
`;