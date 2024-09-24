import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $name: String!, $password: String!, $phoneNumber: String!) {
    register(username: $username, email: $email, name: $name, password: $password, phoneNumber: $phoneNumber) {
      id
      username
      email
      name
      phoneNumber
    }
  }
`;