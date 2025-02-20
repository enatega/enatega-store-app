// Core
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";

// Contexts
import { useUserContext } from "@/lib/context/global/user.context";

// Interfaces
import {
  IStoreEarnings,
  IStoreEarningsResponse,
} from "@/lib/utils/interfaces/rider-earnings.interface";

// Charts
import { barDataItem } from "react-native-gifted-charts";

// GraphQL
import { STORE_EARNINGS_GRAPH } from "@/lib/apollo/queries/earnings.query";

// Hooks
import { QueryResult, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

// Expo
import { router } from "expo-router";

// Skeletons
import { EarningScreenMainLoading } from "@/lib/ui/skeletons";

// Components
import EarningStack from "../earnings-stack";
import EarningsBarChart from "../../bar-chart";
import { NoRecordFound } from "@/lib/ui/useable-components";
import { showMessage } from "react-native-flash-message";

export default function EarningsMain() {
  // Hooks
  const { t } = useTranslation();
  const { userId, setModalVisible } = useUserContext();

  // Queries
  const { loading: isStoreEarningsLoading, data: storeEarningsData } = useQuery(
    STORE_EARNINGS_GRAPH,
    {
      onError: (err) => {
        console.error(err);
        showMessage({
          message:
            err.graphQLErrors[0].message ||
            err.networkError?.message ||
            "Failed to fetch earnings",
          type: "danger",
          duration: 1000,
        });
      },
      variables: {
        storeId: userId ?? "",
      },
    },
  ) as QueryResult<
    IStoreEarningsResponse | undefined,
    { storeId: string; startDate?: string; endDate?: string }
  >;
  const barData: barDataItem[] =
    storeEarningsData?.storeEarningsGraph.earnings
      .slice(0, 7)
      .map((earning: IStoreEarnings) => ({
        value: earning.totalEarningsSum,
        label: earning._id,
        topLabelComponent: () => {
          return (
            <Text
              style={{
                color: "#000",
                fontSize: 8,
                fontWeight: "600",
                marginBottom: 1,
                wordWrap: "wrap",
              }}
            >
              ${earning.totalEarningsSum}
            </Text>
          );
        },
      })) ?? ([] as barDataItem[]);

  // If loading
  if (isStoreEarningsLoading) return <EarningScreenMainLoading />;

  return (
    <View className="bg-white">
      <EarningsBarChart
        data={barData}
        width={1000}
        height={270}
        frontColor="#8fe36e"
        disableScroll={true}
      />
      <View className="flex flex-row justify-between w-full px-4 py-4">
        <Text className="text-xl text-black font-bold">
          {t("Recent Activity")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible({
              bool: false,
              _id: "",
              date: "",
              earningsArray: [],
              totalEarningsSum: 0,
              totalDeliveries: 0,
              totalOrderAmount: 0,
            });
            router.push(
              "/(protected)/(tabs)/earnings/(routes)/earnings-detail",
            );
          }}
        >
          <Text className="text-sm text-[#3B82F6] font-bold">
            {t("See More")}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {storeEarningsData?.storeEarningsGraph?.earnings?.length === 0 &&
          !isStoreEarningsLoading && <NoRecordFound />}
        {storeEarningsData?.storeEarningsGraph?.earnings?.length &&
          storeEarningsData?.storeEarningsGraph?.earnings
            ?.slice(0, 4)
            ?.map((earning: IStoreEarnings, index) => (
              <EarningStack
                date={earning.date}
                earning={earning.totalEarningsSum}
                totalDeliveries={earning.earningsArray.length}
                _id={earning._id}
                earningsArray={earning.earningsArray}
                key={index}
                totalOrderAmount={earning.totalOrderAmount}
                setModalVisible={setModalVisible}
              />
            ))}
      </View>
    </View>
  );
}
