/* eslint-disable @typescript-eslint/no-explicit-any */

import OrderTab from "@/lib/ui/screen-components/home/orders/main";
import { Colors } from "@/lib/utils/constants";
import React, { useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const HomeOrdersScreen: React.FC = () => {
  const [index, setIndex] = useState(0); // State for the active tab index
  const [routes] = useState([
    { key: "new_orders", title: "New Orders" },
    { key: "processing", title: "Processing" },
    { key: "delivered", title: "Delivered" },
  ]);

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((_: any, i: any) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map(
          (
            route: {
              key: React.Key | null | undefined;
              title:
                | string
                | number
                | boolean
                | Animated.Value
                | Animated.AnimatedInterpolation<string | number>
                | Animated.WithAnimatedObject<
                    React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  >
                | Animated.WithAnimatedObject<Iterable<React.ReactNode>>
                | Animated.WithAnimatedObject<React.ReactPortal>
                | null
                | undefined;
            },
            i: number,
          ) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex: number) =>
                inputIndex === i ? 1 : 0.5,
              ),
            });

            if (typeof route?.title === "string")
              return (
                <TouchableOpacity
                  key={route.key}
                  style={[
                    styles.tabItem,
                    index === i && styles.activeTabItem, // Add bottom border for the selected tab
                  ]}
                  onPress={() => setIndex(i)} // Update index on press
                >
                  <Animated.Text
                    style={{ opacity }}
                    className="font-[Inter] font-bold"
                  >
                    {route?.title}
                  </Animated.Text>
                </TouchableOpacity>
              );
          },
        )}
      </View>
    );
  };

  const renderScene = SceneMap({
    new_orders: OrderTab,
    processing: OrderTab,
    delivered: OrderTab,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex} // Update index on tab change
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 2, // Default border width for tabs
    borderBottomColor: "transparent", // Hide the border for inactive tabs
  },
  activeTabItem: {
    borderBottomColor: Colors.light.primary, // Add a red bottom border for the active tab
  },
});

export default HomeOrdersScreen;
