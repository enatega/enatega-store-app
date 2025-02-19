import { useMutation } from "@apollo/client";
import { ACCEPT_ORDER } from "../api/graphql";

export default function useAcceptOrder() {
  const [mutateAccept, { loading, error }] = useMutation(ACCEPT_ORDER);
  const acceptOrderFunc = (_id: string, time: string) => {
    mutateAccept({ variables: { _id, time } });
  };

  return { loading, error, acceptOrder: acceptOrderFunc };
}
