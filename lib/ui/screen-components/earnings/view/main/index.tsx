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

// Expo
import { router } from "expo-router";

// Skeletons
import { EarningScreenMainLoading } from "@/lib/ui/skeletons";

// Components
import EarningStack from "../earnings-stack";
import EarningsBarChart from "../../bar-chart";

export default function EarningsMain() {
  // Contexts
  const { userId, setModalVisible } = useUserContext();

  // Queries
  const { loading: isStoreEarningsLoading, data: storeEarningsData } = useQuery(
    STORE_EARNINGS_GRAPH,
    {
      variables: {
        storeId: userId ?? "",
      },
    },
  ) as QueryResult<IStoreEarningsResponse | undefined, { storeId: string }>;
  console.log("🚀 ~ EarningsMain ~ storeEarningsData:", { storeEarningsData });

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
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 1,
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
        width={900}
        height={280}
        frontColor="#8fe36e"
      />
      <View className="flex flex-row justify-between w-full px-4 py-4">
        <Text className="text-xl text-black font-bold">Recent Activity</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible({
              bool: false,
              _id: "",
              date: "",
              earningsArray: [],
              totalEarningsSum: 0,
              totalTipsSum: 0,
              totalDeliveries: 0,
            });
            router.push(
              "/(protected)/(tabs)/earnings/(routes)/earnings-detail",
            );
          }}
        >
          <Text className="text-sm text-[#3B82F6] font-bold">See More</Text>
        </TouchableOpacity>
      </View>
      <View>
        {storeEarningsData?.storeEarningsGraph?.earnings?.length === 0 &&
          !isStoreEarningsLoading && (
            <Text className="block mx-auto font-bold text-center w-full my-12">
              No record found.
            </Text>
          )}
        {storeEarningsData?.storeEarningsGraph?.earnings?.length &&
          storeEarningsData?.storeEarningsGraph?.earnings
            ?.slice(0, 4)
            ?.map((earning: IStoreEarnings, index) => (
              <EarningStack
                date={earning.date}
                earning={earning.totalEarningsSum}
                totalDeliveries={earning.earningsArray.length}
                _id={earning._id}
                tip={earning.totalTipsSum}
                earningsArray={earning.earningsArray}
                key={index}
                setModalVisible={setModalVisible}
              />
            ))}
      </View>
    </View>
  );
}
