import { gql } from "@apollo/client";

export const UPDATE_LOCATION = gql`
  mutation UpdateRiderLocation($latitude: String!, $longitude: String!) {
    updateRiderLocation(latitude: $latitude, longitude: $longitude) {
      _id
    }
  }
`;

export const UPDATE_AVAILABILITY = gql`
  mutation ToggleRider($id:String){
    toggleAvailablity(id:$id){
      _id
    }
}`
