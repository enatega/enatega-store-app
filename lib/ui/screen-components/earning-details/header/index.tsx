// GraphQL
import { STORE_EARNINGS_GRAPH } from "@/lib/apollo/queries/earnings.query";

// Hooks
import { useUserContext } from "@/lib/context/global/user.context";
import { QueryResult, useQuery } from "@apollo/client";

// Components
import SpinnerComponent from "@/lib/ui/useable-components/spinner";

// Interfacs
import { IStoreEarningsResponse } from "@/lib/utils/interfaces/rider-earnings.interface";

// Core
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function EarningDetailsHeader() {
  // States
  const [storeEarningsGrandTotal, setStoreEarningsGrandTotal] = useState({
    earnings: 0,
    totalDeliveries: 0,
  });

  // Hooks
  const { t } = useTranslation();
  const { userId } = useUserContext();

  // Queries
  const { loading: isRiderEarningsLoading, data: riderEarningsData } = useQuery(
    STORE_EARNINGS_GRAPH,
    {
      variables: {
        storeId: userId ?? "",
      },
    },
  ) as QueryResult<IStoreEarningsResponse | undefined, { storeId: string }>;

  useEffect(() => {
    if (riderEarningsData?.storeEarningsGraph?.earnings?.length) {
      const totalEarnings =
        riderEarningsData?.storeEarningsGraph?.earnings?.reduce(
          (acc, curr) => acc + curr.totalEarningsSum,
          0,
        );
      const totalDeliveries =
        riderEarningsData?.storeEarningsGraph.earnings.reduce(
          (acc, curr) => acc + curr.earningsArray.length,
          0,
        );
      setStoreEarningsGrandTotal({
        earnings: totalEarnings,
        totalDeliveries: totalDeliveries,
      });
    }
  }, []);

  if (isRiderEarningsLoading) return <SpinnerComponent />;
  return (
    <View className="bg-gray-100 py-3 border border-gray-100">
      <Text className="left-5 text-xl font-semibold">{t("Summary")}</Text>
      <View className="flex flex-row justify-between items-center p-5">
        <View className="flex gap-2 items-center">
          <Text className="text-lg text-black">{t("Total Earnings")}</Text>
          <Text className="font-semibold text-lg text-start self-start">
            ${storeEarningsGrandTotal.earnings}
          </Text>
        </View>
        <View className="flex gap-2 items-center border-l-2 border-l-gray-200 pl-3">
          <Text className="text-lg text-black">{t("Total Deliveries")}</Text>
          <Text className="font-semibold text-lg text-start self-start">
            {storeEarningsGrandTotal.totalDeliveries}
          </Text>
        </View>
      </View>
    </View>
  );
}
