import { useMutation } from "@apollo/client";
import { GET_ORDERS } from "../apollo/queries/orders";
import { MUTATE_ORDER_RING } from "../api/graphql";

export default function useOrderRing() {
  const [mutate, { loading }] = useMutation(MUTATE_ORDER_RING, {
    refetchQueries: [{ query: GET_ORDERS }],
  });
  const muteRing = (id: string) => {
    mutate({ variables: { orderId: id } });
  };
  return { loading, muteRing };
}
