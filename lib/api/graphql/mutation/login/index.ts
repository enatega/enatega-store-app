import { gql } from "@apollo/client";

export const RIDER_LOGIN = gql`
  mutation RiderLogin(
    $username: String
    $password: String
    $notificationToken: String
  ) {
    riderLogin(
      username: $username
      password: $password
      notificationToken: $notificationToken
    ) {
      userId
      token
    }
  }
`;

export const DEFAULT_RIDER_CREDS = gql`
  query LastOrderCreds {
    lastOrderCreds {
      riderUsername
      riderPassword
    }
  }
`;
