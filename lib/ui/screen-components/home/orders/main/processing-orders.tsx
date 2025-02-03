/* eslint-disable @typescript-eslint/no-require-imports */

import UserContext from "@/lib/context/global/user.context";
import Order from "@/lib/ui/useable-components/order";
import Spinner from "@/lib/ui/useable-components/spinner";
import { NO_ORDER_PROMPT } from "@/lib/utils/constants";
import { IOrderTabsComponentProps } from "@/lib/utils/interfaces";
import { IOrder } from "@/lib/utils/interfaces/order.interface";
import { ORDER_TYPE } from "@/lib/utils/types";
import { NetworkStatus } from "@apollo/client";
import LottieView from "lottie-react-native";
import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

function HomeProcessingOrdersMain(props: IOrderTabsComponentProps) {
  // Props
  const { route } = props;

  // Context
  const {
    dataProfile,
    loadingAssigned,
    errorAssigned,
    assignedOrders,
    refetchAssigned,
    networkStatusAssigned,
  } = useContext(UserContext);

  // States
  const [orders, setOrders] = useState<IOrder[]>([]);

  // Handlers
  const onInitOrders = () => {
    if (loadingAssigned || errorAssigned) return;

    const _orders = assignedOrders?.filter(
      (o: IOrder) =>
        ["PICKED", "ASSIGNED"].includes(o.orderStatus) && !o.isPickedUp
    );

    setOrders(_orders ?? []);
  };

  // Use Effect
  useEffect(() => {
    onInitOrders();
  }, [assignedOrders, route.key]);

  useEffect(() => {
    // Trigger refetch when orders length changes
    if (orders.length === 0) {
      refetchAssigned();
    }
  }, [orders.length]);

  // Calculate the marginBottom dynamically
  const marginBottom = Platform.OS === "ios" ? height * 0.4 : height * 0.35;

  // Render
  return (
    <View key={route.key} className="flex-1 bg-white pb-12">
      {errorAssigned ?
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl">Something went wrong</Text>
        </View>
      : loadingAssigned ?
        <View className="flex-1">
          <Spinner />
        </View>
      : orders.length > 0 ?
        <FlatList
          className={`h-[${height}px] mb-[${marginBottom}px]`}
          keyExtractor={(item) => item._id}
          data={orders}
          showsVerticalScrollIndicator={false}
          refreshing={networkStatusAssigned === NetworkStatus.loading}
          onRefresh={refetchAssigned}
          renderItem={({ item }: { item: IOrder }) => (
            <Order tab={route.key as ORDER_TYPE} order={item} key={item._id} />
          )}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  minHeight:
                    height > 670 ?
                      height - height * 0.5
                    : height - height * 0.6,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LottieView
                  style={{
                    width: width - 100,
                    height: 350,
                  }}
                  source={require("@/lib/assets/loader.json")}
                  autoPlay
                  loop
                />

                {orders.length === 0 ?
                  <Text className="font-[Inter] text-[18px] text-base font-[500] text-gray-600">
                    {NO_ORDER_PROMPT[route.key]}
                  </Text>
                : <Text>Pull downto refresh</Text>}
              </View>
            );
          }}
        />
      : <View
          style={{
            minHeight:
              height > 670 ? height - height * 0.5 : height - height * 0.6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            style={{
              width: width - 100,
              height: 350,
            }}
            source={require("@/lib/assets/loader.json")}
            autoPlay
            loop
          />

          {orders.length === 0 ?
            <Text className="font-[Inter] text-[18px] text-base font-[500] text-gray-600">
              {NO_ORDER_PROMPT[route.key]}
            </Text>
          : <Text>Pull downto refresh</Text>}
        </View>
      }
    </View>
  );
}

export default HomeProcessingOrdersMain;
