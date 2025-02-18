import { useEffect, useState } from "react";
import {
  View,
  Platform,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
} from "react-native";
// UI
import CustomTab from "@/lib/ui/useable-components/custom-tab";
import Spinner from "@/lib/ui/useable-components/spinner";
// Constants
import { NO_ORDER_PROMPT, ORDER_DISPATCH_TYPE } from "@/lib/utils/constants";

// Interface
import { IOrderTabsComponentProps } from "@/lib/utils/interfaces";
import { IOrder } from "@/lib/utils/interfaces/order.interface";

// Hook
import useOrders from "@/lib/hooks/useOrders";
import { WalletIcon } from "@/lib/ui/useable-components/svg";
import Order from "@/lib/ui/useable-components/order";
import { ORDER_TYPE } from "@/lib/utils/types";

const { height } = Dimensions.get("window");

function HomeDeliveredOrdersMain(props: IOrderTabsComponentProps) {
  // Props
  const { route } = props;

  // Hooks
  const {
    loading,
    error,
    data,
    deliveredOrders,
    refetch,
    currentTab,
    setCurrentTab,
  } = useOrders();

  // const { loading: mutateLoading } = useAcceptOrder();

  // States
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  // Handlers
  const onInitOrders = () => {
    if (loading || error) return;
    if (!data) return;

    const _orders = deliveredOrders?.filter((order) =>
      currentTab === ORDER_DISPATCH_TYPE[0]
        ? !order?.isPickedUp
        : order?.isPickedUp,
    );
    setOrders(_orders ?? []);
  };

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  // Use Effect
  useEffect(() => {
    onInitOrders();
  }, [data?.restaurantOrders, route.key, currentTab]);

  useEffect(() => {
    // Trigger refetch when orders length changes
    if (orders?.length === 0) {
      refetch();
    }
  }, [orders?.length]);

  // Calculate the marginBottom dynamically
  const marginBottom = Platform.OS === "ios" ? height * 0.4 : height * 0.35;

  return (
    <View
      className="pt-14 flex-1 items-center  bg-white pb-16"
      style={style.contaienr}
    >
      <CustomTab
        options={ORDER_DISPATCH_TYPE}
        selectedTab={currentTab}
        setSelectedTab={setCurrentTab}
      />

      {error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl">
            Something went wrong. Please refresh.
          </Text>
        </View>
      ) : loading ? (
        <View className="flex-1">
          <Spinner />
        </View>
      ) : orders?.length > 0 ? (
        <FlatList
          className={`w-full h-[${height}px] mb-[${marginBottom}px]`}
          keyExtractor={(item) => item._id}
          data={orders}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }: { item: IOrder }) => (
            <Order tab={route.key as ORDER_TYPE} order={item} key={item._id} />
          )}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  minHeight:
                    height > 670
                      ? height - height * 0.5
                      : height - height * 0.6,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <WalletIcon height={100} width={100} />
                {orders?.length === 0 ? (
                  <Text className="font-[Inter] text-[18px] text-base font-[500] text-gray-600">
                    {NO_ORDER_PROMPT[route.key]}
                  </Text>
                ) : (
                  <Text>Pull down to refresh</Text>
                )}
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            minHeight:
              height > 670 ? height - height * 0.5 : height - height * 0.6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WalletIcon height={100} width={100} />

          {orders?.length === 0 ? (
            <Text className="font-[Inter] text-[18px] text-base font-[500] text-gray-600">
              {NO_ORDER_PROMPT[route.key]}
            </Text>
          ) : (
            <Text>Pull down to refresh</Text>
          )}
        </View>
      )}
    </View>
  );
}

export default HomeDeliveredOrdersMain;

const style = StyleSheet.create({
  contaienr: {
    paddingBottom: Platform.OS === "android" ? 50 : 80,
  },
});
