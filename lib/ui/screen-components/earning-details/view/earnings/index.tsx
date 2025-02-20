// Core
import { ScrollView, Text } from "react-native";

// Interfaces
import { IStoreEarnings } from "@/lib/utils/interfaces/rider-earnings.interface";
import { IStoreEarningsDetailProps } from "@/lib/utils/interfaces/earning.interface";

// Components
import EarningStack from "../../../earnings/view/earnings-stack";
import NoRecordFound from "@/lib/ui/useable-components/no-record-found";

export default function EarningsDetailStacks({
  storeEarningsData,
  isStoreEarningsLoading,
  setModalVisible,
}: IStoreEarningsDetailProps) {
  console.warn({ storeEarningsData });
  return (
    <ScrollView className="h-full border-t-2 border-t-gray-200 bg-white">
      <Text>
        {storeEarningsData?.storeEarningsGraph?.earnings?.length === 0 &&
          !isStoreEarningsLoading && <NoRecordFound />}
      </Text>
      {storeEarningsData?.storeEarningsGraph?.earnings?.length &&
        storeEarningsData?.storeEarningsGraph?.earnings?.map(
          (earning: IStoreEarnings, index: number) => (
            <EarningStack
              totalDeliveries={earning.earningsArray.length}
              date={earning.date}
              earning={earning.totalEarningsSum}
              _id={earning._id}
              earningsArray={earning.earningsArray}
              key={index}
              totalOrderAmount={earning.totalOrderAmount}
              setModalVisible={setModalVisible}
            />
          ),
        )}
    </ScrollView>
  );
}
