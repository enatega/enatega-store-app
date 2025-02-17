import { gql } from "@apollo/client";

export const STORE_LOGIN = gql`
  mutation RestaurantLogin($username: String!, $password: String!) {
    restaurantLogin(username: $username, password: $password) {
      token
      restaurantId
    }
  }
`;

export const DEFAULT_STORE_CREDS = gql`
  query LastOrderCreds {
    lastOrderCreds {
      restaurantUsername
      restaurantPassword
    }
  }
`;
