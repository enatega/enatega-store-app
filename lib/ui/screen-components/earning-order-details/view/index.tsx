// Contexts
import { useUserContext } from "@/lib/context/global/user.context";

// Interfaces
import { IStoreEarningsArray } from "@/lib/utils/interfaces/rider-earnings.interface";

// Core
import { View } from "react-native";

// Components
import NoRecordFound from "@/lib/ui/useable-components/no-record-found";
import OrderStack from "../order-stack";

export default function EarningsOrderDetailsMain() {
  // Contexts
  const { storeOrdersEarnings } = useUserContext();
  return (
    <View>
      {storeOrdersEarnings?.length === 0 && <NoRecordFound />}
      {storeOrdersEarnings?.map(
        (earning: IStoreEarningsArray, index: number) => {
          return (
            <OrderStack
              key={index}
              amount={earning.totalOrderAmount}
              orderId={earning.orderDetails.orderId}
            />
          );
        },
      )}
    </View>
  );
}
