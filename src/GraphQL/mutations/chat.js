import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
    mutation saveSentMessage($content: String!, $receiver: String!, $sender: String!) {
        saveSentMessage(content: $content, receiver: $receiver, sender: $sender)
    }
`;

export const RECIEVE_MESSAGE = gql`
mutation ReceiveIncomingMessage($content: String!, $sender: String!, $receiver: String!) {
    receiveIncomingMessage(content: $content, sender: $sender, receiver: $receiver)
  }
`;